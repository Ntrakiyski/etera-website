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

## 2026-10-08 - Preserve reported Safari distinction

Mistake: Earlier email treated iPhone playback as unverified after the user confirmed it works.
Why it happened: Verification status was not updated from direct user testing.
Rule for next time: Record user-confirmed iPhone behaviour separately from desktop Safari; omit the Safari paragraph from this client email as requested.
Example check: iPhone works per user; desktop Safari issue remains outside policy publication scope.

## 2026-10-08 - Founder portrait framing

Mistake: Circular face crops cut off the tops of the founders’ heads.
Why it happened: LinkedIn-style was interpreted as circular and tightly zoomed.
Rule for next time: Use the requested taller rectangular framing and preserve the full head with space above it.
Example check: Inspect both portraits before publishing, including the hairline and chin.

## 2026-10-08 - Profile card alignment

Mistake: Portraits remained above biographies when the desired layout was beside them.
Why it happened: The first request focused on crop and dimensions rather than card composition.
Rule for next time: Treat portrait size and placement as separate choices; verify equal-height side-by-side layout when requested.
Example check: Compare image and biography bounding-box top and height on desktop and mobile.

## 2026-10-08 - Review generated SQLite migrations before running

Mistake: Generated migration rebuilt tables and selected newly added columns before they existed in the old schema; it was run locally before this was corrected.
Why it happened: Upload foreign keys and default changes triggered Drizzle rebuilds.
Rule for next time: Inspect every copy SELECT and preserve child tables. Use additive columns for nullable upload relationships; prove against a pre-migration database before remote application.
Example check: Migration up contains no DROP TABLE or PRAGMA foreign_keys=OFF; all existing rows and child references remain unchanged.

## 2026-10-08 - Let crawlers read noindex

Mistake: Initial SEO crawler rules blocked all public URLs when indexing was disabled.
Why it happened: Crawl blocking was treated as equivalent to removing pages from search.
Rule for next time: Keep public pages crawlable so engines can read noindex; exclude noindex pages from the sitemap. Noindex is not a privacy control.
Example check: Indexing disabled yields page noindex and empty sitemap while robots.txt still allows public crawling.

## 2026-10-08 - Wait for authenticated-route redirects

Mistake: Live browser check asserted the admin URL before hydration and then used a pattern that omitted the redirect query.
Why it happened: CMS redirects happen client-side and preserve the requested URL in a query parameter.
Rule for next time: Wait for the login route with optional query parameters and its login control.
Example check: Match /admin/login with a URL regular expression, then wait for the Login button.

## 2026-10-08 - Shared enquiry receipt reply wording

Mistake: Receipt wording told the copied visitor to Reply, while Reply-To correctly points to that visitor for staff responses.
Why it happened: One message serves both staff and visitor.
Rule for next time: Use an explicit contact mailto link for the visitor; preserve visitor Reply-To for staff.
Example check: Staff Reply targets the visitor; visitor receipt says Email the ETÉRA team.

## 2026-10-08 - Generated Worker types and compiled bundles

Mistake: Wrangler generated a mainModule import of the compiled OpenNext Worker, causing TypeScript recursion.
Why it happened: Type generation ran while the generated Worker artifact existed.
Rule for next time: Generate binding types without inferring the compiled Worker module; keep generated bundle imports out of application declaration files.
Example check: cloudflare-env.d.ts has environment bindings but no .open-next/worker import.

## 2026-10-12 - Preserve discriminated field types

Mistake: Spreading a helper typed as Payload Field and overriding admin lost the discriminated union guarantee.
Why it happened: Group-specific help was added without narrowing the helper's return type.
Rule for next time: Keep generic Field helpers intact unless their concrete return type is needed; place contextual help on the specific related fields.
Example check: Typecheck the schema after admin metadata edits, not only ESLint.

## 2026-10-12 - Responsive accessibility overrides and QA selectors

