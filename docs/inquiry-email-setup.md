# Direct enquiry emails

The Contact form sends via the server-only `/api/inquiry` endpoint to `hello@eteracreative.com`, CCs the visitor, and BCCs `ystoyanova@eteracreative.com` and `adjurdjevic@eteracreative.com`. Sender is `ETÉRA <hello@eteracreative.com>` on the verified Resend domain. Reply-To is the visitor so staff replies reach them; the visitor receipt links explicitly to the ETÉRA mailbox. Recipient routing is fixed in server code, not controlled by visitor input or a public CMS setting.

The shared receipt uses the approved PNG logo, cream/red/black palette, a responsive table layout and a plain-text alternative. Avenir loads where supported; other email clients use Avenir/Helvetica/Arial fallbacks. Image-blocking clients show logo alt text. No email addresses in BCC appear in the message content.

## Configuration

- Store RESEND_API_KEY and TURNSTILE_SECRET_KEY as Cloudflare Worker secrets. Never put them in public environment variables, CMS records or Git.
- TURNSTILE_SITE_KEY is public in Wrangler vars. The widget is managed, action `inquiry`, allowing etera.trakiyski.work, eteracreative.com and www.eteracreative.com. No localhost allowed on the production widget.
- INQUIRY_LIMITER allows five attempts per minute per IP and per hashed visitor email at each Cloudflare location. These are protective local limits, not a globally exact quota.
- Server requires same-origin JSON, a blank honeypot, a UUID request ID, allowed CMS service choices, valid bounded fields and a successful hostname/action-matched Turnstile verification. Max body is 16 KiB.
- Retry uses the same Resend idempotency key while fields are unchanged. Editing any field creates a new submission ID. Resend acceptance drives success; rejection/timeouts retain the form and show retry/direct-email options.

## Editing and development

Contact Page → Inquiry Labels controls instructions, submit/sending/success/error/security/rate-limit text. The old Open Draft label is retained hidden for compatibility. `scripts/seed-inquiry-email-copy.ts` replaces only old mailto instructions and initializes missing new labels.

Use ignored `.dev.vars` locally, a temporary Wrangler config with D1/R2 remote disabled, and Cloudflare's official Turnstile test keys for local browser tests. Never use the production Resend key to send incidental browser test data; intercept browser requests or mock provider calls. Real production tests must clearly identify themselves as website tests.

Enquiries are not stored as CMS records and are not added to a marketing list. Cloudflare logs include provider status/message ID only, not the key or enquiry content. Resend acceptance does not prove every mailbox received the message; inspect Resend events and mailbox inbox/spam when diagnosing delivery.
