---
name: "Overbay.app"
description: "Airy, light-mode indie software gallery pairing crisp hairlines, stone stage framing, and deep teal-emerald actions with self-hosted sans and monospace typography."
colors:
  teal-emerald: "#0d7c66"
  teal-deep: "#0a6351"
  pine-ink: "#085747"
  mint-wash: "#e8f5f1"
  pure-white: "#ffffff"
  stone-stage: "#f5f6f8"
  mist-surface: "#f8f9fa"
  pebble-track: "#f1f3f5"
  obsidian-ink: "#111316"
  slate-ink: "#525866"
  muted-slate: "#5f6777"
  hairline-gray: "#e5e7eb"
  pewter-border: "#d0d5dd"
  specimen-indigo-bg: "#f1f4fd"
  specimen-indigo-ink: "#3730a3"
  specimen-mint-bg: "#eef9f5"
  specimen-sky-bg: "#f1f7fc"
typography:
  display:
    fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.35rem, 4.4vw, 3.375rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.7rem, 2.8vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
rounded:
  stage: "20px"
  card: "14px"
  sm: "10px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "36px"
  2xl: "56px"
  3xl: "84px"
components:
  button-primary:
    backgroundColor: "{colors.teal-emerald}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.pure-white}"
  button-dark:
    backgroundColor: "{colors.obsidian-ink}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-dark-hover:
    backgroundColor: "#22262d"
    textColor: "{colors.pure-white}"
  button-outline:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.obsidian-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.stone-stage}"
    textColor: "{colors.obsidian-ink}"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.obsidian-ink}"
    typography: "{typography.label}"
    rounded: "6px"
    padding: "8px 4px"
  nav-pill:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.obsidian-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  stage-tab:
    backgroundColor: "transparent"
    textColor: "{colors.slate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 20px"
  stage-tab-active:
    backgroundColor: "{colors.obsidian-ink}"
    textColor: "{colors.pure-white}"
  gallery-stage:
    backgroundColor: "{colors.stone-stage}"
    textColor: "{colors.obsidian-ink}"
    rounded: "{rounded.stage}"
    padding: "28px 34px"
  ui-specimen:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.obsidian-ink}"
    rounded: "16px"
  badge-pill:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
  code-box:
    backgroundColor: "{colors.obsidian-ink}"
    textColor: "#f3f4f6"
    typography: "{typography.mono}"
    rounded: "{rounded.card}"
    padding: "18px 20px"
---

# Design System: Overbay.app

## Overview

**Creative North Star: "The Daylight Software Gallery"**

Overbay.app presents independent, local-first software with the quiet clarity of a daylight gallery rather than a dark-mode SaaS marketing funnel. A pure white page canvas lets real Android device screenshots, structured UI specimen cards, data custody tables, and Play Store legal documentation lead without decorative gradients, floating telemetry badges, or visual clutter.

Structural discipline comes from high-contrast obsidian ink, muted slate prose, crisp hairline borders, and neutral stone framing stages. Color stays calm and deliberate: deep teal-emerald signals primary flagship actions, active navigation bars, and focus outlines, while experimental Overbay Labs software steps into solid obsidian buttons and distinct framing bands so store-compliant products and sideloaded tools never blur together.

**Key Characteristics:**
- Pure white canvas (`#ffffff`) anchored by flat cool-stone stage frames (`#f5f6f8`) and 1px hairline borders (`#e5e7eb`)
- Single primary teal-emerald accent (`#0d7c66`) balanced against obsidian ink (`#111316`) and slate prose (`#525866`)
- Self-hosted Latin typography pairing `Inter Tight` headings with `Public Sans` body copy and `JetBrains Mono` package telemetry
- Flat macro hierarchy with soft drop shadows reserved strictly for hardware device bezels and staged UI specimen cards
- Progressive, zero-build static architecture that remains readable without JavaScript and respects reduced-motion preferences

## Colors

A cool neutral grayscale anchored by obsidian ink and hairline grays frames a single deep teal-emerald accent, with whisper-quiet surface tints reserved strictly for in-app specimen previews.

