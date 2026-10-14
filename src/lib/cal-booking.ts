export const defaultBookingURL = "https://cal.com/etera-creative/first-meeting";

export function getCalLink(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !["cal.com", "www.cal.com"].includes(parsed.hostname)) return null;
    const path = parsed.pathname.replace(/^\/+|\/+$/g, "");
    // shortcut: user/event URLs only; extend when a team event URL is supplied.
    return /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(path) ? path : null;
  } catch {
    return null;
  }
}

export const calEmbedConfig = {
  layout: "month_view",
  theme: "light",
  useSlotsViewOnSmallScreen: "true",
} as const;

const calColors = {
  "cal-brand": "#741018",
  "cal-brand-accent": "#f9f4f4",
  "cal-bg": "#f9f4f4",
  "cal-bg-subtle": "#f0e6e7",
  "cal-bg-emphasis": "#e7d3d5",
  "cal-bg-inverted": "#741018",
  "cal-bg-primary": "#741018",
  "cal-bg-primary-emphasis": "#5b0b12",
  "cal-text": "#741018",
  "cal-text-emphasis": "#741018",
  "cal-text-subtle": "#9e585d",
  "cal-text-inverted": "#f9f4f4",
};

export const calUIConfig = {
  theme: "light",
  layout: "month_view",
  hideEventTypeDetails: false,
  styles: { branding: { brandColor: "#741018" } },
  cssVarsPerTheme: { light: calColors, dark: calColors },
} as const;
