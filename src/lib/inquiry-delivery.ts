import { validateInquiry, type InquiryDraft } from "./inquiry-validation.ts";
import { buildInquiryEmail } from "./inquiry-email.ts";

type Limiter = { limit(input: { key: string }): Promise<{ success: boolean }> };
type DeliverySettings = {
  apiKey: string;
  turnstileSecret: string;
  limiter: Limiter;
  serviceOptions: string[];
};
const reply = (status: number, error?: string, code?: string) => Response.json(error ? { error, ...(code ? { code } : {}) } : { success: true }, {
  status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
});

export async function deliverInquiry(request: Request, settings: DeliverySettings): Promise<Response> {
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) return reply(403, "Invalid origin.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "Use JSON.");
  if (!settings.apiKey || !settings.turnstileSecret || !settings.limiter) return reply(503, "Sending is unavailable.");
  try {
    const ip = request.headers.get("cf-connecting-ip") || "local";
    if (!(await settings.limiter.limit({ key: `inquiry-ip:${ip}` })).success) return reply(429, "Please wait before trying again.");
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "Missing inquiry.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return reply(413, "Inquiry is too long."); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let data: Record<string, unknown>;
    try { data = JSON.parse(new TextDecoder().decode(bytes)); }
    catch { return reply(400, "Invalid inquiry."); }
    if (!data || typeof data !== "object" || Array.isArray(data)) return reply(400, "Invalid inquiry.");
    if (typeof data.website !== "string" || data.website) return reply(400, "Invalid inquiry.");
    if (typeof data.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.submissionId)) return reply(400, "Invalid submission.");
    if (typeof data.turnstileToken !== "string" || !data.turnstileToken || data.turnstileToken.length > 2048) return reply(400, "Complete the security check.", "verification");
    const limits = { name: 120, email: 254, brand: 200, budget: 200, project: 6000, additional: 3000 };
    for (const [key, max] of Object.entries(limits)) {
      if (typeof data[key] !== "string" || data[key].length > max) return reply(400, "Check the inquiry fields.");
      data[key] = data[key].trim();
    }
    if (!Array.isArray(data.services) || data.services.length > 30 || !data.services.every(value => typeof value === "string" && settings.serviceOptions.includes(value))) return reply(400, "Choose a valid service.");
    const draft = data as unknown as InquiryDraft;
    // A single address only: never let visitor input become additional mail headers or recipients.
    if (/[\r\n<>,;\s]/.test(draft.email) || Object.keys(validateInquiry(draft)).length) return reply(400, "Check the inquiry fields.");
    const addressHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(draft.email.toLowerCase()))), b => b.toString(16).padStart(2, "0")).join("");
    if (!(await settings.limiter.limit({ key: `inquiry-email:${addressHash}` })).success) return reply(429, "Please wait before trying again.");
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: settings.turnstileSecret, response: data.turnstileToken, remoteip: ip === "local" ? undefined : ip }),
      signal: AbortSignal.timeout(10000),
    });
    if (!verification.ok) return reply(503, "Security verification is unavailable.");
    const verified = await verification.json() as { success?: boolean; hostname?: string; action?: string };
    if (!verified.success || verified.hostname !== new URL(origin).hostname || verified.action !== "inquiry") return reply(400, "Complete the security check again.", "verification");
    const message = buildInquiryEmail(draft);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${settings.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `inquiry/${data.submissionId}` },
      body: JSON.stringify({ from: "ETÉRA <hello@eteracreative.com>", to: ["hello@eteracreative.com"], cc: [draft.email], bcc: ["ystoyanova@eteracreative.com", "adjurdjevic@eteracreative.com"], reply_to: draft.email, ...message }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) { console.error("Inquiry email rejected", { status: response.status }); return reply(502, "Your inquiry could not be sent. Please try again."); }
    const sent = await response.json() as { id?: string };
    if (!sent.id) return reply(502, "Your inquiry could not be sent. Please try again.");
    console.info("Inquiry accepted by Resend", { id: sent.id });
    return reply(200);
  } catch {
    console.error("Inquiry delivery unavailable");
    return reply(503, "Your inquiry could not be sent. Please try again.");
  }
}
