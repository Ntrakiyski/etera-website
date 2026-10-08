import { cache } from "react";
import { queryPayload } from "./cms";
import { legalBlocksToBody, normalizeLegalContent } from "./legal-normalization";
export type { LegalContent } from "./legal-normalization";
import terms from "../content/legal/terms-and-conditions.json";
import privacy from "../content/legal/privacy-policy.json";
import cookies from "../content/legal/cookie-policy.json";

const defaults = {
  terms: { title: terms.title, body: legalBlocksToBody(terms.blocks) },
  privacy: { title: privacy.title, body: legalBlocksToBody(privacy.blocks) },
  cookies: { title: cookies.title, body: legalBlocksToBody(cookies.blocks) },
  relatedPoliciesLabel: "Related policies",
};

export const getLegalPages = cache(async () => queryPayload(async (payload) => {
  const page = await payload.findGlobal({ slug: "legal-pages", depth: 0, draft: false });
  return {
    terms: normalizeLegalContent(page.terms, defaults.terms),
    privacy: normalizeLegalContent(page.privacy, defaults.privacy),
    cookies: normalizeLegalContent(page.cookies, defaults.cookies),
    relatedPoliciesLabel: typeof page.relatedPoliciesLabel === "string" && page.relatedPoliciesLabel.trim() ? page.relatedPoliciesLabel : defaults.relatedPoliciesLabel,
  };
}, defaults));
