# ETÉRA Website Review — Implementation Brief

This is the implementation handoff for the client review recorded on 1 September 2026. Read `continue.md` first, then `decisions-and-inputs.md`. The screenshot set is evidence of the reviewed draft, not a pixel-perfect target.

## Source-of-truth rule

Before changing public UI, reconcile confirmed feedback with `PRODUCT.md`, `DESIGN.md`, `design/tokens.css`, `design/tokens.json`, and `design/page-briefs.md`. Those files currently preserve powder/midnight blue and launch sections that the meeting removed or deferred. Do not let the old documents silently override the newer client decision.

## Execution order

1. Confirm whether Ioanna's consolidated review is available and update the decision log with any deltas.
2. Update durable product/design documentation and tokens for confirmed decisions.
3. Implement shared colours, typography, links/buttons, header, and reusable CTA/footer.
4. Implement page changes in the order Home → Work visibility → Atelier → Services → Contact/CMS.
5. Run accessibility/responsive checks, `npm run lint`, `npm run typecheck`, `npm test`, and `PAYLOAD_CLOUDFLARE_LOCAL=1 npm run build`.

## Repository-aware work map

| ID | Change | Primary code | Evidence |
|---|---|---|---|
| G1 | Remove public blue treatments; use maroon `#741018`, milk `#f9f4f4`, graphite `#191818`. | `src/app/globals.css`, design tokens/docs | [Home](screenshots/01-home-hero.jpg) |
| G2 | Fix brand fonts, oversized line breaks, and sections mixing too many type treatments. | `src/app/globals.css`, all page heroes | [Home](screenshots/01-home-hero.jpg), [Work](screenshots/06-work-page.jpg) |
| G3 | Standardize primary/secondary actions and hover/pointer behaviour. | `src/components/EditorialLink.tsx`, `src/components/SiteHeader.tsx`, shared CSS | [Home](screenshots/01-home-hero.jpg) |
| H1 | Align hero media/grid, remove unnecessary study/source labels, and keep useful scroll guidance. Final media remains client-supplied. | `src/app/(frontend)/page.tsx`, `src/components/AetherMedia.tsx`, `src/globals/HomePage.ts` | [Home](screenshots/01-home-hero.jpg) |
| H2 | Omit Selected Work entirely when no launch-ready projects exist; later limit Home to 1–3. | Home page plus `src/lib/content-readiness.ts` | [Selected Work](screenshots/02-home-selected-work.jpg) |
| H3 | Remove Home's `MethodSequence`; keep What We Do with one Explore Services action and the agreed red/milk treatment. | Home page, `src/components/ServiceIndex.tsx`, shared CSS | [Services preview](screenshots/03-home-services.jpg) |
| H4 | Omit Selected Partners when none are launch-ready; retain Payload support. | Home page plus `src/lib/content-readiness.ts` | [Partners](screenshots/04-home-selected-partners.jpg) |
| S1 | Replace duplicate Home CTA + current footer signature with one reusable red CTA/footer pattern; remove duplicate email/action content. | `src/components/SiteFooter.tsx`, Home page, page-close sections, CSS | [Footer](screenshots/05-shared-footer.jpg) |
| W1 | Hide Work navigation/route until projects are launch-ready. Reuse readiness logic rather than adding an unrelated flag system. | `src/components/SiteHeader.tsx`, `src/app/(frontend)/work/page.tsx`, `src/lib/content-readiness.ts` | [Work](screenshots/06-work-page.jpg) |
| A1 | Replace placeholder narrative/media; show only approved founder profiles; remove low-value extra rows. | Atelier page, `src/globals/AtelierPage.ts`, `src/collections/People.ts` | [Atelier](screenshots/07-atelier-team.jpg) |
| A2 | Keep Discover / Define / Create / Elevate on Atelier, remove redundant framing if confirmed, and apply final type/colour rules. | Atelier page, `src/components/MethodSequence.tsx` | [Method](screenshots/08-atelier-method.jpg) |
| V1 | Replace generated headline/copy and add enough substance before individual service deep links are introduced. | Services page, `src/globals/ServicesPage.ts`, `src/collections/Services.ts` | [Services](screenshots/09-services.jpg) |
| C1 | Replace the opening copy, remove Direct Contact, and render the configured booking path before the inquiry form. | Contact page, `src/globals/ContactPage.ts`, `src/globals/SiteSettings.ts` | [Contact](screenshots/10-contact.jpg) |
| C2 | Change service choice to accessible multi-select; rename Company / Brand to Company Name; preserve optional Budget and Additional Information. | `src/components/InquiryForm.tsx` and its draft/mail output | [Contact form](screenshots/10-contact.jpg) |

## Acceptance checks

- No powder or midnight blue remains in public page presentation unless the client explicitly reverses the decision.
- Empty Work/Selected Work/Selected Partners content is omitted rather than replaced by client-facing validation placeholders.
- Navigation contains no dead or intentionally hidden launch route.
- Every CTA reaches the intended Contact/booking/inquiry flow with keyboard-visible focus.
- All CMS-backed text/media changes preserve safe defaults and existing access controls.
- Desktop, tablet, and mobile views retain deliberate typography without one-word-per-line headline stacking.

## Scope boundary

Do not invent copy, assets, project claims, partner approval, team membership, booking provider, analytics, GDPR tooling, or form-delivery infrastructure. Implement only confirmed material, retain accessibility basics, and document any verification that cannot be completed locally.
