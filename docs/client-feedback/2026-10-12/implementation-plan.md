# Client feedback implementation plan, 12 October 2026

## Goal and scope

Address the supplied seven-page Website Feedback PDF and the two accompanying emails. Review included every rendered page and embedded screenshot, extracted text, linked asset URLs, relevant current components/CMS schemas/CSS, and a live video transport probe. This is a plan, not an implementation or deployment. Existing October 8 verification does not count as new device verification.

Main answer to the client: desktop and mobile spacing, image framing, typography and layout can be adjusted independently through responsive rules while sharing the same content and CMS. Shared component changes still require checks on both versions. No duplicate website or independent content copy is necessary.

Constraints: preserve approved desktop compositions except where explicitly changed; retain black full-height footer, red CTA and its overlay/header boundaries; keep Resend To/CC/BCC routing, validation and anti-abuse controls. No invented final roles, subscriptions, booking events or approved Method copy. Do not send messages or test emails during planning.

## Current findings

- Home preview already accepts an image: Pages → Home Page → Atelier Preview Image (`atelierPreviewImage`). Heading/intro are intentionally shared with Pages → The Atelier Page → Headline/Intro. Desktop image currently centers a 3:2 frame inside a taller row. Mobile explicitly uses 3:2 and the client likes that size.
- Home What We Do heading/intro/link are editable under Home Page (`servicesHeading`, `servicesIntro`, `servicesLinkLabel`). Its accordion comes from Content → Services (`area`, `name`, `summary`, `details`, `sortOrder`). Category headings currently come from fixed area labels rather than arbitrary editable page text. Improve field labels/help and category-label discoverability; do not claim all accordion labels can already be changed freely.
- The Missing Element image already has an override: Pages → The Atelier Page → Story Image (`storyImage`). Its Page text group contains story/team/method copy. Current generic camelCase labels and dependencies are an editorial usability problem.
- Method currently has only step labels and renders a static list, not expandable descriptions. It needs an optional description per step plus CMS/data/type wiring.
- Footer contains two Start a Project links: red CTA already has line/arrow; black footer's contact link does not. Update the black-footer link specifically.
- Mobile page heroes retain nearly full viewport minimum height. Mobile Home positioning remains a full-height sticky stage despite a smaller fallback min-height. Mobile red CTA explicitly has no minimum height and only 2rem vertical padding. These explain the direction of the spacing complaints; exact final values require screenshots.
- Founder cards already place image beside text inside each card, but the two founders stack below 1100px. The PDF's mobile screenshot shows that existing arrangement. Its request may mean both founders in one row, rather than merely image beside each biography. Confirm the intended composition.

## Work package 1: responsive spacing and shared interaction polish

1. Home mobile statement (PDF p5): reduce empty space around “We are a creative atelier…” using mobile stage/scroll-travel and content-height changes together. Avoid cropping an unchanged 100svh sticky stage. Preserve desktop transition and reduced-motion reading order.
2. Atelier hero (p2 desktop, p6 mobile): modestly reduce space below navigation and between intro and story image. Adjust both hero min-height/padding and adjacent section spacing, not just one margin.
3. Services hero (p7) and Contact equivalents: apply the compact mobile spacing consistently; review tablet transition widths too. Keep page-specific colors.
4. Red CTA on every public page (p5–7): increase mobile breathing room and visually center its contents. Starting proposal: content-led height with roughly 50–60svh minimum, then tune against short/tall devices; not a rigid full-screen requirement from the client. Preserve desktop CTA and black footer treatment.
5. Editorial links (p1): underline text on hover and keyboard focus, with existing line/arrow treatment. Scope away from the first video CTA, which the client explicitly excludes. On touch, maintain a clear link affordance and generous hit target.
6. Black footer Start a Project (p1): reuse EditorialLink for underline/arrow, preserving alignment with socials/contact and avoiding generic footer styles overriding it.

Acceptance: desktop/mobile comparisons for each modified section; no horizontal overflow, obscured text or sticky overlap; header stays visible through CTA and hides at the agreed black-footer boundary; reduced motion and keyboard focus remain usable.

## Work package 2: images, Atelier layout and CMS clarity

