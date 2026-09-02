import type { CollectionConfig } from "payload";

import { adminsOnly, adminsOrSelf, isAdminUser } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: adminsOnly,
    delete: adminsOnly,
    read: adminsOrSelf,
    update: adminsOrSelf,
  },
  admin: {
    group: "Admin",
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      defaultValue: "admin",
      access: {
        create: ({ req: { user } }) => isAdminUser(user),
        update: ({ req: { user } }) => isAdminUser(user),
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
};
