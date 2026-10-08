import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const ServicesPage: GlobalConfig = {
  slug: "services-page",
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
      defaultValue: "Services",
      required: true,
    },
    {
      name: "headline",
      type: "text",
      defaultValue: "A compact services structure for launch.",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      defaultValue:
        "Services are grouped into clear editorial areas so the first version stays focused and visual.",
    },
    {
      name: "capabilitiesKicker",
      type: "text",
      defaultValue: "Capabilities",
      required: true,
    },
    {
      name: "capabilitiesHeadline",
      type: "text",
      defaultValue: "Strategy and execution, assembled around the brief.",
      required: true,
    },
    {
      name: "capabilitiesIntro",
      type: "textarea",
      defaultValue:
        "ETÉRA brings the relevant disciplines together as one considered practice, with the approach and team shaped for each project.",
    },
    {
      name: "groupLabels",
      type: "group",
      fields: [
        {
          name: "brandCulture",
          type: "text",
          defaultValue: "Brand Culture",
          required: true,
        },
        {
          name: "creativeVisual",
          type: "text",
          defaultValue: "Creative & Visual",
          required: true,
        },
        {
          name: "contentInfluence",
          type: "text",
          defaultValue: "Content & Influence",
          required: true,
        },
        {
          name: "experiencesPartnerships",
          type: "text",
          defaultValue: "Experiences & Partnerships",
          required: true,
        },
        {
          name: "digitalGrowth",
          type: "text",
          defaultValue: "Digital & Growth",
          required: true,
        },
      ],
    },
  ],
  label: "Services Page",
  versions: {
    drafts: true,
  },
};
