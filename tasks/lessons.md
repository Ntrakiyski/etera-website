# Lessons

## 2026-10-08 - Reconcile newly supplied primary context

Mistake: Earlier plan could only treat the completion date as apparent because only an undated follow-up email was available.
Why it happened: The meeting transcript had not yet been supplied.
Rule for next time: Revisit provisional dates and scope when new meeting evidence arrives; distinguish an explicit target from inferred intermediate dates.
Example check: Transcript explicitly agrees 14 October, while Thursday and Sunday/Monday calendar dates remain contextual inferences.

## 2026-10-08 - Serialize local schema changes

Mistake: Started development while a worker applied local migrations, triggering duplicate-index schema push errors.
Why it happened: Payload dev auto-push and migrations both attempted schema initialization.
Rule for next time: Disable automatic schema pushes for this migration-managed project and apply local migrations before starting the app.
Example check: Start a fresh dev process against the migrated DB and verify /api/users/init succeeds.

## 2026-10-08 - Verify boolean attributes against CSS

Mistake: The new Home transition used toggleAttribute, but existing CSS required the literal true value. Basic navigation checks missed the inactive transition.
Why it happened: Source integration and browser checks did not assert the actual sticky stage.
Rule for next time: Match attribute values to CSS selectors and assert computed behavior, not just attribute presence.
Example check: data-scroll-active must equal true and the stage computed position must be sticky.

## 2026-10-08 - Isolate offline build concurrency

Mistake: The default parallel Next build opened the same local Wrangler SQLite state from 11 workers and failed with SQLITE_BUSY_RECOVERY.
Why it happened: Local D1 proxy initialization is not safe against concurrent build-worker startup in this setup.
Rule for next time: Serialize workers for PAYLOAD_CLOUDFLARE_LOCAL builds and stop dev before building.
Example check: Offline build collects pages with one worker and completes without local DB lock errors.

## 2026-10-08 - Verify actual playback

Mistake: Playback promise resolution and muted/autoplay attributes did not prove Safari was playing.
Why it happened: Browser policy and playback state can diverge from requested attributes.
Rule for next time: Use the playing event and inspect advancing currentTime; retain a user-gesture fallback until playback is confirmed.
Example check: Verify paused:false and advancing time in the real browser after clicking Play.

## 2026-10-08 - Latest visual reference governs footer

Mistake: Earlier footer composition no longer matched the user’s desired direction.
Why it happened: A new visual reference superseded the meeting’s compact footer direction.
Rule for next time: Treat the latest supplied reference as authoritative while retaining actual brand fonts, colours and verified destinations.
Example check: Large navigation left, social/contact right, legal links bottom; no invented Work or phone links.

## 2026-10-08 - Preserve the footer CTA when replacing navigation

Mistake: Rebuilding the footer reference also removed a CTA the user wanted to retain.
Why it happened: Treated the reference as a replacement of the entire footer rather than its navigation composition.
Rule for next time: Preserve existing conversion elements unless replacement is explicit; combine new navigation with the retained CTA.
Example check: Footer starts with project CTA, followed by directory and legal links.

## 2026-10-08 - Separate footer colour scope

Mistake: Black footer background also recoloured the project CTA section.
Why it happened: Both sections shared a single background container.
Rule for next time: Treat project CTA and navigation footer as separate visual regions when applying colour changes.
Example check: CTA remains maroon above black navigation footer.

## 2026-10-08 - Verify scroll boundaries before claiming behaviour

Mistake: Claimed header stayed through CTA although any footer intersection could hide it during CTA.
Why it happened: Verified broad sections, not the exact viewport boundary.
Rule for next time: Define whether trigger means viewport entry or top crossing and test positions immediately before/after it.
Example check: Header visible when footer top is 100 px below viewport top; hidden after top crosses 0.

## 2026-10-08 - Verify deployment in Worker runtime

Mistake: First release selected the Node-only Wrangler proxy in production and returned 500.
Why it happened: Offline build local flag remained available in bundled configuration; Next server checks did not exercise Worker runtime.
Rule for next time: Guard Node-only proxy with Worker runtime detection and run the compiled Worker locally before publishing.
Example check: wrangler dev --local returns 200 for Home before deploy; verify live Home after deploy.
