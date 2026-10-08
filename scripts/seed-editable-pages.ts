import { readFile } from "node:fs/promises";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { inquiryOptions } from "../src/content/editable-copy";
import { legalBlocksToBody } from "../src/lib/legal-normalization";
import terms from "../src/content/legal/terms-and-conditions.json";
import privacy from "../src/content/legal/privacy-policy.json";
import cookies from "../src/content/legal/cookie-policy.json";

const payload = await getPayload({ config });
const home = await payload.findGlobal({ slug: "home-page", depth: 0 });
const homeUpdates: Record<string, string> = {};
if (["Learn more", "Discover ETÉRA"].includes(home.heroCTA)) homeUpdates.heroCTA = "Enter the atelier";
if (home.heroSupportingCopy === "ETÉRA is a creative atelier that builds presence and shapes culture.") {
  homeUpdates.heroSupportingCopy = "We are a creative atelier that\nbuilds presence and shapes culture.";
}
if (Object.keys(homeUpdates).length) await payload.updateGlobal({ slug: "home-page", data: homeUpdates });

const atelier = await payload.findGlobal({ slug: "atelier-page", depth: 0 });
const members = atelier.teamMembers ?? [];
let portraitsChanged = false;
for (const person of members) {
  if (person.portrait) continue;
  const alexandra = person.name.startsWith("Alexandra");
  if (!alexandra && !/^(Yoana|Joana)/.test(person.name)) continue;
  const filename = alexandra ? "etera-alexandra-approved.jpg" : "etera-yoana-approved.jpg";
  const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
  let media = existing.docs[0];
  if (!media) {
    // Original supplied filenames were reversed, as confirmed by the client.
    const data = await readFile(`public/media/${alexandra ? "joana" : "alexandra"}-profile.jpg`);
    media = await payload.create({ collection: "media", data: { alt: `Portrait of ${person.name}` },
      file: { data, mimetype: "image/jpeg", name: filename, size: data.length } });
  }
  person.portrait = media.id;
  portraitsChanged = true;
}
if (portraitsChanged || !atelier.methodSteps?.length) await payload.updateGlobal({ slug: "atelier-page", data: {
  ...(portraitsChanged ? { teamMembers: members } : {}),
  ...(!atelier.methodSteps?.length ? { methodSteps: ["Discover", "Define", "Create", "Elevate"].map(label => ({ label })) } : {}),
} });
const contact = await payload.findGlobal({ slug: "contact-page", depth: 0 });
if (!contact.serviceOptions?.length) await payload.updateGlobal({ slug: "contact-page", data: { serviceOptions: inquiryOptions.map(label => ({ label })) } });
const legal = await payload.findGlobal({ slug: "legal-pages", depth: 0 });
if (!legal.id) await payload.updateGlobal({ slug: "legal-pages", data: {
  _status: "published", relatedPoliciesLabel: "Related policies",
  terms: { title: terms.title, body: legalBlocksToBody(terms.blocks) },
  privacy: { title: privacy.title, body: legalBlocksToBody(privacy.blocks) },
  cookies: { title: cookies.title, body: legalBlocksToBody(cookies.blocks) },
} });
console.log("Editable page defaults and approved founder portraits initialized; existing editor changes retained.");
process.exit(0);