### Primary
- **Teal Emerald** (`#0d7c66`): Primary flagship action buttons, active desktop navigation indicator bars, focus rings, checked specimen checkboxes, status dots, spotlight bullet rules, and active accordion toggle markers.
- **Teal Deep** (`#0a6351`): Hover state for primary action buttons and primary numeric balance emphasis inside Orbit Money ledger previews.
- **Pine Ink** (`#085747`): Text links in body prose, active mobile drawer navigation labels, and selection foreground text (`40.9%` lightness for accessible contrast on `#ffffff`).
- **Mint Wash** (`#e8f5f1`): Text selection highlight background (`::selection`), pairing with Pine Ink (`#085747`).

### Neutral
- **Pure White** (`#ffffff`): Default document background, sticky header backdrop (`rgba(255, 255, 255, 0.96)`), outline button surface, UI specimen card body, light device bezel variant, and text on dark or accent pills.
- **Stone Stage** (`#f5f6f8`): Large gallery stage framing containers, page hero media frames, Overbay Labs bands, legal summary callouts, specification table header row, and hover fill for outline controls.
- **Mist Surface** (`#f8f9fa`): Header chrome inside UI specimen cards and subtle filter status strips inside feed specimens.
- **Pebble Track** (`#f1f3f5`): Segmented pill switcher track sitting directly behind the four application stage tabs.
- **Obsidian Ink** (`#111316`): Primary headings, body text, active segmented stage pill fill, dark action buttons for Overbay Labs, dark code snippet backgrounds, and primary geometric brand mark facets.
- **Slate Ink** (`#525866`): Supporting descriptions, hero leads, navigation links at rest, table header labels, badge copy, legal body text, and footer columns.
- **Muted Slate** (`#5f6777`): Package identifiers in tables, definition labels in spec strips, ledger column headers, accordion `+` markers, and footer copyright notes.
- **Hairline Gray** (`#e5e7eb`): Universal `1px` structural borders on stages, tables, spotlight row dividers, sticky scrolled header bottom edge, badge pills, and UI specimen dividers.
- **Pewter Border** (`#d0d5dd`): High-definition `1px` borders on outline buttons, hover-state nav pills, scrollbar thumbs, light phone frames, and interactive checkboxes.

### Specimen Framing Tints
- **Specimen Indigo Tint** (`#f1f4fd`) & **Specimen Indigo Ink** (`#3730a3`): Highlighted notebook rail item, section indicator dot, and callout block inside AllNotes UI specimen previews.
- **Specimen Mint Tint** (`#eef9f5`): Liquid balance bar background inside Orbit Money ledger specimen previews.
- **Specimen Sky Tint** (`#f1f7fc`): Media download chip background inside Overbay Labs Twitter specimen previews.

### Named Rules
**The Single-Accent Discipline Rule.** Teal Emerald (`#0d7c66`) is reserved for primary flagship actions, active navigation bars, status dots, and focus outlines; secondary actions step back to Pure White outlines and Overbay Labs actions use Obsidian Ink (`#111316`).

**The Whisper-Tint Isolation Rule.** App-specific specimen tints (`#f1f4fd`, `#eef9f5`, `#f1f7fc`) stay confined inside staged UI specimen cards and never tint full page backgrounds or outer gallery frames.

## Typography

**Display Font:** `Inter Tight` (self-hosted Latin `.woff2`, weights `500–700`, system sans-serif fallback)
**Body Font:** `Public Sans` (self-hosted Latin `.woff2`, weights `400–700`, system sans-serif fallback)
**Label/Mono Font:** `JetBrains Mono` (self-hosted Latin `.woff2`, weights `400–500`, system monospace fallback)

**Character:** Tightly tracked geometric grotesk headings give studio statements and product names crisp architectural poise, while generous open-counter humanist body copy and clean monospace package strings keep long technical and legal pages effortless to scan.