Mistake: The compact mobile statement retained an older reduced-motion !important minimum height. The browser verification first matched server error copy that the form intentionally replaces, then also matched Next's announcer.
Why it happened: Testing only normal motion missed the stronger existing CSS rule; selectors were broader than the form's actual UI contract.
Rule for next time: Check responsive changes with reduced motion, and scope interaction assertions to the component's rendered state rather than arbitrary provider text.
Example check: Mobile reduced-motion statement remains below 500px; failure assertion targets form [role=alert].

## 2026-10-12 - Explicit remote migration context

Mistake: cf:migrate exited successfully but inherited PAYLOAD_CLOUDFLARE_LOCAL=1 from .env and did not migrate production.
Why it happened: The remote migration script selected production mode without explicitly overriding local binding selection.
Rule for next time: Set PAYLOAD_CLOUDFLARE_LOCAL=0 in cf:migrate and verify the migration name against remote D1 before deploying.
Example check: SELECT name FROM payload_migrations WHERE name = '20261012_144844_feedback_20261012' returns exactly one row remotely.

## 2026-10-12 - Run every CI check before release

Mistake: Initial release passed lint/types/tests/build but CI rejected stale generated Cloudflare module metadata.
Why it happened: The local release checks omitted the workflow's cf:typegen --check step.
Rule for next time: Run every existing CI check before pushing, including generated bindings checks; verify clean-build conditions when output references ignored artifacts.
Example check: npm run cf:typegen -- --check succeeds with .open-next absent.

## 2026-10-12 - Portrait uploads must not dictate desktop section height

Mistake: A new portrait-format Home image stretched the whole two-column introduction to its intrinsic height.
Why it happened: Percentage image height resolved against a content-sized frame, letting the image determine the grid row.
Rule for next time: In a cover frame that must match the adjacent text, remove the image from intrinsic row sizing and check both portrait and landscape sources.
Example check: The desktop frame matches the text column height, while the mobile frame remains 3:2 and both faces stay visible.

## 2026-10-14 - Restore scroll state before testing sticky hero controls

Mistake: The email audit's hero-link hover timed out after testing the lower Home preview link.
Why it happened: The desktop statement correctly covered and disabled the hero CTA at the retained scroll position.
Rule for next time: Restore the initial scroll position and wait for the hero CTA's active state before testing controls from the first viewport.
Example check: Scroll to zero and wait for data-cta-hidden to be absent before hovering the hero link.

## 2026-10-14 - Separate client verification from agent device coverage

Mistake: The audit left Safari open because the agent had not tested a real iPhone; the user subsequently confirmed Alexandra had tested it successfully.
Why it happened: Client acceptance evidence was not yet available when the audit was written.
Rule for next time: Close an item when direct user confirmation provides client testing evidence, while preserving accurate attribution and the agent's own testing limits.
Example check: Record “Safari confirmed working by Alexandra” without claiming a new agent iPhone test.

## 2026-10-14 - Serialize type checks with Next build output

Mistake: A standalone typecheck overlapped the OpenNext build and reported missing .next/types files while the build regenerated that directory.
Why it happened: Both checks used the same generated output at the same time.
Rule for next time: Finish dev shutdown and standalone checks before starting Next/OpenNext build; rerun sequentially if generated-file races occur.
Example check: Run typecheck only after the build's .next/types output is stable.


## 2026-10-14 - Wait for vendor widget controls and settled animation

Mistake: Cal tests and screenshots matched server-rendered text while the vendor widget was still hydrating or fading in.
Why it happened: A title in the DOM and applied brand variables did not prove that event controls were ready or ancestor opacity had settled.
Rule for next time: Use fresh viewport pages, exercise the requested trigger first, and wait for real controls, no loading skeleton and visible settled content before assertions/screenshots.
Example check: Real Cal day controls visible, no visible pulse placeholders, event-title ancestor opacity at least 0.98, then inspect modal close and focus return.
