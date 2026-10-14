# Task Plan

## Goal
Implement the agreed meeting-feedback revision, run localhost, and verify desktop/mobile screenshots and interactions.

## Constraints
No production deployment or remote D1 changes. Keep current booking provider and email-draft inquiry flow. No invented legal copy, portfolio claims or final founder roles. Client portrait folder returned no accessible files through Drive; retain existing approved assets pending retrieval.

## Steps
- [x] Update shared palette/footer/navigation and hide public Work routes.
- [x] Simplify Home transition, improve video playback handling and restrained motion.
- [x] Improve Atelier framing/method heading/Services link.
- [x] Complete Services CMS editing and accessible inquiry validation, types and local migrations.
- [x] Run checks, localhost, browser interactions and desktop/mobile screenshots; fix findings.

## Verification
- [x] Lint, typecheck and runnable tests.
- [x] Local build, Cloudflare bundle and dry deployment where supported.
- [x] Four public pages, deferred Work, sitemap, navigation and form interactions.
- [x] Desktop/mobile screenshots reviewed; no overflow, missing fonts or framework overlays.
- [x] Local CMS fields and migration checked without remote data changes. See `docs/client-feedback/2026-10-08/verification/cms-inquiry.md`.
- [x] Playback/reduced motion checked; distinguish WebKit from real Safari.

## Review
Implemented the available meeting feedback: maroon/milk palette and contextual logos, compact red footer, hidden Work routes/navigation/sitemap, lighter Home transition, playback fallback, mobile entry motion, Atelier framing/Method/Services link, editable Services copy and accessible inquiry validation. Existing email-draft and booking behaviour retained.

Verification: lint, TypeScript, six runnable tests, production Next/OpenNext build and Wrangler deployment dry run passed. Final localhost production-browser QA passed 16 page/viewport cases across four pages at 1440, 768, 390 and 320 px, with no horizontal overflow or console errors. Checked navigation, accordions, inline errors, first-invalid focus, whitespace rejection, optional company, multi-service email draft, hidden Work, sitemap, reduced motion and blocked-playback fallback. Local CMS editor permissions/save/publish and migration verified without remote changes. Final desktop/mobile screenshots visually reviewed.

Local app remains running at http://localhost:3000. Screenshot evidence and executable QA script: `/Users/nikolaytrakiyski/.codex/visualizations/2026/10/08/01a11adc-4abf-7a33-8c76-03bad820c692/etera-review/`.

Limitations: real desktop Safari rejects automatic playback in the current browser context; native Play button was clicked and advancing playback verified (`paused:false`, time >7 seconds). Chromium autoplay and reduced-motion pause passed. No real iPhone verification. Restricted Drive portraits, approved legal copy/final founder roles and booking-provider choice remain client inputs. Production has not been deployed or changed. Cloudflare dry run reports existing generated-library bundling warnings but exits successfully.

## Hero overlay follow-up

Changed the Home video overlay from maroon to black at 30% opacity, per the latest request. Verified computed rgba(0,0,0,0.3) on localhost and reviewed the desktop screenshot. git diff --check passed. Localhost now runs the dev server to show the update. No deployment.

## Hero alignment follow-up

Goal: vertically centre page-hero content like the supplied Atelier reference, preserve left-aligned columns, and remove the Home title glow.

- [x] Update shared hero positioning and title shadow.
- [x] Check three inner-page heroes on desktop/mobile and Home title; review screenshots.

Review: Shared page heroes now centre their content vertically within the viewport below the header, retaining the reference’s left-aligned columns and bottom-aligned intro. Removed Home title text-shadow. Six inner-page viewport checks passed at 1440/390 px, without horizontal overflow; Home title computed shadow is none. Desktop/mobile Contact screenshots reviewed. git diff --check passed.

## Footer reference revision

Goal: match supplied reference with ETÉRA fonts/maroon, existing public navigation/social contacts and bottom legal links. No invented contact details or legal terms.
- [x] Replace footer layout with large navigation and right-side social/contact column.
- [x] Add Terms and Conditions / Privacy Policy pages awaiting client copy, excluded from indexing.
- [x] Verify links, desktop/mobile screenshots and code checks.

