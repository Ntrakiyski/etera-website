import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

const publicRoutes = ["/", "/work", "/the-atelier", "/services", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
