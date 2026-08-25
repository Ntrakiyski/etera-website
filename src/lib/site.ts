const LOCAL_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = new URL(configuredUrl || LOCAL_SITE_URL);

  siteUrl.pathname = "/";
  siteUrl.search = "";
  siteUrl.hash = "";

  return siteUrl;
}
