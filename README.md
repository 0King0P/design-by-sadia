# Design by Sadia (`@design.by.sadia`)

Bespoke freehand henna, jagua, red, and black henna body art studio website for **Sadia Shoyeb** in Sterling, VA and across Northern Virginia & the DMV.

## Live URLs

- **Live Staging Site:** https://0king0p.github.io/design-by-sadia/
- **Client Staging Review Mode:** https://0king0p.github.io/design-by-sadia/?review=1
- **Instagram Studio:** https://www.instagram.com/design.by.sadia/

## Architecture

Zero-build, static ES Module architecture engineered for instant loading on GitHub Pages (`/design-by-sadia/` subpath safe with relative `./` paths and `.nojekyll` enabled):

- `index.html` & `404.html`: Semantic HTML5 shell with matching SPA fallback, `BeautySalon` JSON-LD, `favicon.svg`, and OpenGraph `og-share-card.jpg` (`1200x630`).
- `styles/tokens.css` & `styles/studio.css`: Velvet Espresso Noir & Brushed Champagne Gold OKLCH 5-plane palette, `Cormorant Garamond` + `DM Sans` typography, `0px/2px` architectural print geometry, and balanced responsive grids.
- `data/studio-data.js`: Single source of truth for `BRAND_PROFILE`, `HERO_REEL_PLATES`, `SIGNATURE_STYLES`, `CONE_FORMULAS`, `SERVICE_PACKAGES`, `TRAVEL_ZONES`, `SKETCH_TO_STAIN`, `GENERATED_ARTIFACTS` (100% real `./assets/portfolio/` works + OG/favicon), `PORTFOLIO_ITEMS` (15 hand-focused client works), `TESTIMONIALS`, `BOOKING_POLICIES`, and `FAQ_ITEMS`.
- `js/app.js`: Hero 4-Plate Cinema Reel + pointer parallax, self-drawing SVG botanical vine & interactive 4-tradition cross-filtering, scroll curtain-reveal archive, accessible lightbox, `localStorage` Moodboard pinning (`sadia_moodboard_v1`), navigation drawer, and module orchestration (`?v=4`).
- `js/interactive-tools.js`: Sketch-to-Skin auto-sweep comparator (`Replay Sweep`), above-fold 4-Formula 48-Hour Stain Oxidation Lab (`Play 48h Time-Lapse`), and unified Roman-numeral Commission Menu & Coverage Configurator (`sadia:estimate-sync`).
- `js/booking-engine.js`: Private Reservation Desk synced live with the configurator, featuring interactive calendar, pinned archive strip, `DBS-` dossier auto-copy, `.ics` calendar hold download, and direct `@design.by.sadia` Instagram DM handoff.
- `js/client-review-mode.js`: Slide-over Client Staging Review checklist and markdown feedback exporter (auto-opens on `?review=1`).
- `DESIGN.md`: Machine-readable Google `DESIGN.md` token and component specification.
- `manifest.webmanifest`: PWA metadata configured with relative `./` scope and start URL.
- `.github/workflows/pages.yml`: Automated static deployment to GitHub Pages on pushes to `main`.

## Local Preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/` or `http://127.0.0.1:8080/?review=1` in your browser.

## Versioned Deployment & Rollback

Every production push is tagged prior to release (`deploy-YYYYMMDD-HHMM`). To roll back to a previous release tag:

```bash
git tag --list 'deploy-*'
git checkout <previous-deploy-tag> -- .
git commit -m "rollback: restore <previous-deploy-tag>"
git push origin main
```
