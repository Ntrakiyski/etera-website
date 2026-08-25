# CMS Validation

Last validated: August 25, 2026

- Website: `https://etera.trakiyski.work`
- Admin: `https://etera.trakiyski.work/admin`
- CMS: Payload 3 on the same Next.js application
- Data: Cloudflare D1
- Media: Cloudflare R2

This document records end-to-end coverage of every CMS capability currently configured for ETÉRA. It does not include credentials or Cloudflare secrets.

## Permanent Validation Content

The live CMS contains representative, editable content that is rendered by the public website:

- One admin user.
- One media asset: the primary black ETÉRA logo.
- Five published services covering all configured service areas.
- One published project with related services, rich text, results, collaborators, hero media, and gallery media.
- One people record selected on The Atelier Page.
- One partner selected on Home Page with related logo media.
- Published content for Home, Work, The Atelier, Services, and Contact.
- Site Settings used by the footer, contact booking action, and home-page metadata.

Temporary CRUD records created during testing were deleted. Their database and R2 cleanup were verified.

## Coverage

| Area | Tested actions | Result |
| --- | --- | --- |
| Authentication | Login, current-user session, logout, login again | Pass |
| Authorization | Public reads, blocked anonymous collection writes, blocked anonymous user creation, blocked anonymous global updates | Pass |
| Users | Admin user management, editor self-access, blocked editor role escalation | Pass |
| Media | Select file in admin, create, read, edit alt text, serve from R2, relate to content, delete temporary file | Pass |
| Services | List, create draft, read, update, publish, versions, delete, public rendering | Pass |
| Projects | List, create draft, relationships, rich text, arrays, gallery, update, publish, versions, delete, public rendering | Pass |
| People | List, create, read, update, delete, public rendering | Pass |
| Partners | List, create, read, update, logo relationship, delete, public rendering | Pass |
| Page globals | All five edit screens, read, update, publish, public rendering | Pass |
| Global drafts | Save draft, keep draft invisible publicly, publish, version history | Pass |
| Site Settings | Edit screen, read, update, public footer rendering | Pass |
| Validation | Required service fields and friendly duplicate project-slug error | Pass |
| Public pages | Home, Work, Services, The Atelier, Contact return 200 with CMS content | Pass |
| Responsive rendering | Desktop, 390px, and 320px mobile navigation, no horizontal overflow, no broken images | Pass |

## Verified Data State

Remote D1 counts after cleanup:

| Entity | Count |
| --- | ---: |
| Users | 1 |
| Media | 1 |
| Services | 5 |
| Projects | 1 |
| People | 1 |
| Partners | 1 |
| Temporary service records | 0 |

The retained R2 media URL returns `200 image/svg+xml`. The deleted temporary media URL returns `404`.

## Defects Fixed During Validation

1. R2 uploads failed in the admin because Payload's client-upload path expected missing adapter data. Media now uploads through the Worker to R2, which is appropriate for the expected ETÉRA asset sizes.
2. Duplicate project slugs reached the D1 unique constraint and returned a generic `500`. Project slugs now have an explicit uniqueness check and return a clear field-level `400` validation error.
3. Media and partner records existed in the schema but were not rendered publicly. Project media, partner logos, and Site Settings are now consumed by the website.
4. Editor roles were present but not enforced. Editors can now manage content and their own account without managing users or changing roles.
5. Duplicate project publishing and featured controls were removed. Payload's Publish action and page-level relationship selections are now the sources of truth.
6. Image-only placements now reject PDF media, internal pages share site navigation, and production CMS failures are persisted in Cloudflare logs.

## Maintenance Notes

- Run `npm run lint`, `npm run typecheck`, and `npm run test` before deployment.
- Run `npm run cf:deploy` with Cloudflare authentication supplied outside the repository.
- After schema changes, generate a migration and run `npm run cf:migrate` before deploying.
- Re-run this matrix after Payload, Next.js, OpenNext, D1, R2, authentication, or access-control changes.
- Build output currently contains non-blocking warnings from bundled third-party Payload/OpenNext code. The patched DOMPurify release is pinned with an npm override. The remaining five moderate audit entries come from Payload's D1 migration toolchain and currently have no upstream fix; review them when Payload updates the adapter.
