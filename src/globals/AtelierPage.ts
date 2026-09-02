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
      name: "teamMembers",
      type: "array",
      admin: {
        description:
          "The core team shown on the Atelier page. Add, remove or reorder people here.",
      },
      defaultValue: [
        {
          description:
            "Alexandra builds meaningful brand narratives through strategy, storytelling and community. Her experience spans financial services, consumer brands, NGOs and local businesses, with a focus on identity, content and campaigns that inspire action.",
          name: "Alexandra Djurdjevic",
          position: "Brand & Marketing Strategist",
        },
        {
          description:
            "Yoana combines analytical thinking with creative direction across online and offline campaigns. Her work spans experiential activations, paid social, photoshoot direction and storyboarding, always focused on meaningful, results-driven ideas.",
          name: "Yoana Stoyanova",
          position: "Marketing Expert & Creative Strategist",
        },
      ],
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "position",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "portrait",
          type: "upload",
          filterOptions: {
            mimeType: {
              contains: "image/",
            },
          },
          label: "Portrait",
          relationTo: "media",
        },
      ],
      label: "Team Members",
      labels: {
        plural: "Team Members",
        singular: "Team Member",
      },
    },
    {
      name: "featuredPeople",
      type: "relationship",
      admin: {
        hidden: true,
      },
      hasMany: true,
      relationTo: "people",
    },
  ],
  label: "The Atelier Page",
  versions: {
    drafts: true,
  },
};
