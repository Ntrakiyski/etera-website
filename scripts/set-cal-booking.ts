import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { defaultBookingURL } from "../src/lib/cal-booking";

assert.ok(["0", "1"].includes(process.env.PAYLOAD_CLOUDFLARE_LOCAL ?? ""), "Select explicit local or remote bindings.");
const payload = await getPayload({ config });
const settings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
await writeFile(`/tmp/etera-booking-before-${process.env.PAYLOAD_CLOUDFLARE_LOCAL === "1" ? "local" : "production"}.json`, JSON.stringify({ bookingURL: settings.bookingURL }), { mode: 0o600 });
await payload.updateGlobal({ slug: "site-settings", data: { bookingURL: defaultBookingURL } });
assert.equal((await payload.findGlobal({ slug: "site-settings", depth: 0 })).bookingURL, defaultBookingURL);
console.log("Supplied Cal.com event configured in Site Settings; other settings preserved.");
process.exit(0);
