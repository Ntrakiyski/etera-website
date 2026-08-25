import Link from "next/link";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/the-atelier", label: "The Atelier" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:px-10">
      <div className="flex flex-col items-start gap-5 border-b border-line pb-5 text-sm uppercase sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-semibold tracking-wide">
          ETÉRA
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted sm:gap-x-8"
        >
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
