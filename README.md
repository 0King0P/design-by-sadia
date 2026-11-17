# Design by Sadia (`@design.by.sadia`)

Bespoke freehand henna, jagua, red, and black henna body art studio website for **Sadia Shoyeb** in Sterling, VA and across Northern Virginia & the DMV.

## Live URLs

- **Live Staging Site:** https://0king0p.github.io/design-by-sadia/
- **Client Staging Review Mode:** https://0king0p.github.io/design-by-sadia/?review=1
- **Instagram Studio:** https://www.instagram.com/design.by.sadia/

## Architecture

Zero-build, static ES Module architecture engineered for instant loading on GitHub Pages (`/design-by-sadia/` subpath safe with relative `./` paths and `.nojekyll` enabled):

- `index.html` & `404.html`: Semantic HTML5 shell with matching SPA fallback for GitHub Pages.
- `styles/tokens.css` & `styles/studio.css`: Dark Botanical Atelier OKLCH 5-plane palette, `Cormorant Garamond` / `Plus Jakarta Sans` / `JetBrains Mono` typography, and responsive bento/masonry grids.
- `data/studio-data.js`: Single source of truth for `BRAND_PROFILE`, `CONE_FORMULAS`, `SERVICE_PACKAGES`, `TRAVEL_ZONES`, `SKETCH_TO_STAIN`, `GENERATED_ARTIFACTS`, `PORTFOLIO_ITEMS`, `TESTIMONIALS`, and `FAQ_ITEMS`.
- `js/app.js`: Portfolio filtering, high-res accessible lightbox, `localStorage` Moodboard pinning (`sadia_moodboard_v1`), navigation drawer, and module orchestration.
- `js/interactive-tools.js`: Sketch-to-Stain pointer/keyboard comparator, 4-Formula 48-Hour Stain Oxidation Lab, and Northern Virginia Coverage & Quote Configurator.
- `js/booking-engine.js`: 4-step Booking Concierge with interactive calendar, pinned moodboard integration, `DBS-` reference generation, `.ics` calendar file download, and Instagram DM / Email brief handoff.
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