Review: Replaced CTA-led footer with centred ETÉRA brand, large page navigation, right-column social/contact links, and bottom copyright/Terms/Privacy links. Preserved existing contact/social destinations and hidden Work. Legal routes return 200 and explicitly await approved content with noindex; omitted from sitemap until content is supplied. Lint/typecheck and git diff --check passed. Browser checks passed at 1440/390/320 px without horizontal overflow; desktop/mobile screenshots visually reviewed. Email integration deferred as requested. No deployment.

## Footer CTA refinement

Removed the centred footer logo and restored the large two-line “Let’s Define Your Era Together” CTA above directory navigation, socials/contact and legal links. Verified CTA destination /contact#inquiry, no footer image, and no overflow at 1440/390/320 px. Desktop screenshot reviewed; lint/typecheck/diff checks passed.

## Method wordmark and footer sizing

Cloned red SVG into logo-etera-red-wordmark.svg, retaining only ETÉRA paths and adjusting viewBox. Used only in Atelier Method; original brand logos untouched. Reduced footer CTA font size and matched its left inset to navigation. Desktop/mobile browser geometry confirms matching left edges, correct isolated asset and no overflow. Screenshots reviewed; lint and diff checks passed.

## Footer column alignment

Matched CTA and navigation grid column widths/gaps so Start a Project and socials share the same left edge. Grouped copyright, Terms and Privacy on the left with 2rem gaps. Browser geometry checks passed at 1440/768/390 px, with no overflow; desktop screenshot reviewed and diff check passed.

## Footer colour refinement

Changed footer background to pure black, retaining cream-white #f9f4f4 text and CTA heading per latest request. Browser computed-style check and git diff --check passed. Local only.

## Separate CTA and footer colours

Restored full-width maroon CTA band above the black footer directory, retaining cream typography and matched left/right columns. Browser checks passed at 1440/390 px for maroon full-width band, alignment and no overflow. Lint/diff checks passed.

## CTA vertical positioning

Centred the CTA grid content vertically within the maroon band, retaining left/right columns. Browser geometry confirms heading midpoint matches band midpoint within 2 px; diff check passed.

## Full-height navigation footer

Made only the black navigation footer min-height 100svh, distributing navigation and legal row vertically for more breathing room. Red CTA sizing retained. Browser checks confirm footer at least viewport height at desktop/mobile and no horizontal overflow; diff check passed.

## Hide navigation at black footer

IntersectionObserver hides the top header while the black navigation footer is visible, restores it above, and makes hidden header inert. An already-open mobile menu stays accessible. Verified hide/inert/restore at 1440/390 px; lint/typecheck and diff checks passed.

## Correct header hide threshold

Root cause: any intersection hid the header when a tiny part of the black footer reached the viewport bottom, while the red CTA was still visible. Changed threshold to black footer top <= viewport top. Desktop/mobile checks cover partial footer, boundary crossing and reverse scroll; lint/diff checks passed.

## Black footer scroll overlay

Goal: black footer slides over the red CTA using native sticky positioning. Preserve accessible navigation, mobile layout and reduced-motion behaviour.
- [x] Pin red CTA beneath black footer during scroll.
- [x] Verify overlap, header visibility, reverse scroll, mobile and reduced motion.

Review: Native sticky red CTA stays in place while the black navigation band slides over it on a higher layer. Reduced motion uses normal scrolling. Browser geometry/hit testing confirmed overlap on 1440/390 px; header hide at bottom and restoration above, no overflow and reduced-motion behaviour verified. Screenshot reviewed; lint/diff checks passed.

## Footer content vertical alignment

Centred navigation/social/contact block within black footer; anchored legal links at bottom with mobile clearance. Browser geometry verified desktop centering and no legal overlap on desktop/mobile; diff check passed.

## Production release

Goal: commit all approved application changes to main and publish to the existing Cloudflare Worker.
Constraints: no invented client content, no email sending integration, no secret files committed. Apply only additive CMS migration; preserve existing records.
- [x] Verify tests/build and migration state.
- [x] Commit and push main.
- [x] Deploy tested Worker (additive production CMS migration applied and verified).
- [x] Verify live routes, final footer and GitHub checks.

