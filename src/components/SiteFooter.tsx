import Image from "next/image";
import Link from "next/link";

import type { SiteSettingsContent } from "@/lib/cms";
import { ArrowIcon } from "./ArrowIcon";

export function SiteFooter({
  settings,
  showWork,
}: {
  settings: SiteSettingsContent;
  showWork: boolean;
}) {
  return (
    <footer className="site-footer">
      <div className="site-footer__cta">
        <h2>Let&apos;s Define Your Era Together.</h2>
        <Link className="site-footer__cta-link" href="/contact#inquiry">
          Start a Project
          <ArrowIcon />
        </Link>
      </div>
      <div className="site-footer__details">
        <Link href="/" className="site-footer__logo" aria-label="ETÉRA home">
          <Image
            alt="ETÉRA Creative Atelier"
            src="/design/assets/logo-etera-white.svg"
            width={177}
            height={80}
            unoptimized
          />
        </Link>
        <nav aria-label="Footer navigation" className="site-footer__nav">
          {showWork ? <Link href="/work">Work</Link> : null}
          <Link href="/the-atelier">The Atelier</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="site-footer__contact">
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
          {settings.socialLinks.length > 0 ? (
            <div className="site-footer__socials">
              {settings.socialLinks.map((link) => (
                <a href={link.url} key={link.url} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="site-footer__legal">
          <p>© 2026 ETÉRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
