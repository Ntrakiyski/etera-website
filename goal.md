# ETÉRA Creative - Website Goal

Created from Alexandra Djurdjevic's email, "ETÉRA Creative | Website Brief", sent on August 19, 2026, plus the attached PDF brief.

Alexandra signs the email as "Ali". The email is in Bulgarian. The attached PDF extracted as `ETÉRA WEBSITE COPY | EN`, so the current complete site copy available here is English.

## Source Material

- Original PDF: [assets/from-email/ETERA-WEBSITE-BRIEF.pdf](assets/from-email/ETERA-WEBSITE-BRIEF.pdf)
- Logo, red: [assets/from-email/logo-etera-red.svg](assets/from-email/logo-etera-red.svg)
- Logo, white: [assets/from-email/logo-etera-white.svg](assets/from-email/logo-etera-white.svg)
- Reference screenshots: [references/screenshots](references/screenshots)
- Source email: Alexandra Djurdjevic, `adjurdjevic@eteracreative.com`

## Core Goal

Build the first launch version of the ETÉRA Creative website as a compact, highly visual, editorial, boutique creative atelier site.

The site must not feel like a standard corporate or marketing-agency website. It should feel like a creative atelier with a strong visual identity, generous space, carefully selected information, refined typography, image/video-led sections, and subtle but memorable motion.

The site should communicate:

- ETÉRA is a creative atelier that builds presence and shapes culture.
- ETÉRA combines strategy, creativity, cultural context, and execution.
- ETÉRA does not use ready-made formulas. It builds the right approach and team around each project.
- The brand idea is connected to "Aether": the missing/invisible element that ties identity, communication, visual language, and perception together.
- Primary line: "Define your era."

## Launch Scope

Alexandra wants the first version to stay compact and visual, with main pages:

- Home
- Work
- The Atelier
- Contact

Important tension to clarify: the PDF main navigation includes `SERVICES`, and the PDF has a full Services content section. The email says they prefer not to expand into many separate pages for services, clients, and information. The likely launch interpretation is: `Services` should be a section/anchor or compact page, not a large service-page system, unless Alexandra confirms otherwise.

## Required Site Areas

### Home

- Hero:
  - "Define your era."
  - "ETÉRA is a creative atelier that builds presence and shapes culture."
  - Supporting copy about strategy, creativity, cultural context, brands, campaigns, content, and experiences.
  - CTA: "Discover ETÉRA"
- What We Do:
  - Group services into clear editorial categories.
- The Atelier:
  - Short positioning section.
  - CTA to discover the atelier.
- ETÉRA Method:
  - Discover
  - Define
  - Create
  - Elevate
- Selected Work:
  - Visual project previews.
  - Project format: brand name, project name, role/services.
  - CTA: "View Selected Work"
- Selected Partners
- Final CTA:
  - "Let's define your era together."
  - Start a Project and/or Book a Call.

### Work

- Hero: "Selected Work"
- Short intro: selection of projects, campaigns, and brand work.
- Project grid.
- Individual project template should support:
  - Client
  - Project
  - Year
  - ETÉRA's role
  - Context
  - Visuals
  - Results/KPIs
  - Collaborators

### The Atelier

- Intro:
  - "Strategy, creativity and attention to every detail."
- "The Missing Element" section:
  - Use the Aether concept as a brand narrative.
- Who We Are:
  - Small core team plus a wider network of specialists.
- People:
  - Yoana
  - Alexandra
  - Names, titles, bios still missing.
- ETÉRA Method:
  - 01 Discover
  - 02 Define
  - 03 Create
  - 04 Elevate
- Final CTA:
  - "Let's define your era."

### Services

Service groups from the PDF:

- Brand Culture:
  - Brand Strategy & Positioning
  - Brand Identity
  - Marketing & Creative Strategy
  - Market Research
- Creative & Visual:
  - Creative Direction
  - Photography & Videography
  - Design
- Content & Influence:
  - Social Media Strategy
  - Content Creation / UGC
  - Influencer Marketing
  - PR & Communications
- Experiences & Partnerships:
  - Event Management
  - BTL and Experiential Marketing
  - Brand Partnerships
  - Creative Collaborations
- Digital & Growth:
  - Performance Marketing
  - Paid Media
  - Email Marketing & CRM
  - Automation flows
  - Customer journeys
  - Website strategy/design/UX
  - Performance analysis and optimisation

Recommended launch presentation: editorial accordions, compact cards, or structured lists, inspired by So Sosha, not a heavy service catalog.

### Contact

