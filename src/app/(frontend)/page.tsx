import type { Metadata } from "next";
import Image from "next/image";

import { AetherMedia } from "@/components/AetherMedia";
import { EditorialLink } from "@/components/EditorialLink";
import { HomeHeroSequence } from "@/components/HomeHeroSequence";
import { ServiceIndex } from "@/components/ServiceIndex";
import {
  getAtelierPage,
  getHomePage,
  getServices,
  getSiteSettings,
} from "@/lib/cms";
import { isLaunchReadyPartner } from "@/lib/content-readiness";
import { getSiteUrl } from "@/lib/site";


export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();

  return {
    alternates: { canonical: new URL("/", siteUrl) },
    description: settings.seoDescription,
    openGraph: {
      description: settings.seoDescription,
      images: [
        {
          alt: "The founders of ETÉRA Creative Atelier",
          url: new URL("/media/etera-founders.webp", siteUrl),
        },
      ],
      title: settings.seoTitle,
      type: "website",
      url: siteUrl,
    },
    title: { absolute: settings.seoTitle },
    twitter: {
      card: "summary_large_image",
      description: settings.seoDescription,
      images: [
        {
          alt: "The founders of ETÉRA Creative Atelier",
          url: new URL("/media/etera-founders.webp", siteUrl),
        },
      ],
      title: settings.seoTitle,
    },
  };
}

export default async function Home() {
  const [home, atelier, services] = await Promise.all([
    getHomePage(),
    getAtelierPage(),
    getServices(),
  ]);
  const partners = home.featuredPartners.filter(isLaunchReadyPartner);

  return (
    <main id="main-content" tabIndex={-1}>
      <HomeHeroSequence home={home} />

      <section className="atelier-preview">
        <AetherMedia image={home.atelierPreviewImage} label="Inside the Atelier" study="atelier" />
        <div className="atelier-preview__copy">
          <h2>{atelier.headline}</h2>
          <p>{atelier.intro}</p>
          <EditorialLink href="/the-atelier">{home.atelierLinkLabel}</EditorialLink>
        </div>
      </section>

      <section className="services-preview">
        <div className="services-preview__intro">
          <h2>{home.servicesHeading}</h2>
          <p>{home.servicesIntro}</p>
          <EditorialLink href="/services">{home.servicesLinkLabel}</EditorialLink>
        </div>
        <ServiceIndex services={services} tone="light" />
      </section>

      {partners.length > 0 ? (
        <section className="partners-preview">
          <div>
            <h2>{home.partnersHeading}</h2>
          </div>
          <div className="partners-preview__grid">
            {partners.map((partner) => (
              <article key={partner.id}>
                {partner.logo ? (
                  <Image
                    alt={partner.logo.alt}
                    height={partner.logo.height ?? 240}
                    src={partner.logo.url}
                    unoptimized
                    width={partner.logo.width ?? 640}
                  />
                ) : null}
                <h3>{partner.name}</h3>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
