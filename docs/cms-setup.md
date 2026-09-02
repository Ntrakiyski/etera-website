# Payload CMS Setup

Payload is installed inside the Next.js app. The public site and CMS are deployed together as one Cloudflare Worker:

- Website: `https://etera.trakiyski.work`
- CMS: `https://etera.trakiyski.work/admin`
- Database: Cloudflare D1 binding `D1`
- Media uploads: Cloudflare R2 binding `R2`

## What Editors Can Manage

- Home, Work, The Atelier, Services, and Contact page copy.
- Projects, including client/project details, Payload draft/publish state, roles, results, collaborators, and galleries.
- Services grouped by the ETÉRA service areas from the brief.
- People, partners, and media assets. Homepage projects/partners and Atelier people are selected from their page edit screens.
- Site settings such as contact email, booking URL, social links, footer tagline, and SEO defaults.

## User Roles

- Administrators can manage users and all website content.
- Editors can manage website content and their own account, but cannot create or delete users or change account roles.
- Only administrators should create new CMS accounts.
- Image placements such as project heroes, partner logos, and portraits accept image media only. PDFs can still be stored in Media for documents.

## MCP Content Access

Payload's official MCP plugin exposes the CMS at:

```text
https://etera.trakiyski.work/api/mcp
```

The endpoint uses Streamable HTTP and requires an MCP API key in the request header:

```text
Authorization: Bearer <MCP_API_KEY>
```

Create a key while signed in at `/admin` under **MCP → API Keys**. Each key belongs to the CMS user who created it and can be restricted to individual operations.

The server exposes find, create, and update operations for media, partners, people, projects, and services. It exposes find and update operations for all page globals and site settings. Delete operations, the users collection, and experimental configuration/authentication tools are not exposed.

Enable only the permissions needed by a particular client. Never commit an MCP API key to the repository or include it in client-side code.

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and set a long random `PAYLOAD_SECRET`.

3. Run the app:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000/admin` and create the first CMS user.

Local development uses Wrangler's local D1/R2 simulation through `getPlatformProxy`, so Docker/Postgres are not needed.

## First Cloudflare Deploy

Wrangler must be authenticated before the remote resources can be created:

```bash
npx wrangler login
```

Create the D1 database and replace the placeholder `database_id` in `wrangler.jsonc` with the UUID returned by Cloudflare:

```bash
npx wrangler d1 create etera-website
```

Create the R2 bucket:

```bash
npx wrangler r2 bucket create etera-website-media
```

Set the production Payload secret:

```bash
openssl rand -hex 32 | npx wrangler secret put PAYLOAD_SECRET
```

Generate binding types after changing `wrangler.jsonc`:

```bash
npm run cf:typegen
```

Create and apply production migrations after schema changes:

```bash
npm run migrate:create
npm run cf:migrate
```

Deploy the app:

```bash
npm run cf:deploy
```

`wrangler.jsonc` attaches the Worker to `etera.trakiyski.work` as a custom domain. Change the route there only if the deployment should use the root domain or a different subdomain.

## Developer Notes

- CMS schema lives in `src/collections`, `src/globals`, and `src/payload.config.ts`.
- Public pages read through `src/lib/cms.ts`, which logs CMS failures and falls back to launch placeholder content when Payload is not reachable.
- Regenerate Payload TypeScript types after schema changes:

  ```bash
  npm run generate:types
  ```
