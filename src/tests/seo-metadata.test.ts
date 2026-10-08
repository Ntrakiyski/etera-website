import assert from "node:assert/strict";
import { test } from "node:test";
import { resolvePageMetadata } from "../lib/seo-metadata.ts";
import type { SEOContent } from "../lib/seo.ts";

const defaults: SEOContent = {
  siteName: "ETÉRA", defaultTitle: "ETÉRA Creative Atelier", defaultDescription: "Site description", titleSuffix: "ETÉRA", siteURL: "", sharingImage: null, siteIcon: null,
  indexingEnabled: true, googleVerification: "", twitterHandle: "", pages: {},
};
test("SEO preserves page defaults and root domain", () => {
  const m = resolvePageMetadata({ title: "Services", description: "Page intro", path: "/services" }, defaults, new URL("https://example.com"), "services");
  assert.deepEqual(m.title, { absolute: "Services | ETÉRA" });
  assert.equal(m.description, "Page intro");
  assert.equal(String(m.alternates?.canonical), "https://example.com/services");
  assert.deepEqual(m.robots, { index: true, follow: true });
});
test("page sharing overrides stay separate from search and inherit custom image", () => {
  const s: SEOContent = { ...defaults, googleVerification: "proof", twitterHandle: "@etera", sharingImage: { url: "/cover.jpg", alt: "Cover" }, pages: { home: {
    title: "Search title", description: "Search description", sharingTitle: "Social title", sharingDescription: "Social description", sharingImage: null, canonicalURL: "https://canonical.example/", noIndex: true,
  } } };
  const m = resolvePageMetadata({ title: "Old", description: "Old", path: "/" }, s, new URL("https://example.com"), "home");
  assert.deepEqual(m.title, { absolute: "Search title" }); assert.equal(m.openGraph?.title, "Social title"); assert.equal(m.twitter?.description, "Social description");
  assert.equal(String(m.alternates?.canonical), "https://canonical.example/"); assert.deepEqual(m.robots, { index: false, follow: true }); assert.deepEqual(m.verification, { google: "proof" });
  assert.equal(String((m.openGraph?.images as {url:URL}[])[0].url), "https://example.com/cover.jpg");
});
test("global noindex takes precedence and blank suffix removes branding", () => {
  const m = resolvePageMetadata({ title: "Contact", description: "", path: "/contact" }, { ...defaults, titleSuffix: "", indexingEnabled: false }, new URL("https://example.com"));
  assert.deepEqual(m.title, { absolute: "Contact" }); assert.equal(m.description, "Site description"); assert.deepEqual(m.robots, { index: false, follow: true });
});
