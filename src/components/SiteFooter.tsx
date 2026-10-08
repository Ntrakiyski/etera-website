import Link from "next/link";

import type { SiteSettingsContent } from "@/lib/cms";
import { ArrowIcon } from "./ArrowIcon";

export function SiteFooter({ settings }: { settings: SiteSettingsContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-cta-band">
        <div className="footer-directory footer-cta-container">
        <div className="footer-directory__cta">
          <h2><span>{settings.copy.ctaLineOne}</span><span>{settings.copy.ctaLineTwo}</span></h2>
          <Link className="footer-directory__cta-link" href="/contact#inquiry">
            {settings.copy.project} <ArrowIcon />
          </Link>
        </div>
        </div>
      </div>
      <div className="footer-navigation-band">
      <div className="footer-directory footer-directory--navigation">
        <div className="footer-directory__main">
          <nav aria-label="Footer navigation" className="footer-directory__nav">
            <Link href="/">{settings.copy.home}</Link>
            <Link href="/the-atelier">{settings.copy.atelier}</Link>
            <Link href="/services">{settings.copy.services}</Link>
            <Link href="/contact">{settings.copy.contact}</Link>
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
              <Link href="/contact#inquiry">{settings.copy.project}</Link>
            </div>
          </div>
        </div>
        <div className="footer-directory__bottom">
          <p>© {new Date().getFullYear()} {settings.copy.copyright}</p>
          <Link href="/terms-and-conditions">{settings.copy.terms}</Link>
          <Link href="/privacy-policy">{settings.copy.privacy}</Link>
          <Link href="/cookie-policy">{settings.copy.cookies}</Link>
        </div>
      </div>
      </div>
    </footer>
  );
}
