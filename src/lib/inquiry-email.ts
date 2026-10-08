import type { InquiryDraft } from "./inquiry-validation.ts";

const siteURL = "https://etera.trakiyski.work";
const font = "'Avenir Next ETÉRA', 'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif";

function escapeHTML(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function buildInquiryEmail(draft: InquiryDraft) {
  const fields = [
    ["Name", draft.name],
    ["Email", draft.email],
    ["Brand / organisation", draft.brand],
    ["Services", draft.services.join(", ")],
    ["Project brief", draft.project],
    ["Budget", draft.budget],
    ["Additional details", draft.additional],
  ].filter(([, value]) => value.trim());
  const name = draft.name.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 100);
  const subject = `ETÉRA | Project enquiry from ${name}`;
  const rows = fields.map(([label, value]) => `<tr><td class="field" style="padding:22px 0;border-bottom:1px solid #dec8ca;word-wrap:break-word;overflow-wrap:anywhere;">
    <p style="margin:0 0 8px;font-size:11px;line-height:16px;letter-spacing:1.4px;text-transform:uppercase;color:#885259;">${label}</p>
    <p style="margin:0;font-size:17px;line-height:27px;color:#741018;">${escapeHTML(value.trim()).replace(/\r\n|\r|\n/g, "<br>")}</p>
  </td></tr>`).join("");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>ETÉRA · Project enquiry</title>
<style>
@font-face{font-family:'Avenir Next ETÉRA';font-style:normal;font-weight:400;src:url('${siteURL}/fonts/avenir-next/Avenir%20Next%20Regular.woff2') format('woff2')}
body,table,td,p,a{font-family:${font}}table{border-collapse:collapse}a{color:inherit}
@media only screen and (max-width:620px){.outer{padding:16px 10px!important}.content{padding:30px 24px!important}.headline{font-size:36px!important;line-height:40px!important}.logo{width:170px!important}.field{padding:18px 0!important}}
</style></head>
<body style="margin:0;padding:0;background-color:#eee8e8;font-family:${font};-webkit-text-size-adjust:100%;">
<div style="display:none;font-size:1px;line-height:1px;color:#eee8e8;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">A new project begins here. Your enquiry and project details, together in one place.</div>
<table role="presentation" width="100%" style="width:100%;background-color:#eee8e8;"><tr><td class="outer" align="center" style="padding:40px 16px;">
<!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
<table role="presentation" width="100%" style="width:100%;max-width:600px;background-color:#f9f4f4;">
<tr><td class="content" style="padding:40px 44px 34px;"><a href="${siteURL}" style="text-decoration:none;"><img class="logo" src="${siteURL}/email-logo-etera-red.png" width="200" alt="ETÉRA creative atelier" style="display:block;width:200px;max-width:100%;height:auto;border:0;"></a></td></tr>
<tr><td class="content" bgcolor="#741018" style="padding:38px 44px 42px;background-color:#741018;color:#f9f4f4;">
<p style="margin:0 0 18px;font-size:11px;line-height:16px;letter-spacing:1.8px;text-transform:uppercase;color:#f9f4f4;">Project enquiry</p>
<h1 class="headline" style="margin:0;font-size:44px;line-height:48px;font-weight:600;letter-spacing:-1.6px;color:#f9f4f4;">Let’s define<br>your era together.</h1>
</td></tr>
<tr><td class="content" style="padding:34px 44px 42px;">
<p style="margin:0 0 12px;font-size:21px;line-height:30px;color:#741018;">A new project begins here.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:25px;color:#885259;">This enquiry has been sent to the ETÉRA team. A copy is included for your records.</p>
<table role="presentation" width="100%" style="width:100%;table-layout:fixed;">${rows}</table>
<p style="margin:28px 0 0;font-size:14px;line-height:23px;color:#885259;">Want to add something? Email the ETÉRA team at <a href="mailto:hello@eteracreative.com" style="color:#741018;text-decoration:underline;">hello@eteracreative.com</a>.</p>
</td></tr>
<tr><td class="content" bgcolor="#000000" style="padding:28px 44px;background-color:#000000;color:#f9f4f4;">
<p style="margin:0 0 8px;font-size:15px;line-height:23px;color:#f9f4f4;">ETÉRA · creative atelier</p>
<p style="margin:0;font-size:12px;line-height:20px;color:#f9f4f4;"><a href="${siteURL}" style="color:#f9f4f4;text-decoration:underline;">Visit the atelier</a> &nbsp;·&nbsp; <a href="${siteURL}/privacy-policy" style="color:#f9f4f4;text-decoration:underline;">Privacy policy</a></p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  const text = [
    "ETÉRA · creative atelier", "Project enquiry", "Let’s define your era together.",
    "This enquiry has been sent to the ETÉRA team. A copy is included for your records.",
    ...fields.map(([label, value]) => `${label}:\n${value.trim()}`),
    "Want to add something? Contact hello@eteracreative.com.",
    `Visit the atelier: ${siteURL}`, `Privacy policy: ${siteURL}/privacy-policy`,
  ].join("\n\n");
  return { subject, html, text };
}
