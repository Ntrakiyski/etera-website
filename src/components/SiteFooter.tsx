import Image from "next/image";
import Link from "next/link";

import type { SiteSettingsContent } from "@/lib/cms";

export function SiteFooter({ settings }: { settings: SiteSettingsContent }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__signature">
        <p>{settings.footerTagline}</p>
        <Image
          alt="ETÉRA Creative Atelier"
          loading="eager"
          src="/design/assets/logo-etera-white.svg"
          width={531}
          height={241}
          unoptimized
        />
      </div>
      <div className="site-footer__details">
        <nav aria-label="Footer navigation" className="site-footer__nav">
          <Link href="/work">Work</Link>
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
          ) : (
            <p>Social links pending confirmation.</p>
          )}
        </div>
        <div className="site-footer__legal">
          <p>© 2026 ETÉRA. All rights reserved.</p>
          <p>Privacy, cookie and terms copy pending approval.</p>
        </div>
      </div>
    </footer>
  );
}
