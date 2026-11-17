---
version: "3.0"
name: Design by Sadia - Velvet Espresso & Champagne Atelier (v3)
description: Vogue Bridal x Aesop x Sabyasachi architectural couture design system for Design by Sadia (@design.by.sadia), a bespoke freehand henna and body art studio in Sterling, VA.
colors:
  primary: "#f3eee6"
  secondary: "#b8b0a4"
  tertiary: "#d4b686"
  neutral: "#090807"
  surface: "#12100e"
  surface-card: "#1a1714"
  surface-elevated: "#24201c"
  surface-overlay: "#2e2924"
  accent-ink: "#0a0807"
  destructive: "#d46a5a"
typography:
  h1:
    fontFamily: Cormorant Garamond
    fontSize: 4.75rem
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariantNumeric: "lining-nums proportional-nums"
  h2:
    fontFamily: Cormorant Garamond
    fontSize: 3.15rem
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
    fontVariantNumeric: "lining-nums proportional-nums"
  h3:
    fontFamily: Cormorant Garamond
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.015em"
    fontVariantNumeric: "lining-nums proportional-nums"
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 300
    lineHeight: 1.66
    letterSpacing: "0em"
  micro-label:
    fontFamily: DM Sans
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
    fontVariantNumeric: "tabular-nums lining-nums"
rounded:
  sm: 0px
  md: 2px
  lg: 2px
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
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "#e2c89d"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-destructive:
    backgroundColor: transparent
    textColor: "{colors.destructive}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  atelier-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 24px
  atelier-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: 20px
---

## Overview

Design by Sadia (`@design.by.sadia`) v3 refines the Velvet Espresso Noir and Brushed Champagne Gold architectural couture aesthetic crafted for Sadia Shoyeb's freehand henna atelier in Sterling, VA. Inspired by Vogue Bridal editorials, Aesop tactile apothecary ledgers, and Sabyasachi heritage craft, the interface pairs gallery-grade hand-focused photography (100% unique across all 27 image slots) with disciplined sentence-case typography and a unified single-flow commission configurator and Instagram DM reservation desk.

## Colors

- **Velvet Espresso Void (`#090807` / `oklch(0.11 0.008 48)`):** `--plane-0-void` canvas base allowing dark mahogany, crimson, and indigo jagua stains to command full warmth.
- **Atelier Surface (`#12100e` / `oklch(0.145 0.010 48)`):** `--plane-1-surface` alternating chapter surface for Process & Formulas and the Private Reservation Desk.
- **Card Substrate (`#1a1714` / `oklch(0.18 0.012 48)`):** `--plane-2-card` used for architectural calculator panels, archive frames, and dossier sheets.
- **Elevated Plane (`#24201c` / `oklch(0.22 0.014 48)`):** `--plane-3-elevated` and `--plane-4-overlay` (`#2e2924` / `oklch(0.26 0.016 48)`) for lightbox dialogs and active controls.
- **Silk Ivory (`#f3eee6` / `oklch(0.95 0.010 80)`):** `--text-primary` calibrated for APCA `|Lc| >= 94`.
- **Warm Taupe (`#b8b0a4` / `oklch(0.76 0.012 72)`):** `--text-secondary` calibrated for APCA `|Lc| >= 66`.
- **Brushed Champagne Gold (`#d4b686` / `oklch(0.80 0.075 78)`):** `--accent-henna` sole brand interaction accent paired with `--accent-ink` (`#0a0807` / `oklch(0.12 0.010 48)`).
- **Hairline Specular Borders:** `color-mix(in oklch, oklch(0.95 0.010 80) 13%, transparent)` with `1px` crisp structural dividers and zero neon glow.

## Typography

- **Display Serif (`Cormorant Garamond` 400, 400i, 500, 500i):** Editorial headings with `line-height: 1.02` to `1.06`, `-0.02em` tracking, `text-wrap: balance`, and `font-variant-numeric: lining-nums proportional-nums` for crisp tall numerals.
- **Body & Editorial Micro Labels (`DM Sans` 300, 400, 500):** Light reading copy (`text-wrap: pretty`) and tracked uppercase micro-labels (`0.16em` tracking, `tabular-nums lining-nums`). Zero `JetBrains Mono` or developer monospace fonts anywhere in the system.

## Layout & Architecture

- **74px Centered Typographic Masthead:** Desktop 3-column grid (`Styles / Archive / Process / Rates & Inquiry` left in strict DOM scroll order, centered `DESIGN BY SADIA / STERLING, VIRGINIA` masthead, `Saved (0)` + Instagram + `Reserve a Date` right) collapsing cleanly to a single-row 2-column mobile bar below `1120px`.
- **5 Distinct Architectural Chapters:**
  1. **Editorial Split Cover:** Full-bleed couture bridal hands portrait (`hero-couture-bridal.jpg`), interactive atelier preview (`hero-atelier.jpg`), and single-line colophon.
  2. **Signature Traditions & 15-Work Client Archive:** Centered editorial intro with 4 dedicated non-repeating lookbook plates (`style-rajasthani-couture.jpg`, `style-khaleeji-plate.jpg`, `style-jagua-contemporary.jpg`, `style-heirloom-monogram.jpg`) paired with an inline-baseline 15-plate hand-cropped archive, lightbox inspection, and `localStorage.sadia_moodboard_v1` pinning.
  3. **Process & Four-Formula Oxidation Study:** Interactive iPad Blueprint-to-Stain comparator plus 4-formula macro studio photography switcher (`stain-organic-macro.jpg`, `stain-jagua-macro.jpg`, `stain-crimson-macro.jpg`, `stain-obsidian-macro.jpg`) with an above-fold `0h` to `48h` oxidation scrubber.
  4. **Unified Studio Rates & Date Inquiry:** Roman-numeral (`I..VI`) commission menu + coverage configurator synced live via `sadia:estimate-sync` / `sadia:preset-request` to the Private Reservation Desk (zero duplicated dropdowns) with monthly calendar, time window, hidden bridal initials, pinned archive strip, `DBS-` dossier auto-copy, `.ics` download, and direct `@design.by.sadia` Instagram DM (`https://ig.me/m/design.by.sadia`) handoff.
  5. **Client Notes, Care FAQ & Studio Terms:** Full-width 2x2 client testimonial spread above a balanced `1.15fr / 0.85fr` FAQ & Studio Terms split.

## Shapes & Motion

- **Architectural Print Geometry:** Strictly `0px` (`--radius-sm`) and `2px` (`--radius-md`, `--radius-lg`) corners across every button, photograph frame, calendar cell, and drawer. Zero `18px` or `9999px` pill containers.
- **Tactile Restraint & Mobile Cellular Discipline:** `150ms` press feedback (`scale(0.98)`), `scroll-margin-top: 92px` across all anchored chapters, `loading="eager" fetchpriority="high"` on cover imagery only, and `loading="lazy"` with explicit dimensions across below-fold photography (`< 1.8 MB` initial mobile transfer).

## Do's and Don'ts

- **Do:** Keep all asset, manifest, and module URLs relative (`./assets/...`) with cache-busted `?v=3` suffixes for GitHub Pages subpath hosting (`/design-by-sadia/`), alongside OpenGraph `og-share-card.jpg` (`1200x630`), `favicon.svg`, and `BeautySalon` JSON-LD.
- **Do:** Keep the client staging drawer gated strictly behind `?review=1` so the public URL displays zero floating review badges.
- **Don't:** Introduce `JetBrains Mono`, cartoon `<svg>` hands, `18px`/`9999px` pill borders, `border-left` accent rails, duplicate photographs, bouncing email addresses, or em-dashes (`—`).
