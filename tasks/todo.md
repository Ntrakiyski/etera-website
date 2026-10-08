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
- [ ] Push main, deploy and verify live policies; prepare updated email.
