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
        { name: "ready", type: "textarea", defaultValue: "Your inquiry has been sent. A copy is on its way to your email address.", required: true },
        { name: "openDraft", type: "text", defaultValue: "Open email draft", admin: { hidden: true } },
        { name: "verificationError", type: "text", defaultValue: "Please complete the security check before sending. If it does not load, try again or email us directly.", required: true },
        { name: "sending", type: "text", defaultValue: "Sending inquiry…", required: true },
        { name: "sendError", type: "textarea", defaultValue: "Your inquiry could not be sent. Please try again or email us directly.", required: true },
        { name: "rateLimitError", type: "textarea", defaultValue: "Too many attempts. Please wait a few minutes before trying again, or email us directly.", required: true },
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
            "Send your project brief directly to ETÉRA. You will receive a copy by email.",
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