Release correction: first deployment failed Home with No such module wrangler. Restored prior live Worker, added runtime guard using WebSocketPair, rebuilt with production site URL, and verified compiled Worker Home returns 200 locally. Publishing corrected build next.

Production review: Application release 7f9dfd8 is live at https://etera.trakiyski.work, Cloudflare Worker version d91ebfa3-b31f-43e5-8d06-9c8121993971. Additive migration recorded in production and default values verified. GitHub checks passed for application release. Live browser checks passed 16 page/viewport combinations, inline form validation/email draft, navigation, accordion, reduced motion, hidden Work/sitemap and no console errors. Legal pages return 200/noindex; live red CTA and black footer, header hide, and final screenshot verified. Autoplay-block simulation adjusted to block native as well as scripted playback and fallback passed separately. Lint, tests, types, build and dry deploy passed. Generated Wrangler local artifacts now excluded from lint. Direct sending remains deferred; legal content and restricted portraits remain client inputs. Localhost production server remains available.

## Remove autoplay fallback control

Removed the visible Play background video button at user request. Retained autoplay and static poster when playback is blocked. Verify source/build, publish to main and Cloudflare, then check live DOM.

Review: Button removal pushed to main (585271a) and deployed as Worker ada55264-7264-4e5f-9a28-40f710adb896. Lint/build/types passed. Live Home returns 200; browser confirmed no fallback button in normal and forced-blocked playback, with poster retained.

## Publish supplied policies

Goal: publish three client-supplied Word documents as readable website pages, deploy, and update singular-address Bulgarian email. Preserve legal wording rather than interpret or rewrite it. Safari email paragraph removed per user; iPhone playback reported working, desktop issue remains outside this task.
- [x] Extract paragraphs, line breaks and lists from all documents.
- [x] Populate Terms/Privacy, add Cookie Policy and footer/sitemap links.
- [x] Verify text fidelity, responsive pages and build.
- [x] Push main, deploy and verify live policies; prepare updated email.

Review: Three policy pages published on Cloudflare from b3c3b1a. All extracted text matches Word sources; six local and six live page/viewport checks passed for complete text, links and no overflow. Desktop/mobile screenshots reviewed. Lint/build/TypeScript passed. Legal links added to footer/related navigation/sitemap. Client email updated in singular Bulgarian, legal documents removed from outstanding inputs and Safari paragraph omitted as requested.

## Founder profile photos

Goal: Show supplied founder portraits as compact, face-focused profile photos and reflect planned Resend setup in client wording.
Constraints: Preserve original photos and CMS portrait overrides; no email sending until Resend account/domain credentials are available.
- [x] Add optimized portraits and compact face crops.
- [x] Verify desktop/mobile rendering, build and deploy.
- [x] Update client wording and record evidence.

Review: Added two optimized JPEG portraits with 160px circular face crops, retaining CMS portrait overrides. Local and live 1440/390px checks confirm both images loaded, dimensions and no horizontal overflow; screenshots reviewed. Lint, production Cloudflare build and diff check passed. Deployed Worker version 5a08e3a9-f4dc-441a-ab5f-86919cb74a0d. Client wording now includes portraits and planned Resend domain setup; no credentials or email integration changed.

## Rectangular portrait refinement

Goal: Taller compact rectangles with looser head framing.
- [x] Adjust shared portrait CSS and visually check desktop/mobile.
- [x] Build, publish and verify live photos.

Review: Portraits now use 160×240px rectangles and 1.25× zoom instead of circles and 1.65× zoom. Both full heads are visible in reviewed desktop/mobile screenshots. Lint, TypeScript production build and diff check passed; Cloudflare deployment and live geometry/image-load checks passed at 1440/390px. Original photos and CMS overrides preserved.

## Portrait beside biography

Goal: Place each profile image beside its text with equal rendered heights.
- [x] Adjust card layout and responsive typography without changing CMS content.
- [x] Review desktop/mobile screenshots and check image/text geometry.
- [x] Build, publish and verify live layout.

Review: Each portrait now sits beside its biography in a shared-height grid row. Cards become one column below 1100px, retaining portrait/text pairs; mobile uses compact typography and 110px image width. Local and live 1440/390px assertions verify equal top/height, side-by-side placement, loaded images and no horizontal overflow. Screenshots reviewed; lint, production build and diff check passed. Cloudflare published; CMS text and portrait overrides retained.

