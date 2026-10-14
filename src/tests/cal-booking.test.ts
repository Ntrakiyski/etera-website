import assert from "node:assert/strict";
import test from "node:test";
import { getCalLink, defaultBookingURL, calEmbedConfig, calUIConfig } from "../lib/cal-booking.ts";

test("Cal.com URL is normalized and non-Cal destinations remain out of the embed", () => {
  assert.equal(getCalLink(defaultBookingURL), "etera-creative/first-meeting");
  assert.equal(getCalLink("https://www.cal.com/etera-creative/first-meeting/?layout=week_view"), "etera-creative/first-meeting");
  for (const url of ["javascript:alert(1)", "http://cal.com/etera-creative/first-meeting", "https://cal.com.evil.test/a/b", "https://calendar.google.com/a/b", "https://cal.com/", "https://cal.com/a/b/c"]) assert.equal(getCalLink(url), null);
});

test("Inline and modal booking share the supplied layout and ETÉRA red/light theme", () => {
  assert.equal(calEmbedConfig.layout, "month_view");
  assert.equal(calEmbedConfig.useSlotsViewOnSmallScreen, "true");
  assert.equal(calUIConfig.theme, "light");
  assert.equal(calUIConfig.styles.branding.brandColor, "#741018");
  assert.equal(calUIConfig.cssVarsPerTheme.light["cal-brand"], "#741018");
});
