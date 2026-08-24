import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
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
      defaultValue: "Contact",
      required: true,
    },
    {
      name: "headline",
      type: "text",
      defaultValue: "Let's define your era.",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      defaultValue:
        "The project inquiry form, booking path, and success state will be wired after the preferred workflow and booking tool are confirmed.",
      required: true,
    },
    {
      name: "email",
      type: "email",
      defaultValue: "hello@eteracreative.com",
      required: true,
    },
    {
      name: "successMessage",
      type: "textarea",
      defaultValue:
        "Thank you. We've received your inquiry and will get back to you once we've reviewed the project details.",
    },
  ],
  label: "Contact Page",
  versions: {
    drafts: true,
  },
};
