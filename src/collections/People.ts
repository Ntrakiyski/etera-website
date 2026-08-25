import type { CollectionConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const People: CollectionConfig = {
  slug: "people",
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: anyone,
    update: loggedIn,
  },
  admin: {
    defaultColumns: ["name", "role", "sortOrder"],
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
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "portrait",
      type: "upload",
      filterOptions: {
        mimeType: {
          contains: "image/",
        },
      },
      relationTo: "media",
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
    plural: "People",
    singular: "Person",
  },
};
