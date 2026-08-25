---
name: ETÉRA Creative Atelier
description: Aether editorial atelier: maroon, milk, ink, powder, and midnight in a restrained visual system for a boutique creative practice.
colors:
  maroon: "#741018"
  milk-white: "#f9f4f4"
  ink-black: "#191818"
  powder-blue: "#d2e8f9"
  midnight-blue: "#263343"
  muted-ink: "rgb(25 24 24 / 0.68)"
  faint-ink: "rgb(25 24 24 / 0.48)"
  hairline: "rgb(25 24 24 / 0.18)"
  maroon-hairline: "rgb(116 16 24 / 0.42)"
  powder-wash: "rgb(210 232 249 / 0.28)"
typography:
  display:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "5.5rem"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "0"
  headline:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "4rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
  title:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.12em"
rounded:
  none: "0"
  hairline: "2px"
  control: "4px"
  panel: "6px"
  media: "8px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  xxl: "5rem"
  xxxl: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.milk-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1.2rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0"
  editorial-panel:
    backgroundColor: "{colors.powder-wash}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
  project-tile:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.media}"
    padding: "0"
---

# Design System: ETÉRA Creative Atelier

## Overview

**Creative North Star: "Aether Editorial Atelier"**

ETÉRA's design system should feel like the invisible element becoming visible: a restrained editorial frame, precise typography, a confident maroon signal, and enough negative space for imagery and motion to feel intentional. The site is a boutique atelier, not a corporate agency and not a startup landing page.

The system borrows Impeccable's discipline, not its visual style: every screen must have a named audience, a clear mode, a tight palette, real assets, and explicit anti-patterns. Visual confidence comes from fewer stronger decisions, not from decorative effects.

**Key Characteristics:**

- Editorial, spacious, and image-led.
- Quiet identity-first opening followed by a stronger visual reveal.
- Changing section rhythm: full-bleed image, asymmetric rail, open text field, compact index.
- Low-radius, line-led structure instead of floating cards.
- Avenir Next as the defining typographic voice.
- Maroon used as a brand anchor, not scattered decoration.
- Powder and midnight used sparingly to create atmosphere and contrast.

## Source Hierarchy

When design inputs conflict, use this order:

1. The ETÉRA logo guideline controls logo geometry, logo variants, Avenir Next, and the five-color palette.
2. The ETÉRA website brief controls confirmed copy, navigation, page purpose, services, method, and inquiry content.
3. Alexandra's reference sites inform patterns, rhythm, scale, movement, and image treatment only.
4. Generated Aether studies demonstrate proposed art direction while ETÉRA photography and portfolio media are pending.

Reference screenshots are not a component library and must never be reproduced literally. Do not copy their photography, logos, typefaces, exact layouts, decorative marks, or branded interactions. Distill the reason a reference works, then rebuild that principle using ETÉRA's own identity.

## Research Status And Confirmed Decisions

This section distinguishes confirmed client direction from design proposals and missing inputs. Treat it as the decision ledger for implementation.

### Confirmed By Alexandra Or Supplied Brand Material

- Launch in English first. Bulgarian belongs to a later phase, after the portfolio, clients, and projects are more developed.
- Keep launch compact: Home, Work, The Atelier, and Contact are the core pages. Services should be a concise section, anchor, or compact treatment rather than a large family of service pages.
- Lead with `Define your era.` and the positioning `ETÉRA is a creative atelier that builds presence and shapes culture.`
- Use Avenir Next Regular, Demi Bold, and Bold with the supplied primary, secondary, mark, and submark logo variants.
- Use only the confirmed palette: Maroon `#741018`, Milk White `#f9f4f4`, Ink Black `#191818`, Powder Blue `#d2e8f9`, and Midnight Blue `#263343`.
- Alexandra expects to provide no more than approximately ten ETÉRA photos. The system must create variety through crop, scale, sequencing, and motion rather than requiring a large image library.
- The Gloria Rusenova reference was supplied in the August 24 follow-up. Alexandra likes its homepage scroll animation, but ETÉRA's interpretation should be quieter and use ETÉRA colors.

