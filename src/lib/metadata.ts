import type { Metadata } from "next";

import { getSiteUrl } from "./site";

export function buildPageMetadata({
  description,
  path,
  title,
}: {
  description: string;
  path: string;
  title: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = new URL(path, siteUrl);
  const image = new URL("/design/assets/aether-hero.webp", siteUrl);

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: "ETÉRA Aether art-direction study",
          url: image,
        },
      ],
      title,
      type: "website",
      url: canonical,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [
        {
          alt: "ETÉRA Aether art-direction study",
          url: image,
        },
      ],
      title,
    },
  };
}
