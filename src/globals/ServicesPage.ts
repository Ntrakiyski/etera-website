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
  ],
  label: "Services Page",
  versions: {
    drafts: true,
  },
};
