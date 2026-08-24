import type { CollectionConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const serviceAreaOptions = [
  {
    label: "Brand Culture",
    value: "brand-culture",
  },
  {
    label: "Creative & Visual",
    value: "creative-visual",
  },
  {
    label: "Content & Influence",
    value: "content-influence",
  },
  {
    label: "Experiences & Partnerships",
    value: "experiences-partnerships",
  },
  {
    label: "Digital & Growth",
    value: "digital-growth",
  },
];

export const Services: CollectionConfig = {
  slug: "services",
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: anyone,
    update: loggedIn,
  },
  admin: {
    defaultColumns: ["name", "area", "sortOrder"],
    group: "Content",
    useAsTitle: "name",
  },
  defaultSort: "sortOrder",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "area",
      type: "select",
      options: serviceAreaOptions,
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "details",
      type: "richText",
    },
    {
      name: "featured",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: true,
    },
    {
      name: "sortOrder",
      type: "number",
      admin: {
        position: "sidebar",
      },
      defaultValue: 0,
    },
  ],
  labels: {
    plural: "Services",
    singular: "Service",
  },
  versions: {
    drafts: true,
  },
};
