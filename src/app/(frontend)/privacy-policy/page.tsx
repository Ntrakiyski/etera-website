import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <main id="main-content" className="legal-pending">
      <h1>Privacy Policy</h1>
      <p>This page is awaiting its approved content.</p>
    </main>
  );
}
