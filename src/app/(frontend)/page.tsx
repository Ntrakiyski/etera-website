import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AetherMedia } from "@/components/AetherMedia";
import { EditorialLink } from "@/components/EditorialLink";
import { HomeHeroSequence } from "@/components/HomeHeroSequence";
import { ServiceIndex } from "@/components/ServiceIndex";
import {
  getAtelierPage,
  getHomePage,
  getProjects,
  getServices,
  getSiteSettings,
} from "@/lib/cms";
import {
  isLaunchReadyPartner,
  isLaunchReadyProject,
} from "@/lib/content-readiness";
import { getSiteUrl } from "@/lib/site";
import {
  fillProjectPreview,
  projectCardItem,
  type ProjectCardItem,
} from "@/lib/project-previews";

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
  const [home, atelier, services, allProjects] = await Promise.all([
    getHomePage(),
    getAtelierPage(),
    getServices(),
    getProjects(),
  ]);
  const readyProjects = allProjects.filter(isLaunchReadyProject);
  const featuredIds = new Set(home.featuredProjects.map((project) => project.id));
  const orderedProjects = [
    ...home.featuredProjects.filter(isLaunchReadyProject),
    ...readyProjects.filter((project) => !featuredIds.has(project.id)),
  ];
  const projects = fillProjectPreview(
    orderedProjects
      .map(projectCardItem)
      .filter((project): project is ProjectCardItem => Boolean(project)),
    3,
  );
  const partners = home.featuredPartners.filter(isLaunchReadyPartner);

  return (
    <main id="main-content" tabIndex={-1}>
      <HomeHeroSequence />

      <section className="work-preview" id="selected-work">
        <div className="work-preview__heading">
          <h2>Selected Work</h2>
        </div>
        <div className="project-preview-grid">
          {projects.map((project, index) => {
            const content = (
              <>
                <div className="project-preview__media">
                  <Image
                    alt={project.heroImage.alt}
                    height={project.heroImage.height ?? 900}
                    sizes="(max-width: 767px) 100vw, 70vw"
                    src={project.heroImage.url}
                    unoptimized
                    width={project.heroImage.width ?? 1200}
                  />
                </div>
                <div className="project-preview__meta">
                  <strong>{project.projectName}</strong>
                  <span>
                    {[project.clientName, project.year]
                      .filter(Boolean)
                      .join(" / ")}
                  </span>
                </div>
              </>
            );

            return project.href ? (
              <Link
                className="project-preview"
                data-orientation={index % 2 === 0 ? "landscape" : "portrait"}
                href={project.href}
                key={project.id}
              >
                {content}
              </Link>
            ) : (
              <article
                className="project-preview project-preview--review"
                data-orientation={index % 2 === 0 ? "landscape" : "portrait"}
                key={project.id}
              >
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="atelier-preview">
        <AetherMedia label="Inside the Atelier" study="atelier" />
        <div className="atelier-preview__copy">
          <h2>{atelier.headline}</h2>
          <p>{atelier.intro}</p>
          <EditorialLink href="/the-atelier">Discover the Atelier</EditorialLink>
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

      {partners.length > 0 ? (
        <section className="partners-preview">
          <div>
            <h2>Selected Partners</h2>
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