1. Home preview (p1/p5): desktop image fills its column from top to bottom using cover cropping. Preserve mobile's approved 3:2 size. Keep separate Home preview and Atelier story image controls, because these are independent editorial placements.
2. Retrieve and inspect both linked replacement image candidates before choosing a crop. PDF links:
   - https://drive.google.com/file/d/1laxV-7uc8KfXMUNm_9dsDz7RRTxnlZ1d/view?usp=sharing
   - https://drive.google.com/file/d/1pN3ABOOiiif6nBhWrEwDiMfkztge11E5/view?usp=sharing
   Web access could not retrieve these files during planning; their contents and which is monochrome are not verified. Do not substitute guessed assets. Choice remains color versus black-and-white, using a preview when available.
3. Clarify Admin labels/help and add a short screenshot-based editor guide covering Home preview, shared intro, What We Do heading/category/content controls, story image, team roles/portraits, and publishing drafts. Reuse working controls, add only genuinely missing ones.
4. Team introduction (p2): center “A small core. The right wider team.” with its supporting paragraph beneath. Permit one or two heading lines at desktop; natural additional wrapping on narrow phones rather than tiny text.
5. Portraits (p2/p7): enforce width:height 4:5, with head-safe object positioning. Originals can remain high resolution; no need for client resizing unless the desired crop cannot be obtained. Exact 4:5 and height equal to an arbitrarily long biography cannot both be guaranteed; latest 4:5 request takes priority over the previous equal-height request.
6. Mobile team, confirmed by user on 12 October: two compact founder cards in one row, each with 4:5 portrait, name and role. Place the biographies beneath the paired cards in readable blocks, preserving the association with each founder. Do not hide text or shrink full biographies to force them into narrow columns. This supersedes the earlier one-founder-per-row mobile layout.
7. Method (p2–3): reduce heading weight; four accessible expandable rows for Discover/Define/Create/Elevate, styled consistently with Home What We Do. Add optional CMS descriptions to the existing Atelier step array and preserve saved labels/order. Empty descriptions must not create empty expandable panels. Obtain approved descriptions or prepare clearly marked copy for approval; no silent invented published copy.

Acceptance: both portraits correct, 4:5 and heads visible; full desktop image coverage and unchanged mobile image ratio; editor changes survive save/publish and appear in intended slots; drafts stay private. Additive migration only where needed, verified against a database snapshot before production.

## Work package 3: Services and Contact

1. Services (p3): red hero with cream-white text, matching ETÉRA palette. Keep service detail sections cream/red. Check header contrast and full-bleed hero background at wide widths.
2. Contact booking (p3): prepare two comparable desktop/mobile previews in the existing calendar slot, Calendly and Cal.com. Verify current official plan costs, branding controls, embed behavior, mobile scroll, time zones and required event/calendar integrations when comparing. Do not accept the client's price assumption as verified. Use actual provider widgets/demo event pages when accessible and label illustrative mocks clearly. No switch or paid account until a provider/event URL is selected. Current default is a Google appointment iframe; Site Settings already accepts Booking URL, but provider-specific embed integration may still need changes.
3. Add Industry (Optional) below Company Name (p4), using a single-select dropdown with an empty default and exactly these options:

   Fashion & Accessories
   Beauty & Skincare
   Luxury & Premium Goods
   Jewelry & Watches
   Lifestyle & Wellness
   Hospitality & Travel
   Food & Beverage
   Art, Design & Culture
   Entertainment & Media
   Architecture & Interior Design
   Technology & Innovation
   Retail & E-commerce
   Professional Services
   Other

4. Reach every form layer: `InquiryForm`, `InquiryDraft`/validation, server delivery allowlist/length validation, HTML and plain-text email, failure fallback draft, CMS label/options where practical, generated types and relevant tests. Empty Industry remains valid; reject unrecognized values server-side. Preserve To hello@eteracreative.com, CC visitor, BCC ystoyanova@eteracreative.com and adjurdjevic@eteracreative.com. Other is sufficient without adding an unrequested second field.

Acceptance: optional blank and every allowed choice work; invalid values rejected; selected Industry appears escaped in both email formats; retries retain field values and idempotency behavior; no incidental real emails. Booking preview works at phone width and does not imply a real booking was made.

