import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/ArrowIcon";

import "./globals.css";

export const metadata: Metadata = {
  description: "The requested ETÉRA page could not be found.",
  title: "The missing element isn’t here | ETÉRA Creative Atelier",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <main className="not-found-page" id="main-content" tabIndex={-1}>
          <div>
            <Image
              alt="ETÉRA Creative Atelier"
              height={241}
              preload
              src="/design/assets/logo-etera-white.svg"
              unoptimized
              width={531}
            />
            <div className="not-found-page__inner">
              <div>
                <p className="not-found-page__code">Error / 404</p>
                <h1>The missing element isn’t here.</h1>
              </div>
              <div className="not-found-page__aside">
                <p>The page you’re looking for could not be found.</p>
                <Link className="editorial-link" href="/">
                  <span>Return to ETÉRA</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
