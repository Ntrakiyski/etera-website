import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

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
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      addRandomSuffix: true,
      alwaysInsertFields: true,
      clientUploads: true,
      collections: {
        media: true,
      },
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
