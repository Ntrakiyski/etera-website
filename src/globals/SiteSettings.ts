import type { GlobalConfig } from "payload";

import { anyone, loggedIn } from "../access";
import { siteCopy } from "../content/editable-copy";
import { copyFields } from "./copyFields";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: anyone,
    update: loggedIn,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    copyFields(siteCopy),
    { name: "redLogo", type: "upload", relationTo: "media", filterOptions: { mimeType: { contains: "image/" } } },
    { name: "whiteLogo", type: "upload", relationTo: "media", filterOptions: { mimeType: { contains: "image/" } } },
    {
      name: "contactEmail",
      type: "email",
      defaultValue: "hello@eteracreative.com",
      required: true,
    },
    {
      name: "bookingURL",
      type: "text",
      defaultValue:
        "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1cN59tKh527V9JQcQH9yd31V3Z0VRf9Ue3MMUZ58UwPWM-gVdLhEacKQurbpdEbFh-pLZv07sm?gv=true",
      label: "Booking URL",
    },
    {
      name: "footerTagline",
      type: "text",
      defaultValue: "Define your era.",
      required: true,
    },
    {
      name: "socialLinks",
      type: "array",
      defaultValue: [
        {
          label: "Instagram",
          url: "https://www.instagram.com/etera.creative/",
        },
        {
          label: "Facebook",
          url: "https://www.facebook.com/people/ET%C3%89RA-Creative-Atelier/61593393231866/",
        },
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/company/et%C3%A9ra/about/",
        },
        {
          label: "TikTok",
          url: "https://www.tiktok.com/@etera.creative",
        },
      ],
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "seoTitle",
      admin: { hidden: true },
      type: "text",
      defaultValue: "ETÉRA Creative Atelier",
      required: true,
    },
    {
      name: "seoDescription",
      admin: { hidden: true },
      type: "textarea",
      defaultValue:
        "ETÉRA is a creative atelier that builds presence and shapes culture.",
      required: true,
    },
  ],
  label: "Site Settings",
};
