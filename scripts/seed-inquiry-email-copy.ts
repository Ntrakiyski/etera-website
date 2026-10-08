import { getPayload } from "payload";
import config from "../src/payload.config";

const payload = await getPayload({ config });
const contact = await payload.findGlobal({ slug: "contact-page", depth: 0, draft: false });
const labels = { ...contact.inquiryLabels };
const oldDefaults = {
  ready: "Your inquiry draft is ready. Open it in your email app and send it to complete the inquiry.",
  help: "Complete the form to prepare a project inquiry in your email app. Nothing is sent until you review and send the message.",
};
const defaults = {
  ready: "Your inquiry has been sent. A copy is on its way to your email address.",
  help: "Send your project brief directly to ETÉRA. You will receive a copy by email.",
  sending: "Sending inquiry…",
  sendError: "Your inquiry could not be sent. Please try again or email us directly.",
  rateLimitError: "Too many attempts. Please wait a few minutes before trying again, or email us directly.",
  verificationError: "Please complete the security check before sending. If it does not load, try again or email us directly.",
};
let changed = false;
for (const [key, value] of Object.entries(defaults)) {
  const field = key as keyof typeof defaults;
  if (!labels[field] || (field in oldDefaults && labels[field] === oldDefaults[field as keyof typeof oldDefaults])) {
    labels[field] = value;
    changed = true;
  }
}
if (changed) {
  await payload.updateGlobal({
    slug: "contact-page",
    data: { inquiryLabels: labels, _status: "published" },
  });
}
console.log("Direct inquiry labels initialized; custom editor copy retained.");
process.exit(0);
