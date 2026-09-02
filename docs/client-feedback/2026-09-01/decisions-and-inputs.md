# Client Decisions and Outstanding Inputs

Meeting: 1 September 2026, 10:30 EEST. Times below refer to the meeting recording retained outside Git.

## Confirmed design-system decisions

| Decision | Evidence time | Repository implication |
|---|---:|---|
| Remove blue from the public UI. Use ETÉRA maroon/red first, milk white second, and graphite black third. | 01:20–02:57; 34:06–35:17; 44:50 | Reconcile `DESIGN.md`, `design/tokens.css`, `design/tokens.json`, and `src/app/globals.css`. |
| Use the supplied brand typography consistently. Avoid one-word-per-line headlines; prefer 2–3 lines rather than 5. Reduce three-font sections to two treatments. | 04:48–05:50; 31:43; 44:42 | Update durable design guidance before page CSS. |
| Standardize primary and secondary actions. Primary actions receive red emphasis/hover; secondary actions stay quieter. Keep the line/arrow interaction and pointer cursor for interactive logos. | 02:57; 05:36–06:51; 13:24 | Reuse existing `EditorialLink`, shared action classes, and header/footer styles. |
| Keep content and imagery editable through Payload; audit missing fields once page structure is final. | 04:08; 48:00–48:51 | Extend existing globals/collections only when a confirmed field is missing. |

## Consolidated review status

Confirmed on 2 September 2026 through the client implementation handoff: preserve the approved Home hero, positioning section, Atelier founder profiles, and Contact booking calendar, and implement the remaining structural decisions in this branch. The items below are therefore approved for implementation unless a later client delta is recorded here.

## Confirmed structural decisions

| Area | Decision | Evidence time |
|---|---|---:|
| Home | Hide Selected Work and Selected Partners for launch; preserve the CMS/readiness path for later. | 06:56–10:29; 24:18–25:22 |
| Home | Remove Discover / Define / Create / Elevate from Home; retain one Explore Services action. | 15:08–23:18 |
| Shared CTA | Replace the duplicate black footer/large logo with one strong red “Let's Define Your Era Together” CTA reused across pages. | 25:50–29:45; 39:10–39:49 |
| Work | Hide the Work route/navigation entry until enough approved projects exist. Home later shows 1–3 selected projects; Work shows the full archive. | 33:14–34:01 |
| Atelier | Use final client copy/images, show only the two founders at launch, and keep the four-step process here rather than on Home. | 35:28–39:05 |
| Services | Replace generated copy and expand the page before deep-linking individual services from projects. | 39:50–40:38 |
| Contact | Replace the opening with contact-specific copy; remove the Direct Contact intro; place booking calendar before the form. | 40:38–42:35 |
| Contact form | Keep the visual style; make services multi-select; label Company Name without “Brand”; keep Budget and Additional Information optional. | 42:43–43:48 |

## Inputs still required

| Owner | Input | Blocks |
|---|---|---|
| Client | Final replacement copy for Services and any later page-copy refinements | Services and remaining editorial copy |
| Client | Launch-ready projects with approved names, imagery, roles, results, and collaborators | Work route and Home Selected Work visibility |
| Client | Approved partner logos and permission to display each one | Home Selected Partners visibility |
| Client | Final inquiry delivery/storage workflow | Contact form submission beyond the current email-draft flow |

## Inputs received after the review

- Home hero video, final hero treatment, and positioning statement.
- Alexandra Djurdjevic and Yoana Stoyanova names, roles, biographies, and portraits for the Atelier CMS section.
- Instagram, Facebook, LinkedIn, and TikTok URLs for the shared footer.
- Google Calendar appointment-scheduling URL and approval to embed it before the Contact form.

## Deliberate exclusions

The meeting recording, extracted audio, automatic transcript, credentials, personal scheduling discussion, model cache, virtual environment, and transcription scripts are intentionally not part of this branch. This document contains the implementation-relevant decisions only.
