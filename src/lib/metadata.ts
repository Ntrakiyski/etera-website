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
  const image = new URL("/media/etera-founders.webp", siteUrl);

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: "The founders of ETÉRA Creative Atelier",
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
          alt: "The founders of ETÉRA Creative Atelier",
          url: image,
        },
      ],
      title,
    },
  };
}
