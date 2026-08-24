# etera-website

Next.js site for ETÉRA Creative Atelier.

## Current State

- Next.js App Router scaffold with TypeScript, Tailwind CSS, and ESLint.
- Payload CMS at `/admin`, backed by Cloudflare D1 and R2 for deployment.
- Structural placeholder routes for:
  - `/`
  - `/work`
  - `/the-atelier`
  - `/services`
  - `/contact`
- Client brief, email assets, and visual references are committed in:
  - `goal.md`
  - `assets/from-email`
  - `references/screenshots`
- CMS research is in `docs/cms-options.md`.
- CMS and deployment notes are in `docs/cms-setup.md`.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the site or http://localhost:3000/admin for the CMS.

## Cloudflare

The Worker route is configured for `etera.trakiyski.work`, with the CMS served at `/admin`.

```bash
npm run cf:build
npm run cf:deploy
```

## Notes

The current UI is intentionally neutral. Final colors, typography, imagery, video, booking flow, analytics, and GDPR tooling are pending client confirmation.