## Correct portrait identity and complete CMS editing

Goal: Correct reversed founder photos and let logged-in editors update public page copy and existing image/video slots, including legal pages, navigation and footer.
Constraints: Preserve current published copy, layout, CMS records and approved policies. No email/booking provider change. Hidden portfolio routes remain deferred. Use additive migration and media upload overrides; verify authenticated save/publish locally before remote deployment.
- [x] Correct founder mapping and audit hardcoded public content.
- [x] Add and wire missing CMS controls for Home, Atelier, Contact, shared navigation/footer and legal pages.
- [x] Generate and check additive migration, seed current defaults and founder media without overwriting existing edits.
- [x] Verify CMS save/publish, image uploads, draft visibility, access control and desktop/mobile rendering.
- [x] Publish, check live pages and document editor instructions.

Verification adjustment: Payload's D1 version writer exceeded the 100-parameter limit when saving long legal block arrays. Use the existing rich-text editor with JSON storage for legal bodies instead. Generated migration table rebuilds also required correction; final migration will be tested against an exported production snapshot before applying remotely. No production schema changes have been made yet.

Review: Corrected Alexandra/Yoana portraits and initialized real Media selections. Added CMS controls for all visible content on seven public pages and their existing media slots, plus header/footer labels/logos and legal rich-text editors. Existing service content and team text remain editable. Eight tests, lint, typecheck and OpenNext build passed. Editor Local API and browser login/edit/publish passed; drafts stayed off published reads and anonymous writes were rejected. Additive schema verified against production snapshot before remote migration. Live 1440/390px checks passed for all seven pages, exact approved policy text, correctly served portrait bytes and matching profile heights. Published Cloudflare version b0ceaabe-7227-457c-b04d-84603041830c. Editor guide: docs/cms-editing-guide.md; full evidence: docs/client-feedback/2026-10-08/verification/cms-complete-editing.md. Layout remains code-managed; email/booking unchanged. Browser checks used Chrome.

## Dedicated SEO and social sharing settings

Goal: Add SEO & Social Sharing beside Site Settings, with site defaults and seven per-page search/social/indexing controls.
Constraints: Preserve existing metadata until editors change it; no keywords/ranking guarantees or new public layout. CMS must validate canonical URLs and protect editing. Draft SEO edits stay off published pages.
- [x] Add site/per-page controls and wire metadata, robots and sitemap.
- [x] Generate additive migration and preserve previous SEO defaults.
- [x] Verify save/publish, rendered metadata/image inheritance/indexing and CMS UI.
- [x] Deploy, verify live and document usage/limits.

Review: Added Settings → SEO & Social Sharing for all seven public pages. Published values drive search/social tags, canonical URLs, uploaded sharing images/site icon, Google verification, structured data, robots and sitemap. Existing defaults and editor data preserved with two additive tables; production snapshot checks found no changed existing rows. Eleven tests, lint, TypeScript and OpenNext build passed. Local authenticated save/publish, drafts, image selection, URL validation and anonymous-write checks passed. Live metadata, icons, robots/sitemap and public SEO values verified. Cloudflare Worker 4d72e9c1-19d5-4069-9de0-67d02929226c deployed. Guide: docs/seo-editing-guide.md. Actual Google/social platform previews were not checked and may cache or rewrite website metadata.

## Direct enquiry delivery with Resend

Goal: Submit the website form directly to hello@eteracreative.com, CC the visitor, and BCC ystoyanova@eteracreative.com and adjurdjevic@eteracreative.com.
Constraints: Resend API key stays in ignored local env/Cloudflare secrets. Use the verified eteracreative.com sender, fixed server-side recipients, server validation, bounded requests, abuse limits and duplicate-send protection. Preserve CMS copy controls and existing layout. Test emails are explicitly marked; no enquiry database or marketing subscription.
- [x] Verify Resend domain and Cloudflare access; configure server-side secret.
- [x] Implement validated delivery endpoint and replace mailto with sending/success/error states.
- [x] Update CMS form instructions and verify routing, validation, failures and duplicate protection.
- [x] Build, deploy, push main and verify a clearly marked live test email and responsive form.

