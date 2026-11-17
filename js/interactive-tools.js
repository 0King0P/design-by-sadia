// Architectural editorial interactive modules for Design by Sadia (v2).

const STYLES_ID = 'dbs-interactive-module-styles';

const DEFAULT_SKETCH_STAIN = {
  sketchSrc: './assets/portfolio/sketch-floral-vine.jpg',
  stainSrc: './assets/portfolio/stain-floral-vine.jpg',
  title: 'Bespoke Concept to Living Stain',
  description:
    'Every custom bridal and private commission begins with an anatomical proportion study drawn on iPad over your hand silhouette, ensuring every petal, arch, and lattice balances naturally before a single cone is unsealed.',
  completionMinutes: 45,
  formulaUsed: '100% Organic Hand-Rolled Henna'
};

const STAIN_PHOTO_FALLBACK = {
  organic: './assets/generated/stain-organic-macro.jpg',
  jagua: './assets/generated/stain-jagua-macro.jpg',
  red: './assets/generated/stain-crimson-macro.jpg',
  black: './assets/generated/stain-obsidian-macro.jpg'
};

const FORMULA_TAB_LABELS = {
  organic: 'Organic Henna',
  jagua: 'Botanical Jagua',
  red: 'Ceremonial Crimson',
  black: 'Midnight Black'
};

const DEFAULT_FORMULAS = [
  {
    id: 'organic',
    name: '100% Organic Hand-Rolled Henna',
    badge: 'Signature Plant Blend',
    tagline:
      'Triple-sifted Rajasthani lawsone leaf mixed fresh with eucalyptus and lavender oils for a deep mahogany stain.',
    stainPhotoSrc: './assets/generated/stain-organic-macro.jpg',
    stainHexStages: ['#4A3B23', '#B95D29', '#9F3B1B', '#732312', '#4B130B'],
    longevityDays: '10-14 Days',
    maturityHours: '48 Hours',
    ingredients:
      'Triple-sifted Rajasthani henna powder, pure eucalyptus and lavender essential oils, organic cane sugar, filtered lemon water.',
    bestFor: 'Bridal mehndi, nikah, engagement shoots, sangeet nights, sensitive skin',
    aftercareTip:
      'Leave dried paste on 6 to 8 hours, seal with lemon-sugar dab, scrape gently with oil, and avoid water for the first 12 hours.',
    safetyNote:
      '100% plant-derived and preservative-free. Safe for brides, kids, and expectant mothers.'
  },
  {
    id: 'jagua',
    name: 'Pure Botanical Jagua Gel',
    badge: 'Blue-Black Tattoo Tone',
    tagline:
      'Amazonian Genipa americana fruit extract blended into crisp fine-line gel that oxidizes into deep slate indigo.',
    stainPhotoSrc: './assets/generated/stain-jagua-macro.jpg',
    stainHexStages: ['#1D2330', '#69778A', '#374963', '#1F2E47', '#111B2E'],
    longevityDays: '10-14 Days',
    maturityHours: '36-48 Hours',
    ingredients:
      'Pure Genipa americana fruit juice, lavender essential oil, food-grade xanthan gum.',
    bestFor: 'Khaleeji minimalism, modern editorial looks, temporary body-art trials, Eid',
    aftercareTip:
      'Keep dry paste on 2.5 to 4 hours, rinse gently with cool water without scrubbing, and let the blue-black tint oxidize overnight.',
    safetyNote:
      'Fruit-derived botanical stain. Skip if you have known citrus, berry, or tropical fruit allergies.'
  },
  {
    id: 'red',
    name: 'Ceremonial Crimson Henna',
    badge: 'Same-Day Crimson',
    tagline:
      'Fast-setting ceremonial cone formulated for vibrant crimson-red payoff right after paste removal.',
    stainPhotoSrc: './assets/generated/stain-crimson-macro.jpg',
    stainHexStages: ['#691D1A', '#B9362C', '#A42521', '#8C1A19', '#6F1415'],
    longevityDays: '4-6 Days',
    maturityHours: 'Instant (30 Mins)',
    ingredients:
      'Henna base blended with cosmetic-grade red pigment and quick-dry aromatic botanicals.',
    bestFor: 'Last-minute Eid parties, bridesmaids, cultural stage dances, same-day events',
    aftercareTip:
      'Wear paste 30 to 45 minutes until completely dry, peel off gently, and apply light almond oil for crisp edges.',
    safetyNote:
      'Contains synthetic cosmetic colorants for instant payoff and may cause mild skin irritation on reactive skin. Patch test advised.'
  },
  {
    id: 'black',
    name: 'Midnight Black Henna',
    badge: 'Same-Day Charcoal',
    tagline:
      'High-contrast charcoal-black instant paste designed for crisp same-day photoshoots and bold statement vines.',
    stainPhotoSrc: './assets/generated/stain-obsidian-macro.jpg',
    stainHexStages: ['#242322', '#3A3837', '#2B2928', '#1F1D1C', '#141313'],
    longevityDays: '4-6 Days',
    maturityHours: 'Instant (30 Mins)',
    ingredients:
      'Synthetic black body-ink paste formulated for rapid dark surface staining.',
    bestFor: 'Same-day photoshoots, costume events, editorial accents, festival booths',
    aftercareTip:
      'Remove gently once dry after 30 minutes and keep clean and dry for 2 hours to preserve sharp line work.',
    safetyNote:
      'Synthetic ink formula that may cause skin irritation on sensitive skin. Request Organic or Jagua for natural long-wear staining.'
  }
];

