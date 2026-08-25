import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { SiteHeader } from "@/components/SiteHeader";
import { getHomePage, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    description: settings.seoDescription,
    title: settings.seoTitle,
  };
}

export default async function Home() {
  const [home, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-6 sm:px-10">
        <section className="grid flex-1 content-center gap-10 py-24 sm:py-32 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-8 text-sm uppercase text-muted">
              {home.heroKicker}
            </p>
            <h1 className="max-w-4xl text-6xl font-medium leading-none sm:text-8xl">
              {home.heroHeadline}
            </h1>
          </div>
          <div className="max-w-xl space-y-6 text-xl leading-8 text-muted">
            <p>{home.heroSupportingCopy}</p>
            <p>{home.heroAdditionalCopy}</p>
            <Link
              href="/the-atelier"
              className="inline-flex border-b border-foreground pb-1 text-base text-foreground"
            >
              {home.heroCTA}
            </Link>
          </div>
        </section>

        <section className="grid gap-6 border-t border-line py-12 sm:grid-cols-4">
          {home.methodSteps.map((step, index) => (
            <div key={step} className="border-t border-line pt-4">
              <p className="mb-8 text-sm text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-2xl">{step}</h2>
            </div>
          ))}
        </section>

        {home.featuredProjects.length > 0 ? (
          <section className="border-t border-line py-12">
            <p className="text-sm uppercase text-muted">Selected work</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {home.featuredProjects.map((project) => (
                <article key={project.id} className="border-t border-line pt-5">
                  {project.heroImage ? (
                    <div className="mb-6 flex aspect-[4/3] items-center justify-center bg-white p-10">
                      <Image
                        src={project.heroImage.url}
                        alt={project.heroImage.alt}
                        width={project.heroImage.width ?? 960}
                        height={project.heroImage.height ?? 720}
                        className="max-h-full w-auto max-w-full object-contain"
                        unoptimized
                      />
                    </div>
                  ) : null}
                  <p className="text-sm uppercase text-muted">
                    {[project.clientName, project.year]
                      .filter(Boolean)
                      .join(" / ")}
                  </p>
                  <h2 className="mt-4 text-3xl">{project.projectName}</h2>
                  {project.overview ? (
                    <p className="mt-4 max-w-xl text-lg leading-7 text-muted">
                      {project.overview}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {home.featuredPartners.length > 0 ? (
          <section className="border-t border-line py-12">
            <p className="text-sm uppercase text-muted">Creative network</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {home.featuredPartners.map((partner) => (
                <article key={partner.id} className="border-t border-line pt-5">
                  {partner.logo ? (
                    <Image
                      src={partner.logo.url}
                      alt={partner.logo.alt}
                      width={partner.logo.width ?? 640}
                      height={partner.logo.height ?? 240}
                      className="mb-8 h-14 w-auto max-w-full object-contain object-left"
                      unoptimized
                    />
                  ) : null}
                  {partner.url ? (
                    <a href={partner.url} rel="noreferrer" target="_blank">
                      <h2 className="text-2xl">{partner.name}</h2>
                    </a>
                  ) : (
                    <h2 className="text-2xl">{partner.name}</h2>
                  )}
                  {partner.summary ? (
                    <p className="mt-4 max-w-xl text-lg leading-7 text-muted">
                      {partner.summary}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="flex flex-col gap-4 border-t border-line py-8 text-sm sm:flex-row sm:items-end sm:justify-between">
          <p className="text-2xl">{settings.footerTagline}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <a href={`mailto:${settings.contactEmail}`}>
              {settings.contactEmail}
            </a>
            {settings.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}
