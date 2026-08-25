# Tech Stack and Cloudflare Operations

This document explains how the ETERA website is built, deployed, and maintained. It is meant for future development work, handoff, and troubleshooting. Do not add API tokens, secrets, passwords, or private client material here.

## Current Stack

- Framework: Next.js App Router, TypeScript, React.
- Styling: Tailwind CSS v4 through `src/app/globals.css`.
- CMS: Payload CMS mounted at `/admin`.
- Editor: Payload Lexical rich text editor.
- Database: Cloudflare D1 through `@payloadcms/db-d1-sqlite`.
- Media storage: Cloudflare R2 through `@payloadcms/storage-r2`.
- Cloudflare adapter: OpenNext for Cloudflare.
- Deployment CLI: Wrangler.

## Important Paths

- Public pages: `src/app/(frontend)`.
- Shared frontend CMS helpers and fallbacks: `src/lib/cms.ts`.
- Payload config: `src/payload.config.ts`.
- Payload collections: `src/collections`.
- Payload globals: `src/globals`.
- Payload migrations: `src/migrations`.
- Cloudflare config: `wrangler.jsonc`.
- OpenNext config: `open-next.config.ts`.
- Next config: `next.config.ts`.
- Generated Cloudflare binding types: `cloudflare-env.d.ts`.
- CMS setup notes: `docs/cms-setup.md`.

## Cloudflare Resources

Production currently uses these Cloudflare resources:

- Worker name: `etera-website`.
- Custom domain: `etera.trakiyski.work`.
- D1 binding: `D1`.
- D1 database name: `etera-website`.
- D1 database id: `66622e1f-8b34-4013-875f-e10d75f17a46`.
- R2 binding: `R2`.
- R2 bucket: `etera-website-media`.
- Static assets binding: `ASSETS`.
- Required secret: `PAYLOAD_SECRET`.

`PAYLOAD_SECRET` must be stored as a Cloudflare Worker secret and must not be committed.

```bash
openssl rand -hex 32 | npx wrangler secret put PAYLOAD_SECRET
```

If using an API token instead of interactive login, set it only in the current shell session:

```bash
export CLOUDFLARE_API_TOKEN="..."
```

Never write Cloudflare API tokens into Markdown files, `.env`, committed config, scripts, or issue comments.

## Local Development

Install dependencies:

```bash
npm install
```

Create a local `.env` from `.env.example` and set a local `PAYLOAD_SECRET`.

Run the local Next.js dev server:

```bash
npm run dev
```

Open:

- Site: `http://localhost:3000`
- CMS: `http://localhost:3000/admin`

Local development uses Wrangler's platform proxy from `src/payload.config.ts`. In development and Payload CLI runs, the app calls `getPlatformProxy` so D1/R2 can be simulated locally. In the deployed Worker runtime, it uses OpenNext's Cloudflare request context.

## Build and Deploy

Run lint before deployment:

```bash
npm run lint
```

Generate Cloudflare binding types after changing `wrangler.jsonc`:

```bash
npm run cf:typegen
```

Build the Cloudflare Worker bundle:

```bash
npm run cf:build
```

Run a dry deploy check:

```bash
npx wrangler deploy --dry-run --minify
```

Deploy:

```bash
npm run cf:deploy
```

`cf:deploy` intentionally passes `--minify` through to Wrangler. This keeps the Worker bundle under the Cloudflare Free plan script size limit.

## CMS Schema Changes

When editing collections or globals in `src/collections` or `src/globals`:

1. Generate Payload types:

   ```bash
   npm run generate:types
   ```

2. Create a migration:

   ```bash
   npm run migrate:create
   ```

3. Apply the migration to Cloudflare D1:

   ```bash
   npm run cf:migrate
   ```

`cf:migrate` sets `PAYLOAD_CLOUDFLARE_CONTEXT=wrangler` so Payload can run migrations from the local CLI while using Wrangler's Cloudflare bindings.

## Why GraphQL Is Disabled

Payload GraphQL is disabled in `src/payload.config.ts`:

```ts
graphQL: {
  disable: true,
}
```

The project does not need Payload GraphQL for the current website or CMS editing flow. Disabling it reduces Worker bundle size and removes the public `/api/graphql` and `/api/graphql-playground` routes.

If GraphQL is needed later, re-enable it deliberately and re-test Worker size before deploying.

## Bundle Size Notes

This project uses Payload CMS inside a Cloudflare Worker, which is a tight runtime. Several config choices are there to keep deployment viable:

- `cf:deploy` uses Wrangler minification.
- `next.config.ts` excludes `next/dist/compiled/@vercel/og/**/*` from file tracing.
- Payload GraphQL routes are removed.
- Empty/custom Sass imports are avoided in Payload routes.

The `@vercel/og` trace exclusion exists because Payload/Next file tracing can include Next's OG image runtime even when the app does not use dynamic OG image generation. That pushed the Worker above the free script size limit. If dynamic OG image generation is added later, remove the exclusion and expect to revisit Cloudflare plan limits.

Generated Payload route files can be rewritten by Payload. If a future generation restores imports like `@payloadcms/next/css` into API routes, check the Worker bundle size again.

## Current Cloudflare Limit Caveat

As of the first Cloudflare deployment on 2026-08-25:

- The public homepage deployed and returned `200`.
- `/admin` deployed but hit Cloudflare error `1102` on the Free Workers plan.
- Wrangler tail showed `outcome: exceededCpu` for `/admin`.

This means the public website can run on Workers Free, but the Payload admin is too CPU-heavy for the Free plan. To use the hosted CMS reliably, upgrade the Cloudflare Workers plan and redeploy.

After upgrading:

```bash
npm run cf:deploy
curl -I https://etera.trakiyski.work/admin
```

Expected result for `/admin` after the plan upgrade is an HTTP `200` login or setup screen.

## Live Debugging

Check auth/account:

```bash
npx wrangler whoami
```

Tail production logs:

```bash
npx wrangler tail etera-website --format json
```

Check routes:

```bash
curl -I https://etera.trakiyski.work/
curl -I https://etera.trakiyski.work/admin
```

Check DNS:

```bash
dig +short etera.trakiyski.work
```

Common symptoms:

- `Worker exceeded size limits`: run the dry deploy check with `--minify`, inspect route traces, and avoid pulling unused server packages into the Worker.
- `Worker exceeded CPU time limit`: inspect with `wrangler tail`; Payload admin likely needs Workers Paid.
- `Missing required secrets: PAYLOAD_SECRET`: set the Cloudflare Worker secret with `wrangler secret put`.
- D1 binding errors: confirm `wrangler.jsonc` database id and rerun `npm run cf:typegen`.

## Maintenance Rules

- Do not commit `.env`, `.dev.vars`, API tokens, or generated secrets.
- Run `npm run lint` before pushing.
- Run `npm run cf:build` and a dry deploy before production deploys that touch CMS, Next config, Payload config, or Cloudflare config.
- Regenerate `cloudflare-env.d.ts` after Cloudflare binding changes.
- Keep migrations in `src/migrations` committed.
- Keep `wrangler.jsonc` as the source of truth for Cloudflare bindings and custom domain routing.
- When changing the domain, update `wrangler.jsonc`, deploy, and verify DNS plus HTTPS.
