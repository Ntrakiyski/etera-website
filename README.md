# etera-website

Next.js site for ETÉRA Creative Atelier.

## Current State

- Client-presentable first website draft built with the Next.js App Router,
  TypeScript, Tailwind CSS, and ESLint.
- Payload CMS at `/admin`, backed by Cloudflare D1 and R2 for deployment.
- Finished public routes for:
  - `/`
  - `/work`
  - `/the-atelier`
  - `/services`
  - `/contact`
- CMS-backed project detail routes at `/work/[slug]` and branded not-found
  handling for unavailable projects.
- Client brief, email assets, and visual references are committed in:
  - `goal.md`
  - `assets/from-email`
  - `references/screenshots`
- Design source-of-truth files are committed in:
  - `PRODUCT.md`
  - `DESIGN.md`
  - `design`
- CMS research is in `docs/cms-options.md`.
- CMS and deployment notes are in `docs/cms-setup.md`.
- Tech stack and Cloudflare maintenance notes are in `docs/tech-stack-cloudflare.md`.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the site or http://localhost:3000/admin for the CMS.

Run an offline production-build verification against local Wrangler bindings:

```bash
PAYLOAD_CLOUDFLARE_LOCAL=1 npm run build
```

## Cloudflare

The Worker route is configured for `etera.trakiyski.work`, with the CMS served at `/admin`.

```bash
npm run cf:build
npm run cf:deploy
```

## Notes

The public UI should follow `PRODUCT.md`, `DESIGN.md`, and `design/page-briefs.md`. Final colors and typography are available in `design/assets/brand/2026-08-24`; imagery, video, booking flow, analytics, and GDPR tooling are still pending client confirmation.
