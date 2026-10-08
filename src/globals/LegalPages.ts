import type { GlobalConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { legalBlocksToBody } from "../lib/legal-normalization";
import cookiePolicy from "../content/legal/cookie-policy.json";
import privacyPolicy from "../content/legal/privacy-policy.json";
import terms from "../content/legal/terms-and-conditions.json";

export const LegalPages: GlobalConfig = {
  slug: "legal-pages",
  label: "Legal Pages",
  admin: { group: "Pages" },
  access: { read: anyone, update: loggedIn },
  versions: { drafts: true },
  fields: [
    { name: "relatedPoliciesLabel", type: "text", defaultValue: "Related policies", required: true },
    ...[
      { name: "terms", label: "Website Terms of Use", content: terms },
      { name: "privacy", label: "Privacy Policy", content: privacyPolicy },
      { name: "cookies", label: "Cookie Policy", content: cookiePolicy },
    ].map(({ name, label, content }) => ({
      name,
      label,
      type: "group" as const,
      fields: [
        { name: "title", type: "text" as const, defaultValue: content.title, required: true },
        {
          name: "body",
          type: "richText" as const,
          defaultValue: legalBlocksToBody(content.blocks),
          admin: { description: "Edit the approved document using headings, paragraphs and lists." },
        },
      ],
    })),
  ],
};
