---
version: alpha
name: Design by Sadia - Dark Botanical Atelier
description: Dark obsidian botanical atelier design system for Design by Sadia (@design.by.sadia), a bespoke freehand henna and body art studio in Sterling, VA.
colors:
  primary: "#f1efe8"
  secondary: "#a7bcb1"
  tertiary: "#d98a3c"
  neutral: "#090d0b"
  surface: "#101714"
  surface-card: "#16201c"
  surface-elevated: "#1e2b26"
  accent-ink: "#140d06"
  destructive: "#e05a47"
typography:
  h1:
    fontFamily: Cormorant Garamond
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  h2:
    fontFamily: Cormorant Garamond
    fontSize: 2.75rem
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  h3:
    fontFamily: Cormorant Garamond
    fontSize: 1.625rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  mono-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.09em"
rounded:
  sm: 6px
  md: 12px
  lg: 20px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 10px
  atelier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  atelier-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: 20px
---

## Overview

Design by Sadia (`@design.by.sadia`) embodies a Dark Botanical Atelier visual language tailored for Sadia Shoyeb's bespoke freehand henna and body art studio in Sterling, VA. Rather than generic light-beige craft templates, the interface anchors photography, rich mahogany stains, and indigo jagua tones against five stepped botanical-obsidian OKLCH surfaces with a single burnished henna-amber interaction accent.

All motion curves follow tactile physical restraint (`150ms` `cubic-bezier(0.23, 1, 0.32, 1)` press feedback at `scale(0.97)`), GPU-composited `clip-path` image comparisons, and zero layout-thrashing animations.

## Colors

- **Void Ground (`#090d0b` / `oklch(0.12 0.015 160)`):** `--plane-0-void` canvas base that lets real client skin tones and botanical studio photography carry full chromatic warmth.
- **Atelier Surface (`#101714` / `oklch(0.16 0.018 160)`):** `--plane-1-surface` used for alternating section bands, form inputs, and navigation surfaces.
- **Card Substrate (`#16201c` / `oklch(0.20 0.020 160)`):** `--plane-2-card` used for portfolio frames, package bento tiles, and interactive configurator panels.
- **Elevated Plane (`#1e2b26` / `oklch(0.25 0.022 160)`):** `--plane-3-elevated` used for popovers, active filter pills, and secondary action controls.
- **Primary Ink (`#f1efe8` / `oklch(0.95 0.012 85)`):** `--text-primary` calibrated for APCA `Lc >= 92` readability.
- **Secondary Ink (`#a7bcb1` / `oklch(0.77 0.016 155)`):** `--text-secondary` calibrated for APCA `Lc >= 66`, never dropping below `L=0.65`.
- **Burnished Henna Amber (`#d98a3c` / `oklch(0.74 0.145 62)`):** `--accent-henna` is the sole brand interaction accent across CTAs, active slider handles, and selection rings.
- **Accent Ink (`#140d06` / `oklch(0.13 0.02 60)`):** `--accent-ink` paired on `--accent-henna` surfaces for `>8.5:1` WCAG AAA button legibility.
- **Destructive Semantic (`#e05a47` / `oklch(0.64 0.19 25)`):** `--color-destructive` reserved strictly for remove/clear moodboard or reset actions.
- **Specular Border:** `color-mix(in oklch, oklch(0.95 0.012 85) 12%, transparent)` provides crisp 1px edge definition without heavy drop shadows.

## Typography

- **Display Serif (`Cormorant Garamond` 500, 600, 600i):** Editorial headlines with `line-height: 1.12` for full descender clearance, negative tracking `-0.025em`, and `text-wrap: balance`.
- **Body Sans (`Plus Jakarta Sans` 400, 500, 600):** Clean geometric reading copy constrained to `max-width: 65ch` with `text-wrap: pretty`.
- **Telemetry Mono (`JetBrains Mono` 400, 500):** Pricing estimates, hour readouts, booking reference IDs, and eyebrow tags using `font-variant-numeric: tabular-nums` and `+0.09em` letter-spacing.

## Layout

- **Viewport Framing:** Full-height hero uses `min-height: 100dvh` (never `100vh`) with a fixed `68px` single-line top navigation bar.
- **Asymmetric Rhythm:** Nine varied sections alternate between split-screen editorial framing, single-line studio highlights marquee, masonry/bento portfolio grid, interactive Sketch-to-Stain split frame, 4-Formula Oxidation Lab, Quote Configurator, Bridal Bento, FAQ accordion, and 4-step Booking Concierge.
- **Eyebrow Restraint:** Uppercase tracked eyebrows appear on at most three sections across the entire page so `Cormorant Garamond` headings lead directly without visual noise.

## Elevation & Depth

- Depth is communicated through stepped OKLCH luminance planes (`0.12 -> 0.16 -> 0.20 -> 0.25`) plus 1px specular borders and a `0.032` opacity SVG film grain overlay (`pointer-events: none`).
- Modals, Lightbox overlays, and the Client Staging Review drawer sit above `--plane-0-void` with subtle backdrop blur and explicit keyboard focus trapping.

## Shapes

- **Portfolio & Feature Cards:** `20px` (`--radius-lg`) smooth outer corners with overflow-hidden photographic framing.
- **Interactive Controls & Inputs:** `12px` (`--radius-md`) containers paired with `6px` (`--radius-sm`) inner badges and `9999px` pill buttons.

## Components

- **Primary CTA (`Book Consultation`):** Single consistent CTA intent label across navigation, hero, quote configurator, and package tiles using `button-primary` (`#d98a3c` fill, `#140d06` ink, `white-space: nowrap`).
- **Portfolio Filter & Moodboard Card:** Filter tabs with `aria-pressed` state, lightbox preview modal (`Escape`, `ArrowLeft`, `ArrowRight`), and persistent `localStorage.sadia_moodboard_v1` pinning.
- **Sketch-to-Stain Comparator:** Pointer-capture and keyboard-accessible (`role="slider"`) split frame driven by GPU-composited `clip-path: inset(...)`.
- **4-Formula Oxidation Lab:** Interactive switcher across Organic, Jagua, Red, and Black formulas with a 5-stage (`0h` to `48h`) stain progression scrubber.
- **4-Step Booking Concierge:** High-contrast dark form fields with labels above every input, live pinned moodboard preview, interactive monthly calendar, `.ics` calendar export, and Instagram DM (`https://ig.me/m/design.by.sadia`) handoff.

## Do's and Don'ts

- **Do:** Keep all asset, manifest, and script URLs relative (`./assets/...`) so GitHub Pages subpath hosting (`/design-by-sadia/`) resolves cleanly.
- **Do:** Enforce `tabular-nums` on every dynamic price, hour scrubber, and calendar day cell.
- **Don't:** Use em-dashes, purple-to-cyan gradients, `transition: all`, or `100vh` anywhere in styles or content.
- **Don't:** Place labels inside inputs as placeholder-only prompts; keep `<label>` elements above every field with inline validation below.
