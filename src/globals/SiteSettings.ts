import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: anyone,
    update: loggedIn,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "contactEmail",
      type: "email",
      defaultValue: "hello@eteracreative.com",
      required: true,
    },
    {
      name: "bookingURL",
      type: "text",
      label: "Booking URL",
    },
    {
      name: "footerTagline",
      type: "text",
      defaultValue: "Define your era.",
      required: true,
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "seoTitle",
      type: "text",
      defaultValue: "ETÉRA Creative Atelier",
      required: true,
    },
    {
      name: "seoDescription",
      type: "textarea",
      defaultValue:
        "ETÉRA is a creative atelier that builds presence and shapes culture.",
      required: true,
    },
  ],
  label: "Site Settings",
};