Verification: Unit tests; lint/types/build; local browser success/error/validation; Resend accepted message/recipient details; live form/metadata checks. Mailbox arrival is distinct from API acceptance.

Template: responsive branded HTML with approved PNG logo, cream/red/black, website typography with email-safe fallbacks and complete plain-text alternative. Added managed Turnstile, five-attempt/minute per-location IP/address limits and fixed routing. Local desktop/mobile failure/retry/success flow and actual Worker rate binding passed. Additive copy migration verified against production snapshot; all existing rows preserved.

Review: Direct Resend delivery deployed as Worker 69486882-cc46-491d-a209-96bf603d665a. Verified domain/DKIM/SPF, secured keys in Cloudflare secrets and confirmed no key in public build assets. TO/CC/BCC/Reply-To exactly match requested routing. One marked enquiry submitted through real Chrome with production Turnstile; website confirmed success and Resend message 01a11c3b-47e7-7b33-8db6-b1e1922628be reports delivered. Seventeen tests, lint, TypeScript/OpenNext build, local desktop/mobile failure/retry/success, actual Worker rate binding, additive schema preservation and live malformed/cross-origin rejection checks passed. Actual sent HTML visually rendered at desktop/mobile with live PNG logo. Automated clean-profile Chrome could not complete real Turnstile, so verification used normal Chrome without bypassing protection. Inbox/spam placement for each recipient and Outlook/Gmail rendering were not independently checked. Email clients may substitute fonts/block external images. Enquiries remain out of the CMS; no marketing subscription. Guide: docs/inquiry-email-setup.md.

## 2026-10-12 feedback planning

Goal: Review all seven PDF pages, including screenshots and linked assets, reconcile requested changes with current code, and produce an implementation plan. Planning only; no application or production changes.
Constraints: Preserve approved desktop layout where mobile-only changes are requested. Do not invent founder roles or Method descriptions. Confirm Safari autoplay limits from primary documentation. Booking provider remains undecided; no subscriptions or account changes.
- [x] Extract PDF text and visually inspect all seven pages.
- [x] Map feedback to existing components, CMS controls and responsive rules.
- [x] Identify decisions, dependencies and acceptance checks; save detailed plan.
- [x] Explain proposed order, responsive independence and Safari limitations.
Verification: Every PDF request accounted for; exact Industry list preserved; screenshot-specific targets recorded; distinguish source review from device testing.

Review: Planning completed in docs/client-feedback/2026-10-12/implementation-plan.md. All seven PDF pages and embedded screenshots reviewed; CMS controls and responsive causes mapped; optional Industry preserved as 14 exact choices across form/email/server scope. Safari default asset already H.264/no audio; live range GET returned entire file with 200, an investigation lead only. Mobile team composition confirmed by user: both founders side by side with biographies below. Linked Drive assets, current booking costs and real iPhone behavior not verified. No application code or production changes.

Planning clarification, 12 October: User confirmed two founders side by side on mobile, with biographies underneath. Detailed plan updated; no implementation or deployment performed.

## 2026-10-12 implementation and release

Goal: Implement approved feedback, review screenshots/interactions, push main and deploy Cloudflare.
Constraints: Preserve CMS records, approved copy, founder identity, legal text, email routing and anti-abuse. Both founders side by side on mobile with bios below. Booking comparisons only until chosen; no paid account or actual bookings. No invented final roles or published Method descriptions. Keep new migrations additive and prove preservation before remote use.
- [x] Implement responsive layouts, interaction polish and CMS guidance.
- [x] Add Industry across form/server/emails and Method description controls/accordion.
- [x] Investigate referenced images (access blocked), improve video delivery and prepare booking comparisons.
- [x] Run tests/build, browser responsive checks and screenshot review; correct findings.
- [x] Commit/push main, deploy and verify production; record limitations.
Verification: test desktop/mobile and reduced motion; preserve all existing DB rows; check real Worker runtime and video range behavior; validate email payload without sending; verify CMS publication and previews. Actual iPhone testing requires available device access.

