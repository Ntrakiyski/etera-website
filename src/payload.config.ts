import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { r2Storage } from "@payloadcms/storage-r2";
import { getCloudflareContext, type CloudflareContext } from "@opennextjs/cloudflare";
import path from "path";
import { buildConfig } from "payload";
import type { GetPlatformProxyOptions } from "wrangler";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Partners } from "./collections/Partners";
import { People } from "./collections/People";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { AtelierPage } from "./globals/AtelierPage";
import { ContactPage } from "./globals/ContactPage";
import { HomePage } from "./globals/HomePage";
import { ServicesPage } from "./globals/ServicesPage";
import { SiteSettings } from "./globals/SiteSettings";
import { WorkPage } from "./globals/WorkPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const realpath = (value: string) => {
  try {
    return value ? path.resolve(value) : undefined;
  } catch {
    return undefined;
  }
};

const isPayloadCLI = process.argv.some((value) =>
  realpath(value)?.endsWith(path.join("payload", "bin.js")),
);
const isProduction = process.env.NODE_ENV === "production";
const shouldUseRemoteBindings =
  isProduction && process.env.PAYLOAD_CLOUDFLARE_LOCAL !== "1";
const shouldUseWranglerContext =
  process.env.PAYLOAD_CLOUDFLARE_CONTEXT === "wrangler" ||
  process.env.PAYLOAD_CLOUDFLARE_LOCAL === "1" ||
  isPayloadCLI ||
  !isProduction;

const cloudflare =
  shouldUseWranglerContext
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true });

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Projects, People, Partners],
  editor: lexicalEditor(),
  globals: [
    HomePage,
    WorkPage,
    AtelierPage,
    ServicesPage,
    ContactPage,
    SiteSettings,
  ],
  graphQL: {
    disable: true,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1 as D1Database,
    idType: "uuid",
  }),
  plugins: [
    mcpPlugin({
      collections: {
        media: {
          description:
            "ETÉRA's media library for images and documents used throughout the website.",
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
        partners: {
          description:
            "Organizations and brands displayed as ETÉRA partners on the website.",
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
        people: {
          description:
            "People profiles with names, roles, biographies, portraits, and display order.",
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
        projects: {
          description:
            "ETÉRA portfolio projects, including their presentation copy, media, services, results, ordering, and publication status.",
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
        services: {
          description:
            "ETÉRA service offerings, categories, descriptions, ordering, and publication status.",
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
      },
      globals: {
        "atelier-page": {
          description:
            "Content for the Atelier page, including the atelier story, team members, portraits, and method.",
          enabled: {
            find: true,
            update: true,
          },
        },
        "contact-page": {
          description:
            "Content for the Contact page, including its heading, introduction, and contact email.",
          enabled: {
            find: true,
            update: true,
          },
        },
        "home-page": {
          description:
            "Content for the ETÉRA homepage, including the hero, introduction, section headings, and calls to action.",
          enabled: {
            find: true,
            update: true,
          },
        },
        "services-page": {
          description:
            "Content for the Services page, including its heading and introduction.",
          enabled: {
            find: true,
            update: true,
          },
        },
        "site-settings": {
          description:
            "Site-wide ETÉRA settings, including contact details, booking URL, footer, social links, and SEO metadata.",
          enabled: {
            find: true,
            update: true,
          },
        },
        "work-page": {
          description:
            "Content for the Work index page, including its heading and introduction.",
          enabled: {
            find: true,
            update: true,
          },
        },
      },
      userCollection: "users",
    }),
    r2Storage({
      alwaysInsertFields: true,
      bucket: cloudflare.env.R2 as R2Bucket,
      clientUploads: false,
      collections: {
        media: true,
      },
    }),
  ],
});

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: shouldUseRemoteBindings,
      } satisfies GetPlatformProxyOptions),
  );
}
