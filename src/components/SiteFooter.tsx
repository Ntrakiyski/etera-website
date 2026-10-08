import Link from "next/link";

import type { SiteSettingsContent } from "@/lib/cms";
import { ArrowIcon } from "./ArrowIcon";

export function SiteFooter({ settings }: { settings: SiteSettingsContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-cta-band">
        <div className="footer-directory footer-cta-container">
        <div className="footer-directory__cta">
          <h2><span>Let&apos;s Define</span><span>Your Era Together.</span></h2>
          <Link className="footer-directory__cta-link" href="/contact#inquiry">
            Start a Project <ArrowIcon />
          </Link>
        </div>
        </div>
      </div>
      <div className="footer-navigation-band">
      <div className="footer-directory footer-directory--navigation">
        <div className="footer-directory__main">
          <nav aria-label="Footer navigation" className="footer-directory__nav">
            <Link href="/">Home</Link>
            <Link href="/the-atelier">The Atelier</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="footer-directory__aside">
            {settings.socialLinks.length > 0 ? (
              <nav aria-label="Social links" className="footer-directory__socials">
                {settings.socialLinks.map((link) => (
                  <a href={link.url} key={link.url} rel="noreferrer" target="_blank">{link.label}</a>
                ))}
              </nav>
            ) : null}
            <div className="footer-directory__contact">
              <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
              <Link href="/contact#inquiry">Start a Project</Link>
            </div>
          </div>
        </div>
        <div className="footer-directory__bottom">
          <p>© {new Date().getFullYear()} ETÉRA. All rights reserved.</p>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      </div>
    </footer>
  );
}
