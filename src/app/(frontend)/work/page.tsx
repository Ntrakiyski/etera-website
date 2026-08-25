import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AetherMedia } from "@/components/AetherMedia";
import { ArrowIcon } from "@/components/ArrowIcon";
import { EditorialLink } from "@/components/EditorialLink";
import { getProjects, getWorkPage } from "@/lib/cms";
import { isLaunchReadyProject } from "@/lib/content-readiness";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWorkPage();

  return buildPageMetadata({
    description: page.intro,
    path: "/work",
    title: page.headline,
  });
}

export default async function WorkPage() {
  const [page, allProjects] = await Promise.all([getWorkPage(), getProjects()]);
  const projects = allProjects.filter(isLaunchReadyProject);

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero page-hero--work">
        <div>
          <p>{page.kicker}</p>
          <h1>{page.headline}</h1>
        </div>
        <p className="page-hero__intro">{page.intro}</p>
      </header>

      {projects.length > 0 ? (
        <section aria-label="Selected projects" className="work-index">
          {projects.map((project, index) => (
            <Link
              className="work-index__item"
              data-layout={index % 3 === 1 ? "offset" : "wide"}
              href={`/work/${project.slug}`}
              key={project.id}
            >
              <div className="work-index__media">
                <Image
                  alt={project.heroImage?.alt ?? ""}
                  height={project.heroImage?.height ?? 900}
                  sizes="(max-width: 767px) 100vw, 85vw"
                  src={project.heroImage?.url ?? ""}
                  unoptimized
                  width={project.heroImage?.width ?? 1400}
                />
              </div>
              <div className="work-index__caption">
                <div>
                  <span>{project.clientName}</span>
                  <strong>{project.projectName}</strong>
                </div>
                <div>
                  <span>{project.year}</span>
                  <ArrowIcon />
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="work-empty">
          <AetherMedia label="Art Direction Study" study="motion" />
          <div className="work-empty__copy">
            <p>Launch portfolio</p>
            <h2>Project materials are the remaining element.</h2>
            <p>
              Approved client names, imagery, roles, dates, results and
              collaborators have not yet been supplied. The archive is ready
              to become image-led as soon as that material arrives.
            </p>
            <EditorialLink href="/contact#inquiry">Discuss a project</EditorialLink>
          </div>
        </section>
      )}

      <section className="page-close page-close--powder">
        <h2>Work is selected. The approach is built for the brief.</h2>
        <Link href="/services">
          Explore Services
          <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
