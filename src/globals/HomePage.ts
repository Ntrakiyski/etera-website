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
      admin: { hidden: true },
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
        "We are a creative atelier that\nbuilds presence and shapes culture.",
      required: true,
    },
    {
      name: "heroAdditionalCopy",
      admin: { hidden: true },
      type: "textarea",
      defaultValue:
        "Strategy, creativity, cultural context and execution come together across brands, campaigns, content and experiences.",
    },
    {
      name: "heroCTA",
      type: "text",
      defaultValue: "Enter the atelier",
      required: true,
    },
    {
      name: "heroVideo",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { contains: "video/" } },
      admin: { description: "Background video. Leave empty to use the existing studio video." },
    },
    {
      name: "heroPoster",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { contains: "image/" } },
      admin: { description: "Still image shown while the video loads or autoplay is unavailable." },
    },
    {
      name: "atelierPreviewImage",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { contains: "image/" } },
    },
    {
      name: "atelierLinkLabel",
      type: "text",
      defaultValue: "Discover the Atelier",
      required: true,
      admin: { description: "The preview heading and introduction use the Atelier page's headline and introduction." },
    },
    {
      name: "servicesHeading",
      type: "text",
      defaultValue: "What We Do",
      required: true,
    },
    {
      name: "servicesIntro",
      type: "textarea",
      defaultValue: "ETÉRA builds the right approach and team around each brief. The capabilities stay broad; the presentation stays compact.",
      required: true,
    },
    {
      name: "servicesLinkLabel",
      type: "text",
      defaultValue: "Explore Services",
      required: true,
    },
    {
      name: "partnersHeading",
      type: "text",
      defaultValue: "Selected Partners",
      required: true,
    },
    {
      name: "methodSteps",
      admin: { hidden: true },
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
      admin: { hidden: true },
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
