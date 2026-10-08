import type { Metadata, Viewport } from "next";

import { EntryMotion } from "@/components/EntryMotion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteSettings } from "@/lib/cms";
import { getSEOSettings, getSEOSiteUrl } from "@/lib/seo";

import "../globals.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f9f4f4",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOSettings();
  const images = seo.sharingImage ? [{
    alt: seo.sharingImage.alt,
    url: new URL(seo.sharingImage.url, getSEOSiteUrl(seo)),
  }] : undefined;

  return {
    applicationName: seo.siteName,
    icons: seo.siteIcon ? { icon: seo.siteIcon.url, apple: seo.siteIcon.url } : { icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }] },
    description: seo.defaultDescription,
    metadataBase: getSEOSiteUrl(seo),
    openGraph: {
      description: seo.defaultDescription,
      images,
      siteName: seo.siteName,
      title: seo.defaultTitle,
      type: "website",
    },
    robots: { index: seo.indexingEnabled, follow: true },
    title: {
      default: seo.defaultTitle,
      template: seo.titleSuffix ? `%s | ${seo.titleSuffix}` : "%s",
    },
    twitter: {
      card: "summary_large_image",
      creator: seo.twitterHandle || undefined,
      description: seo.defaultDescription,
      images,
      title: seo.defaultTitle,
    },
    verification: { google: seo.googleVerification || undefined },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, seo] = await Promise.all([getSiteSettings(), getSEOSettings()]);
  const siteUrl = getSEOSiteUrl(seo);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    description: seo.defaultDescription,
    email: settings.contactEmail,
    logo: new URL(settings.redLogo?.url || "/design/assets/logo-etera-red.svg", siteUrl).toString(),
    name: seo.siteName,
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
          {settings.copy.skip}
        </a>
        <SiteHeader settings={settings} />
        <EntryMotion />
        {children}
        <SiteFooter settings={settings} />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, { "@context": "https://schema.org", "@type": "WebSite", name: seo.siteName, url: siteUrl.toString() }]).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
