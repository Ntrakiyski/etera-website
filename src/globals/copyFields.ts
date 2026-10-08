import type { Field } from "payload";

export function copyFields(defaults: Record<string, string>): Field {
  return {
    name: "copy",
    type: "group",
    label: "Page text",
    fields: Object.entries(defaults).map(([name, defaultValue]) => ({
      name, type: "textarea", defaultValue, required: true,
    })),
  };
}
