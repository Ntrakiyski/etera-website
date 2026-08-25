import type { Metadata } from "next";

import { ArrowIcon } from "@/components/ArrowIcon";
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

      <section aria-labelledby="contact-direct-title" className="contact-direct">
        <div className="contact-direct__intro">
          <p>Direct contact</p>
          <h2 id="contact-direct-title">Choose the most useful first step.</h2>
          <p>
            Send a direct note, arrange a conversation when booking is
            available, or prepare a structured inquiry below.
          </p>
        </div>
        <div className="contact-direct__options">
          <article>
            <p>Project inquiries</p>
            <h3>
              <a href={`mailto:${page.email}`}>
                {page.email}
                <ArrowIcon />
              </a>
            </h3>
            <p>Use this address for a direct introduction or project brief.</p>
          </article>
          <article>
            <p>Book a call</p>
            {settings.bookingURL ? (
              <>
                <h3>
                  <a
                    href={settings.bookingURL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Choose a time
                    <ArrowIcon />
                  </a>
                </h3>
                <p>The booking page opens in a new tab.</p>
              </>
            ) : (
              <p className="contact-direct__pending">
                The booking provider and call link are pending confirmation.
              </p>
            )}
          </article>
        </div>
      </section>

      <InquiryForm email={page.email} />

      <section aria-labelledby="contact-workflow-title" className="contact-workflow">
        <div>
          <p>Current inquiry workflow</p>
          <h2 id="contact-workflow-title">
            Your details stay in your browser until you open the email draft.
          </h2>
        </div>
        <div>
          <p>
            The website does not currently transmit or store inquiry details.
            Complete the form, open the prepared message in your email app, and
            send it from there. ETÉRA&apos;s final delivery workflow is still
            awaiting approval.
          </p>
          <a className="editorial-link" href={`mailto:${page.email}`}>
            Write directly
            <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  );
}
