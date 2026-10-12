# Feedback release verification, 12 October 2026

## Implemented

- Compact mobile Home transition and inner-page heroes; shorter desktop Atelier hero; full-height desktop Home introduction image while preserving the mobile 3:2 frame.
- Centered team introduction, 4:5 portraits, both founders side by side on phones with clearly attributed biographies below. Existing portrait identity and published roles retained.
- Red Services hero with cream type; larger mobile red CTA; shared hover/focus underlines, except the first video CTA; arrow link in the black footer. Existing footer overlay and header behavior retained.
- Optional Industry with the exact 14 client choices, shared server validation and branded HTML/plain-text emails. Fixed TO/CC/BCC/Reply-To routing, security verification and duplicate protection retained.
- Editable Method descriptions with native keyboard-accessible expansion only when approved text is published. Clearer CMS labels/help and shared What We Do category labels.
- Two responsive, clearly labeled illustrative booking comparisons in booking-comparison.html, with current official pricing sources in booking-comparison.md. No booking provider switch or purchase.

## Checks

- 23 automated tests passed, including all Industry choices/invalid values, escaped email text, fixed BCC routing, Method description handling, and full/range/HEAD video responses.
- ESLint, TypeScript, git diff --check and production Next/OpenNext build passed. Generated dependency bundling warnings remain, with a successful build.
- Local browser matrix: 28 page/viewport combinations across Home, Atelier, Services and Contact at 320, 375, 390, 430, 768, 1024 and 1440px, plus advancing Chromium video, reduced-motion pause/compact layout and 206/416 video responses. No horizontal overflow or page exceptions.
- Mocked browser form failure/retry/success preserved Industry and submission ID. No email was sent. Desktop/mobile team and booking screenshots reviewed.
- Local editor-permission API checks passed for Method draft isolation, publication and public rendering, and Industry label publication. Original local published values restored afterward. No test content was written to production.
- Four additive ALTER TABLE statements were replayed against the production backup: all original rows and columns across 52 tables remained identical, and foreign-key checks passed. Production backup retained privately outside Git.

## Video delivery

The previous default MP4 was valid H.264, silent and fast-start, but live range requests returned the entire 7.4MB file with HTTP 200. The new default uses a 2.37MB, 1280px-wide copy of the same film with a streamed, fixed-key R2 route supporting HTTP 206 and metadata-only HEAD. CMS video overrides remain supported. Silent inline autoplay is retried on visibility/ready state and the next real tap, with the existing poster when browser policy blocks playback. Reduced Motion intentionally pauses the video.

Optimized R2 key: site/etera-hero-20261012.mp4, bucket etera-website-media. Original public/media/etera-hero.mp4 is preserved. Reproduce the optimized file:

```sh
ffmpeg -i public/media/etera-hero.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart /tmp/etera-hero-20261012.mp4
npx wrangler r2 object put etera-website-media/site/etera-hero-20261012.mp4 --file /tmp/etera-hero-20261012.mp4 --content-type video/mp4 --remote
```

The new route requires this R2 object. The existing CMS media upload path is unchanged.

## Remaining inputs and limits

- Both replacement Drive images were initially inaccessible. Access was later granted and the same files were supplied directly; color is now selected for Home, with monochrome available in Media.
- Method descriptions were subsequently approved and published as editable CMS fields. Final founder roles remain client input.
- Booking mockups are illustrative, not exact live vendor embeds. The actual account, host setup and booking link must be chosen before integration.
- Actual iPhone Safari was not tested because iPhone Mirroring was unavailable. After the Mac was unlocked, desktop Safari playback after a real click was verified; autoplay returned NotAllowedError. Details below. Transport and tap playback are verified; reliable autoplay on the client's phone remains unproven.

Screenshot evidence is retained in the task's feedback-20261012 visualization directory. Release identifiers and live verification are recorded below after deployment.

## Release

Application commit 13d3f90 is pushed to main and live at https://etera.trakiyski.work. Cloudflare Worker version: 10aa1794-93df-4109-9d6a-df8103854ce7. Remote additive migration 20261012_144844_feedback_20261012 and the default Industry label were queried successfully in production.

The compiled local Worker passed the same 29 browser cases. Production passed all 29 cases and nine additional legal page/viewport cases, footer/header hide/restore checks, footer arrow and hover exception. Live malformed inquiry returned 400 without sending. Production Chromium video advanced and live range requests returned 206/1024 bytes; unsatisfiable ranges returned 416. Screenshots reviewed. Localhost is available on port 3000; booking comparisons are served on port 9081.

GitHub CI initially rejected stale cloudflare-env.d.ts main-module metadata. Regenerated the types and verified typecheck/typegen-check without local OpenNext output, matching clean CI conditions. The migration command now explicitly selects remote bindings, preventing ignored local .env settings from silently changing its target.

## Approved content follow-up

The user approved these exact Method descriptions on 12 October: Discover — Understand the brand, audience and context. Define — Set the strategic direction and creative brief. Create — Develop the identity, content and experiences. Elevate — Refine and bring the work into the world. They remain ordinary editable Method description fields in Payload.

Both supplied JPEGs were inspected: the same studio moodboard composition in color and black-and-white. Optimized WebP copies preserve the original composition at 1800×2700; the originals remain unchanged in Downloads. Color is selected for the Home introduction; monochrome is available in Media. The independent Atelier story image and founder portraits are unchanged. Home's cover image no longer dictates the desktop grid row's intrinsic height; mobile remains 3:2, with focal positioning adjusted to keep both faces visible.

Local browser checks passed at 320, 390, 768 and 1440px: correct uploaded Home image, mobile aspect ratio, no overflow, and all four Method descriptions expand by pointer and collapse by keyboard. Desktop/mobile screenshots visually reviewed. Lint, TypeScript, 23 tests and production OpenNext build passed.

### Native Safari evidence after unlocking

Real desktop Safari on the live website loaded the MP4 with readyState 4, muted true, document visibility visible, currentTime 0 and paused true. A play() call without an emulated user gesture rejected with NotAllowedError: “The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.” The website-specific preference read “Stop Media with Sound”; no preference or blocker was changed. A real pointer click on the hero started playback, verified paused false and advancing currentTime 10.508 seconds. A fresh tab reproduced the policy rejection. This proves the film loads and the tap retry works in native Safari; it does not prove autoplay on a real iPhone. Test tab and Web Inspector closed afterward.

Approved follow-up deployed as Worker a4100d25-46c5-42fc-a727-c3555f0b6341. Production CMS readback confirmed the color Home image and all four exact approved Method descriptions. Both image alternatives are available in the Media collection.

Follow-up live browser verification passed at 320/390/768/1440px for Home and Atelier: uploaded image, equal desktop image/text heights, mobile 3:2, no overflow, and all four Method panels expanding/collapsing by pointer and keyboard. Native Safari also exposed the exact Discover description after keyboard activation of its summary.
