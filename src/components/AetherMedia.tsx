import Image from "next/image";

import type { MediaSummary } from "@/lib/cms";

const studies = {
  atelier: {
    alt: "The ETÉRA founders developing a creative direction at the studio moodboard",
    height: 1600,
    src: "/media/etera-atelier-team.webp",
    width: 2400,
  },
  hero: {
    alt: "The founders of ETÉRA Creative Atelier",
    height: 1600,
    src: "/media/etera-founders.webp",
    width: 2400,
  },
  motion: {
    alt: "An ETÉRA studio card placed in the pocket of a pair of jeans",
    height: 2400,
    src: "/media/etera-work-detail.webp",
    width: 1600,
  },
} as const;

export function AetherMedia({
  className = "",
  image: uploadedImage,
  label,
  preload = false,
  study,
}: {
  className?: string;
  image?: MediaSummary | null;
  label: string;
  preload?: boolean;
  study: keyof typeof studies;
}) {
  const image = uploadedImage
    ? { ...studies[study], ...uploadedImage, src: uploadedImage.url }
    : studies[study];

  return (
    <figure
      aria-label={label}
      className={`aether-media ${className}`.trim()}
    >
      <div className="aether-media__frame">
        <Image
          alt={image.alt}
          height={image.height}
          preload={preload}
          sizes="(max-width: 767px) 100vw, 60vw"
          src={image.src}
          unoptimized={Boolean(uploadedImage)}
          width={image.width}
        />
      </div>
    </figure>
  );
}
