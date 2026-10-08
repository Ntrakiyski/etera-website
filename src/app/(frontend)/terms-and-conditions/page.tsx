import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { getLegalPages } from "@/lib/legal-content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getLegalPages();
  return { title: pages.terms.title };
}

export default async function LegalPage() {
  const pages = await getLegalPages();
  return <LegalDocument title={pages.terms.title} body={pages.terms.body} pages={pages} />;
}
