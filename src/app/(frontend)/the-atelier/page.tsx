import type { Metadata } from "next";
import Image from "next/image";

import { AetherMedia } from "@/components/AetherMedia";
import { EditorialLink } from "@/components/EditorialLink";
import { MethodSequence } from "@/components/MethodSequence";
import { getAtelierPage } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";


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
        <AetherMedia label={page.copy.storyLabel} image={page.storyImage ?? undefined} preload study="atelier" />
        <div className="atelier-story__copy">
          <h2>{page.copy.storyHeading}</h2>
          <p>{page.aetherNarrative}</p>
          <p>{page.copy.storyAdditional}</p>
        </div>
      </section>

      <section className="atelier-model">
        <div className="atelier-model__statement">
          <h2>{page.copy.teamHeading}</h2>
          <p>{page.copy.teamIntro}</p>
        </div>
        <div className="people-grid">
          {page.teamMembers.map((person) => {
            const portrait = person.portrait?.url ?? (person.name.startsWith("Alexandra")
              ? "/media/joana-profile.jpg"
              : /^(Yoana|Joana)/.test(person.name) ? "/media/alexandra-profile.jpg" : null);
            return (
              <article className={portrait ? "people-grid__person--with-portrait" : undefined} key={person.id}>
                {portrait ? (
                  <div className="people-grid__portrait">
                    <Image
                      alt={`Portrait of ${person.name}`}
                      fill
                      sizes="(max-width: 767px) 110px, 160px"
                      src={portrait}
                      unoptimized
                    />
                  </div>
                ) : null}
                <div className="people-grid__copy">
                  <p>{person.position}</p>
                  <h3>{person.name}</h3>
                  <p>{person.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="atelier-method">
        <div>
          <h2 className="atelier-method__heading">
            <Image alt="ETÉRA" src={page.methodLogo?.url ?? "/design/assets/logo-etera-red-wordmark.svg"} width={266} height={96} unoptimized />
            <span>{page.copy.methodHeading}</span>
          </h2>
          <p>{page.copy.methodIntro}</p>
        </div>
        <div>
          <MethodSequence steps={page.methodSteps} />
          <EditorialLink href="/services">{page.copy.servicesLink}</EditorialLink>
        </div>
      </section>

    </main>
  );
}