### Hierarchy
- **Display** (`700`, `clamp(2.35rem, 4.4vw, 3.375rem)`, `1.12` line-height, `-0.025em` tracking): Page hero `<h1>` headlines, capped at `17ch` on the home hero with `text-wrap: balance`.
- **Headline** (`700`, `clamp(1.7rem, 2.8vw, 2.25rem)`, `1.12` line-height, `-0.025em` tracking): Section `<h2>` headings (`clamp(1.5rem, 2.25vw, 1.9rem)` inside the interactive gallery stage; `1.38rem` on legal headings).
- **Title** (`600`, `1.35rem`, `1.12` line-height, `-0.015em` tracking): Feature `<h3>` titles, spotlight headings (`clamp(1.45rem, 2.2vw, 1.85rem)`), accordion summaries (`1.08rem`), and detail list headings (`1.12rem`).
- **Body** (`400`, `1rem`, `1.65` line-height, `0em` tracking): Long-form prose capped at `68ch` (`clamp(1.02rem, 1.35vw, 1.14rem)` for the studio lead; `1.125rem` for subpage hero leads).
- **Label** (`500–600`, `0.82rem–0.95rem`, `0em` tracking): Top navigation links (`0.95rem`, `500`), stage tabs (`0.92rem`, `500–600`), pill buttons (`0.95rem`, `600`), table headers (`0.82rem`, `600`), and footer column headings (`0.875rem`, `600`).
- **Mono** (`400–500`, `0.72rem–0.86rem`, `1.6` line-height): Package identifiers (`0.78rem`), specimen status tags (`0.72rem`), specimen header bars (`0.8rem`), and Docker/CLI code blocks (`0.86rem`).

### Named Rules
**The Tabular Numerals Rule.** Specification strips, comparison tables, stage metadata, and financial ledger previews enforce `tabular-nums` so columns, pricing, and currency balances align across screen widths.

**The Narrow-Measure Rule.** Running paragraphs stay capped at `68ch` (`760px` container maximum on legal and compliance pages) with `1.65` line height so privacy disclosures read as calmly as product copy.

## Layout

Pages share a centered `1220px` container (`28px` horizontal padding, tightening to `20px` at `560px` and below) with legal and error pages constrained to a `760px` reading column. Sections breathe at `56px` vertical padding, anchored by an `84px` top margin above the four-column footer (`1.4fr repeat(3, 1fr)` desktop, collapsing to two columns at `920px` and one column at `560px`).

Primary compositions rely on asymmetric two-column splits rather than uniform card grids: the home gallery stage pairs copy and visuals at `0.98fr / 1.42fr` (`28px` gap), core app spotlight rows alternate `1.05fr / 1fr` (`44px` gap), the Overbay Labs band pairs explanation and actions at `1.15fr / 0.85fr` (`36px` gap), app detail heroes pair summary and stage at `1.05fr / 0.95fr` (`48px` gap), and architectural deep-dives use `1fr / 1fr` (`40px` gap). Every multi-column grid stacks cleanly to a single column at `1040px`, while the comparison table converts into labeled stacked rows at `680px` and below. All content remains visible in static HTML without JavaScript, and stage panel swaps settle over `280ms` using `cubic-bezier(0.16, 1, 0.3, 1)` unless reduced motion disables transitions.

### Named Rules
**The Alternating Rhythm Rule.** Core application spotlights alternate media placement left-to-right across full-width `1px` hairline dividers (`#e5e7eb`) instead of repeating identical card boxes.

## Elevation & Depth

Overbay.app operates on a flat, hairline-structured surface system where depth appears only on the software frames being showcased. Macro containers—the gallery stage, Overbay Labs band, legal summary callouts, spotlight rows, and specification tables—sit flush against the Pure White (`#ffffff`) page using Stone Stage (`#f5f6f8`) tonal contrast and `1px` `#e5e7eb` hairline borders rather than drop shadows.

### Shadow Vocabulary
- **Device Lift** (`box-shadow: 0 18px 36px -14px rgba(17, 19, 22, 0.16), 0 4px 12px -2px rgba(17, 19, 22, 0.06)`): Reserved exclusively for foldable/phone hardware frames and UI specimen preview cards sitting inside a framing stage.
- **Active Nav Indicator** (`box-shadow: inset 0 -2px 0 #0d7c66`): Crisp flat 2px bottom bar marking the active desktop navigation link without shifting text baseline.

