import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  access: {
    read: anyone,
    update: loggedIn,
  },
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "heroKicker",
      type: "text",
      defaultValue: "Creative Atelier",
      required: true,
    },
    {
      name: "heroHeadline",
      type: "text",
      defaultValue: "Define your era.",
      required: true,
    },
    {
      name: "heroSupportingCopy",
      type: "textarea",
      defaultValue:
        "ETÉRA is a creative atelier that builds presence and shapes culture.",
      required: true,
    },
    {
      name: "heroAdditionalCopy",
      type: "textarea",
      defaultValue:
        "Strategy, creativity, cultural context and execution come together across brands, campaigns, content and experiences.",
    },
    {
      name: "heroCTA",
      type: "text",
      defaultValue: "Discover ETÉRA",
      required: true,
    },
    {
      name: "methodSteps",
      type: "array",
      defaultValue: [
        {
          label: "Discover",
        },
        {
          label: "Define",
        },
        {
          label: "Create",
        },
        {
          label: "Elevate",
        },
      ],
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
      required: true,
    },
    {
      name: "featuredProjects",
      type: "relationship",
      hasMany: true,
      relationTo: "projects",
    },
    {
      name: "featuredPartners",
      type: "relationship",
      hasMany: true,
      relationTo: "partners",
    },
  ],
  label: "Home Page",
  versions: {
    drafts: true,
  },
};
