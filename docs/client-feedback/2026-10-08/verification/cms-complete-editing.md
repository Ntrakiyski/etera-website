# CMS editing coverage, 8 October 2026

## Scope

Corrected the reversed approved founder portraits. Filled hardcoded copy/media gaps on Home, Atelier, Contact, shared header/footer and all three legal pages. Services names/summaries/details and page copy already used CMS controls. Added MP4/WebM uploads for the Home background video. Existing layouts and inquiry/booking behaviour retained.

## Evidence

- Logged-in editor Local API tests saved and read all six page/settings globals, verified public helpers return edited Home/Atelier/Contact/footer text, and rejected anonymous global writes. Saved drafts stayed invisible in published reads.
- Local image upload and portrait relationship selection passed. The compiled Cloudflare Worker served selected image bytes correctly. Node Next's proxy-backed R2 file route returns 500 locally; Worker runtime serves the same files with 200, so browser verification used Wrangler's local Worker.
- Chrome editor login and all six admin screens passed. The three legal editors rendered the approved rich-text bodies. A Home heading was changed and published through the UI; the public page returned the edit. The original heading was restored.
- Browser checks at 1440/390px covered Home, Atelier, Services, Contact and all three policies: 200 responses, no horizontal overflow, corrected portrait bytes and equal image/text heights, every approved policy paragraph preserved.
- Eight runnable tests passed, including approved legal block → rich-text round trips, line breaks/lists and malformed fallback states. Lint, TypeScript and production OpenNext build passed.
- Migration `20261008_145106` adds six tables, 72 columns and 25 indexes. Applied to an exported production snapshot in SQLite and checked every pre-existing row/column unchanged plus foreign-key integrity. Remote migration succeeded after this proof.

## Migration and initialization

Generated SQLite table rebuilds were replaced with additive nullable upload columns to preserve parent/child rows. Rich-text bodies use JSON storage rather than large paragraph arrays, avoiding the D1 parameter limit discovered during testing. Existing published text remains intact; previously ignored legacy Home CTA/positioning defaults were aligned to the already-visible design. `scripts/seed-editable-pages.ts` initializes new arrays/legal documents and selects approved founder media only where no portrait was selected. It can be rerun without overwriting existing selections.

Reverting the application should keep the added CMS tables/columns; the down migration deliberately refuses to discard editor content. Database export remains outside Git.

## Limits

Verification used Chrome, not every browser. Editors manage copy and existing media placements; layout/colour/animation remain in code. Email remains a draft until Resend is configured. Work routes remain deferred. Use The Atelier Page → Team Members for visible founder cards; People is legacy/future content.

## Live release

Cloudflare version `b0ceaabe-7227-457c-b04d-84603041830c` deployed successfully. The same seven-page desktop/mobile browser checks passed on https://etera.trakiyski.work, including corrected R2 image byte checks and exact approved policy text.
