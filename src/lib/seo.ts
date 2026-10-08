import { cache } from "react";
import { getSiteSettings, queryPayload, type MediaSummary } from "./cms";
import { getSiteUrl } from "./site";

export const seoRoutes = { "/": "home", "/the-atelier": "atelier", "/services": "services", "/contact": "contact", "/terms-and-conditions": "terms", "/privacy-policy": "privacy", "/cookie-policy": "cookies" } as const;
export type PageSEO = { title: string; description: string; sharingTitle: string; sharingDescription: string; sharingImage: MediaSummary | null; canonicalURL: string; noIndex: boolean };
export type SEOContent = { siteName: string; defaultTitle: string; defaultDescription: string; titleSuffix: string; siteURL: string; sharingImage: MediaSummary | null; siteIcon: MediaSummary | null; indexingEnabled: boolean; googleVerification: string; twitterHandle: string; pages: Record<string, PageSEO> };
const text = (v: unknown) => typeof v === "string" ? v.trim() : "";
const url = (v: unknown) => { try { const u = new URL(text(v)); return ["http:", "https:"].includes(u.protocol) && !u.username && !u.password ? u.toString() : ""; } catch { return ""; } };
const media = (v: unknown): MediaSummary | null => { const m = v as Record<string, unknown> | null; return m && typeof m === "object" && text(m.url) ? { url: text(m.url), alt: text(m.alt), width: typeof m.width === "number" ? m.width : undefined, height: typeof m.height === "number" ? m.height : undefined } : null; };

export function normalizeSEO(data: Record<string, unknown>, legacy: { seoTitle: string; seoDescription: string }): SEOContent {
  return {
    siteName: text(data.siteName) || legacy.seoTitle,
    defaultTitle: text(data.defaultTitle) || legacy.seoTitle,
    defaultDescription: text(data.defaultDescription) || legacy.seoDescription,
    titleSuffix: typeof data.titleSuffix === "string" ? data.titleSuffix.trim() : "ETÉRA Creative Atelier",
    siteURL: url(data.siteURL), sharingImage: media(data.sharingImage), siteIcon: media(data.siteIcon), indexingEnabled: data.indexingEnabled !== false,
    googleVerification: text(data.googleVerification), twitterHandle: /^@[A-Za-z0-9_]{1,15}$/.test(text(data.twitterHandle)) ? text(data.twitterHandle) : "",
    pages: Object.fromEntries(Object.values(seoRoutes).map(key => { const p = (data[key] ?? {}) as Record<string, unknown>; return [key, {
      title: text(p.title), description: text(p.description), sharingTitle: text(p.sharingTitle), sharingDescription: text(p.sharingDescription), sharingImage: media(p.sharingImage), canonicalURL: url(p.canonicalURL), noIndex: p.noIndex === true,
    }]; })),
  };
}
export const getSEOSettings = cache(async () => {
  const legacy = await getSiteSettings();
  return queryPayload(async payload => normalizeSEO(await payload.findGlobal({ slug: "seo-settings", depth: 1, draft: false }), legacy), normalizeSEO({}, legacy));
});
export function getSEOSiteUrl(settings: SEOContent): URL { return settings.siteURL ? new URL("/", settings.siteURL) : getSiteUrl(); }
