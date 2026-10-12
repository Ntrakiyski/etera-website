# Booking comparison for ETÉRA

Checked 12 October 2026. Prices below are USD annual-billing monthly equivalents, not month-to-month prices. Tax, currency conversion and any checkout extras are excluded. No account, subscription or booking was created.

## Cost and host model

| Requirement | Calendly | Cal.com |
| --- | --- | --- |
| One host, basic scheduling | Free: one event type and one calendar | Individuals Free: unlimited event types and calendars |
| One host, remove provider branding | Standard: $10/seat/month equivalent, $120/year | Teams: $12/user/month equivalent, $144/year |
| Both founders attend the same call | Two Standard seats: $20/month equivalent, $240/year; collective scheduling | Two Teams seats: $24/month equivalent, $288/year; collective scheduling |
| Route each booking to an available founder | Teams: $16/seat/month equivalent; two seats $384/year | Teams: two seats $288/year; round-robin included |

Calendly publishes [annual prices](https://calendly.com/pricing), [collective events in Standard](https://calendly.com/help/choose-the-right-calendly-plan-for-your-team) and [branding removal in Standard](https://calendly.com/help/how-to-turn-off-calendly-branding-on-your-scheduling-page). Cal.com publishes [annual prices and Teams features](https://cal.com/pricing); its [FAQ confirms branding removal requires a team plan, even for a single person](https://cal.com/faq).

**Recommendation:** If both founders must attend together and provider branding should be hidden, Calendly Standard is the lower verified annual cost. If only one host needs free scheduling with several meeting types/calendars, Cal.com Free is more flexible. If bookings should rotate between founders, Cal.com Teams is the lower verified annual cost. These are cost/feature inferences from the cited plans, not account-level quotes.

## Appearance and integration

Both can appear inside the existing Contact booking slot. Calendly paid embeds allow background, text and accent colors; its [official customization guide](https://calendly.com/help/how-to-customize-your-embed) documents the supported parameters. Cal.com documents [embed brand color and light/dark theme](https://cal.com/blog/enhance-your-brand-with-custom-theme-colors-on-cal-com). Provider branding removal is a separate plan feature.

The companion [HTML comparison](booking-comparison.html) is an **illustrative design study**, not screenshots of live provider widgets. Dates, slots, duration and availability are invented examples; the mockups cannot create a booking. The ETÉRA page uses Avenir; this does not promise control of third-party widget fonts, spacing or all UI. Final widget appearance must be confirmed using the selected account's actual event URL.

## Before switching the live calendar

1. Confirm whether one founder, both together, or either available founder hosts the call. Decide duration, buffers and cancellation/rescheduling rules.
2. Create the chosen event in their account, connect the actual Google/Microsoft calendars and chosen video-conference integration. Check calendars for both hosts when using collective scheduling.
3. Use the vendor's supported embed integration and real event URL. Test phone-width scrolling, keyboard navigation, booking confirmation, cancellation, rescheduling and Europe/Sofia versus invitee-local time including daylight-saving transitions. Keep an external booking-link fallback.
4. Review third-party loading/cookie disclosure for the chosen provider; do not hide the provider cookie notice by default. Confirm the checkout total and selected billing term before purchasing.

No live widget or real calendar integration was tested. Availability, confirmations, timezone conversion and mobile embed behavior remain acceptance checks after a provider/event URL is selected.