## Work package 4: Safari video investigation

This remains an unresolved reported issue, not a guaranteed simple attribute fix. Earlier user-confirmed iPhone success and client's failure are both valid observations on different devices/settings.

Evidence today:
- HeroVideo already uses autoPlay, muted, playsInline, looping, visibility/canplay retries and poster fallback.
- Reduced-motion preference deliberately pauses video. Preserve that accessibility behavior and record it separately from failures.
- Default local video is H.264, yuv420p, 1920×1080, 13.13 seconds, approximately 7.4 MB, with no audio stream. Do not claim removing audio is a new fix.
- Live GET `/media/etera-hero.mp4` with `Range: bytes=0-1023` returned HTTP 200 and all 7,398,629 bytes, not 206/Content-Range. HEAD also returned 200. This is a transport lead, not proof of Safari's playback cause; recheck a fresh URL/cache state and the actual CMS-selected source.

Investigation order:
1. Reproduce exact URL/source on real iPhone Safari, noting iOS/browser version, direct Safari versus in-app browser, Low Power Mode, Reduce Motion and connectivity. Compare desktop Safari separately.
2. Inspect actual play() rejection, video error/readyState, visibility and advancing currentTime. Promise resolution or autoplay attributes alone do not prove playback.
3. Verify content type, byte-range handling, MP4 fast-start metadata and loading behavior. Correct transport/encoding only if evidence warrants it; consider a lighter mobile asset if loading is the issue.
4. Verify autoplay in supported normal conditions, fresh navigation, background/foreground return and scroll re-entry. Test policy-blocked cases separately.
5. Browser/device policy cannot be bypassed reliably. Keep a deliberate poster; if blocked playback needs a manual control, propose a discreet tap-to-play alternative for approval because the previous visible Play background video button was explicitly removed.

Primary references: https://webkit.org/blog/6784/new-video-policies-for-ios/ and https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/ . They describe silent/muted playback, visibility, user gestures and policy limits; they do not establish the root cause on the client's phone.

## Decisions and inputs

- Resolved: mobile shows both founders side by side, with biographies below (user confirmation, 12 October).
- Preferred replacement image candidate and accessible files.
- Approved Method descriptions and final founder roles. PDF does not supply final roles; do not invent or finalize CEO/CEO2 from screenshots.
- Calendly versus Cal.com after comparable previews and current plan checks; actual event URL and account ownership needed for final integration.
- If Safari policy blocks autoplay, whether a discreet manual control is acceptable. Device/version/settings evidence can be collected while independent layout changes proceed.

The email mentions mid-next-week completion and payment, but pasted emails have no timestamps. Do not invent a new contractual date from relative wording; confirm the calendar deadline separately if required.

## Proposed delivery order and verification

1. Capture current desktop/mobile baselines, reproduce Safari first, then implement unambiguous spacing, CTA, links, Services colors and CMS clarity.
2. Implement form Industry end to end, 4:5 portraits, team heading and Method schema/accordion. Resolve mobile team/image/copy decisions before dependent work.
3. Present booking alternatives and mobile team previews; integrate chosen booking provider only after selection.
4. Verify at 320, 375, 390, 430, 768, 1024 and 1440 px, including short/tall phone heights. Cover four main pages plus shared CTA/footer on legal pages. Review screenshots, keyboard/touch behavior, open/closed accordions, form errors, CMS save/publish, correct portraits, contrast, reduced motion, Safari playback and byte-range responses. Mobile emulation is not real iPhone Safari evidence.
5. Run focused tests, lint, TypeScript, Next/OpenNext build and compiled Cloudflare Worker checks, inspect additive migrations, then publish under explicit release authorization and verify live. Plan-only request does not authorize this new release.

## Planning review

All seven PDF pages and their embedded screenshots were visually inspected. Every requested item is mapped above, including mobile image preservation, Method behavior, footer's second project link, exact 14 Industry options and booking previews. Source and live transport checks establish investigation targets; no new browser/device acceptance testing or application changes were performed. Drive asset contents, provider pricing and real Safari root cause remain unverified. Only this plan and task tracking were written.
