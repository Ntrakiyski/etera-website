import type { CollectionConfig, TextFieldSingleValidation } from "payload";

import { anyone, loggedIn } from "../access";

const validateUniqueProjectSlug: TextFieldSingleValidation = async (
  value,
  { id, req },
) => {
  if (!value) {
    return "A project URL is required.";
  }

  const existing = await req.payload.find({
    collection: "projects",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: value,
      },
    },
  });

  return existing.docs.some((project) => String(project.id) !== String(id))
    ? "This project URL is already in use."
    : true;
};

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    create: loggedIn,
    delete: loggedIn,
    read: anyone,
    update: loggedIn,
  },
  admin: {
    defaultColumns: ["clientName", "projectName", "year", "_status"],
    group: "Content",
    useAsTitle: "projectName",
  },
  defaultSort: "sortOrder",
  fields: [
    {
      name: "clientName",
      type: "text",
      label: "Client / Brand Name",
      required: true,
    },
    {
      name: "projectName",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "URL-safe project identifier, for example brand-campaign.",
        position: "sidebar",
      },
      required: true,
      unique: true,
      validate: validateUniqueProjectSlug,
    },
    {
      name: "year",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      admin: {
        position: "sidebar",
      },
      defaultValue: 0,
    },
    {
      name: "services",
      type: "relationship",
      hasMany: true,
      relationTo: "services",
    },
    {
      name: "heroImage",
      type: "upload",
      filterOptions: {
        mimeType: {
          contains: "image/",
        },
      },
      label: "Hero Image",
      relationTo: "media",
    },
    {
      name: "overview",
      type: "textarea",
      label: "Short Overview",
    },
    {
      name: "context",
      type: "richText",
    },
    {
      name: "approach",
      type: "richText",
    },
    {
      name: "results",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "asset",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
    {
      name: "collaborators",
      type: "array",
      fields: [
        {
          name: "role",
          type: "text",
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: "Projects",
    singular: "Project",
  },
  versions: {
    drafts: true,
  },
};
