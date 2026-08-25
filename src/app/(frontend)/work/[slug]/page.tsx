import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { SerializedEditorState } from "lexical";

import { ArrowIcon } from "@/components/ArrowIcon";
import { getProjectBySlug, type RichTextContent } from "@/lib/cms";
import { isLaunchReadyProject } from "@/lib/content-readiness";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function ProjectRichText({ content }: { content: RichTextContent }) {
  return (
    <div className="project-rich-text">
      <RichText
        data={content as unknown as SerializedEditorState}
        disableIndent
      />
    </div>
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !isLaunchReadyProject(project)) {
    return buildPageMetadata({
      description: "The requested ETÉRA project could not be found.",
      path: `/work/${slug}`,
      title: "Project not found",
    });
  }

  return buildPageMetadata({
    description: project.overview || `${project.projectName} by ETÉRA.`,
    path: `/work/${project.slug}`,
    title: project.projectName,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !isLaunchReadyProject(project)) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="project-hero">
        <div className="project-hero__title">
          <Link href="/work">Selected Work</Link>
          <h1>{project.projectName}</h1>
        </div>
        <dl className="project-hero__meta">
          <div>
            <dt>Client</dt>
            <dd>{project.clientName}</dd>
          </div>
          {project.year ? (
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          ) : null}
          {project.services.length > 0 ? (
            <div>
              <dt>ETÉRA&apos;s role</dt>
              <dd>{project.services.map((service) => service.name).join(", ")}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <div className="project-hero__media">
        <Image
          alt={project.heroImage?.alt ?? ""}
          height={project.heroImage?.height ?? 1000}
          preload
          sizes="100vw"
          src={project.heroImage?.url ?? ""}
          unoptimized
          width={project.heroImage?.width ?? 1600}
        />
      </div>

      <section className="project-narrative">
        <div>
          <p>Context</p>
          {project.context ? (
            <ProjectRichText content={project.context} />
          ) : (
            <p>{project.overview}</p>
          )}
        </div>
        {project.approach ? (
          <div>
            <p>Approach</p>
            <ProjectRichText content={project.approach} />
          </div>
        ) : null}
      </section>

      {project.gallery.length > 0 ? (
        <section aria-label="Project gallery" className="project-gallery">
          {project.gallery.map((item, index) => (
            <figure data-layout={index % 3 === 1 ? "portrait" : "wide"} key={`${item.asset.url}-${index}`}>
              <Image
                alt={item.asset.alt}
                height={item.asset.height ?? 900}
                sizes="(max-width: 767px) 100vw, 82vw"
                src={item.asset.url}
                unoptimized
                width={item.asset.width ?? 1400}
              />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}

      {project.results.length > 0 || project.collaborators.length > 0 ? (
        <section className="project-credits">
          {project.results.length > 0 ? (
            <div>
              <h2>Results</h2>
              <dl>
                {project.results.map((result) => (
                  <div key={`${result.label}-${result.value}`}>
                    <dt>{result.label}</dt>
                    <dd>{result.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {project.collaborators.length > 0 ? (
            <div>
              <h2>Collaborators</h2>
              <dl>
                {project.collaborators.map((collaborator) => (
                  <div key={`${collaborator.role}-${collaborator.name}`}>
                    <dt>{collaborator.role || "Collaborator"}</dt>
                    <dd>{collaborator.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="page-close page-close--maroon">
        <h2>Let&apos;s define your era together.</h2>
        <Link href="/contact#inquiry">
          Start a Project
          <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
