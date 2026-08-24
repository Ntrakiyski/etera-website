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
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        height: 300,
        position: "centre",
        width: 400,
      },
      {
        name: "card",
        height: 1200,
        position: "centre",
        width: 900,
      },
      {
        name: "wide",
        height: 1200,
        position: "centre",
        width: 1800,
      },
    ],
    mimeTypes: ["image/*", "application/pdf"],
    staticDir: "media",
  },
};
