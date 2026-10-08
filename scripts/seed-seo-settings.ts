import { getPayload } from "payload";
import config from "../src/payload.config";
const payload = await getPayload({ config });
const seo = await payload.findGlobal({ slug: "seo-settings", depth: 0 });
if (!seo.id) {
  const legacy = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  await payload.updateGlobal({ slug: "seo-settings", data: {
    siteName: "ETÉRA Creative Atelier", defaultTitle: legacy.seoTitle,
    defaultDescription: legacy.seoDescription, titleSuffix: "ETÉRA Creative Atelier",
    indexingEnabled: true, _status: "published",
  } });
}
console.log("SEO defaults initialized; existing editor settings retained.");
process.exit(0);
