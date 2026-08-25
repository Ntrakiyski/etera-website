import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AetherMedia } from "@/components/AetherMedia";
import { ArrowIcon } from "@/components/ArrowIcon";
import { MethodSequence } from "@/components/MethodSequence";
import { getAtelierPage } from "@/lib/cms";
import { isLaunchReadyPerson } from "@/lib/content-readiness";
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
  const people = page.featuredPeople.filter(isLaunchReadyPerson);

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
        <AetherMedia label="Aether Study 02" preload study="atelier" />
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
            The atelier model brings specialists together around the needs of
            the project. Founder profiles and portraits will be added only
            after ETÉRA approves the final biographies and imagery.
          </p>
        </div>
        {people.length > 0 ? (
          <div className="people-grid">
            {people.map((person) => (
              <article key={person.id}>
                {person.portrait ? (
                  <Image
                    alt={person.portrait.alt}
                    height={person.portrait.height ?? 1000}
                    sizes="(max-width: 767px) 100vw, 45vw"
                    src={person.portrait.url}
                    unoptimized
                    width={person.portrait.width ?? 800}
                  />
                ) : null}
                <p>{person.role}</p>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="people-pending">
            <span>People</span>
            <p>Names, titles, biographies and portraits pending client approval.</p>
          </div>
        )}
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

      <section className="page-close page-close--maroon">
        <h2>Let&apos;s define your era.</h2>
        <Link href="/contact#inquiry">
          Start a Project
          <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
