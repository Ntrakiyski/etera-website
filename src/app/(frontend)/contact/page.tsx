import type { Metadata } from "next";

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
          <p>Book a call</p>
          <h2 id="contact-calendar-title">Choose a time.</h2>
          <p>
            Schedule a conversation directly with ETÉRA using the calendar.
          </p>
        </div>
        <div className="contact-calendar__embed">
          <iframe
            loading="lazy"
            src={settings.bookingURL}
            title="Book a call with ETÉRA"
          />
        </div>
      </section>

      <InquiryForm email={page.email} />
    </main>
  );
}
