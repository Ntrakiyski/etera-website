import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import content from "@/content/legal/cookie-policy.json";

export const metadata: Metadata = { title: content.title };

export default function LegalPage() {
  return <LegalDocument title={content.title} blocks={content.blocks} />;
}
