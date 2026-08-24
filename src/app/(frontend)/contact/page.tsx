import { getContactPage } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-10">
      <p className="mb-8 text-sm uppercase text-muted">{page.kicker}</p>
      <h1 className="max-w-4xl text-5xl font-medium leading-tight sm:text-7xl">
        {page.headline}
      </h1>
      <p className="mt-8 max-w-2xl text-xl leading-8 text-muted">
        {page.intro}
      </p>
      <a
        href={`mailto:${page.email}`}
        className="mt-12 inline-flex border-b border-foreground pb-1 text-xl"
      >
        {page.email}
      </a>
    </main>
  );
}