### Proposed Direction Requiring Client Confirmation

- `Aether Editorial Atelier` is the working creative north star derived from the brand story and reference research.
- The opening sequence should move from a restrained ETÉRA identity moment into one image-led hero rather than behaving like a conventional agency header.
- Work should use a dominant landscape image with an offset portrait rail instead of equal portfolio cards.
- Maroon, powder, and midnight should own occasional full sections; they should not appear together as decorative accents in every viewport.
- The monogram may become a signature scale, crop, or 3D moment. Start with a flat motion study and add 3D only if it improves the supplied mark and remains performant.
- The current generated Aether Studies establish mood, crop, and material language only. They are not final photography, portfolio work, or evidence of client projects.

### Pending Inputs That Affect Visual Design

- Final ETÉRA photo and video selection, including usage rights and preferred crops.
- Launch-ready projects with approved names, imagery, roles, dates, results, and collaborators.
- Approved partner/client logos and permission to display each one.
- Founder names, titles, biographies, and portraits.
- Approved testimonials, if the SUM-inspired quote treatment is used.
- Final decision on whether Services is a Home anchor or compact standalone page.

### Reference Evidence Limits

- The research set contains desktop captures, generally at 1440px, plus a red-box [client inspiration map](references/client-inspiration/README.md) identifying the evidence attached to each client note. Responsive behavior must be designed for ETÉRA rather than inferred from those images.
- Most references have `top` and `full` captures. YKONE includes both a reliable `top` capture and a full-page section stack; its `top` capture remains the more faithful record of the scroll-rendered opening.
- Magnetism includes an additional loading/monogram capture that is useful for sequence and pacing, not for copying the mark treatment.
- Static captures show composition and hierarchy more reliably than animation timing. Motion conclusions are therefore design hypotheses until tested in a browser.
- Gloria Rusenova now has `top` and `full` captures and is included as the benchmark reference before the original 12-site set.

## Reference Distillation

The 12 references resolve into six design behaviors for ETÉRA:

### 1. Identity Before Explanation

Sources: Magnetism, Spring Studios / ODE, YKONE.

- Begin with a restrained logo or monogram moment and unusually controlled space.
- Let the identity transform into the first content composition on scroll.
- Use one confident mark or line behavior, not a collection of decorative effects.
- ETÉRA translation: the provided logo mark or submark appears first, then yields to "Define your era." and the hero image.

### 2. Image-Led Editorial Rhythm

Sources: Homework, Magnetism, Spring Studios / ODE.

- Use fewer, larger images with decisive crops.
- Let images touch viewport or grid edges when the composition benefits from it.
- Place project metadata on separate hairline bands rather than over every image.
- ETÉRA translation: large project frames alternate between landscape, portrait, and split compositions; no generic equal-card portfolio grid.

### 3. Asymmetric Project Navigation

Sources: Marianne Paris, RO-OF.

- Use a right-side rail, offset frame, or split canvas to keep the page moving.
- Pair one dominant image with a smaller sequence rather than showing everything at equal weight.
- ETÉRA translation: Home can preview work through an asymmetric visual rail; Work can expand this into a curated archive when enough project media exists.

### 4. Editorial Interventions

Sources: NOT Studio, Le SMM Paris.

- Use large statements, selective word emphasis, associative image grids, and concise captions.
- Change scale and alignment between sections so the page reads like an edited publication.
- ETÉRA translation: one maroon underline, crop, index number, or moving line may interrupt an otherwise restrained field. Avoid playful stickers, handwritten marks, or visual devices that belong to the source brands.

### 5. Brand Color As Architecture

Source: CHIC.

- Commit to brand color at section scale instead of scattering small accents.
- ETÉRA translation: maroon, powder, and midnight may each own a complete moment; they should not blend into gradients or compete in one viewport.

### 6. Proof And Services Without Corporate Weight

Sources: Gisèle Paris, SUM, So Sosha.