Implementation progress: responsive layout/CMS changes and Industry integration complete. Restricted Drive images retained; replacement access requested. Method copy proposed but not published; booking alternatives prepared without switching provider. 23 tests, lint, TypeScript, production build, 29 local browser cases and mocked form retry/success passed. Local editor draft/publication checks passed and values restored; additive migration preservation checked against production snapshot. Compiled Worker and final live checks in progress.

Review: Application commit 13d3f90 pushed to main and deployed as Cloudflare Worker 10aa1794-93df-4109-9d6a-df8103854ce7 at https://etera.trakiyski.work. Local and compiled Worker browser checks passed 29 cases each; live checks passed the same 29 cases plus nine legal page/viewport cases, footer/header boundaries, arrow and hover behavior. Live invalid inquiry returned 400 without sending mail. Tests (23), lint, types, build, schema preservation and local CMS editor save/draft/publication passed. Remote migration name and Industry default explicitly verified. Updated Cloudflare-generated types after CI detected stale module metadata; CI verification recorded in the release document.

Limitations: replacement Drive images inaccessible; Method descriptions/final roles need approved copy; booking provider/account still undecided. Safari transport and Chromium playback verified, but real iPhone autoplay not proven and desktop Safari did not auto-advance in this environment. Mac lock blocked real tap verification. Existing approved assets/roles retained, no unapproved Method copy published and no real enquiry sent. Booking comparison and editor guide are in docs/client-feedback/2026-10-12/.

## 2026-10-12 approved follow-up

Goal: Publish approved editable Method descriptions, retrieve newly shared replacement images, and repeat real Safari verification after unlock.
Constraints: Preserve existing custom CMS copy and asset identity; inspect both images before assigning slots. No guessed founder roles or booking provider switch. Do not change Drive sharing or Safari preferences.
- [x] Verify Drive access and inspect replacement images.
- [x] Publish approved Method descriptions through existing CMS and verify public expansion.
- [x] Apply supplied replacement asset to the intended image slot and review desktop/mobile crops.
- [x] Repeat native Safari loading/autoplay/tap verification.
- [x] Push any necessary code/docs, verify production and record limitations.
Verification: CMS readback and live DOM, responsive screenshots, real Safari evidence, unchanged unrequested page content.

Review: Supplied color and monochrome moodboard JPEGs optimized without changing the originals; both available in CMS Media, with color published in the Home introduction only. Four exact approved Method descriptions published and editable. Fixed intrinsic image sizing so desktop photo height follows the adjacent text; mobile retains 3:2 with both faces visible. Local and live Home/Method checks passed at 320/390/768/1440px, including equal desktop columns, mobile ratio, loaded image, no overflow and pointer/keyboard expansion. Native Safari Method keyboard expansion also verified. Lint/types, 23 tests, OpenNext build and clean-output Cloudflare type check passed. Worker a4100d25-46c5-42fc-a727-c3555f0b6341 deployed; production CMS readback verified.

Native desktop Safari's fresh autoplay request rejected with NotAllowedError despite muted/readyState 4/visible; real hero tap started playback (10.508s verified). Preferences read but unchanged. Real iPhone remains unverified. Founder roles and booking choice remain outstanding; Drive/image and Method-copy blockers are resolved.

## 2026-10-14 email-to-live-site audit

Goal: Read Alexandra's latest Gmail feedback and its PDF, compare each request against the live site, and report completed work and real remaining gaps.
Constraints: Read-only Gmail and production inspection; do not send or draft an email, publish content, or alter client settings. Distinguish client requests from later user-authorized design changes. No blanket completion claim without current evidence.
- [x] Read source emails and attachment.
- [x] Map every request to current public/CMS behavior and earlier approvals.
- [x] Check live desktop/mobile pages and key interactions.
- [x] Save an evidence-based audit and report remaining items.
Verification: actual email and PDF contents; fresh live checks; screenshots where visual evidence matters; no outbound email or production writes.

Review: Read Alexandra's latest 12 October Gmail email/PDF and prior 6/8/9 October messages. Gmail attachment SHA-256 matches the existing PDF; all seven pages and screenshots reviewed. Fresh live checks passed 28 page/viewport cases at 320/390/768/1440px plus Method, hover, image/team/CTA/colors/font, optional Industry and validation checks. Zero enquiry requests, no outbound email, no CMS/production changes. Detailed audit: docs/client-feedback/2026-10-14/email-audit.md.

