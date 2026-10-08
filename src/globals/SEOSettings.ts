import type { Field, GlobalConfig } from "payload";
import { anyone, loggedIn } from "../access";

const absoluteURL = (value: unknown) => {
  if (!value) return true;
  try { const url = new URL(String(value)); return (["https:", "http:"].includes(url.protocol) && !url.username && !url.password) || "Use a full https:// URL."; }
  catch { return "Use a full https:// URL."; }
};
const image: Field = { name: "sharingImage", type: "upload", relationTo: "media", filterOptions: { mimeType: { contains: "image/" } }, admin: { description: "Recommended: 1200 × 630 px. Alt text comes from Media." } };

export const SEOSettings: GlobalConfig = {
  slug: "seo-settings",
  label: "SEO & Social Sharing",
  admin: { group: "Settings", description: "Control search and sharing metadata. Google and social platforms may rewrite or cache previews; publishing updates the website's tags." },
  access: { read: anyone, update: loggedIn },
  versions: { drafts: true },
  fields: [
    { name: "siteName", type: "text", defaultValue: "ETÉRA Creative Atelier", required: true },
    { name: "defaultTitle", type: "text", admin: { description: "Default search title. Blank keeps the existing site title." } },
    { name: "defaultDescription", type: "textarea", admin: { description: "Default search description. Aim for roughly 150–160 characters; search engines may rewrite it." } },
    { name: "titleSuffix", type: "text", defaultValue: "ETÉRA Creative Atelier", admin: { description: "Added after inner-page search titles. Blank removes the suffix." } },
    { name: "siteURL", label: "Primary website URL", type: "text", validate: absoluteURL, admin: { description: "Leave blank to use the deployed domain. Controls canonical URLs, sitemap URLs and sharing URLs. Only set a domain that serves this website." } },
    image,
    { ...image, name: "siteIcon", label: "Website icon", admin: { description: "Square PNG recommended, 512 × 512 px. Used for browser tabs and search-result icons." } },
    { name: "indexingEnabled", type: "checkbox", defaultValue: true, admin: { description: "Disable to ask search engines not to index the entire public site. This does not make pages private." } },
    { name: "googleVerification", label: "Google Search Console verification token", type: "text", admin: { description: "Paste only the content value from Google's HTML verification tag." } },
    { name: "twitterHandle", label: "X / Twitter account", type: "text", validate: (value: unknown) => !value || /^@[A-Za-z0-9_]{1,15}$/.test(String(value)) || "Use @ followed by a valid account handle." },
    ...[
      ["home", "Home"], ["atelier", "The Atelier"], ["services", "Services"], ["contact", "Contact"],
      ["terms", "Terms and Conditions"], ["privacy", "Privacy Policy"], ["cookies", "Cookie Policy"],
    ].map(([name, label]): Field => ({ name, label, type: "group", admin: { description: "Blank fields inherit the page/site defaults. Social fields can differ from the search snippet." }, fields: [
      { name: "title", label: "Search title", type: "text" },
      { name: "description", label: "Search description", type: "textarea" },
      { name: "sharingTitle", label: "Social sharing title", type: "text" },
      { name: "sharingDescription", label: "Social sharing description", type: "textarea" },
      image,
      { name: "canonicalURL", type: "text", validate: absoluteURL, admin: { description: "Advanced: optional preferred URL for this page. Leave blank for the normal page URL." } },
      { name: "noIndex", label: "Hide this page from search engines", type: "checkbox", defaultValue: false, admin: { description: "Adds noindex and removes the page from the sitemap. The page remains public." } },
    ] })),
  ],
};
