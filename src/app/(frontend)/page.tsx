import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AetherMedia } from "@/components/AetherMedia";
import { ArrowIcon } from "@/components/ArrowIcon";
import { EditorialLink } from "@/components/EditorialLink";
import { MethodSequence } from "@/components/MethodSequence";
import { ServiceIndex } from "@/components/ServiceIndex";
import {
  getAtelierPage,
  getHomePage,
  getServices,
  getSiteSettings,
} from "@/lib/cms";
import {
  isLaunchReadyPartner,
  isLaunchReadyProject,
} from "@/lib/content-readiness";
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
          alt: "ETÉRA Aether art-direction study",
          url: new URL("/design/assets/aether-hero.webp", siteUrl),
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
          alt: "ETÉRA Aether art-direction study",
          url: new URL("/design/assets/aether-hero.webp", siteUrl),
        },
      ],
      title: settings.seoTitle,
    },
  };
}

export default async function Home() {
  const [home, atelier, services, settings] = await Promise.all([
    getHomePage(),
    getAtelierPage(),
    getServices(),
    getSiteSettings(),
  ]);
  const projects = home.featuredProjects.filter(isLaunchReadyProject);
  const partners = home.featuredPartners.filter(isLaunchReadyPartner);

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <div className="home-hero__copy">
          <h1>{home.heroHeadline}</h1>
          <p className="home-hero__lead">{home.heroSupportingCopy}</p>
          {home.heroAdditionalCopy ? (
            <p className="home-hero__support">{home.heroAdditionalCopy}</p>
          ) : null}
          <EditorialLink href="/the-atelier">{home.heroCTA}</EditorialLink>
        </div>
        <AetherMedia
          className="home-hero__media"
          label="Aether Study 01"
          preload
          study="hero"
        />
        <a className="home-hero__scroll" href="#selected-work">
          <span>Scroll to explore</span>
          <ArrowIcon direction="down" />
        </a>
      </section>

      <section className="work-preview" id="selected-work">
        <div className="work-preview__heading">
          <h2>Selected Work</h2>
          <p>
            A future home for approved projects, campaign worlds and the roles
            ETÉRA shaped within them.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="project-preview-grid">
            {projects.slice(0, 2).map((project, index) => (
              <Link
                className="project-preview"
                data-orientation={index % 2 === 0 ? "landscape" : "portrait"}
                href={`/work/${project.slug}`}
                key={project.id}
              >
                <div className="project-preview__media">
                  <Image
                    alt={project.heroImage?.alt ?? ""}
                    height={project.heroImage?.height ?? 900}
                    sizes="(max-width: 767px) 100vw, 70vw"
                    src={project.heroImage?.url ?? ""}
                    unoptimized
                    width={project.heroImage?.width ?? 1200}
                  />
                </div>
                <div className="project-preview__meta">
                  <strong>{project.projectName}</strong>
                  <span>{[project.clientName, project.year].filter(Boolean).join(" / ")}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="work-preview__study">
            <AetherMedia label="Art Direction Study" study="motion" />
            <div className="work-preview__pending">
              <span aria-hidden="true">01</span>
              <h3>Portfolio materials are being prepared for launch.</h3>
              <p>
                This study shows the intended crop, movement and visual rhythm.
                It does not represent client work or project proof.
              </p>
              <EditorialLink href="/work">View the Work page</EditorialLink>
            </div>
          </div>
        )}
      </section>

      <section className="atelier-preview">
        <AetherMedia label="Aether Study 02" study="atelier" />
        <div className="atelier-preview__copy">
          <h2>{atelier.headline}</h2>
          <p>{atelier.intro}</p>
          <EditorialLink href="/the-atelier">Discover the Atelier</EditorialLink>
          <MethodSequence steps={home.methodSteps} />
        </div>
      </section>

      <section className="services-preview">
        <div className="services-preview__intro">
          <h2>What We Do</h2>
          <p>
            ETÉRA builds the right approach and team around each brief. The
            capabilities stay broad; the presentation stays compact.
          </p>
          <EditorialLink href="/services">Explore Services</EditorialLink>
        </div>
        <ServiceIndex services={services} tone="dark" />
      </section>

      <section className="partners-preview">
        <div>
          <h2>Selected Partners</h2>
          <p>Relationships are shown only when names, assets and permissions are approved.</p>
        </div>
        {partners.length > 0 ? (
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
        ) : (
          <p className="partners-preview__pending">
            Partner names and logo permissions are pending client confirmation.
          </p>
        )}
      </section>

      <section className="home-contact">
        <div>
          <p>{settings.footerTagline}</p>
          <h2>Let&apos;s define your era together.</h2>
        </div>
        <div className="home-contact__actions">
          <Link className="home-contact__primary" href="/contact#inquiry">
            Start a Project
            <ArrowIcon />
          </Link>
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
        </div>
      </section>
    </main>
  );
}
