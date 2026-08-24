import { getServices, getServicesPage } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-10">
      <p className="mb-8 text-sm uppercase text-muted">{page.kicker}</p>
      <h1 className="max-w-4xl text-5xl font-medium leading-tight sm:text-7xl">
        {page.headline}
      </h1>
      <p className="mt-8 max-w-2xl text-xl leading-8 text-muted">
        {page.intro}
      </p>
      <div className="mt-16 divide-y divide-line border-y border-line">
        {services.map((service) => (
          <div
            key={service.id}
            className="grid gap-3 py-6 sm:grid-cols-[0.45fr_1fr] sm:gap-10"
          >
            <div>
              <p className="text-sm uppercase text-muted">{service.area}</p>
              <h2 className="mt-2 text-2xl">{service.name}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-7 text-muted">
              {service.summary}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
