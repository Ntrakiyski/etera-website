# CMS Options For ETÉRA

Checked on August 24, 2026. Requirement lens: open source, good editor UI, friendly to agent-assisted development, compatible with a Next.js site, and suitable for a compact creative atelier website with projects, people, partners, services, and media.

## Recommendation

Start with **Payload CMS** as the default candidate, but do not integrate it until Alexandra confirms exactly what must be editable.

Why Payload fits this repo:

- It is built for Next.js and TypeScript, so the CMS schema can live close to the app code.
- The content model is code-first, which is easier for agents to inspect, modify, diff, and refactor safely.
- It provides an admin panel, migrations, REST, GraphQL, auth, access control, uploads, and live preview from one owned codebase.
- It avoids introducing a separate CMS service unless we choose to split it later.

Use **Directus** instead if the priority becomes the best no-code admin experience plus direct AI/MCP operations over the content database.

Use **TinaCMS** only if the project should stay Git-backed with Markdown/MDX/JSON content and visual editing, with minimal database infrastructure.

Avoid **Decap CMS** for this project unless the brief becomes mostly static pages and simple Git-backed editing. It is clean and open source, but less ideal for relational project/client/media structures.

## Shortlist

| CMS | Fit | Strengths | Tradeoffs |
|---|---|---|---|
| Payload CMS | Best default for this repo | Next.js-native, TypeScript/code-first, full admin panel, REST/GraphQL/local APIs, auth, access control, uploads, live preview | Requires database/storage setup; editor UI is generated from schema rather than a pure no-code database studio |
| Directus | Best no-code/admin + agent tooling | Polished no-code interface, instant REST/GraphQL over SQL, native MCP server, AI assistant, strong asset/data management | Separate service/runtime from Next.js; schema often managed through Directus rather than the app repo |
| TinaCMS | Best Git-backed visual editing | Open-source, Git-backed, content lives as Markdown/MDX/JSON, visual editing, Next.js App Router docs | Usually depends on TinaCloud or self-hosted data layer for team editing; less natural for complex relational CMS data |
| Strapi | Mature general headless CMS | Popular open-source CMS, no-code content type builder, REST/GraphQL, extensible admin panel | Separate backend; less Next-native than Payload and less explicitly agent/MCP-oriented than Directus |
| Keystone | Developer-friendly GraphQL CMS | Schema-driven, GraphQL API, Admin UI, access control, custom React components | More backend-framework feel; less polished/no-code for non-technical editors than Directus/Payload |
| Decap CMS | Simple static/Git workflow | Open-source React app, Git-based content, friendly UI, rich text, previews, drag-and-drop media uploads | Best for simpler static content, not the strongest fit for project/case-study/media relationships |

## ETÉRA Content Model Draft

These are the likely CMS collections if we use Payload or Directus:

- Projects:
  - Brand/client name
  - Project name
  - Year
  - Services/role
  - Context
  - Visual gallery/video assets
  - Results/KPIs
  - Collaborators
  - Published/featured flags
- Partners:
  - Name
  - Logo
  - URL
  - Visibility/order
- People:
  - Name
  - Role/title
  - Bio
  - Portrait
  - Order
- Services:
  - Group
  - Service name
  - Description/details
  - Order
- Global site settings:
  - Contact email
  - Social links
  - Booking URL
  - SEO metadata
  - Footer/legal links
- Inquiry submissions:
  - Only if we decide to store form submissions in CMS instead of email/CRM.

## Sources Checked

- Payload: https://payloadcms.com/docs/getting-started/what-is-payload
- Directus: https://directus.com/
- Strapi: https://docs.strapi.io/cms/intro
- Keystone: https://keystonejs.com/
- TinaCMS: https://tina.io/docs
- Decap CMS: https://decapcms.org/docs/intro/
