import type { Metadata } from "next";
import type { SEOContent } from "./seo";

export function resolvePageMetadata(
  input: { title: string; description: string; path: string },
  settings: SEOContent,
  baseURL: URL,
  pageKey?: string,
): Metadata {
  const page = settings.pages[pageKey ?? ""];
  const home = input.path === "/";
  const title = page?.title || (home ? settings.defaultTitle : input.title);
  const description = page?.description || (home ? settings.defaultDescription : input.description || settings.defaultDescription);
  const canonical = page?.canonicalURL ? new URL(page.canonicalURL) : new URL(input.path, baseURL);
  const sharingTitle = page?.sharingTitle || title;
  const sharingDescription = page?.sharingDescription || description;
  const image = page?.sharingImage || settings.sharingImage;
  const images = [{
    url: new URL(image?.url ?? "/media/etera-founders.webp", baseURL),
    alt: image?.alt || "The founders of ETÉRA Creative Atelier",
    ...(image?.width ? { width: image.width } : {}),
    ...(image?.height ? { height: image.height } : {}),
  }];
  return {
    title: { absolute: !home && settings.titleSuffix ? `${title} | ${settings.titleSuffix}` : title },
    description,
    alternates: { canonical },
    robots: { index: settings.indexingEnabled && !page?.noIndex, follow: true },
    openGraph: { title: sharingTitle, description: sharingDescription, siteName: settings.siteName, url: canonical, type: "website", images },
    twitter: { card: "summary_large_image", title: sharingTitle, description: sharingDescription, images, ...(settings.twitterHandle ? { site: settings.twitterHandle, creator: settings.twitterHandle } : {}) },
    verification: settings.googleVerification ? { google: settings.googleVerification } : undefined,
  };
}
