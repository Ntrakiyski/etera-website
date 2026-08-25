import Link from "next/link";
import Image from "next/image";

import { getHomePage, getPartners, getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [home, partners, settings] = await Promise.all([
    getHomePage(),
    getPartners(),
    getSiteSettings(),
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10">
      <header className="flex items-center justify-between border-b border-line pb-5 text-sm uppercase">
        <Link href="/" className="font-semibold tracking-wide">
          ETÉRA
        </Link>
        <nav className="flex gap-5 text-xs text-muted sm:gap-8">
          <Link href="/work">Work</Link>
          <Link href="/the-atelier">The Atelier</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="grid flex-1 content-center gap-10 py-24 sm:py-32 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-8 text-sm uppercase text-muted">{home.heroKicker}</p>
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

      {partners.length > 0 ? (
        <section className="border-t border-line py-12">
          <p className="text-sm uppercase text-muted">Creative network</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {partners.map((partner) => (
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
                <h2 className="text-2xl">{partner.name}</h2>
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
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
          {settings.socialLinks.map((link) => (
            <a key={link.url} href={link.url} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
