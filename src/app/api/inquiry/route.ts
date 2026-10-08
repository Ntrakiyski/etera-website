import { cloudflare } from "@/payload.config";
import { getContactPage } from "@/lib/cms";
import { deliverInquiry } from "@/lib/inquiry-delivery";

export async function POST(request: Request) {
  try {
    const { env } = cloudflare;
    const page = await getContactPage();
    return deliverInquiry(request, { apiKey: env.RESEND_API_KEY, turnstileSecret: env.TURNSTILE_SECRET_KEY, limiter: env.INQUIRY_LIMITER, serviceOptions: page.serviceOptions });
  } catch {
    console.error("Inquiry configuration unavailable");
    return Response.json({ error: "Sending is unavailable. Please try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
