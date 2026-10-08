import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { getLegalPages } from "@/lib/legal-content";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getLegalPages();
  return buildPageMetadata({
    description: "",
    path: "/cookie-policy",
    title: pages.cookies.title,
  });
}

export default async function LegalPage() {
  const pages = await getLegalPages();
  return <LegalDocument title={pages.cookies.title} body={pages.cookies.body} pages={pages} />;
}
