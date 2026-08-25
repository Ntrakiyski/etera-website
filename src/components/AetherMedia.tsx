import Image from "next/image";

const studies = {
  atelier: {
    alt: "Hands arranging material, color and image studies on a worktable",
    height: 1024,
    src: "/design/assets/aether-atelier.webp",
    width: 1536,
  },
  hero: {
    alt: "Translucent maroon and black material moving around glass and reflective metal",
    height: 1003,
    src: "/design/assets/aether-hero.webp",
    width: 1568,
  },
  motion: {
    alt: "An anonymous figure moving behind translucent powder-blue fabric",
    height: 1536,
    src: "/design/assets/aether-motion.webp",
    width: 1024,
  },
} as const;

export function AetherMedia({
  className = "",
  label,
  preload = false,
  study,
}: {
  className?: string;
  label: string;
  preload?: boolean;
  study: keyof typeof studies;
}) {
  const image = studies[study];

  return (
    <figure className={`aether-media ${className}`.trim()}>
      <div className="aether-media__frame">
        <Image
          alt={image.alt}
          height={image.height}
          preload={preload}
          sizes="(max-width: 767px) 100vw, 60vw"
          src={image.src}
          width={image.width}
        />
      </div>
      <figcaption>
        <strong>{label}</strong>
        <span>Original art-direction study. Not client work.</span>
      </figcaption>
    </figure>
  );
}
