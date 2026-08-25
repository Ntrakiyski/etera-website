import Link from "next/link";

import { ArrowIcon } from "./ArrowIcon";

export function EditorialLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link className="editorial-link" href={href}>
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}
