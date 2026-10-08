import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";

import type { LegalContent } from "@/lib/legal-content";

type RelatedPages = { terms: LegalContent; privacy: LegalContent; cookies: LegalContent; relatedPoliciesLabel: string };

export function LegalDocument({ title, body, pages }: LegalContent & { pages: RelatedPages }) {
  return (
    <main id="main-content" className="legal-document">
      <article>
        <h1>{title}</h1>
        <RichText data={body} disableIndent />
      </article>
      <nav aria-label={pages.relatedPoliciesLabel} className="legal-document__links">
        <Link href="/terms-and-conditions">{pages.terms.title}</Link>
        <Link href="/privacy-policy">{pages.privacy.title}</Link>
        <Link href="/cookie-policy">{pages.cookies.title}</Link>
      </nav>
    </main>
  );
}
