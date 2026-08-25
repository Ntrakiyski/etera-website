import Image from "next/image";

import { getProjects, getWorkPage } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const [page, projects] = await Promise.all([getWorkPage(), getProjects()]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-10">
      <p className="mb-8 text-sm uppercase text-muted">{page.kicker}</p>
      <h1 className="max-w-4xl text-5xl font-medium leading-tight sm:text-7xl">
        {page.headline}
      </h1>
      <p className="mt-8 max-w-2xl text-xl leading-8 text-muted">
        {page.intro}
      </p>
      {projects.length > 0 ? (
        <div className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          {projects.map((project) => (
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
                {[project.clientName, project.year].filter(Boolean).join(" / ")}
              </p>
              <h2 className="mt-6 text-3xl">{project.projectName}</h2>
              {project.overview ? (
                <p className="mt-5 text-lg leading-7 text-muted">
                  {project.overview}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </main>
  );
}