Conclusion: implementable PDF changes are delivered, but cannot confirm every request fully closed. Real iPhone Safari autoplay unverified; current booking is Google Calendar with vendor choice/integration pending; roles remain CEO2/CEO. Black footer follows user's later decision rather than original red-footer request. Missing Element photo can be changed in CMS, but no new story-specific image was selected. No application changes or deployment performed in this audit.

## 2026-10-14 confirmed remaining scope

- [x] Safari playback confirmed working by Alexandra, relayed by Nikolay. No further Safari fix required.
- [x] Black footer explicitly confirmed to stay.
- [x] Cal.com selected; Nikolay will create the account.
- [x] Integrate the supplied Cal.com first-meeting event (30 minutes, Google Meet; visitor timezone shown).
- [ ] Apply approved final founder titles when provided.

Review: Status updated from direct user confirmation. No application, production or Gmail changes made.

## 2026-10-14 Cal.com integration

Goal: Replace the current Contact calendar with the supplied Cal.com first-meeting event and add a secondary booking CTA using ETÉRA red/cream styling.
Constraints: Preserve primary enquiry flow, black footer and approved content. Use existing editable booking URL/labels; no real appointment, email, paid account or preference change during verification. Existing unrelated audit docs remain intact.
- [x] Integrate official React embed and modal trigger with shared red/light configuration.
- [x] Wire Contact inline calendar and secondary CTAs through existing CMS settings.
- [x] Verify actual embed, modal open/close, colors and mobile/desktop without booking.
- [x] Run CI checks/build, publish to main/Cloudflare and update the CMS booking URL.
- [x] Check live behavior and record evidence/limits.
Verification: authentic Cal.com event loads, visible red controls, primary CTA preserved, no overflow, keyboard close/focus return, no booking submitted.

Cal verification re-plan: three adapter attempts failed to observe the modal after interacting with inline booking. Stop broad retries. The doubtful assumption is that this is only iframe-navigation timing. Inspect SDK readiness, current URL and modal host before/after the failing click in a focused desktop case; fix the actual cause or the proven test issue, then rerun the acceptance flow.


Review: Official @calcom/embed-react 1.5.3 now renders the supplied first-meeting event inline on Contact and in a modal from secondary Book a Call CTAs on Contact and the shared red CTA. Red/cream widget theme and stronger cream primary enquiry action verified. Existing black footer, enquiry/email flow and CMS copy preserved; Booking URL updated locally and remotely with readback. URL and button label remain editable through existing settings/Contact fields. Direct public event link remains available when the SDK is blocked.

Verification: 25 tests, lint, TypeScript, OpenNext build, clean-output Cloudflare type check and diff whitespace check passed. Live real event/modal/inline checks passed at 320/390/768/1440px, no page/iframe horizontal overflow, Escape and focus return, shared Home CTA and red/cream values. Final screenshots reviewed after Cal hydration/fade completion. Final Worker: 37c2aed5-6b4c-4660-b8cc-3c6ceaad0b18. Publish to main and GitHub CI tracked with this release.

Limits: No real reservation or enquiry submitted; Cal calendar creation, delivery notifications and actual iPhone Safari booking were not tested. Event settings and availability belong to the Cal.com account. Founder title follow-up remains separate.

## 2026-10-14 Contact hero simplification

Goal: Remove redundant enquiry/booking hero buttons only from Contact.
Constraints: Preserve inline calendar, enquiry form, shared booking CTA and all colors/settings.
- [x] Restore introduction-only Contact hero; remove unused imports and scoped styles.
- [x] Verify lint/types/build and publish to main/Cloudflare.
- [x] Check live desktop/mobile hero and retained lower sections.

Verification: Hero has no action links; calendar/form and shared secondary booking action remain.

Review: Removed only the Contact hero action row and unused imports/styles. Lint, TypeScript and OpenNext production build passed. Published Worker 10864566-d9a4-4dfa-8095-bbcf22176fa0; live checks at 390/1440px confirmed zero hero buttons, calendar/form/shared booking CTA retained and no horizontal overflow. Screenshot reviewed. No CMS change, appointment or email sent.
