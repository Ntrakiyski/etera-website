const serviceGroups = [
  "Brand Culture",
  "Creative & Visual",
  "Content & Influence",
  "Experiences & Partnerships",
  "Digital & Growth",
];

export default function ServicesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-10">
      <p className="mb-8 text-sm uppercase text-muted">Services</p>
      <h1 className="max-w-4xl text-5xl font-medium leading-tight sm:text-7xl">
        A compact services structure for launch.
      </h1>
      <div className="mt-16 divide-y divide-line border-y border-line">
        {serviceGroups.map((group) => (
          <div
            key={group}
            className="flex items-center justify-between py-6 text-2xl"
          >
            <span>{group}</span>
            <span className="text-muted">+</span>
          </div>
        ))}
      </div>
    </main>
  );
}
