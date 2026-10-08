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
      name: "inquiryLabels",
      type: "group",
      fields: [
        {
          name: "heading",
          type: "text",
          defaultValue: "Tell us what you are shaping.",
          required: true,
        },
        {
          name: "help",
          type: "textarea",
          defaultValue:
            "Complete the form to prepare a project inquiry in your email app. Nothing is sent until you review and send the message.",
          required: true,
        },
        {
          name: "name",
          type: "text",
          defaultValue: "Full Name",
          required: true,
        },
        {
          name: "brand",
          type: "text",
          defaultValue: "Company Name (if applicable)",
          required: true,
        },
        {
          name: "email",
          type: "text",
          defaultValue: "Email Address",
          required: true,
        },
        {
          name: "services",
          type: "text",
          defaultValue: "What can we help with?",
          required: true,
        },
        {
          name: "servicesHelp",
          type: "text",
          defaultValue: "Select all that apply",
          required: true,
        },
        {
          name: "project",
          type: "text",
          defaultValue: "Tell us about the project",
          required: true,
        },
        {
          name: "budget",
          type: "text",
          defaultValue: "Budget (optional)",
          required: true,
        },
        {
          name: "additional",
          type: "text",
          defaultValue: "Additional information (optional)",
          required: true,
        },
        {
          name: "submit",
          type: "text",
          defaultValue: "Send Inquiry",
          required: true,
        },
      ],
    },
  ],
  label: "Contact Page",
  versions: {
    drafts: true,
  },
};
