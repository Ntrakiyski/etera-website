import Image from "next/image";

import { SiteHeader } from "@/components/SiteHeader";
import { getAtelierPage } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function TheAtelierPage() {
  const page = await getAtelierPage();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-10">
        <p className="mb-8 text-sm uppercase text-muted">{page.kicker}</p>
        <h1 className="max-w-4xl text-5xl font-medium leading-tight sm:text-7xl">
          {page.headline}
        </h1>
        <div className="mt-12 max-w-3xl space-y-6 text-xl leading-8 text-muted">
          <p>{page.intro}</p>
          <p>{page.aetherNarrative}</p>
        </div>
        {page.featuredPeople.length > 0 ? (
          <section className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
            {page.featuredPeople.map((person) => (
              <article key={person.id}>
                {person.portrait ? (
                  <Image
                    src={person.portrait.url}
                    alt={person.portrait.alt}
                    width={person.portrait.width ?? 720}
                    height={person.portrait.height ?? 900}
                    className="mb-6 aspect-[4/5] w-full object-cover"
                    unoptimized
                  />
                ) : null}
                <p className="text-sm uppercase text-muted">{person.role}</p>
                <h2 className="mt-4 text-3xl">{person.name}</h2>
                {person.bio ? (
                  <p className="mt-5 text-lg leading-7 text-muted">
                    {person.bio}
                  </p>
                ) : null}
              </article>
            ))}
          </section>
        ) : null}
      </main>
    </>
  );
}
