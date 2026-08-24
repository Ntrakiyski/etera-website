import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const AtelierPage: GlobalConfig = {
  slug: "atelier-page",
  access: {
    read: anyone,
    update: loggedIn,
  },
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "kicker",
      type: "text",
      defaultValue: "The Atelier",
      required: true,
    },
    {
      name: "headline",
      type: "text",
      defaultValue: "Strategy, creativity and attention to every detail.",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      defaultValue:
        "ETÉRA is an independent creative atelier built around the belief that strong brands are shaped through the right balance of strategy, creativity, cultural context, and effort.",
      required: true,
    },
    {
      name: "aetherNarrative",
      type: "textarea",
      defaultValue:
        "The Aether narrative and founder/team content will be shaped once the final brand materials arrive.",
    },
    {
      name: "featuredPeople",
      type: "relationship",
      hasMany: true,
      relationTo: "people",
    },
  ],
  label: "The Atelier Page",
  versions: {
    drafts: true,
  },
};
