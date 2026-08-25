import type { CollectionConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const Partners: CollectionConfig = {
  slug: "partners",
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: anyone,
    update: loggedIn,
  },
  admin: {
    defaultColumns: ["name", "featured", "sortOrder"],
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
      name: "logo",
      type: "upload",
      filterOptions: {
        mimeType: {
          contains: "image/",
        },
      },
      relationTo: "media",
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "url",
      type: "text",
      label: "Website URL",
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
    plural: "Partners",
    singular: "Partner",
  },
};