- Present partner logos as a calm editorial matrix.
- Combine proof with concise quotes only when real approved quotes exist.
- Keep services in a compact accordion or divided index.
- ETÉRA translation: Selected Partners is a quiet credibility field; Services supports the brand story and never becomes the opening argument.

### Distillation Rule

Every borrowed pattern must pass two tests:

1. Could the result still be recognized as the reference site if the logo changed? If yes, it is too close.
2. Does the result use ETÉRA's logo, Avenir Next, palette, copy, and Aether idea as its primary signals? If no, it is not ETÉRA yet.

Before approving a reference-derived component, write its source behavior in one sentence and its ETÉRA transformation in a second sentence. If the transformation is only a color or logo swap, redesign it.

## Colors

The palette is warm, sharp, and boutique: milk-white paper, near-black ink, deep maroon, with powder and midnight for atmospheric contrast.

### Primary

- **ETÉRA Maroon** (`#741018`): primary brand signal, CTAs, active lines, monogram moments, and rare high-emphasis typography.
- **Milk White** (`#f9f4f4`): primary page ground. Use instead of pure white.
- **Ink Black** (`#191818`): primary text and linework. Use instead of pure black.

### Secondary

- **Powder Blue** (`#d2e8f9`): quiet atmospheric wash, editorial panels, hover fields, and soft page transitions.
- **Midnight Blue** (`#263343`): dark sections, footer, contrast moments, and image-adjacent panels.

### Neutral

- **Muted Ink** (`rgb(25 24 24 / 0.68)`): secondary copy, intro text, and meta.
- **Faint Ink** (`rgb(25 24 24 / 0.48)`): captions, inactive nav, low-priority metadata.
- **Hairline** (`rgb(25 24 24 / 0.18)`): default dividers, rules, grid lines.

### Named Rules

**The Maroon Rarity Rule.** Maroon should usually occupy less than 10% of a viewport. Its scarcity is what makes it feel expensive.

**No Generic Neutral Rule.** Do not use pure white, pure black, default gray text, or Tailwind slate/gray ramps unless a technical surface explicitly requires them.

## Typography

**Display Font:** Avenir Next with Avenir, Helvetica Neue, Arial, and sans-serif fallback.<br>
**Body Font:** Avenir Next with the same fallback stack.<br>
**Label Font:** Avenir Next Demi Bold/Bold, uppercase only when the label is navigational or editorial metadata.

**Character:** Clean, fashion-adjacent, and precise. Type should feel edited, not expressive for its own sake.

### Hierarchy

- **Display** (Demi Bold/Bold, `5.5rem`, `0.96`): hero statements and first-viewport brand moments.
- **Headline** (Demi Bold, `4rem`, `1`): section openings and page titles.
- **Title** (Demi Bold, `1.5rem`, `1.2`): service groups, project names, people names.
- **Body** (Regular, `1rem`, `1.75`): narrative copy, introductions, descriptions. Keep long text near 62 to 72 characters.
- **Label** (Demi Bold/Bold, `0.75rem`, `0.12em`): eyebrow labels, metadata, navigation markers.

### Named Rules

**No Default-Font Rule.** Geist, Inter, Arial-first stacks, and system defaults are not the ETÉRA voice. Use Avenir Next first, then credible fallbacks until final licensed webfont files are provided.

**No Viewport-Scaled Type Rule.** Use breakpoint-specific type sizes, not `vw` typography. ETÉRA should feel composed at every viewport, not stretched.

## Layout

Use an editorial grid: wide margins, strong vertical sections, hairline separators, and asymmetric blocks. The first viewport should make ETÉRA unmistakable through brand, type, and motion/mark behavior, while leaving a hint of the next section visible.

Pages should be compact. Avoid stacking standard agency modules. Services belong in a structured editorial list or accordion; Work should become image-led once project materials arrive; The Atelier should carry the Aether story and the atelier model.

Responsive behavior should preserve hierarchy. Mobile pages need generous vertical rhythm, fixed-format controls, and no text overlap. Desktop pages can use two-column editorial compositions, right-side project visual rails, and large controlled whitespace.

