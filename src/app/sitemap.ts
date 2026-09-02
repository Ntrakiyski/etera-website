import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/cms";
import { isLaunchReadyProject } from "@/lib/content-readiness";
import { getSiteUrl } from "@/lib/site";

const publicRoutes = ["/", "/work", "/the-atelier", "/services", "/contact"];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const projects = (await getProjects()).filter(isLaunchReadyProject);
  const workRoutes = projects.map((project) => `/work/${project.slug}`);

  return [...publicRoutes, ...workRoutes].map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
