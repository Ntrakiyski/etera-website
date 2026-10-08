# Latest meeting feedback: implementation plan

Prepared 8 October 2026. Sources: supplied Bulgarian meeting follow-up from Ali and the subsequently supplied meeting transcript; neither file supplies a meeting timestamp. The transcript contains recognition errors, so clear decisions are retained and ambiguous wording is flagged. This is a plan, not an implementation or deployment record.

## Outcome
Bring the existing site into line with the latest review: maroon and milk only in public interface treatments, no public Work section, a shorter Home transition without the monogram, improved media framing and mobile motion, fully editable Services content, and clear inquiry errors.

The latest feedback overrides the September documents that permitted graphite, restored review Work cards, and introduced the Home monogram. Preserve the founder/photo section, positioning statement, four method steps, and existing form field rules.

## Evidence and limits

- Local checkout is main tracking origin/main for Ntrakiyski/etera-website.
- Live Home returned HTTP 200 on 8 October; its HTML includes Selected Work, the monogram asset, and hero video, consistent with the inspected source.
- Source and SVG review confirms brand values #741018 and #f9f4f4. The white logo asset already uses #f9f4f4. Avenir Next Regular, Demi and Bold are bundled and configured globally.
- No visual browser review, authenticated CMS inspection, Safari reproduction, video codec inspection, or production performance trace has been completed. These are implementation verification tasks, not established root causes.
- Exact live deployment commit parity is not yet verified. The linked Google Drive folder has not been inspected; portrait availability and usage approval still need checking.

## 1. Shared brand, footer and Work visibility

### Current state
`src/app/globals.css` still uses #191818 for foregrounds, sections, borders and video overlay. The shared footer has a red CTA but a black details area. Work links are hardcoded in both header and footer. Home fills three review cards and Work fills six, even without approved projects. The sitemap includes Work and project URLs.

### Changes
- Reconcile PRODUCT.md, DESIGN.md, design tokens and the September decision records with the latest feedback before editing presentation.
- Use maroon on milk and milk on maroon for the public interface; revise muted text, borders, hover/focus states and hero overlay intentionally. Do not simply alias every black token to red without reviewing contrast and image treatment.
- Use the existing red logo on milk backgrounds and milk-white logo on maroon backgrounds, including navigation and footer. Verify all displayed variants and avoid pure-white or black substitutions. Navigation text must match the milk-white logo on dark backgrounds.
- Make the entire shared footer red; align copyright at the bottom alongside the contact area, rather than high in its column. Arrange the four existing social links in a balanced two-by-two layout where appropriate; avoid the current three-plus-one wrap. Review logo whitespace and section padding visually.
- Reduce mobile closing CTA spacing. Its current mobile rules use min-height: 38rem, space-between and a 4rem gap, which plausibly explains the reported empty area; validate visually before choosing final spacing.
- Remove Selected Work from Home and Work from header/footer. Hide the archive and case-study routes from public access while deferred and remove those URLs from sitemap/discovery. Keep projects and media in Payload for future approved portfolio work.
- Keep Selected Partners hidden when no approved partners exist; this is already supported and is not a request to remove approved content.