### Ten-Image Content Economy

The launch system must work with approximately ten supplied photos, not depend on dozens of unique assets.

- Reserve one defining landscape image or video still for the Home hero.
- Use four to six images for Selected Work and Work, prioritizing projects with enough context to feel credible.
- Reserve one collaborative, process, or portrait-led image for The Atelier.
- Keep one or two assets flexible for Contact, team, or a motion transition.
- Reuse is allowed only when the treatment changes meaningfully: wide crop versus detail crop, still versus masked reveal, or image versus monochrome texture. Do not repeat the same obvious frame across consecutive sections.
- Never compensate for missing imagery with fabricated projects, generic stock teams, decorative image mosaics, or AI-generated client work.

## Proposed Website Experience

This is the design proposal to present for confirmation.

### Opening Sequence

1. **0.0-0.8 seconds:** milk-white field with the ETÉRA logo mark or submark at restrained scale.
2. **0.8-1.6 seconds:** the mark enlarges or moves toward a crop while one hairline reveals the page grid.
3. **1.6 seconds onward:** "Define your era." and the hero image settle into an asymmetric composition; the next section remains visible at the bottom edge.

Motion must feel precise and inevitable, not cinematic for its own sake. Reduced-motion users receive the settled composition immediately.

The Gloria Rusenova reference supports the use of scroll-linked reveal and pacing, but not its exact movement. ETÉRA's version should use fewer transitions, shorter travel distances, no elastic motion, and no animation that delays access to content.

### Home Hero

- Quiet navigation: Work, The Atelier, Services, Contact, Start a Project.
- The actual ETÉRA logo is a first-viewport signal, not only a small header mark.
- "Define your era." remains the only hero headline.
- Supporting copy stays short and uses Avenir Next Regular.
- One original image or moving material study occupies 45-60% of the desktop viewport.
- The image has no color overlay. It is art-directed to blend with milk white at the source.

### Selected Work Preview

- Open with one large landscape frame, then a narrower portrait rail.
- Separate imagery from metadata with a hairline caption band.
- Use only real project names and media when supplied.
- Before project media exists, use clearly labeled **Art Direction Study** imagery to confirm crop, rhythm, and palette. Never imply it is client work.

### The Atelier

- Use the Aether story as the conceptual center of the site.
- Pair a large editorial statement with a collaborative process image and the four-part method: Discover, Define, Create, Elevate.
- Keep the core-team/network model concise. Do not turn this into a conventional agency About page.

### Services

- Use a divided editorial index with five confirmed categories.
- Default state shows category names and numbers; opening a row reveals exact services.
- No icons, package pricing, feature cards, or equal service tiles.

### Selected Partners

- Use an open or hairline matrix inspired by editorial credits pages.
- Logos stay monochrome unless a partner usage guideline requires color.
- Do not fabricate partner logos or quotes.

### Contact And Footer

- Transition to a decisive maroon or midnight field.
- Lead with "Let's define your era together."
- Keep the inquiry form on milk white with visible labels and low-radius controls.
- The footer can use an oversized crop of the actual ETÉRA wordmark or logo mark as a closing signature.

## Art Direction

Until ETÉRA's final photography and project media arrive, the design proposal uses original **Aether Studies** to demonstrate image treatment. These studies are mood and art-direction examples, not portfolio work.

### Aether Study Characteristics

- Themes: connection, motion, perception, craft, material, and invisible structure.
- Subjects: translucent fabric, glass, shadow, reflective metal, anonymous human movement, hands editing materials.
- Palette: source imagery is art-directed around the official maroon, milk, ink, powder, and midnight colors.
- Composition: decisive crops, broad negative space, asymmetric balance, and stable landscape/portrait frames.
- Texture: natural light, tactile materials, subtle grain, and realistic imperfections.

### Image Rules

