import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProjects, getSiteSettings } from "@/lib/cms";
import { isLaunchReadyProject } from "@/lib/content-readiness";
import { getSiteUrl } from "@/lib/site";

import "../globals.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f9f4f4",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    applicationName: "ETÉRA Creative Atelier",
    description: settings.seoDescription,
    metadataBase: getSiteUrl(),
    openGraph: {
      description: settings.seoDescription,
      siteName: "ETÉRA Creative Atelier",
      title: settings.seoTitle,
      type: "website",
    },
    title: {
      default: settings.seoTitle,
      template: "%s | ETÉRA Creative Atelier",
    },
    twitter: {
      card: "summary_large_image",
      description: settings.seoDescription,
      title: settings.seoTitle,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);
  const showWork = projects.some(isLaunchReadyProject);
  const siteUrl = getSiteUrl();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    description: settings.seoDescription,
    email: settings.contactEmail,
    logo: new URL("/design/assets/logo-etera-red.svg", siteUrl).toString(),
    name: "ETÉRA Creative Atelier",
    slogan: settings.footerTagline,
    ...(settings.socialLinks.length > 0
      ? { sameAs: settings.socialLinks.map((link) => link.url) }
      : {}),
    url: siteUrl.toString(),
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader showWork={showWork} />
        {children}
        <SiteFooter settings={settings} showWork={showWork} />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
