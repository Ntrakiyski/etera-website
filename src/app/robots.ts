import type { MetadataRoute } from "next";

import { getSEOSettings, getSEOSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSEOSettings();
  const siteUrl = getSEOSiteUrl(seo);

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/media/file/"],
      // Crawlers must be able to read noindex tags when indexing is disabled.
      disallow: ["/admin", "/api/", "/design"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
