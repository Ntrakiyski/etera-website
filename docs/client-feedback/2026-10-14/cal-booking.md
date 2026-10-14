# Cal.com booking release, 14 October 2026

The supplied [first-meeting event](https://cal.com/etera-creative/first-meeting) replaces the Google Calendar embed on Contact. Cal currently advertises a 30-minute Google Meet meeting and shows the visitor timezone.

## Website behavior

- The shared red call-to-action has a secondary **Book a call** button opening the official Cal modal.
- Contact also contains the inline month-view calendar; small screens use the supplied slots-view option.
- The widget uses ETÉRA red `#741018` and cream `#f9f4f4`. Primary enquiry remains prominent; the black navigation footer is unchanged.
- Escape closes the modal and returns focus. Modified clicks and blocked SDK loading retain the direct public event link.

## Client controls

CMS **Settings → Site Settings → Booking URL** changes the public event destination. The current integration accepts public Cal user/event URLs. **Contact Page → Page Text → Booking Kicker** controls the secondary button label and calendar kicker.

Event title, meeting duration, availability, connected calendar, meeting location and notification configuration are managed in Cal.com. No CMS schema migration was needed. Official React embed package: 1.5.3.

## Evidence

25 unit tests, lint, TypeScript, OpenNext build and clean-output Cloudflare-generated type check passed. Live Chrome checks at 320, 390, 768 and 1440px passed real modal/inline event loading, red/cream styling, no horizontal overflow, Escape/focus return and the shared Home booking trigger. Desktop/mobile screenshots were inspected after vendor hydration and animation settled. Contact hero buttons were subsequently removed at the user’s request because the calendar and enquiry sections are already directly below.

Production: https://etera.trakiyski.work/contact. Worker version: `37c2aed5-6b4c-4660-b8cc-3c6ceaad0b18`. Main commit and GitHub CI are available in repository history.

No real reservation or enquiry was submitted. Cal notification delivery, actual calendar appointment creation and native iPhone Safari booking remain untested. The client's earlier Safari hero-video confirmation is a separate closed item.
