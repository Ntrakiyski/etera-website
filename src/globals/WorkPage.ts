import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const WorkPage: GlobalConfig = {
  slug: "work-page",
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
      defaultValue: "Work",
      required: true,
    },
    {
      name: "headline",
      type: "text",
      defaultValue: "Selected Work",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      defaultValue:
        "A selection of projects, campaigns, and brand work. Final project content and visuals are pending from ETÉRA.",
      required: true,
    },
  ],
  label: "Work Page",
  versions: {
    drafts: true,
  },
};