- Hero:
  - "Let's define your era."
- Project inquiry form fields:
  - Full Name
  - Company / Brand
  - Email Address
  - What can we help with?
  - Tell us about the project
  - Budget, optional
  - Additional information, optional
- Service options in the form:
  - Brand Strategy
  - Brand Identity
  - Creative Direction
  - Campaigns
  - Social Media
  - Content Production
  - Influencer Marketing
  - PR & Communications
  - Events & Experiences
  - Partnerships
  - Performance Marketing
  - Email Marketing & CRM
  - Website / Landing Page
  - Other
- Submit CTA: "Send Inquiry"
- Book a Call section.
- General contact:
  - `hello@eteracreative.com`
- Success message:
  - "Thank you. We've received your inquiry and will get back to you once we've reviewed the project details."

### Footer

- Brand: ETÉRA Creative Atelier
- Line: Define your era.
- Navigation:
  - Work
  - The Atelier
  - Contact
- Social:
  - Instagram
  - TikTok
  - LinkedIn
  - Facebook
- Contact:
  - `hello@eteracreative.com`
- Legal:
  - Privacy Policy
  - Cookie Policy
  - Terms & Conditions
- Copyright:
  - © 2026 ETÉRA. All rights reserved.

### 404

- Headline: "The missing element isn't here."
- Text: "The page you're looking for could not be found."
- CTA: "Return to ETÉRA"

## Functional Requirements

From Alexandra's email:

- CMS support.
- Responsive design.
- SEO foundations.
- Analytics.
- GDPR/cookie compliance.
- Contact/project inquiry form.
- Booking-call path.
- Future phase should be possible without rebuilding the site.

CMS decision: use Payload CMS inside the Next.js repo with Postgres as the content database. Editors should use `/admin` to update page copy, projects, services, people, partners, settings, and media without pushing to GitHub. Production media uploads should use persistent object storage, such as Vercel Blob, rather than local filesystem uploads.

## Visual Direction

Target feel:

- Boutique creative atelier, not corporate agency.
- Minimal and editorial.
- Strong visual identity.
- Generous white/negative space.
- Carefully chosen copy, not content-heavy.
- High-end typography.
- Image/video-led storytelling.
- Dynamic scroll, but restrained.
- Project presentation should feel curated, not like a generic case-study grid.
- Services should be easy to scan but visually elevated.
- The monogram can become a signature motion/3D element if brand assets support it.

Avoid:

- Generic agency landing-page sections.
- Stock-photo feeling.
- Over-explaining services.
- Too many pages for launch.
- Template SaaS/marketing-site composition.

## Reference Sites And Interpretation

All screenshots are desktop captures, generally 1440px wide. Some sites use scroll-driven rendering, so static screenshots capture composition and visual direction more than exact animation.

| Rank | Reference | Alexandra's note | Screenshots | Interpretation for ETÉRA |
|---:|---|---|---|---|
| 1 | Magnetism | Opening desktop animation and downward scroll. | [loading](references/screenshots/01-magnetism-loading-mm.png), [top](references/screenshots/01-magnetism-top.png), [full](references/screenshots/01-magnetism-full.png) | Strong candidate for ETÉRA's intro/monogram behavior: restrained mark, lots of space, then visual project rhythm on scroll. |
| 2 | Homework | Minimalist and strongly visual feeling. | [top](references/screenshots/02-homework-top.png), [full](references/screenshots/02-homework-full.png) | Use as a restraint reference: large imagery, quiet typography, broad whitespace, minimal navigation clutter. |
| 3 | Gisèle Paris | Client portfolio and logo arrangement. | [top](references/screenshots/03-gisele-paris-top.png), [full](references/screenshots/03-gisele-paris-full.png) | Good model for selected partners/client logos and credibility blocks without making the site feel corporate. |
| 4 | Marianne Paris | Home loading and project visualisation on the right. | [top](references/screenshots/04-marianne-paris-top.png), [full](references/screenshots/04-marianne-paris-full.png) | Consider a split visual system or right-side project rail, especially for Work or selected projects. The soft editorial palette/texture is relevant. |
| 5 | SUM | Clients plus quotes. | [top](references/screenshots/05-sum-information-top.png), [full](references/screenshots/05-sum-information-full.png) | Good reference for partner lists combined with testimonials/quotes. |
| 6 | NOT Studio | Fresh accents around words, editorial/magazine-like scroll. | [top](references/screenshots/06-not-studio-top.png), [full](references/screenshots/06-not-studio-full.png) | Use selective word treatments, labels, and magazine-like content blocks. Avoid overdoing the playful parts. |
| 7 | Spring Studios / ODE | Very close to desired feel; 3D monogram and footer. | [top](references/screenshots/07-spring-studios-ode-top.png), [full](references/screenshots/07-spring-studios-ode-full.png) | Strong reference for ETÉRA monogram treatment, visual confidence, big editorial imagery, and distinctive footer. |
| 8 | CHIC | Agency leaning strongly on its own colors. | [top](references/screenshots/08-agence-chic-top.png), [full](references/screenshots/08-agence-chic-full.png) | Once ETÉRA colors arrive, commit to them. Color can become a brand asset, not just accent styling. |
| 9 | RO-OF | Idea for client portfolio layout when they have a developed portfolio. | [top](references/screenshots/09-ro-of-top.png), [full](references/screenshots/09-ro-of-full.png) | Better as a phase-2 reference for expanded portfolio/client archive. |
| 10 | YKONE | Simple but interesting things. | [top](references/screenshots/10-ykone-top.png) | Use as a reference for minimal high-contrast composition, refined line/motion accents, and large typography. Full-page capture was not reliable because the page renders through scroll behavior. |
| 11 | So Sosha | Possible service display using cards, similar to earlier PM Mentality direction but more aesthetic. | [top](references/screenshots/11-so-sosha-top.png), [full](references/screenshots/11-so-sosha-full.png) | Useful for compact service accordions/cards. ETÉRA should make this more refined and less simple-list. |
| 12 | Le SMM Paris | Associative grids that strengthen the editorial feeling. | [top](references/screenshots/12-lesmm-paris-top.png), [full](references/screenshots/12-lesmm-paris-full.png) | Use image/culture/association grids to make the site feel like an editorial world, not a services brochure. |

