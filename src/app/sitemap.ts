import type { MetadataRoute } from "next";

import { getSEOSettings, getSEOSiteUrl, seoRoutes } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSEOSettings();
  if (!seo.indexingEnabled) return [];

  const siteUrl = getSEOSiteUrl(seo);
  return Object.entries(seoRoutes).flatMap(([route, key]) => {
    const page = seo.pages[key];
    const url = new URL(route, siteUrl).toString();
    return page.noIndex || (page.canonicalURL && page.canonicalURL !== url)
      ? []
      : [{ url }];
  });
}