- Do not reuse or imitate photography from the reference sites.
- Do not generate fake branded campaigns, client products, testimonials, results, or logos.
- Do not apply maroon/powder overlays to unrelated photography to force it into the palette.
- Do not use stock-like teams around laptops, generic office scenes, or beige moodboards.
- Replace Aether Studies with real ETÉRA project media as it becomes available, while preserving the approved crop and layout behavior.

Current proposal assets:

- `design/concepts/2026-08-25/aether-hero.webp`: material, light, and negative-space direction for the Home hero.
- `design/concepts/2026-08-25/aether-motion.webp`: portrait motion study for an asymmetric Work rail.
- `design/concepts/2026-08-25/aether-atelier.webp`: collaborative editing study for The Atelier.

## Motion

- **Monogram reveal:** scale, crop, or lateral movement over 800-1400ms.
- **Image entrance:** clip-path or masked reveal aligned to the editorial grid; no parallax for every image.
- **Project rail:** one controlled vertical or horizontal offset tied to scroll.
- **Marquee:** allowed once for a short method or closing phrase, never as background noise.
- **Hover:** image crop shifts 1-2%, metadata line changes to maroon, and text links underline.
- Respect `prefers-reduced-motion`; all content must remain complete without animation.
- Keep scroll-linked transforms compositor-friendly and test them on a mid-range mobile device. Motion must not cause layout shifts, block scrolling, or make text harder to read.
- Use motion to connect identity, image, and section transitions. Do not animate every heading, card, or divider merely because it enters the viewport.

## Elevation & Depth

The default system is flat. Depth comes from tonal fields, image layering, precise rules, and scroll sequencing rather than shadows. Shadows are allowed only for interactive overlays, menus, or admin-like affordances; public marketing surfaces should stay mostly flat.

### Named Rules

**The Flat Atelier Rule.** Public pages do not use generic raised cards, glassmorphism, or soft SaaS shadows. Use line, tone, crop, and motion.

## Shapes

Shapes are restrained: square or near-square corners, thin borders, full-width editorial bands, and media with stable aspect ratios. Cards may appear for repeated items or CMS entries, but sections should not be styled as cards.

Buttons and inputs use 4px radius. Panels may use 6px. Media can use up to 8px when a framed tool or repeated tile needs it.

## Components

### Navigation

Navigation is small, uppercase, and line-led. It should feel like an editorial index, not a SaaS header. Active and hover states may use maroon or ink underline treatments.

### Buttons

- **Shape:** low-radius control (`4px`) or text-link underline for quieter CTAs.
- **Primary:** maroon fill, milk text, uppercase label, compact padding.
- **Secondary:** text-link or hairline button. Avoid pill buttons.
- **Focus:** visible maroon or ink outline with enough contrast.

### Work Tiles

Work tiles should become image-led as soon as real project media exists. Until then, use typographic placeholders sparingly and label them clearly as selected work, not fabricated case studies.

### Services

Services should read like an edited capability system: grouped, concise, and easy to scan. Prefer accordions, divided rows, or compact editorial panels over a heavy grid of same-looking cards.

### Forms

Forms should feel quiet and precise. Labels stay visible. Inputs use milk/ink surfaces, hairline borders, 4px radius, generous touch targets, and clear success/error states.

## Do's and Don'ts

Do:

- Use ETÉRA's actual colors, logos, and Avenir Next guidance.
- Let imagery, typography, and scroll rhythm carry the brand.
- Keep copy compact and specific.
- Treat the monogram as a possible signature motion/3D moment.
- Verify desktop and mobile screenshots before calling a page done.
- Label every temporary art-direction study clearly in client-facing reviews.
- Validate each reference-derived idea against the two-part Distillation Rule before implementation.

Don't:

- Do not use purple/blue AI gradients, glass panels, bokeh, blobs, or generic "creative agency" templates.
- Do not fill the site with cards inside cards.
- Do not invent clients, KPIs, testimonials, project proof, policy text, or booking flows.
- Do not over-explain services or expand launch into a corporate sitemap.
- Do not make the site beige, gray, or neutral-only. The maroon/powder/midnight system must be visible.
