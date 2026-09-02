import type { Metadata } from "next";
import Image from "next/image";

import { ProjectHoverCard } from "@/components/ProjectHoverCard";
import { getProjects, getWorkPage } from "@/lib/cms";
import { isLaunchReadyProject } from "@/lib/content-readiness";
import { buildPageMetadata } from "@/lib/metadata";
import {
  fillProjectPreview,
  projectCardItem,
  type ProjectCardItem,
} from "@/lib/project-previews";

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
  const projects = fillProjectPreview(
    allProjects
      .filter(isLaunchReadyProject)
      .map(projectCardItem)
      .filter((project): project is ProjectCardItem => Boolean(project)),
    6,
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero page-hero--work">
        <div>
          <p>{page.kicker}</p>
          <h1>{page.headline}</h1>
        </div>
        <p className="page-hero__intro">{page.intro}</p>
      </header>

      <section aria-label="Selected projects" className="work-index">
        {projects.map((project, index) => {
          const content = (
            <>
              <div className="work-index__media">
                <Image
                  alt={project.heroImage.alt}
                  height={project.heroImage.height ?? 900}
                  sizes="(max-width: 767px) 100vw, 85vw"
                  src={project.heroImage.url}
                  unoptimized
                  preload={index === 0}
                  width={project.heroImage.width ?? 1400}
                />
              </div>
              <div className="work-index__caption">
                <div>
                  <span>{project.clientName}</span>
                  <strong>{project.projectName}</strong>
                </div>
                <div>
                  <span>{project.year}</span>
                </div>
              </div>
            </>
          );

          return (
            <ProjectHoverCard
              className="work-index__item work-index__item--review"
              key={project.id}
              layout={index % 3 === 1 ? "offset" : "wide"}
            >
              {content}
            </ProjectHoverCard>
          );
        })}
      </section>
    </main>
  );
}
