import type { Metadata } from "next";
import { getSEOSettings, getSEOSiteUrl, seoRoutes } from "./seo";
import { resolvePageMetadata } from "./seo-metadata";

export async function buildPageMetadata(input: { title: string; description: string; path: string }): Promise<Metadata> {
  const settings = await getSEOSettings();
  return resolvePageMetadata(input, settings, getSEOSiteUrl(settings), seoRoutes[input.path as keyof typeof seoRoutes]);
}
