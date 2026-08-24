import type { CollectionConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: anyone,
    update: loggedIn,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
    staticDir: "media",
  },
};
