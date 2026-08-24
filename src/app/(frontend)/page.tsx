import Link from "next/link";

import { getHomePage } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHomePage();

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
    </main>
  );
}