### Files
`src/app/globals.css`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/app/(frontend)/page.tsx`, Work routes, `src/app/sitemap.ts`, product/design documents. Reuse existing readiness logic where appropriate; do not allow merely adding a project to silently reverse the deliberate portfolio deferral.

### Acceptance
No black public interface treatment; correct milk logos; no Work links/cards/discovery URLs; deferred Work URLs cannot expose review previews or case studies. Footer remains readable, balanced, keyboard-accessible and compact on mobile.

## 2. Home transition, Safari playback and restrained mobile motion

### Current state
`HomeHeroSequence.tsx` implements a pinned scroll sequence with the monogram and delayed positioning statement. It measures several elements and writes CSS variables during scroll. `HeroVideo.tsx` already sets autoplay, muted, playsInline and loop, but discards play() rejection. Reduced motion intentionally pauses playback.

### Changes
- Remove the monogram and its timing/ref/CSS dependencies. Transition directly from the hero to “We are a creative atelier that builds presence and shapes culture.” Preserve the founders section and “Strategy, creativity and attention to every detail.”
- Profile the current hero on mobile and desktop before attributing lag to one cause. Restore usable Home navigation after the transition instead of leaving it faded out, using the correct logo/text contrast for the background. Simplify scroll timing; eliminate obsolete stages and unnecessary geometry reads, and stop scheduling hero work after it leaves the relevant range.
- Inspect video size, codecs, loading behavior and HTTP delivery. Reproduce playback in real desktop Safari and iPhone Safari, including a fresh page load. Diagnose the rejected playback path rather than adding autoplay attributes that already exist.
- Preserve a useful poster when playback is blocked. Respect reduced motion and platform playback restrictions; autoplay cannot be guaranteed in every device mode.
- Add subtle on-entry motion for selected content, images and method steps on mobile. Prefer existing CSS and a small IntersectionObserver only if scroll-triggered entry needs it. Use transform/opacity, avoid extra animation libraries and additional scroll pinning.

### Acceptance
No monogram; statement appears directly after hero; smooth representative device scroll; normal Safari conditions autoplay where allowed; blocked playback retains a readable hero; reduced-motion layout remains complete and usable. Compare traces before/after rather than claiming a performance fix from source alone.

## 3. Atelier imagery, method heading and Services link

### Current state
Two founder profiles and CMS portrait upload fields already exist. Portraits use a 4:5 cover crop with no individual focal positioning. AetherMedia uses fixed local images. The method heading is plain “ETÉRA Method”, the four steps already exist, and no Services link follows the method.

### Changes
- Inspect/download the approved individual portraits from the supplied Drive folder when access is available; compare with existing CMS assets to avoid duplicate uploads. Use existing portrait fields and keep the two founders.
- Audit meaningful framing for Home/Atelier photos at mobile, tablet and desktop. Align the Atelier “The missing element” photo with the adjacent text, as explicitly requested in the meeting. Adjust aspect ratio and object-position per image where sufficient; add editable focal control only if CMS editors need it. Do not force all imagery into one universal crop.
- Replace the ETÉRA text portion of the method heading with the appropriate existing logo. Keep “Method” as text beneath the logo, following the transcript clarification, and preserve an accessible heading name.
- Add a clear Services link beneath the method. Keep Discover, Define, Create, Elevate and apply the new palette.
- Keep founder role text editable; current titles may be trial content. The client will settle the final roles, so do not infer CEO or Managing Partner titles from the transcript. Verify computed Avenir Next usage and successful font loading across public pages and form controls; a global declaration alone does not prove every rendered element uses it.

### Acceptance
Approved individual portraits, faces and important framing preserved at representative widths, accessible logo heading, working Services link, four unchanged method steps, Avenir Next rendering verified.

## 4. Services editing and inquiry validation

### Current state
Services hero fields and service names/summaries are editable. The capabilities label, heading and body are hardcoded, category display labels are fixed, and the Services collection's rich-text details field is not rendered on the page. Inquiry uses native required/email checks and a custom service error. Full Name, Email and project description are required; Company, Budget and Additional Information are optional; multi-select works. Company lacks an explicit optional label. Whitespace-only required text can pass native checks.

### Changes
- Map every visible Services text to an existing Payload field or a minimal addition. Include capabilities copy and group display labels; connect rich-text details to visible content if retained, so editors do not edit an invisible field. Preserve stable grouping keys, ordering, defaults and access controls.
- Update CMS types/read helpers and add the required D1 migration for schema changes. Verify editing, saving and public rendering as an actual client editor, including empty optional fields and existing content.
- Review service subtitle consistency, particularly Experiences & Partnerships (04). `ServiceIndex.tsx` deliberately suppresses a subtitle when its name equals the group title; the meeting identifies duplicate content rather than conclusively identifying a rendering bug. Let editors use distinct service names and verify consistent results before changing that guard. Expanded service copy remains client-supplied; do not invent it.
- Include client-editable inquiry labels/help text in the small CMS audit: the meeting specifically asks whether Company Name can be edited. Reuse Contact Page fields; keep validation rules in code. Label Company Name (if applicable), the transcript preference; the later email also accepts (optional). Preserve current required/optional fields, service multi-select, and Send Inquiry wording.
- Add clear field-level errors for missing/whitespace-only name and project details, malformed email and missing service selection. Show errors with text and styling, link them to fields, and focus the first invalid field. Keep native validation where useful, ensure custom messages are not bypassed by native submission blocking, and clear errors as fields are corrected.
- Preserve the existing email-draft flow unless the client separately confirms direct delivery. Do not show a sent success state for a prepared draft. If direct submission is desired, scope delivery/storage and spam handling separately.

### Acceptance
Client can change all visible Services copy and see it on the page. Existing CMS content survives migration. Invalid form states are obvious without relying only on color, accessible by keyboard, and whitespace cannot satisfy required text. Optional fields can be empty and multiple services remain selectable. Include one focused runnable check for any new non-trivial validation logic.

## 5. Client inputs, verification and release

### Inputs to resolve
- Approved individual portrait files and Drive access if restricted. Existing portrait support means this does not block shared styling or structural work.
- Final Terms & Conditions and Privacy Policy, explicitly named in the transcript, with intended titles/placement. Confirm the public copyright/organisation wording with the client: ETÉRA, ETÉRA Creative, or the registered entity name; the transcript mentions ETÉRA Creative LTD but does not settle exact legal wording. Implement supplied documents; do not invent text or a consent flow.
- Cal.com or Calendly choice and final booking link. Contact currently embeds a Google Calendar booking URL from Site Settings. Keep that working path until the client supplies the replacement; validate the chosen provider's embed restrictions, mobile behavior and external booking fallback.
- The transcript explicitly agrees a 14 October completion target, subject to client review delays. Thursday delivery and Sunday/Monday review align with 8 October and 11–12 October 2026 in the current context; those intermediate calendar dates are inferred because the meeting is undated. Prepare a publishable revision by the agreed target, without claiming that client approval or all inputs are already available.

### Verification gates
1. Capture baseline and revised pages at approximately 390px, 768px and 1440px; also check the supported 320px minimum for overflow. Review Home, Atelier, Services, Contact, menu and footer, including hidden Work routes.
2. Check real Safari desktop/mobile video and scrolling, Chromium, keyboard/focus, reduced motion, image framing, font loading and contrast. Existing test coverage is primarily access control; it does not prove these user-facing behaviors.
3. Exercise the CMS editing flow and inquiry cases: empty, whitespace, invalid email, no services, multiple services, optional blanks and draft opening.
4. Run lint, typecheck, existing tests, the local build using the documented local Cloudflare mode, Cloudflare bundle build and dry deployment check. Confirm current Next.js guidance before implementation, per AGENTS.md.
5. Prepare a reviewable revision and migration plan, then obtain production deployment approval. After release, verify HTTPS, pages/CMS, bindings and the intended changes. Do not apply remote D1 migrations or publish as part of this planning task.

### Suggested delivery split
First review: brand/footer, Work hiding, monogram removal, Atelier link/heading, mobile spacing and inquiry errors. Next verification pass: media framing, Services CMS changes, Safari/performance diagnosis and restrained motion. Integrate legal/booking assets when supplied, then perform full review and release checks. Finish performance repair before adding more motion.

## Audit review
Every supplied feedback area has an implementation item, preserved behavior or explicit input dependency. Source inspection and live Home HTML support the plan; visual/Safari/admin testing remains a required execution gate. No application or production changes were made during planning.

## Transcript reconciliation

- Added details absent or less specific in the email: Home navigation returns after the hero; Atelier story image aligns with its copy; Method sits below the logo; social links use two-by-two balance; copyright sits low beside contact content; editable inquiry labels; service subtitle/duplicate-name review; final founder roles; explicit Privacy Policy; unresolved public entity wording.
- The transcript confirms the agreed 14 October target and clarifies completion: a publishable site without Work counts as this project's finished scope. Portfolio development is a later separately scoped engagement, not a launch blocker.
- Red is the same brand maroon throughout, rather than a new palette of red shades; distinguish hierarchy through weight, layout and approved background alternation. Ensure method numbers 01–04 also receive the palette changes.
- No new direct-send infrastructure is unambiguously agreed. Verify the existing configured inquiry recipient with the client-provided address; do not transcribe a garbled email address from audio recognition.
- Provider pricing, tax figures, payment banter and unrelated business discussion are not implementation requirements. No financial terms or legal correctness are inferred from this transcript.
- This reconciliation updates planning only. App code, CMS records and production remain unchanged.
