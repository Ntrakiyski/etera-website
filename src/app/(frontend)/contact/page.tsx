import type { Metadata } from "next";
import { cloudflare } from "@/payload.config";

import { InquiryForm } from "@/components/InquiryForm";
import { getContactPage, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  return buildPageMetadata({
    description: page.intro,
    path: "/contact",
    title: "Contact",
  });
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  const siteKey = cloudflare.env.TURNSTILE_SITE_KEY;

  return (
    <main id="main-content" tabIndex={-1}>
      <header className="page-hero page-hero--contact">
        <div>
          <p>{page.kicker}</p>
          <h1>{page.headline}</h1>
        </div>
        <p className="page-hero__intro">{page.intro}</p>
      </header>

      <section
        aria-labelledby="contact-calendar-title"
        className="contact-calendar"
      >
        <div className="contact-calendar__intro">
          <p>{page.copy.bookingKicker}</p>
          <h2 id="contact-calendar-title">{page.copy.bookingHeading}</h2>
          <p>{page.copy.bookingIntro}</p>
        </div>
        <div className="contact-calendar__embed">
          <iframe
            loading="lazy"
            src={settings.bookingURL}
            title={page.copy.bookingFrameTitle}
          />
        </div>
      </section>

      <InquiryForm siteKey={siteKey} email={page.email} labels={page.inquiryLabels} serviceOptions={page.serviceOptions} />
    </main>
  );
}
