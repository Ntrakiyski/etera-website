import type { Metadata } from "next";
import Image from "next/image";

import { AetherMedia } from "@/components/AetherMedia";
import { MethodSequence } from "@/components/MethodSequence";
import { getAtelierPage } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

const methodSteps = ["Discover", "Define", "Create", "Elevate"];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAtelierPage();

  return buildPageMetadata({
    description: page.intro,
    path: "/the-atelier",
    title: "The Atelier",
  });
}

export default async function TheAtelierPage() {
  const page = await getAtelierPage();

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero page-hero--atelier">
        <div>
          <p>{page.kicker}</p>
          <h1>{page.headline}</h1>
        </div>
        <p className="page-hero__intro">{page.intro}</p>
      </header>

      <section className="atelier-story">
        <AetherMedia label="Inside the Atelier" preload study="atelier" />
        <div className="atelier-story__copy">
          <h2>The missing element.</h2>
          <p>{page.aetherNarrative}</p>
          <p>
            ETÉRA brings identity, communication, visual language and
            perception into one connected presence, shaped for each context.
          </p>
        </div>
      </section>

      <section className="atelier-model">
        <div className="atelier-model__statement">
          <h2>A small core. The right wider team.</h2>
          <p>
            ETÉRA&apos;s core combines brand strategy, marketing and creative
            direction, then expands with the right specialists for each brief.
          </p>
        </div>
        <div className="people-grid">
          {page.teamMembers.map((person) => (
            <article key={person.id}>
              {person.portrait ? (
                <div className="people-grid__portrait">
                  <Image
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(max-width: 767px) 100vw, 45vw"
                    src={person.portrait.url}
                    unoptimized
                  />
                </div>
              ) : null}
              <p>{person.position}</p>
              <h3>{person.name}</h3>
              <p>{person.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="atelier-method">
        <div>
          <h2>ETÉRA Method</h2>
          <p>
            A precise sequence that stays flexible enough to meet the project
            where it is.
          </p>
        </div>
        <MethodSequence steps={methodSteps} />
      </section>

    </main>
  );
}