## Important Design Hypothesis

The likely right direction is not "build a normal agency website and make it pretty." It is:

1. Lead with identity, image, and editorial rhythm.
2. Keep pages compact.
3. Use services as structured supporting content, not the main story.
4. Make Work and The Atelier carry the credibility.
5. Use motion/monogram/scroll behavior as signature brand moments.
6. Keep copy short, precise, and elevated.

## Materials Still Expected From Alexandra

Alexandra said she will send:

- Exact colors.
- Final typography and fonts.
- ETÉRA photo/video materials.
- Additional graphic identity elements if needed.

Also still needed:

- Bulgarian copy, if launch is bilingual.
- Actual project/case-study content.
- Partner/client logo list and permission to show each logo.
- Founder names, titles, bios, and photos.
- Booking-call URL/provider.
- Analytics preference.
- Cookie/GDPR tooling preference.
- Legal copy or legal provider.
- Domain/hosting preference.

## Questions To Resolve

1. Should `Services` be a separate page at launch, a Home section, or an anchor in the main nav?
2. Is the launch English-only, Bulgarian-only, or bilingual? The email says Bulgarian and English copy exist, but the attached PDF extract is English.
3. What is the URL for "Gloria's website", and which parts of it should influence ETÉRA?
4. Should the ETÉRA monogram become a 3D/animated signature element, or should it stay flat/typographic for launch?
5. Which projects are ready for the Work page at launch, and do they have final visuals, roles, years, results, and collaborators?
6. Which client/partner logos can be shown publicly on day one?
7. Who will update content after launch, and which content must be CMS-editable?
8. What should happen after a form submission: email only, CRM, Airtable/Sheets, or another workflow?
9. What booking tool should `Book a Call` use?
10. Which analytics and cookie consent tools should be used?
11. Are Privacy Policy, Cookie Policy, and Terms & Conditions already drafted?
12. Is there a preferred launch domain and hosting environment?

## Phase 1 Definition Of Done

- Compact ETÉRA launch site with Home, Work, The Atelier, Contact, and agreed Services treatment.
- Strong first-screen brand signal.
- Editorial, high-visual design direction aligned with the references.
- Responsive desktop/tablet/mobile layouts.
- Project/partner/person content editable if CMS is in scope.
- Working project inquiry form and success state.
- Book-a-call path wired.
- SEO basics: titles, descriptions, Open Graph, sitemap, robots.
- Analytics wired.
- GDPR/cookie consent in place.
- 404 page implemented.
- Legal/footer links present.

## Phase 2 Candidates

- Larger client portfolio/archive.
- Rich individual case studies.
- More developed service pages.
- Deeper editorial/culture content.
- Advanced motion/3D monogram if not included in phase 1.
- Video-heavy project storytelling once final assets arrive.
