import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/media/file/"],
      disallow: ["/admin", "/api/", "/design"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
