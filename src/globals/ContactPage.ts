import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";
import { contactCopy, inquiryOptions } from "../content/editable-copy";
import { copyFields } from "./copyFields";

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
    copyFields(contactCopy),
    { name: "serviceOptions", type: "array", minRows: 1, required: true, defaultValue: inquiryOptions.map(label => ({ label })), fields: [{ name: "label", type: "text", required: true }] },
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
        { name: "ready", type: "textarea", defaultValue: "Your inquiry draft is ready. Open it in your email app and send it to complete the inquiry.", required: true },
        { name: "openDraft", type: "text", defaultValue: "Open email draft", required: true },
        { name: "nameError", type: "text", defaultValue: "Enter your full name.", required: true },
        { name: "emailError", type: "text", defaultValue: "Enter a valid email address.", required: true },
        { name: "servicesError", type: "text", defaultValue: "Select at least one service.", required: true },
        { name: "projectError", type: "text", defaultValue: "Tell us about your project.", required: true },
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
