import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
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