### Named Rules
**The Stage-Over-Card Rule.** Macro layout frames remain completely flat (`#f5f6f8` fill + `1px` `#e5e7eb` border); diffuse drop shadows are reserved strictly for device hardware frames and UI specimen previews staged inside them.

## Shapes

The system contrasts generous `20px` framing stage corners and full pill capsules (`9999px`) against taut `1px` structural hairlines (`#e5e7eb`, `#d0d5dd`). Large gallery stages and hero media frames take a `20px` radius; lifted UI specimen cards and foldable device bezels take `16px`; dark code blocks and legal summary boxes take `14px`; phone hardware bezels wrap tightly at `24px` (`17px` inner screen radius); inline disclaimer notes, mobile drawer links, and app icons use `10px`; and internal UI mock elements drop cleanly to `4px–8px`.

Every primary interactive trigger—action buttons, top-bar GitHub link, segmented switcher tabs, gallery screenshot tabs, legal filter pills, and copy controls—shares the full `9999px` pill silhouette, softening at `680px` only where the four-tab home switcher wraps into a 2x2 grid (`16px` radius). The Coastal Horizon studio mark reinforces this precision with a Midnight Marine (`#0B1F44`) squircle enclosing a Royal Cobalt (`#1B43A8` / `#2563EB`) sky, Sky Cyan (`#38BDF8`) crest wave, and Pure White (`#FFFFFF`) sun orb.

## Components

Every interactive primitive pairs generous pill geometry with fast `160ms` state feedback and a `2px solid #0d7c66` keyboard focus outline (`3px` offset).

### Buttons
- **Shape:** Full pill capsule (`9999px` radius; text links use `6px`), `12px 24px` padding (`10px 18px` inside hero gallery stages), `0.95rem` `Public Sans` weight `600`, and a subtle `1px` downward press (`translateY(1px)`).
- **Primary:** Teal Emerald (`#0d7c66`) fill with Pure White (`#ffffff`) text, shifting to Teal Deep (`#0a6351`) on hover; used for flagship app CTAs.
- **Dark:** Obsidian Ink (`#111316`) fill with Pure White (`#ffffff`) text, shifting to `#22262d` on hover; used exclusively for Overbay Labs sideload actions.
- **Outline:** Pure White (`#ffffff`) fill with Obsidian Ink (`#111316`) text and `1px solid #d0d5dd` border, transitioning to Stone Stage (`#f5f6f8`) fill and `#111316` border on hover.
- **Text Link:** Transparent fill with underlined Obsidian Ink (`#111316`) text (`0.25em` underline offset), shifting to Pine Ink (`#085747`) on hover.

### Chips
- **Style:** Full pill (`9999px` radius) with `1px solid #e5e7eb` hairline border and Pure White (`#ffffff`) background (`2px 9px` padding, `0.78rem` weight `600` `#525866` for app badges; `2px 8px` padding, `0.72rem` `JetBrains Mono` for specimen status tags).
- **State:** Static informational chips inside gallery stage headers and specimen title bars; Labs download tags pair Specimen Sky Tint (`#f1f7fc`) fill with `#0c5d91` monospace text.

### Cards / Containers
- **Corner Style:** `20px` for Stone Stage (`#f5f6f8`) gallery frames and hero media stages; `16px` for lifted UI specimen cards; `14px` for legal summary boxes and dark code snippet containers.
- **Background:** Stone Stage (`#f5f6f8`) for flat macro frames; Pure White (`#ffffff`) for specimen interiors with Mist Surface (`#f8f9fa`) header bars; Obsidian Ink (`#111316`) for Docker/CLI code containers (`#181b20` top bar, `#262930` hairline borders, `#f3f4f6` text).
- **Shadow Strategy:** Macro containers stay flat with `1px solid #e5e7eb` borders; only device bezels and UI specimen cards carry Device Lift shadow (`0 18px 36px -14px rgba(17, 19, 22, 0.16), 0 4px 12px -2px rgba(17, 19, 22, 0.06)`).
- **Internal Padding:** `28px 34px` on home gallery stages (`24px 20px` on small screens), `28px` on subpage hero stages, `20px 24px` on legal summary boxes, `18px 20px` on specimen bodies and code blocks.