const DEFAULT_PACKAGES = [
  {
    id: 'royal-bridal',
    category: 'bridal',
    name: 'Royal Bridal Palms & Forearms',
    subtitle: 'Signature Couture Mehndi',
    startingPrice: 280,
    priceUnit: 'starting',
    durationMins: 240,
    coverageLevel: 'Both hands (palms + backs) to mid-forearm',
    includes: [
      'Custom pre-session concept consultation and motif planning',
      'Hidden partner initials or wedding date woven into the design'
    ]
  },
  {
    id: 'intimate-nikah',
    category: 'bridal',
    name: 'Intimate Nikah & Engagement',
    subtitle: 'Modern Minimalist Bridal',
    startingPrice: 165,
    priceUnit: 'starting',
    durationMins: 135,
    coverageLevel: 'Both hands (palms or backs) past the wrist',
    includes: [
      'Fine-line floral vines, scalloped cuffs, or twin-hand symmetry',
      'Optional hidden couple initials on index finger or wrist band'
    ]
  },
  {
    id: 'custom-sketch-session',
    category: 'private',
    name: 'Bespoke Concept-to-Stain Private Session',
    subtitle: 'iPad Sketch + Freehand Application',
    startingPrice: 120,
    priceUnit: 'starting',
    durationMins: 90,
    coverageLevel: 'Full hand + wrist cuff from custom digital proof',
    includes: [
      'Custom digital iPad hand sketch approved before your session',
      'Precision freehand transfer onto hand and forearm'
    ]
  },
  {
    id: 'festive-duo-hands',
    category: 'private',
    name: 'Festive Eid & Sangeet Guest',
    subtitle: 'Private Single or Dual-Hand Appointment',
    startingPrice: 65,
    priceUnit: 'starting',
    durationMins: 50,
    coverageLevel: 'Half-hand to wrist floral garland or mandala',
    includes: [
      'Choice of botanical vines, lotus mandalas, or geometric finger lattice',
      'Available in Organic, Jagua, Red, or Black formula'
    ]
  },
  {
    id: 'party-hourly',
    category: 'party',
    name: 'Mehndi Night & Birthday Party Artist',
    subtitle: 'Hourly Guest Speed-Artistry (2 Hr Minimum)',
    startingPrice: 115,
    priceUnit: 'per hour',
    durationMins: 120,
    coverageLevel: '12 to 15 guests per hour (delicate strip & mandala motifs)',
    includes: [
      'Dedicated on-location artist setup across Northern Virginia',
      'Curated guest motif lookbook so lines move quickly'
    ]
  },
  {
    id: 'corporate-cultural-events',
    category: 'events',
    name: 'Corporate, University & Pop-Up Events',
    subtitle: 'DMV Cultural Showcase & Campus Programming',
    startingPrice: 320,
    priceUnit: '3-hour block',
    durationMins: 180,
    coverageLevel: '35 to 45 guests across 3 hours',
    includes: [
      'High-throughput floral, paisley, and modern minimalist menu board',
      'All-natural plant cones plus printed stain & ingredient cards'
    ]
  }
];

const DEFAULT_TRAVEL_ZONES = [
  { id: 'loudoun-local', label: 'Sterling / Ashburn / Herndon', areas: 'Sterling, Ashburn, Herndon, Dulles', fee: 0, minBooking: 65 },
  { id: 'reston-leesburg', label: 'Reston / Leesburg / Chantilly', areas: 'Reston, Leesburg, Lansdowne, Chantilly', fee: 20, minBooking: 95 },
  { id: 'fairfax-tysons', label: 'Tysons / Fairfax / Vienna', areas: 'Tysons, Vienna, Fairfax, McLean', fee: 35, minBooking: 120 },
  { id: 'arlington-dc', label: 'Arlington / Alexandria / DC', areas: 'Arlington, Alexandria, Georgetown, NW DC', fee: 50, minBooking: 165 },
  { id: 'maryland-metro', label: 'Maryland Metro (Bethesda / Silver Spring)', areas: 'Bethesda, Potomac, Rockville, Silver Spring', fee: 65, minBooking: 220 }
];

