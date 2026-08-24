# Payload CMS Setup

Payload is installed inside the Next.js app. The editor/admin interface is available at `/admin` when the app is running.

## What Editors Can Manage

- Home, Work, The Atelier, Services, and Contact page copy.
- Projects, including client/project details, status, roles, results, collaborators, and galleries.
- Services grouped by the ETÉRA service areas from the brief.
- People, partners, and media assets.
- Site settings such as contact email, social links, footer tagline, and SEO defaults.

## Local Development

1. Start Postgres:

   ```bash
   docker compose up -d postgres
   ```

2. Run the app:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000/admin` and create the first CMS user.

The local `.env` uses:

```bash
DATABASE_URL=postgres://payload:payload@127.0.0.1:5432/etera_website
```

## Production Environment

Set these environment variables on the deployment host:

- `PAYLOAD_SECRET`: long random secret for Payload auth/encryption.
- `DATABASE_URL`: managed Postgres connection string.
- `BLOB_READ_WRITE_TOKEN`: optional Vercel Blob token for persistent media uploads.

If `BLOB_READ_WRITE_TOKEN` is absent, Payload falls back to local upload storage. That is acceptable for local development, but production on serverless hosting needs persistent object storage for uploaded media.

## Developer Notes

- CMS schema lives in `src/collections`, `src/globals`, and `src/payload.config.ts`.
- Public pages read through `src/lib/cms.ts`, which falls back to launch placeholder content when Payload is not reachable.
- Regenerate Payload TypeScript types after schema changes:

  ```bash
  npm run generate:types
  ```

- Create and run migrations before production schema changes:

  ```bash
  npm run migrate:create
  npm run migrate
  ```