### Navigation
- **Top Bar:** Sticky `76px` three-column grid (`1fr auto 1fr`) over `rgba(255, 255, 255, 0.96)`, revealing a `1px solid #e5e7eb` bottom border on scroll. Brand link sits left (`30px` Coastal Horizon squircle mark + `Inter Tight` `1.2rem` bold); five centered `0.95rem` links use Slate Ink (`#525866`) shifting to Obsidian Ink (`#111316`) with a `2px` `#0d7c66` inset bottom bar on `aria-current="page"`; right slot holds the outlined GitHub pill (`8px 18px`, `9999px`). Below `920px`, links and GitHub pill collapse into a `42px` circular toggle button driving a `10px`-radius mobile drawer.
- **Segmented Stage Switcher:** Horizontal `5px`-padded Pebble Track (`#f1f3f5`) pill container with `1px solid #e5e7eb` border; inactive tabs use Slate Ink (`#525866`), active tab fills Obsidian Ink (`#111316`) with Pure White (`#ffffff`) weight `600` text (`9px 20px` padding). Collapses to a 2x2 grid (`16px` radius) below `680px`.
- **Legal Sub-Navigation:** Wrapping row of `9999px` hairline pills (`7px 14px` padding) shifting to `#f5f6f8` background and `#111316` border when active or hovered.

### Signature Patterns: Device Frames, Spec Tables & Accordions
- **Device Frames:** Dark matte `#1a1d21` bezels (`10px` padding / `16px` radius on foldables up to `390px` wide; `8px` padding / `24px` radius on phones at `188px` wide) plus a Pure White light-frame variant (`1px solid #d0d5dd`, `6px` padding) carrying Device Lift shadow.
- **Data Custody Table & Spec Strips:** Full-width border-collapsed table with Stone Stage (`#f5f6f8`) header row, `16px 18px` cells, `tabular-nums`, and monospace package subtitles; collapses below `680px` into stacked labeled attributes. Subpage hero spec strips present horizontal key-value metadata between `1px` `#e5e7eb` rules.
- **FAQ Accordions:** Native `<details>` disclosure rows framed by `1px solid #e5e7eb` dividers, `18px 0` `Inter Tight` summary triggers (`1.08rem`, weight `600`), and monospace `+` / `−` indicators (`#5f6777` closed, `#0d7c66` open).

## Do's and Don'ts

### Do:
- **Do** anchor every page on Pure White (`#ffffff`) with Stone Stage (`#f5f6f8`) framing containers and `1px` Hairline Gray (`#e5e7eb`) dividers, reserving `#111316` / `#1a1d21` surfaces strictly for hardware device bezels, active pill tabs, dark Labs buttons, and code snippet blocks.
- **Do** distinguish Google Play flagship products from Overbay Labs software by pairing flagship pages with Teal Emerald (`#0d7c66`) primary buttons and Labs pages with Obsidian Ink (`#111316`) dark action buttons plus a bordered disclaimer note.
- **Do** reserve Device Lift shadows strictly for hardware device frames and UI specimen cards staged inside framing containers while leaving macro sections completely flat.
- **Do** enforce `tabular-nums` across specification strips, comparison tables, stage metadata, and financial ledger previews.
- **Do** keep all text, links, comparison tables, and FAQ disclosures readable in plain static HTML without JavaScript and preserve `prefers-reduced-motion` overrides.

### Don't:
- **Don't** apply drop shadows to gallery stage frames, Labs bands, spotlight rows, or legal summary boxes.
- **Don't** spread Teal Emerald (`#0d7c66`) across section backgrounds, hero washes, or multi-color marketing gradients.
- **Don't** pull app-specific specimen tints (`#f1f4fd`, `#eef9f5`, `#f1f7fc`) out into page-level surfaces or global navigation chrome.
- **Don't** load remote font CDNs, third-party analytics trackers, or external icon font packs; keep fonts self-hosted and icons as inline SVG.
- **Don't** omit `1px` hairline borders (`#e5e7eb` or `#d0d5dd`) when placing light UI specimen cards or outline pills on light surfaces.
