import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

const publicRoutes = ["/", "/the-atelier", "/services", "/contact"];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
