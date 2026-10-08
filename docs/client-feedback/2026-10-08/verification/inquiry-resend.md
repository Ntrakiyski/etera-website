# Direct enquiry delivery verification

Cloudflare version: `69486882-cc46-491d-a209-96bf603d665a`.

- Verified Resend domain eteracreative.com and DNS authentication status. Keys kept in ignored local environment and Worker secrets; absent from public build assets.
- Seventeen tests, lint and production OpenNext build including TypeScript passed. Backend tests cover fixed recipients, BCC privacy, escaping, allowed fields/services, invalid/cross-origin/oversized requests, missing configuration, rate-limit failures, Turnstile success/hostname/action checks, provider rejection/network failures and idempotency reuse.
- Local compiled Worker desktop1440/mobile390 browser flows passed required validation, test-widget callback, failure retention, unchanged retry UUID, success and double-submit prevention. Actual rate binding rejected excess attempts and origin mismatch without email sends.
- Eight nullable CMS copy columns added after production export snapshot proof: all old rows/columns and foreign keys preserved. Live migration record and new published labels checked.
- Automated isolated Chrome could not complete production Turnstile. Normal Chrome completed verification and submitted exactly one marked setup enquiry; visible success observed. Resend message `01a11c3b-47e7-7b33-8db6-b1e1922628be` reports `delivered`. Record confirmed TO hello@eteracreative.com, CC nikolay.trakiyski@gmail.com, BCC ystoyanova@eteracreative.com + adjurdjevic@eteracreative.com and visitor Reply-To.
- Actual sent HTML rendered at800/375px, PNG logo loaded and no overflow. Live endpoint rejects malformed and cross-origin requests.

Individual mailbox receipt/spam placement and actual Outlook/Gmail/Safari rendering were not inspected. Resend's aggregate delivery event is not proof of every recipient inbox. Email clients may use fallback fonts and block images.