const STAGE_META = [
  { hour: '0h', label: 'Fresh Paste', filter: 'brightness(1.03) saturate(0.86) contrast(0.97)', veilOpacity: 0.14 },
  { hour: '6h', label: 'Sugar-Lemon Seal', filter: 'brightness(1.01) saturate(0.95) contrast(1.00)', veilOpacity: 0.10 },
  { hour: '12h', label: 'Warm Reveal', filter: 'brightness(1.05) saturate(1.06) contrast(1.02)', veilOpacity: 0.08 },
  { hour: '24h', label: 'Deepening', filter: 'brightness(0.97) saturate(1.08) contrast(1.05)', veilOpacity: 0.05 },
  { hour: '48h', label: 'Peak Stain', filter: 'brightness(0.94) saturate(1.10) contrast(1.08)', veilOpacity: 0.0 }
];

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDuration(mins) {
  const safe = Math.max(20, Math.round(Number(mins) || 45));
  const hrs = Math.floor(safe / 60);
  const rem = safe % 60;
  if (hrs === 0) return `${rem} mins`;
  if (rem === 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${hrs} hr${hrs > 1 ? 's' : ''} ${rem} mins`;
}

function formatPackageRate(pkg) {
  if (pkg.priceUnit === 'per hour') return `$${pkg.startingPrice} / hr`;
  if (pkg.priceUnit === '3-hour block') return `$${pkg.startingPrice} / 3 hrs`;
  return `from $${pkg.startingPrice}`;
}

function injectInteractiveStyles() {
  if (document.getElementById(STYLES_ID)) return;
  const style = document.createElement('style');
  style.id = STYLES_ID;
  style.textContent = `
    .dbs-spread {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: clamp(1.75rem, 4vw, 3.75rem);
      align-items: start;
    }
    .dbs-spread--centered {
      align-items: center;
    }
    .dbs-col-5 { grid-column: span 5; min-width: 0; }
    .dbs-col-6 { grid-column: span 6; min-width: 0; }
    .dbs-col-7 { grid-column: span 7; min-width: 0; }
    @media (max-width: 960px) {
      .dbs-spread {
        grid-template-columns: minmax(0, 1fr);
        gap: 2rem;
      }
      .dbs-col-5,
      .dbs-col-6,
      .dbs-col-7 {
        grid-column: span 1;
      }
    }

    .dbs-micro {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--accent-henna, #c9a96e);
    }
    .dbs-display-title {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-weight: 500;
      font-variant-numeric: lining-nums proportional-nums;
      line-height: 1.08;
      letter-spacing: -0.025em;
      color: var(--text-primary, #f4ece0);
      margin: 0;
    }
    .dbs-prose {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.98rem;
      line-height: 1.7;
      color: var(--text-secondary, #b8ab9a);
      margin: 0;
    }

    /* Architectural Primary CTA */
    .dbs-cta-rect {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      min-height: 46px;
      padding: 0.82rem 1.75rem;
      border-radius: 2px;
      border: 1px solid var(--accent-henna, #c9a96e);
      background: var(--accent-henna, #c9a96e);
      color: var(--accent-ink, #14100d);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 180ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .dbs-cta-rect:hover {
      background: var(--accent-henna-hover, #d8ba82);
    }
    .dbs-cta-rect:active {
      transform: scale(0.985);
    }
    .dbs-cta-rect--full {
      width: 100%;
    }

    /* Section A: Sketch-to-Stain Split Comparator */
    .dbs-split-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 4;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.15));
      background: var(--plane-1-surface, #191512);
      overflow: hidden;
      user-select: none;
      touch-action: none;
      cursor: ew-resize;
    }
    .dbs-split-frame img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .dbs-split-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .dbs-split-rule {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--accent-henna, #c9a96e);
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 3;
    }
    .dbs-split-handle {
      position: absolute;
      top: 50%;
      width: 38px;
      height: 38px;
      border-radius: 2px;
      border: 1px solid var(--accent-henna, #c9a96e);
      background: var(--plane-0-void, #120f0d);
      color: var(--accent-henna, #c9a96e);
      transform: translate(-50%, -50%);
      display: grid;
      place-items: center;
      cursor: ew-resize;
      z-index: 4;
      transition: background-color 160ms ease, color 160ms ease;
    }
    .dbs-split-handle:hover,
    .dbs-split-handle:focus-visible {
      background: var(--accent-henna, #c9a96e);
      color: var(--accent-ink, #14100d);
      outline: none;
    }
    .dbs-underline-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
    }
    .dbs-underline-tab {
      position: relative;
      padding: 0.7rem 0;
      margin-bottom: -1px;
      background: transparent;
      border: 0;
      border-bottom: 1.5px solid transparent;
      border-radius: 0;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted, #8e8171);
      cursor: pointer;
      transition: color 160ms ease, border-color 160ms ease;
    }
    .dbs-underline-tab:hover {
      color: var(--text-primary, #f4ece0);
    }
    .dbs-underline-tab[aria-pressed="true"],
    .dbs-underline-tab[aria-selected="true"] {
      color: var(--text-primary, #f4ece0);
      border-bottom-color: var(--accent-henna, #c9a96e);
    }

    /* Hairline Spec Ledger */
    .dbs-ledger {
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
    }
    .dbs-ledger-row {
      display: grid;
      grid-template-columns: minmax(140px, 34%) minmax(0, 1fr);
      gap: 1rem;
      padding: 0.95rem 0;
      border-top: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
      align-items: baseline;
    }
    @media (max-width: 560px) {
      .dbs-ledger-row {
        grid-template-columns: minmax(0, 1fr);
        gap: 0.3rem;
      }
    }
    .dbs-ledger-key {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted, #8e8171);
    }
    .dbs-ledger-val {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.93rem;
      line-height: 1.55;
      color: var(--text-primary, #f4ece0);
    }

    /* Section B: 48-Hour Oxidation Lab */
    .dbs-lab-photo {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 5;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.15));
      background: var(--plane-1-surface, #191512);
      overflow: hidden;
    }
    .dbs-lab-photo__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: filter 260ms ease;
    }
    .dbs-lab-photo__veil {
      position: absolute;
      inset: 0;
      pointer-events: none;
      mix-blend-mode: soft-light;
      transition: opacity 260ms ease, background-color 260ms ease;
    }
    .dbs-lab-caption {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
    }
    .dbs-lab-range-wrap {
      padding: 0.95rem 0 0.65rem;
    }
    .dbs-lab-range {
      width: 100%;
      height: 2px;
      margin: 0;
      appearance: none;
      background: var(--border-strong, rgba(244, 236, 224, 0.22));
      border-radius: 0;
      cursor: pointer;
    }
    .dbs-lab-range::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background: var(--accent-henna, #c9a96e);
      border: 1px solid var(--plane-0-void, #120f0d);
      cursor: pointer;
    }
    .dbs-lab-range::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background: var(--accent-henna, #c9a96e);
      border: 1px solid var(--plane-0-void, #120f0d);
      cursor: pointer;
    }
    .dbs-swatch-bar {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 0.5rem;
      margin-top: 0.45rem;
    }
    .dbs-swatch-btn {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
      padding: 0 0 0.5rem;
      background: transparent;
      border: 0;
      border-bottom: 1.5px solid transparent;
      border-radius: 0;
      text-align: left;
      cursor: pointer;
      transition: border-color 160ms ease;
    }
    .dbs-swatch-btn[aria-pressed="true"] {
      border-bottom-color: var(--accent-henna, #c9a96e);
    }
    .dbs-swatch-chip {
      width: 100%;
      height: 22px;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
    }
    .dbs-swatch-hour {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--text-muted, #8e8171);
    }
    .dbs-swatch-btn[aria-pressed="true"] .dbs-swatch-hour {
      color: var(--accent-henna, #c9a96e);
    }
    .dbs-swatch-hex {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.64rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--text-secondary, #b8ab9a);
    }

    /* Section C: Rate Menu & Atelier Calculator */
    .dbs-rate-menu {
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
    }
    .dbs-rate-row {
      width: 100%;
      display: grid;
      grid-template-columns: 2.2rem minmax(0, 1fr) auto;
      gap: 0.65rem 1.15rem;
      align-items: baseline;
      padding: 1.3rem 0.75rem;
      background: transparent;
      border: 0;
      border-top: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
      border-radius: 0;
      text-align: left;
      cursor: pointer;
      transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }
    .dbs-rate-row:hover {
      background: color-mix(in oklch, var(--accent-henna, #c9a96e) 4%, transparent);
    }
    .dbs-rate-row[aria-pressed="true"] {
      background: color-mix(in oklch, var(--accent-henna, #c9a96e) 7%, transparent);
      border-top-color: var(--accent-henna, #c9a96e);
      box-shadow: inset 0 -1px 0 0 var(--accent-henna, #c9a96e);
    }
    .dbs-rate-roman {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 1.15rem;
      font-style: italic;
      font-variant-numeric: lining-nums;
      color: var(--text-muted, #8e8171);
      transition: color 160ms ease;
    }
    .dbs-rate-row[aria-pressed="true"] .dbs-rate-roman,
    .dbs-rate-row[aria-pressed="true"] .dbs-rate-price {
      color: var(--accent-henna, #c9a96e);
    }
    .dbs-rate-title {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 1.48rem;
      font-weight: 500;
      font-variant-numeric: lining-nums proportional-nums;
      line-height: 1.15;
      color: var(--text-primary, #f4ece0);
    }
    .dbs-rate-sub {
      margin-top: 0.2rem;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.71rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted, #8e8171);
    }
    .dbs-rate-summary {
      grid-column: 2 / -1;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.87rem;
      line-height: 1.5;
      color: var(--text-secondary, #b8ab9a);
      margin-top: 0.15rem;
    }
    .dbs-rate-price {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 1.6rem;
      font-weight: 500;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--text-primary, #f4ece0);
      white-space: nowrap;
    }
    @media (max-width: 560px) {
      .dbs-rate-row {
        grid-template-columns: 1.6rem minmax(0, 1fr);
        padding: 1.1rem 0.65rem;
      }
      .dbs-rate-price {
        grid-column: 2 / -1;
        font-size: 1.45rem;
      }
    }

    .dbs-calc-panel {
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      border-radius: 2px;
      padding: 2.25rem;
      background: var(--plane-1-surface, #191512);
      display: grid;
      gap: 1.35rem;
    }
    @media (max-width: 560px) {
      .dbs-calc-panel {
        padding: 1.4rem;
      }
    }
    .dbs-seg-group {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.14));
      border-radius: 2px;
    }
    .dbs-seg-btn {
      padding: 0.68rem 0.75rem;
      background: transparent;
      border: 0;
      border-radius: 0;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-secondary, #b8ab9a);
      cursor: pointer;
      transition: background-color 160ms ease, color 160ms ease;
    }
    .dbs-seg-btn + .dbs-seg-btn {
      border-left: 1px solid var(--border-specular, rgba(244, 236, 224, 0.14));
    }
    .dbs-seg-btn[aria-pressed="true"] {
      background: var(--accent-henna-soft, rgba(201, 169, 110, 0.14));
      color: var(--accent-henna, #c9a96e);
    }
    .dbs-chip-grid-4 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem;
    }
    .dbs-opt-btn {
      padding: 0.62rem 0.75rem;
      border-radius: 2px;
      border: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.11));
      background: transparent;
      color: var(--text-secondary, #b8ab9a);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.8rem;
      text-align: left;
      cursor: pointer;
      transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
    }
    .dbs-opt-btn[aria-pressed="true"] {
      border-color: var(--accent-henna, #c9a96e);
      background: var(--accent-henna-soft, rgba(201, 169, 110, 0.12));
      color: var(--text-primary, #f4ece0);
    }
    .dbs-field-label {
      display: block;
      margin-bottom: 0.45rem;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.69rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted, #8e8171);
    }
    .dbs-select-arch {
      width: 100%;
      min-height: 44px;
      padding: 0.65rem 0.85rem;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      background: var(--plane-0-void, #120f0d);
      color: var(--text-primary, #f4ece0);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.88rem;
    }
    .dbs-select-arch:focus {
      outline: none;
      border-color: var(--accent-henna, #c9a96e);
    }
    .dbs-calc-total {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 2.6rem;
      font-weight: 500;
      line-height: 1;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--text-primary, #f4ece0);
    }
    .dbs-calc-summary-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.65rem 0;
      border-top: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
      font-size: 0.85rem;
      color: var(--text-secondary, #b8ab9a);
      font-variant-numeric: tabular-nums lining-nums;
    }
    .dbs-calc-summary-row strong {
      font-weight: 500;
      color: var(--text-primary, #f4ece0);
    }
  `;
  document.head.appendChild(style);
}

function mountSketchStainSection(mountEl, sketchData, onPresetBook) {
  if (!mountEl) return;

  const data = {
    sketchSrc: sketchData?.sketchSrc || DEFAULT_SKETCH_STAIN.sketchSrc,
    stainSrc: sketchData?.stainSrc || DEFAULT_SKETCH_STAIN.stainSrc,
    title: sketchData?.title || DEFAULT_SKETCH_STAIN.title,
    description: sketchData?.description || DEFAULT_SKETCH_STAIN.description,
    completionMinutes: sketchData?.completionMinutes || DEFAULT_SKETCH_STAIN.completionMinutes,
    formulaUsed: sketchData?.formulaUsed || DEFAULT_SKETCH_STAIN.formulaUsed
  };

  let splitPct = 50;
  let dragging = false;

  mountEl.innerHTML = `
    <div class="dbs-spread dbs-spread--centered">
      <div class="dbs-col-6">
        <div class="dbs-split-frame" data-split-frame>
          <img src="${escapeHtml(data.stainSrc)}" alt="Finished freehand organic henna stain by Sadia" loading="eager">
          <div class="dbs-split-layer" data-split-layer style="clip-path: inset(0 ${100 - splitPct}% 0 0);">
            <img src="${escapeHtml(data.sketchSrc)}" alt="Digital iPad botanical blueprint drawn prior to session" loading="eager">
          </div>
          <div class="dbs-split-rule" data-split-rule style="left: ${splitPct}%;"></div>
          <button
            type="button"
            class="dbs-split-handle"
            data-split-handle
            role="slider"
            tabindex="0"
            aria-label="Compare digital blueprint and finished hand stain"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${splitPct}"
            style="left: ${splitPct}%;"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" aria-hidden="true">
              <polyline points="9 18 3 12 9 6"></polyline>
              <polyline points="15 6 21 12 15 18"></polyline>
            </svg>
          </button>
        </div>

        <div class="dbs-underline-tabs" role="group" aria-label="Blueprint comparison view" style="margin-top: 0.9rem;">
          <button type="button" class="dbs-underline-tab" data-split-preset="100" aria-pressed="false">Digital Blueprint</button>
          <button type="button" class="dbs-underline-tab" data-split-preset="50" aria-pressed="true">50-50 Split</button>
          <button type="button" class="dbs-underline-tab" data-split-preset="0" aria-pressed="false">Finished Hand Stain</button>
        </div>
      </div>

      <div class="dbs-col-6" style="display: grid; gap: 1.5rem;">
        <div style="display: grid; gap: 0.85rem;">
          <span class="dbs-micro">iPad Proportion Mapping</span>
          <h3 class="dbs-display-title" style="font-size: clamp(1.85rem, 2.7vw, 2.45rem);">${escapeHtml(data.title)}</h3>
          <p class="dbs-prose">${escapeHtml(data.description)}</p>
        </div>

        <div class="dbs-ledger">
          <div class="dbs-ledger-row">
            <span class="dbs-ledger-key">Freehand Application Time</span>
            <span class="dbs-ledger-val" style="font-variant-numeric: tabular-nums lining-nums;">${escapeHtml(data.completionMinutes)} Minutes</span>
          </div>
          <div class="dbs-ledger-row">
            <span class="dbs-ledger-key">Paste Formula</span>
            <span class="dbs-ledger-val">${escapeHtml(data.formulaUsed)}</span>
          </div>
        </div>

        <div>
          <button type="button" class="dbs-cta-rect" data-sketch-reserve>Reserve a Date</button>
        </div>
      </div>
    </div>
  `;

  const frame = mountEl.querySelector('[data-split-frame]');
  const layer = mountEl.querySelector('[data-split-layer]');
  const rule = mountEl.querySelector('[data-split-rule]');
  const handle = mountEl.querySelector('[data-split-handle]');
  const presetBtns = Array.from(mountEl.querySelectorAll('[data-split-preset]'));

  function applySplit(nextPct) {
    splitPct = Math.max(0, Math.min(100, Math.round(nextPct)));
    if (layer) layer.style.clipPath = `inset(0 ${100 - splitPct}% 0 0)`;
    if (rule) rule.style.left = `${splitPct}%`;
    if (handle) {
      handle.style.left = `${splitPct}%`;
      handle.setAttribute('aria-valuenow', String(splitPct));
    }
    presetBtns.forEach((btn) => {
      const target = Number(btn.getAttribute('data-split-preset'));
      const active =
        (target === 100 && splitPct >= 95) ||
        (target === 0 && splitPct <= 5) ||
        (target === 50 && splitPct > 5 && splitPct < 95);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateFromClientX(clientX) {
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (!rect.width) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    applySplit(pct);
  }

  frame?.addEventListener('pointerdown', (ev) => {
    dragging = true;
    frame.setPointerCapture?.(ev.pointerId);
    updateFromClientX(ev.clientX);
  });

  frame?.addEventListener('pointermove', (ev) => {
    if (!dragging) return;
    updateFromClientX(ev.clientX);
  });

  const endDrag = () => {
    dragging = false;
  };
  frame?.addEventListener('pointerup', endDrag);
  frame?.addEventListener('pointercancel', endDrag);

  handle?.addEventListener('keydown', (ev) => {
    const step = ev.shiftKey ? 10 : 4;
    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      applySplit(splitPct - step);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      applySplit(splitPct + step);
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      applySplit(0);
    } else if (ev.key === 'End') {
      ev.preventDefault();
      applySplit(100);
    }
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      applySplit(Number(btn.getAttribute('data-split-preset')));
    });
  });

  mountEl.querySelector('[data-sketch-reserve]')?.addEventListener('click', () => {
    onPresetBook?.({
      packageId: 'custom-sketch-session',
      formulaId: 'organic',
      customSketch: true
    });
  });
}

function mountStainLabSection(mountEl, rawFormulas, onPresetBook) {
  if (!mountEl) return;

  const formulas = Array.isArray(rawFormulas) && rawFormulas.length ? rawFormulas : DEFAULT_FORMULAS;
  let activeFormulaId = formulas[0].id;
  let activeStageIdx = 4;

  function getActiveFormula() {
    return formulas.find((f) => f.id === activeFormulaId) || formulas[0];
  }

  function render() {
    const formula = getActiveFormula();
    const stages = Array.isArray(formula.stainHexStages) && formula.stainHexStages.length >= 5
      ? formula.stainHexStages
      : DEFAULT_FORMULAS[0].stainHexStages;
    const stageMeta = STAGE_META[activeStageIdx] || STAGE_META[4];
    const activeHex = stages[activeStageIdx] || stages[4];
    const photoSrc = formula.stainPhotoSrc || STAIN_PHOTO_FALLBACK[formula.id] || STAIN_PHOTO_FALLBACK.organic;

    mountEl.innerHTML = `
      <div class="dbs-spread">
        <div class="dbs-col-5" style="display: grid; gap: 0.65rem;">
          <div class="dbs-lab-photo">
            <img
              class="dbs-lab-photo__img"
              data-lab-photo
              src="${escapeHtml(photoSrc)}"
              alt="${escapeHtml(formula.name)} macro studio stain study at ${escapeHtml(stageMeta.hour)}"
              style="filter: ${stageMeta.filter};"
              loading="eager"
            >
            <div
              class="dbs-lab-photo__veil"
              data-lab-veil
              style="background-color: ${escapeHtml(activeHex)}; opacity: ${stageMeta.veilOpacity};"
            ></div>
          </div>

          <div class="dbs-lab-caption">
            <span class="dbs-micro" data-lab-stage-label>${escapeHtml(stageMeta.hour)} &middot; ${escapeHtml(stageMeta.label)}</span>
            <span class="dbs-micro" style="color: var(--text-secondary);" data-lab-stage-hex>${escapeHtml(activeHex)}</span>
          </div>

          <div class="dbs-lab-range-wrap">
            <label for="dbs-oxidation-range" class="dbs-field-label" style="margin-bottom: 0.55rem;">48-Hour Oxidation Scrub</label>
            <input
              id="dbs-oxidation-range"
              class="dbs-lab-range"
              type="range"
              min="0"
              max="4"
              step="1"
              value="${activeStageIdx}"
              aria-label="Scrub across 48-hour stain oxidation stages"
            >
          </div>

          <div class="dbs-swatch-bar" role="group" aria-label="Oxidation pigment swatches">
            ${STAGE_META.map((st, idx) => {
              const hex = stages[idx] || activeHex;
              const isPressed = idx === activeStageIdx;
              return `
                <button
                  type="button"
                  class="dbs-swatch-btn"
                  data-stain-stage="${idx}"
                  aria-pressed="${isPressed ? 'true' : 'false'}"
                >
                  <span class="dbs-swatch-chip" style="background-color: ${escapeHtml(hex)};"></span>
                  <span class="dbs-swatch-hour">${escapeHtml(st.hour)}</span>
                  <span class="dbs-swatch-hex">${escapeHtml(hex)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="dbs-col-7" style="display: grid; gap: 1.6rem;">
          <div class="dbs-underline-tabs" role="tablist" aria-label="Paste formulas">
            ${formulas
              .map((f) => {
                const tabLabel = FORMULA_TAB_LABELS[f.id] || f.name;
                const selected = f.id === formula.id;
                return `
                  <button
                    type="button"
                    role="tab"
                    class="dbs-underline-tab"
                    data-formula-tab="${escapeHtml(f.id)}"
                    aria-selected="${selected ? 'true' : 'false'}"
                  >${escapeHtml(tabLabel)}</button>
                `;
              })
              .join('')}
          </div>

          <div style="display: grid; gap: 0.75rem;">
            <span class="dbs-micro">${escapeHtml(formula.badge || 'Apothecary Formula')}</span>
            <h3 class="dbs-display-title" style="font-size: clamp(1.9rem, 2.8vw, 2.55rem);">${escapeHtml(formula.name)}</h3>
            <p class="dbs-prose">${escapeHtml(formula.tagline)}</p>
          </div>

          <div class="dbs-ledger">
            <div class="dbs-ledger-row">
              <span class="dbs-ledger-key">Peak Maturation</span>
              <span class="dbs-ledger-val" style="font-variant-numeric: tabular-nums lining-nums;">${escapeHtml(formula.maturityHours)}</span>
            </div>
            <div class="dbs-ledger-row">
              <span class="dbs-ledger-key">Wear Longevity</span>
              <span class="dbs-ledger-val" style="font-variant-numeric: tabular-nums lining-nums;">${escapeHtml(formula.longevityDays)}</span>
            </div>
            <div class="dbs-ledger-row">
              <span class="dbs-ledger-key">Botanical Composition</span>
              <span class="dbs-ledger-val">${escapeHtml(formula.ingredients)}</span>
            </div>
            <div class="dbs-ledger-row">
              <span class="dbs-ledger-key">Recommended Occasions</span>
              <span class="dbs-ledger-val">${escapeHtml(formula.bestFor)}</span>
            </div>
            <div class="dbs-ledger-row">
              <span class="dbs-ledger-key">Aftercare Seal Ritual</span>
              <span class="dbs-ledger-val">${escapeHtml(formula.aftercareTip)}</span>
            </div>
            <div class="dbs-ledger-row">
              <span class="dbs-ledger-key">Skin Guidance</span>
              <span class="dbs-ledger-val">${escapeHtml(formula.safetyNote)}</span>
            </div>
          </div>

          <div>
            <button type="button" class="dbs-cta-rect" data-lab-reserve="${escapeHtml(formula.id)}">Reserve a Date</button>
          </div>
        </div>
      </div>
    `;

    mountEl.querySelectorAll('[data-formula-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextId = btn.getAttribute('data-formula-tab');
        if (!nextId || nextId === activeFormulaId) return;
        activeFormulaId = nextId;
        render();
      });
    });

    const syncStage = (idx) => {
      activeStageIdx = Math.max(0, Math.min(4, Number(idx) || 0));
      const meta = STAGE_META[activeStageIdx];
      const currentFormula = getActiveFormula();
      const hexList = Array.isArray(currentFormula.stainHexStages) ? currentFormula.stainHexStages : stages;
      const hex = hexList[activeStageIdx] || hexList[0];

      const img = mountEl.querySelector('[data-lab-photo]');
      const veil = mountEl.querySelector('[data-lab-veil]');
      const capLabel = mountEl.querySelector('[data-lab-stage-label]');
      const capHex = mountEl.querySelector('[data-lab-stage-hex]');
      const range = mountEl.querySelector('#dbs-oxidation-range');

      if (img) img.style.filter = meta.filter;
      if (veil) {
        veil.style.backgroundColor = hex;
        veil.style.opacity = String(meta.veilOpacity);
      }
      if (capLabel) capLabel.textContent = `${meta.hour} \u00b7 ${meta.label}`;
      if (capHex) capHex.textContent = hex;
      if (range && Number(range.value) !== activeStageIdx) range.value = String(activeStageIdx);

      mountEl.querySelectorAll('[data-stain-stage]').forEach((sw) => {
        const swIdx = Number(sw.getAttribute('data-stain-stage'));
        sw.setAttribute('aria-pressed', swIdx === activeStageIdx ? 'true' : 'false');
      });
    };

    mountEl.querySelector('#dbs-oxidation-range')?.addEventListener('input', (ev) => {
      syncStage(ev.target.value);
    });

    mountEl.querySelectorAll('[data-stain-stage]').forEach((btn) => {
      btn.addEventListener('click', () => {
        syncStage(btn.getAttribute('data-stain-stage'));
      });
    });

    mountEl.querySelector('[data-lab-reserve]')?.addEventListener('click', () => {
      onPresetBook?.({ formulaId: formula.id });
    });
  }

  render();
}

function mountEstimatorSection(mountEl, studioData, onPresetBook) {
  if (!mountEl) return;

  const packages = Array.isArray(studioData?.SERVICE_PACKAGES) && studioData.SERVICE_PACKAGES.length
    ? studioData.SERVICE_PACKAGES
    : DEFAULT_PACKAGES;
  const formulas = Array.isArray(studioData?.CONE_FORMULAS) && studioData.CONE_FORMULAS.length
    ? studioData.CONE_FORMULAS
    : DEFAULT_FORMULAS;
  const zones = Array.isArray(studioData?.TRAVEL_ZONES) && studioData.TRAVEL_ZONES.length
    ? studioData.TRAVEL_ZONES
    : DEFAULT_TRAVEL_ZONES;

  const state = {
    packageId: packages[0].id,
    mode: 'individual',
    sides: 'both',
    hands: 'pair',
    partyHours: 2,
    formulaId: formulas[0].id,
    travelZoneId: zones[0].id
  };

  function getSelectedPackage() {
    return packages.find((p) => p.id === state.packageId) || packages[0];
  }

  function selectPackage(pkgId) {
    const pkg = packages.find((p) => p.id === pkgId);
    if (!pkg) return;
    state.packageId = pkg.id;
    if (pkg.category === 'party' || pkg.category === 'events' || pkg.priceUnit === 'per hour' || pkg.priceUnit === '3-hour block') {
      state.mode = 'party';
      state.partyHours = pkg.id === 'corporate-cultural-events' ? 3 : 2;
    } else {
      state.mode = 'individual';
      if (pkg.category === 'bridal') {
        state.sides = 'both';
        state.hands = 'pair';
      } else if (pkg.id === 'custom-sketch-session') {
        state.sides = 'one';
        state.hands = 'single';
      } else {
        state.sides = 'one';
        state.hands = 'pair';
      }
    }
  }

  function computeQuote() {
    const pkg = getSelectedPackage();
    const zone = zones.find((z) => z.id === state.travelZoneId) || zones[0];
    const formulaFee = state.formulaId === 'jagua' ? 15 : 0;

    let baseInvestment = Number(pkg.startingPrice) || 120;
    let durationMins = Number(pkg.durationMins) || 60;
    let cones = 2;

    if (state.mode === 'party') {
      const hours = Math.max(2, Number(state.partyHours) || 2);
      if (pkg.id === 'corporate-cultural-events') {
        const extraHrs = Math.max(0, hours - 3);
        baseInvestment = (Number(pkg.startingPrice) || 320) + extraHrs * 105;
      } else {
        const hourlyRate = pkg.priceUnit === 'per hour' ? Number(pkg.startingPrice) || 115 : 115;
        baseInvestment = hourlyRate * hours;
      }
      durationMins = hours * 60;
      cones = Math.max(4, Math.round(hours * 2.5));
    } else {
      const isBridal = pkg.category === 'bridal';
      const base = Number(pkg.startingPrice) || 120;
      const sideFactor = isBridal
        ? (state.sides === 'one' ? 0.75 : 1)
        : (state.sides === 'both' ? 1.55 : 1);
      const handFactor = isBridal
        ? (state.hands === 'single' ? 0.65 : 1)
        : (pkg.id === 'custom-sketch-session' && state.hands === 'pair' ? 1.7 : 1);
      baseInvestment = Math.round((base * sideFactor * handFactor) / 5) * 5;
      durationMins = Math.round((Number(pkg.durationMins) || 90) * sideFactor * (state.hands === 'single' && isBridal ? 0.65 : 1));
      cones = Math.max(1, Math.round((baseInvestment / 60) * 1.1));
    }

    const travelFee = Number(zone.fee) || 0;
    const total = baseInvestment + formulaFee + travelFee;
    const retainer = Math.round(total * 0.5);

    return {
      pkg,
      zone,
      baseInvestment,
      formulaFee,
      travelFee,
      total,
      retainer,
      durationMins,
      cones
    };
  }

  function render() {
    const q = computeQuote();

    mountEl.innerHTML = `
      <div class="dbs-spread">
        <div class="dbs-col-7">
          <div class="dbs-micro" style="margin-bottom: 1rem;">Studio Commission Menu &middot; Select a Tier</div>
          <div class="dbs-rate-menu" role="list">
            ${packages
              .map((pkg, idx) => {
                const selected = pkg.id === state.packageId;
                const roman = ROMAN_NUMERALS[idx] || String(idx + 1);
                const summary = pkg.coverageLevel || (Array.isArray(pkg.includes) ? pkg.includes[0] : '');
                return `
                  <button
                    type="button"
                    class="dbs-rate-row"
                    data-rate-pkg="${escapeHtml(pkg.id)}"
                    aria-pressed="${selected ? 'true' : 'false'}"
                  >
                    <span class="dbs-rate-roman">${escapeHtml(roman)}</span>
                    <span>
                      <span class="dbs-rate-title">${escapeHtml(pkg.name)}</span>
                      <div class="dbs-rate-sub">${escapeHtml(pkg.subtitle)}</div>
                    </span>
                    <span class="dbs-rate-price">${escapeHtml(formatPackageRate(pkg))}</span>
                    <span class="dbs-rate-summary">${escapeHtml(summary)}</span>
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>

        <div class="dbs-col-5">
          <div class="dbs-calc-panel">
            <div>
              <span class="dbs-micro">Atelier Session Calculator</span>
              <h3 class="dbs-display-title" style="font-size: 1.65rem; margin-top: 0.35rem;">${escapeHtml(q.pkg.name)}</h3>
            </div>

            <div>
              <span class="dbs-field-label">Commission Format</span>
              <div class="dbs-seg-group" role="group" aria-label="Commission format">
                <button type="button" class="dbs-seg-btn" data-calc-mode="individual" aria-pressed="${state.mode === 'individual' ? 'true' : 'false'}">Individual / Bridal</button>
                <button type="button" class="dbs-seg-btn" data-calc-mode="party" aria-pressed="${state.mode === 'party' ? 'true' : 'false'}">Hourly Guest Artist</button>
              </div>
            </div>

            ${
              state.mode === 'individual'
                ? `
                  <div>
                    <label for="dbs-calc-tier" class="dbs-field-label">Coverage Level</label>
                    <select id="dbs-calc-tier" class="dbs-select-arch">
                      ${packages
                        .filter((p) => p.category !== 'party' && p.category !== 'events')
                        .map((p) => `<option value="${escapeHtml(p.id)}" ${p.id === state.packageId ? 'selected' : ''}>${escapeHtml(p.name)} (${escapeHtml(formatPackageRate(p))})</option>`)
                        .join('')}
                    </select>
                  </div>

                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem;">
                    <div>
                      <span class="dbs-field-label">Hand Sides</span>
                      <div class="dbs-seg-group" role="group" aria-label="Hand sides">
                        <button type="button" class="dbs-seg-btn" data-calc-sides="one" aria-pressed="${state.sides === 'one' ? 'true' : 'false'}">One Side</button>
                        <button type="button" class="dbs-seg-btn" data-calc-sides="both" aria-pressed="${state.sides === 'both' ? 'true' : 'false'}">Both Sides</button>
                      </div>
                    </div>
                    <div>
                      <span class="dbs-field-label">Hand Count</span>
                      <div class="dbs-seg-group" role="group" aria-label="Hand count">
                        <button type="button" class="dbs-seg-btn" data-calc-hands="single" aria-pressed="${state.hands === 'single' ? 'true' : 'false'}">Single</button>
                        <button type="button" class="dbs-seg-btn" data-calc-hands="pair" aria-pressed="${state.hands === 'pair' ? 'true' : 'false'}">Pair</button>
                      </div>
                    </div>
                  </div>
                `
                : `
                  <div>
                    <label for="dbs-calc-event-tier" class="dbs-field-label">Event Tier</label>
                    <select id="dbs-calc-event-tier" class="dbs-select-arch">
                      ${packages
                        .filter((p) => p.category === 'party' || p.category === 'events')
                        .map((p) => `<option value="${escapeHtml(p.id)}" ${p.id === state.packageId ? 'selected' : ''}>${escapeHtml(p.name)} (${escapeHtml(formatPackageRate(p))})</option>`)
                        .join('')}
                    </select>
                  </div>
                  <div>
                    <label for="dbs-calc-hours" class="dbs-field-label">Artist Booking Hours</label>
                    <select id="dbs-calc-hours" class="dbs-select-arch">
                      ${[2, 3, 4, 5, 6]
                        .map((h) => `<option value="${h}" ${state.partyHours === h ? 'selected' : ''}>${h} Hours (${h * 12}-${h * 15} guests est.)</option>`)
                        .join('')}
                    </select>
                  </div>
                `
            }

            <div>
              <span class="dbs-field-label">Paste Formula</span>
              <div class="dbs-chip-grid-4" role="group" aria-label="Paste formula selection">
                ${formulas
                  .map((f) => {
                    const label = FORMULA_TAB_LABELS[f.id] || f.name;
                    const active = f.id === state.formulaId;
                    return `<button type="button" class="dbs-opt-btn" data-calc-formula="${escapeHtml(f.id)}" aria-pressed="${active ? 'true' : 'false'}">${escapeHtml(label)}</button>`;
                  })
                  .join('')}
              </div>
            </div>

            <div>
              <label for="dbs-calc-zone" class="dbs-field-label">Northern Virginia &amp; DMV Travel Zone</label>
              <select id="dbs-calc-zone" class="dbs-select-arch">
                ${zones
                  .map((z) => {
                    const feeTxt = z.fee === 0 ? 'No Travel Fee' : `+$${z.fee} Travel`;
                    return `<option value="${escapeHtml(z.id)}" ${z.id === state.travelZoneId ? 'selected' : ''}>${escapeHtml(z.label)} (${feeTxt})</option>`;
                  })
                  .join('')}
              </select>
            </div>

            <div style="padding-top: 0.4rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.85rem;">
                <div>
                  <span class="dbs-micro">Estimated Investment</span>
                  <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">
                    ${q.travelFee > 0 ? `Includes $${q.travelFee} travel` : 'Sterling studio / local rate'}
                  </div>
                </div>
                <div class="dbs-calc-total" data-calc-total>$${q.total}</div>
              </div>

              <div class="dbs-calc-summary-row">
                <span>50% Retainer to Lock Date</span>
                <strong>$${q.retainer}</strong>
              </div>
              <div class="dbs-calc-summary-row">
                <span>Chair Duration</span>
                <strong>${escapeHtml(formatDuration(q.durationMins))}</strong>
              </div>
              <div class="dbs-calc-summary-row" style="border-bottom: 1px solid var(--border-subtle);">
                <span>Hand-Rolled Cones</span>
                <strong>${q.cones} fresh cones</strong>
              </div>
            </div>

            <button type="button" class="dbs-cta-rect dbs-cta-rect--full" data-calc-reserve>Reserve a Date</button>
          </div>
        </div>
      </div>
    `;

    mountEl.querySelectorAll('[data-rate-pkg]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectPackage(btn.getAttribute('data-rate-pkg'));
        render();
      });
    });

    mountEl.querySelectorAll('[data-calc-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextMode = btn.getAttribute('data-calc-mode');
        if (!nextMode || nextMode === state.mode) return;
        state.mode = nextMode;
        if (nextMode === 'party') {
          const partyPkg = packages.find((p) => p.category === 'party' || p.category === 'events');
          if (partyPkg) state.packageId = partyPkg.id;
        } else {
          const indPkg = packages.find((p) => p.category === 'bridal' || p.category === 'private');
          if (indPkg) state.packageId = indPkg.id;
        }
        render();
      });
    });

    mountEl.querySelector('#dbs-calc-tier')?.addEventListener('change', (ev) => {
      selectPackage(ev.target.value);
      render();
    });

    mountEl.querySelector('#dbs-calc-event-tier')?.addEventListener('change', (ev) => {
      selectPackage(ev.target.value);
      render();
    });

    mountEl.querySelector('#dbs-calc-hours')?.addEventListener('change', (ev) => {
      state.partyHours = Number(ev.target.value) || 2;
      render();
    });

    mountEl.querySelectorAll('[data-calc-sides]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.sides = btn.getAttribute('data-calc-sides') || 'both';
        render();
      });
    });

    mountEl.querySelectorAll('[data-calc-hands]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.hands = btn.getAttribute('data-calc-hands') || 'pair';
        render();
      });
    });

    mountEl.querySelectorAll('[data-calc-formula]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.formulaId = btn.getAttribute('data-calc-formula') || formulas[0].id;
        render();
      });
    });

    mountEl.querySelector('#dbs-calc-zone')?.addEventListener('change', (ev) => {
      state.travelZoneId = ev.target.value;
      render();
    });

    mountEl.querySelector('[data-calc-reserve]')?.addEventListener('click', () => {
      const quote = computeQuote();
      const note =
        state.mode === 'party'
          ? `${state.partyHours} hours hourly guest artistry`
          : `${state.sides === 'both' ? 'Both sides' : 'One side'}, ${state.hands === 'pair' ? 'pair of hands' : 'single hand'}`;
      onPresetBook?.({
        packageId: quote.pkg.id,
        formulaId: state.formulaId,
        travelZoneId: state.travelZoneId,
        estimatedTotal: quote.total,
        durationMins: quote.durationMins,
        customSketch: quote.pkg.id === 'custom-sketch-session',
        notes: note
      });
    });
  }

  render();
}

export function initInteractiveTools({
  mountSketchStain,
  mountStainLab,
  mountEstimator,
  studioData = {},
  onPresetBook
} = {}) {
  injectInteractiveStyles();
  mountSketchStainSection(mountSketchStain, studioData.SKETCH_TO_STAIN, onPresetBook);
  mountStainLabSection(mountStainLab, studioData.CONE_FORMULAS, onPresetBook);
  mountEstimatorSection(mountEstimator, studioData, onPresetBook);
}
