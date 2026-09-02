import type { Metadata } from "next";

import { ServiceIndex } from "@/components/ServiceIndex";
import { getServices, getServicesPage } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();

  return buildPageMetadata({
    description: page.intro,
    path: "/services",
    title: "Services",
  });
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero page-hero--services">
        <div>
          <p>{page.kicker}</p>
          <h1>{page.headline}</h1>
        </div>
        <p className="page-hero__intro">{page.intro}</p>
      </header>

      <section aria-labelledby="services-capabilities-title" className="services-directory">
        <aside className="services-directory__aside">
          <p>Capabilities</p>
          <h2 id="services-capabilities-title">
            Strategy and execution, assembled around the brief.
          </h2>
          <p>
            ETÉRA brings the relevant disciplines together as one considered
            practice, with the approach and team shaped for each project.
          </p>
        </aside>
        <ServiceIndex services={services} tone="light" />
      </section>

    </main>
  );
}
