// Interactive showcase and quote tools for Design by Sadia.

const STYLES_ID = 'dbs-interactive-module-styles';

const DEFAULT_SKETCH_STAIN = {
  sketchSrc: './assets/portfolio/sketch-floral-vine.jpg',
  stainSrc: './assets/portfolio/stain-floral-vine.jpg',
  title: 'Bespoke Concept to Living Stain',
  description:
    'Every custom commission begins with a hand-drawn digital iPad blueprint tailored to your hand proportions before a single drop of organic paste touches skin.',
  completionMinutes: 45,
  formulaUsed: '100% Organic Hand-Rolled Henna'
};

const DEFAULT_FORMULAS = [
  {
    id: 'organic',
    name: 'Organic Henna',
    badge: '100% Botanical',
    tagline: 'Freshly sifted Rajasthani lawsone blended with pure eucalyptus and lavender oils.',
    stainHexStages: ['#3e4728', '#8c5a2b', '#c66524', '#8f3414', '#4d180a'],
    longevityDays: '10 to 14 days',
    maturityHours: '48 hours',
    ingredients: 'Organic Rajasthani henna powder, distilled water, pure lavender & eucalyptus essential oils, cane sugar.',
    bestFor: 'Bridal couture, Eid & Diwali celebrations, pregnancy-safe natural body art.',
    aftercareTip: 'Keep paste sealed for 6 to 8 hours with lemon-sugar mist, scrape off dry with oil, and avoid water for the first 12 hours.',
    safetyNote: 'Zero PPD, zero synthetic dyes, safe for sensitive skin.'
  },
  {
    id: 'jagua',
    name: 'Botanical Jagua',
    badge: 'Blue-Black Ink',
    tagline: 'Amazonian Genipa americana fruit gel developing into a realistic deep navy-black tattoo stain.',
    stainHexStages: ['#687285', '#4c5770', '#313d59', '#1c2540', '#0e1529'],
    longevityDays: '10 to 16 days',
    maturityHours: '36 to 48 hours',
    ingredients: 'Pure Amazonian jagua juice extract, xanthan gum, lavender essential oil, distilled water.',
    bestFor: 'Modern editorial looks, festival sleeves, minimalist jewelry-inspired cuffs.',
    aftercareTip: 'Wash gently with cool water once dry after 3 to 4 hours. Color starts nearly invisible and oxidizes dramatically over 36 hours.',
    safetyNote: 'Fruit-derived natural stain; avoid if allergic to tropical stone fruits or berries.'
  },
  {
    id: 'red',
    name: 'Festival Red',
    badge: 'Instant Crimson',
    tagline: 'Vibrant ruby-toned paste crafted for immediate photo-ready color at engagements and parties.',
    stainHexStages: ['#a82424', '#9c1e22', '#8f1b20', '#7a161b', '#661116'],
    longevityDays: '5 to 7 days',
    maturityHours: '1 to 2 hours',
    ingredients: 'Refined herbal henna base, cosmetic-grade botanical crimson pigment, clove & tea tree oil.',
    bestFor: 'Last-minute events, sangeet nights, dance performances, and festive shoots.',
    aftercareTip: 'Let dry for 30 to 45 minutes until paste flakes cleanly; rinse lightly with cool water and pat dry.',
    safetyNote: 'Patch test recommended on inner wrist 24 hours ahead for sensitive skin.'
  },
  {
    id: 'black',
    name: 'Midnight Black',
    badge: 'High-Contrast Matte',
    tagline: 'Bold jet-black body art paste engineered for sharp geometric contrast and crisp evening events.',
    stainHexStages: ['#262626', '#212121', '#1c1c1c', '#181818', '#121212'],
    longevityDays: '5 to 7 days',
    maturityHours: '1 hour',
    ingredients: 'Herbal cosmetic ink paste, gentle botanical thickeners, eucalyptus essence.',
    bestFor: 'Editorial shoots, masquerades, evening galas, and graphic statement cuffs.',
    aftercareTip: 'Allow 30 minutes to set completely without smudging, peel gently, and avoid exfoliating cleansers.',
    safetyNote: 'Cosmetic topical formula; patch test advised prior to full application.'
  }
];

const DEFAULT_TRAVEL_ZONES = [
  { id: 'sterling-local', label: 'Sterling / Ashburn / Herndon', areas: 'Loudoun County Studio & Local', fee: 0, minBooking: 65 },
  { id: 'fairfax-reston', label: 'Reston / Leesburg / Fairfax / Tysons', areas: 'Western & Central Fairfax', fee: 25, minBooking: 120 },
  { id: 'arlington-dc', label: 'Arlington / Alexandria / Washington DC', areas: 'Inside the Beltway & DC', fee: 45, minBooking: 180 },
  { id: 'maryland-metro', label: 'Bethesda / Rockville / Silver Spring MD', areas: 'Maryland Metro', fee: 60, minBooking: 220 }
];

const STAGE_LABELS = [
  { hour: '0h', name: 'Fresh Paste' },
  { hour: '6h', name: 'Lemon-Sugar Seal' },
  { hour: '12h', name: 'Bright Reveal' },
  { hour: '24h', name: 'Deepening' },
  { hour: '48h', name: 'Peak Maturity' }
];

const COVERAGE_TIERS = [
  {
    id: 'minimalist',
    label: 'Minimalist Finger & Wrist',
    priceLabel: '$35+',
    basePrice: 35,
    baseMins: 25,
    baseCones: 1,
    description: 'Delicate vine rings, botanical sprigs, and fine wrist accents.'
  },
  {
    id: 'festive',
    label: 'Festive Half-Hand',
    priceLabel: '$65+',
    basePrice: 65,
    baseMins: 45,
    baseCones: 1.5,
    description: 'Intricate palm or dorsal mandala extending cleanly past the wrist.'
  },
  {
    id: 'full',
    label: 'Intricate Full-Hand',
    priceLabel: '$120+',
    basePrice: 120,
    baseMins: 75,
    baseCones: 2.5,
    description: 'Dense floral lattice, paisley detailing, and custom motifs up to mid-forearm.'
  },
  {
    id: 'bridal',
    label: 'Royal Bridal Palms + Forearms',
    priceLabel: '$280+',
    basePrice: 280,
    baseMins: 180,
    baseCones: 5,
    description: 'Heirloom bridal palms and matching forearm cuffs with optional hidden partner initials.'
  }
];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDuration(totalMins) {
  const mins = Math.max(15, Math.round(totalMins));
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs === 0) return `${rem} min`;
  if (rem === 0) return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'}`;
  return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'} ${rem} min`;
}

function injectModuleStyles() {
  if (document.getElementById(STYLES_ID)) return;
  const style = document.createElement('style');
  style.id = STYLES_ID;
  style.textContent = `
    .dbs-tactile-btn {
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), background-color 180ms ease, border-color 180ms ease, color 180ms ease;
    }
    .dbs-tactile-btn:active {
      transform: scale(0.97);
    }
    .dbs-panel {
      background: var(--plane-2-card, #16201c);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      border-radius: 18px;
      color: var(--text-primary, #f4f0e8);
    }
    .dbs-surface-box {
      background: var(--plane-1-surface, #101714);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      border-radius: 14px;
    }
    .dbs-elevated-box {
      background: var(--plane-3-elevated, #1e2b26);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.14));
      border-radius: 14px;
    }
    .dbs-mono-meta {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.08em;
    }
    .dbs-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.85rem 1.4rem;
      border-radius: 999px;
      border: 1px solid transparent;
      background: var(--accent-henna, #d98a3c);
      color: var(--accent-ink, #140d06);
      font-weight: 600;
      font-size: 0.94rem;
      white-space: nowrap;
      cursor: pointer;
    }
    .dbs-btn-primary:hover {
      filter: brightness(1.06);
    }
    .dbs-btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.65rem 1.05rem;
      border-radius: 999px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.14));
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      font-size: 0.86rem;
      font-weight: 500;
      cursor: pointer;
    }
    .dbs-btn-ghost[aria-pressed="true"] {
      background: var(--accent-henna, #d98a3c);
      color: var(--accent-ink, #140d06);
      border-color: var(--accent-henna, #d98a3c);
      font-weight: 600;
    }
    .dbs-btn-ghost:hover:not([aria-pressed="true"]) {
      border-color: rgba(217, 138, 60, 0.55);
    }
    .dbs-sketch-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 2.25rem;
      align-items: center;
    }
    .dbs-compare-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 4;
      max-height: 620px;
      border-radius: 18px;
      overflow: hidden;
      background: var(--plane-1-surface, #101714);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.14));
      user-select: none;
      touch-action: none;
      --split: 50%;
    }
    .dbs-compare-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }
    .dbs-compare-top {
      clip-path: inset(0 calc(100% - var(--split)) 0 0);
      will-change: clip-path;
    }
    .dbs-compare-divider {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--split);
      width: 2px;
      background: var(--accent-henna, #d98a3c);
      transform: translateX(-50%);
      pointer-events: none;
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.65);
    }
    .dbs-compare-handle {
      position: absolute;
      top: 50%;
      left: var(--split);
      transform: translate(-50%, -50%);
      width: 46px;
      height: 46px;
      border-radius: 999px;
      background: var(--plane-1-surface, #101714);
      border: 2px solid var(--accent-henna, #d98a3c);
      color: var(--accent-henna, #d98a3c);
      display: grid;
      place-items: center;
      cursor: ew-resize;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.55);
      z-index: 4;
    }
    .dbs-compare-handle:focus-visible {
      outline: 2px solid var(--accent-henna, #d98a3c);
      outline-offset: 4px;
    }
    .dbs-compare-tag {
      position: absolute;
      bottom: 0.9rem;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      background: rgba(9, 13, 11, 0.84);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.16));
      color: var(--text-primary, #f4f0e8);
      font-size: 0.74rem;
      backdrop-filter: blur(8px);
      pointer-events: none;
      z-index: 3;
    }
    .dbs-stain-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 1.75rem;
      align-items: stretch;
    }
    .dbs-formula-tabs {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.65rem;
    }
    .dbs-formula-tab {
      text-align: left;
      padding: 0.85rem 0.95rem;
      border-radius: 14px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .dbs-formula-tab[aria-pressed="true"] {
      background: var(--plane-3-elevated, #1e2b26);
      border-color: var(--accent-henna, #d98a3c);
      box-shadow: inset 0 0 0 1px rgba(217, 138, 60, 0.35);
    }
    .dbs-stage-steps {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 0.45rem;
      margin-top: 0.75rem;
    }
    .dbs-stage-pill {
      padding: 0.5rem 0.35rem;
      border-radius: 10px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      background: var(--plane-1-surface, #101714);
      color: var(--text-secondary, #b8c2bc);
      font-size: 0.72rem;
      text-align: center;
      cursor: pointer;
    }
    .dbs-stage-pill[aria-pressed="true"] {
      background: var(--accent-henna, #d98a3c);
      color: var(--accent-ink, #140d06);
      border-color: var(--accent-henna, #d98a3c);
      font-weight: 600;
    }
    .dbs-range {
      width: 100%;
      accent-color: var(--accent-henna, #d98a3c);
      cursor: pointer;
      height: 6px;
    }
    .dbs-est-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      gap: 1.75rem;
      align-items: start;
    }
    .dbs-choice-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65rem;
    }
    .dbs-choice-card {
      padding: 0.85rem 1rem;
      border-radius: 12px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .dbs-choice-card[aria-pressed="true"] {
      background: var(--plane-3-elevated, #1e2b26);
      border-color: var(--accent-henna, #d98a3c);
    }
    @media (max-width: 900px) {
      .dbs-sketch-grid,
      .dbs-stain-grid,
      .dbs-est-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      .dbs-formula-tabs {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 560px) {
      .dbs-choice-grid,
      .dbs-stage-steps {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `;
  document.head.appendChild(style);
}

function buildSketchStainComponent(mount, studioData, onPresetBook) {
  if (!mount) return;
  const data = { ...DEFAULT_SKETCH_STAIN, ...(studioData?.SKETCH_TO_STAIN || {}) };
  let splitPct = 50;

  mount.innerHTML = `
    <div class="dbs-sketch-grid">
      <div class="dbs-compare-wrap">
        <div class="dbs-compare-frame" data-compare-frame style="--split: 50%;">
          <img
            class="dbs-compare-img"
            src="${escapeHtml(data.stainSrc)}"
            alt="Real organic henna stain applied freehand on client hand by Design by Sadia"
            width="900"
            height="1200"
            loading="lazy"
          />
          <img
            class="dbs-compare-img dbs-compare-top"
            src="${escapeHtml(data.sketchSrc)}"
            alt="Sadia Shoyeb digital iPad concept sketch showing bespoke floral vine layout"
            width="900"
            height="1200"
            loading="lazy"
          />
          <div class="dbs-compare-divider" aria-hidden="true"></div>
          <div
            class="dbs-compare-handle"
            role="slider"
            tabindex="0"
            aria-label="Compare digital sketch and real henna stain"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="50"
            data-compare-handle
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="margin-left:-10px;">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <span class="dbs-compare-tag" style="left:0.9rem;">Digital Concept</span>
          <span class="dbs-compare-tag" style="right:0.9rem;">Real Hand Stain</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.9rem;justify-content:center;" role="group" aria-label="Split comparison presets">
          <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-split-preset="100" aria-pressed="false">Digital Concept</button>
          <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-split-preset="50" aria-pressed="true">50/50 Split</button>
          <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-split-preset="0" aria-pressed="false">Real Hand Stain</button>
        </div>
      </div>

      <div class="dbs-panel" style="padding:2rem;">
        <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.4vw,2.75rem);line-height:1.12;letter-spacing:-0.025em;margin:0 0 1rem;text-wrap:balance;">
          ${escapeHtml(data.title)}
        </h2>
        <p style="color:var(--text-secondary);line-height:1.65;margin:0 0 1.5rem;max-width:58ch;text-wrap:pretty;">
          ${escapeHtml(data.description)}
        </p>

        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.85rem;margin-bottom:1.65rem;">
          <div class="dbs-surface-box" style="padding:1rem 1.1rem;">
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.3rem;">Session Time</div>
            <div class="dbs-mono-meta" style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${escapeHtml(data.completionMinutes)} min freehand</div>
          </div>
          <div class="dbs-surface-box" style="padding:1rem 1.1rem;">
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.3rem;">Cone Formula</div>
            <div style="font-size:0.95rem;font-weight:600;color:var(--accent-henna);">${escapeHtml(data.formulaUsed)}</div>
          </div>
        </div>

        <ul style="list-style:none;padding:0;margin:0 0 1.75rem;display:grid;gap:0.65rem;color:var(--text-secondary);font-size:0.94rem;">
          <li style="display:flex;gap:0.65rem;align-items:flex-start;">
            <span style="color:var(--accent-henna);font-weight:700;">01</span>
            <span>Drag the slider to verify how closely the digital botanical vine maps onto live skin.</span>
          </li>
          <li style="display:flex;gap:0.65rem;align-items:flex-start;">
            <span style="color:var(--accent-henna);font-weight:700;">02</span>
            <span>Ideal for brides wanting bespoke motifs, cultural florals, or hidden partner initials previewed ahead of mehndi night.</span>
          </li>
        </ul>

        <div style="display:flex;flex-wrap:wrap;gap:0.85rem;align-items:center;">
          <button type="button" class="dbs-btn-primary dbs-tactile-btn" data-request-sketch>
            Request Custom Concept
          </button>
          <span class="dbs-mono-meta" style="font-size:0.76rem;color:var(--text-secondary);" data-split-readout>50% SPLIT VIEW</span>
        </div>
      </div>
    </div>
  `;

  const frame = mount.querySelector('[data-compare-frame]');
  const handle = mount.querySelector('[data-compare-handle]');
  const presetBtns = Array.from(mount.querySelectorAll('[data-split-preset]'));
  const readout = mount.querySelector('[data-split-readout]');
  const requestBtn = mount.querySelector('[data-request-sketch]');

  function setSplit(nextValue) {
    splitPct = Math.max(0, Math.min(100, Math.round(nextValue)));
    frame.style.setProperty('--split', `${splitPct}%`);
    handle.setAttribute('aria-valuenow', String(splitPct));
    if (readout) {
      if (splitPct >= 98) readout.textContent = '100% DIGITAL CONCEPT';
      else if (splitPct <= 2) readout.textContent = '100% REAL HAND STAIN';
      else readout.textContent = `${splitPct}% / ${100 - splitPct}% SPLIT VIEW`;
    }
    presetBtns.forEach((btn) => {
      const target = Number(btn.getAttribute('data-split-preset'));
      btn.setAttribute('aria-pressed', String(target === splitPct));
    });
  }

  function updateFromClientX(clientX) {
    const rect = frame.getBoundingClientRect();
    if (!rect.width) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(pct);
  }

  let dragging = false;
  frame.addEventListener('pointerdown', (ev) => {
    if (ev.target.closest('button')) return;
    dragging = true;
    try {
      frame.setPointerCapture(ev.pointerId);
    } catch (_) {
      // Ignore capture errors on synthetic events.
    }
    updateFromClientX(ev.clientX);
  });

  frame.addEventListener('pointermove', (ev) => {
    if (!dragging) return;
    updateFromClientX(ev.clientX);
  });

  const endDrag = (ev) => {
    if (!dragging) return;
    dragging = false;
    try {
      frame.releasePointerCapture(ev.pointerId);
    } catch (_) {
      // Ignore release errors.
    }
  };
  frame.addEventListener('pointerup', endDrag);
  frame.addEventListener('pointercancel', endDrag);

  handle.addEventListener('keydown', (ev) => {
    const step = ev.shiftKey ? 15 : 5;
    if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      setSplit(splitPct - step);
    } else if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      setSplit(splitPct + step);
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      setSplit(0);
    } else if (ev.key === 'End') {
      ev.preventDefault();
      setSplit(100);
    }
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSplit(Number(btn.getAttribute('data-split-preset')));
    });
  });

  requestBtn?.addEventListener('click', () => {
    if (typeof onPresetBook === 'function') {
      onPresetBook({
        customSketch: true,
        formulaId: 'organic',
        notes: 'Requesting a bespoke digital concept sketch matched to my hand proportions.'
      });
    }
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function buildStainLabComponent(mount, studioData) {
  if (!mount) return;
  const formulas =
    Array.isArray(studioData?.CONE_FORMULAS) && studioData.CONE_FORMULAS.length > 0
      ? studioData.CONE_FORMULAS
      : DEFAULT_FORMULAS;
  const coneMacro = studioData?.GENERATED_ARTIFACTS?.coneMacro || './assets/generated/cone-alchemy.jpg';

  let activeFormulaIdx = 0;
  let stageIdx = 4; // Start at 48h Peak Maturity so visitors immediately see the richest stain.

  mount.innerHTML = `
    <div style="display:grid;gap:1.5rem;">
      <div class="dbs-formula-tabs" role="group" aria-label="Henna cone formula selector" data-formula-tabs>
        ${formulas
          .map(
            (f, idx) => `
          <button
            type="button"
            class="dbs-formula-tab dbs-tactile-btn"
            data-formula-idx="${idx}"
            aria-pressed="${idx === 0 ? 'true' : 'false'}"
          >
            <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
              <span style="font-weight:600;font-size:0.96rem;">${escapeHtml(f.name)}</span>
              <span style="width:14px;height:14px;border-radius:999px;border:1px solid rgba(255,255,255,0.28);background:${escapeHtml((f.stainHexStages && f.stainHexStages[4]) || '#4d180a')};flex-shrink:0;"></span>
            </div>
            <span class="dbs-mono-meta" style="font-size:0.68rem;color:var(--accent-henna);">${escapeHtml(f.badge || 'Botanical')}</span>
          </button>
        `
          )
          .join('')}
      </div>

      <div class="dbs-stain-grid">
        <div class="dbs-panel" style="padding:1.65rem;display:flex;flex-direction:column;justify-content:space-between;gap:1.35rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
            <div>
              <div style="font-size:0.8rem;color:var(--text-secondary);">Live Oxidation Preview</div>
              <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.7rem;line-height:1.15;margin:0.15rem 0 0;" data-lab-title></h3>
            </div>
            <div class="dbs-surface-box" style="padding:0.45rem 0.85rem;display:inline-flex;align-items:center;gap:0.55rem;">
              <span data-stain-swatch style="width:16px;height:16px;border-radius:999px;border:1px solid rgba(255,255,255,0.3);"></span>
              <span class="dbs-mono-meta" style="font-size:0.76rem;" data-stage-badge>48h Peak Maturity</span>
            </div>
          </div>

          <div class="dbs-surface-box" style="padding:1.25rem;display:grid;place-items:center;position:relative;overflow:hidden;">
            <svg viewBox="0 0 260 310" width="240" height="286" aria-label="Botanical henna hand stain oxidation preview" role="img" style="max-width:100%;height:auto;">
              <defs>
                <radialGradient id="dbsPalmGlow" cx="50%" cy="56%" r="54%">
                  <stop offset="0%" stop-color="#d2a17e" />
                  <stop offset="100%" stop-color="#b88462" />
                </radialGradient>
              </defs>
              <!-- Natural silhouette of open palm & wrist -->
              <path
                d="M94 298 L96 226 C80 218 68 202 58 182 L32 146 C26 138 33 128 42 132 L68 152 C74 156 80 151 78 140 L69 68 C68 58 81 56 85 66 L98 122 L106 36 C108 24 122 25 123 37 L124 114 L138 28 C140 16 154 18 154 30 L150 116 L167 46 C170 35 184 39 181 51 L166 130 C168 134 173 135 177 128 L194 92 C199 82 212 88 206 99 L182 162 C175 184 166 206 162 228 L164 298 Z"
                fill="url(#dbsPalmGlow)"
                stroke="#e2ba99"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <!-- Dynamic stain artwork group -->
              <g data-stain-art stroke="#4d180a" fill="none" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 260ms ease, fill 260ms ease;">
                <!-- Central palm mandala -->
                <circle cx="130" cy="186" r="24" stroke-width="2.1" />
                <circle cx="130" cy="186" r="14" stroke-width="1.5" />
                <circle cx="130" cy="186" r="5" fill="#4d180a" stroke="none" data-stain-fill />
                <path d="M130 156 Q137 166 130 172 Q123 166 130 156 Z M130 216 Q137 206 130 200 Q123 206 130 216 Z M100 186 Q110 179 116 186 Q110 193 100 186 Z M160 186 Q150 179 144 186 Q150 193 160 186 Z" stroke-width="1.6" />
                <path d="M109 165 Q119 168 120 176 Q112 175 109 165 Z M151 165 Q141 168 140 176 Q148 175 151 165 Z M109 207 Q119 204 120 196 Q112 197 109 207 Z M151 207 Q141 204 140 196 Q148 197 151 207 Z" stroke-width="1.4" />
                <!-- Wrist lattice cuff -->
                <path d="M98 240 Q130 254 160 240 M98 256 Q130 270 160 256 M97 272 Q130 286 161 272" stroke-width="1.7" />
                <path d="M104 242 L116 258 L130 246 L144 258 L156 242 M104 258 L116 274 L130 262 L144 274 L156 258" stroke-width="1.3" />
                <!-- Index finger floral vine -->
                <path d="M103 142 C106 116 111 86 114 48" stroke-width="1.9" />
                <path d="M108 112 Q100 105 106 96 M112 88 Q121 82 114 72 M114 46 L114 35" stroke-width="1.4" />
                <!-- Middle finger vine -->
                <path d="M133 140 C138 110 142 74 145 36" stroke-width="1.9" />
                <path d="M137 110 Q129 102 138 92 M141 82 Q150 76 144 64" stroke-width="1.4" />
                <!-- Ring finger filigree -->
                <path d="M155 144 C162 114 169 86 174 52" stroke-width="1.8" />
                <path d="M161 114 Q153 106 163 97 M168 86 Q177 80 172 70" stroke-width="1.3" />
                <!-- Pinky & thumb botanical sprigs -->
                <path d="M174 156 C183 136 192 116 199 98" stroke-width="1.6" />
                <path d="M84 168 C69 160 52 150 40 138" stroke-width="1.6" />
                <circle cx="114" cy="36" r="3" fill="#4d180a" stroke="none" data-stain-fill />
                <circle cx="145" cy="29" r="3" fill="#4d180a" stroke="none" data-stain-fill />
                <circle cx="174" cy="46" r="2.8" fill="#4d180a" stroke="none" data-stain-fill />
              </g>
            </svg>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.45rem;">
              <label for="dbs-oxidation-slider" style="font-size:0.85rem;font-weight:600;color:var(--text-primary);">
                48-Hour Oxidation Timeline
              </label>
              <span class="dbs-mono-meta" style="font-size:0.76rem;color:var(--accent-henna);" data-stage-label>48h Peak Maturity</span>
            </div>
            <input
              id="dbs-oxidation-slider"
              class="dbs-range"
              type="range"
              min="0"
              max="4"
              step="1"
              value="4"
              aria-label="Stain oxidation stage from 0 hours to 48 hours"
              data-stage-slider
            />
            <div class="dbs-stage-steps" role="group" aria-label="Oxidation stage shortcuts">
              ${STAGE_LABELS.map(
                (st, idx) => `
                <button
                  type="button"
                  class="dbs-stage-pill dbs-tactile-btn"
                  data-stage-btn="${idx}"
                  aria-pressed="${idx === 4 ? 'true' : 'false'}"
                >
                  <div class="dbs-mono-meta" style="font-size:0.72rem;">${escapeHtml(st.hour)}</div>
                  <div style="font-size:0.68rem;margin-top:0.1rem;">${escapeHtml(st.name)}</div>
                </button>
              `
              ).join('')}
            </div>
          </div>
        </div>

        <div style="display:grid;gap:1.15rem;align-content:start;">
          <div class="dbs-panel" style="overflow:hidden;">
            <div style="position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--plane-1-surface);">
              <img
                src="${escapeHtml(coneMacro)}"
                alt="Botanical apothecary flatlay of henna leaves, jagua fruit, essential oil droppers, and hand-rolled cones"
                width="1200"
                height="675"
                loading="lazy"
                style="width:100%;height:100%;object-fit:cover;display:block;"
              />
            </div>
            <div style="padding:1.4rem 1.5rem;">
              <p style="margin:0;color:var(--text-primary);font-size:1rem;line-height:1.55;" data-formula-tagline></p>
            </div>
          </div>

          <div class="dbs-panel" style="padding:1.5rem;display:grid;gap:1rem;">
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.85rem;">
              <div class="dbs-surface-box" style="padding:0.9rem 1rem;">
                <div style="font-size:0.74rem;color:var(--text-secondary);">Longevity</div>
                <div class="dbs-mono-meta" style="font-size:1rem;font-weight:600;margin-top:0.2rem;" data-meta-longevity></div>
              </div>
              <div class="dbs-surface-box" style="padding:0.9rem 1rem;">
                <div style="font-size:0.74rem;color:var(--text-secondary);">Peak Maturity</div>
                <div class="dbs-mono-meta" style="font-size:1rem;font-weight:600;margin-top:0.2rem;" data-meta-maturity></div>
              </div>
            </div>

            <div class="dbs-surface-box" style="padding:1rem 1.1rem;display:grid;gap:0.7rem;">
              <div>
                <div style="font-size:0.76rem;color:var(--accent-henna);font-weight:600;">Ingredients</div>
                <div style="font-size:0.9rem;color:var(--text-secondary);line-height:1.5;margin-top:0.15rem;" data-meta-ingredients></div>
              </div>
              <div>
                <div style="font-size:0.76rem;color:var(--accent-henna);font-weight:600;">Best Occasion</div>
                <div style="font-size:0.9rem;color:var(--text-secondary);line-height:1.5;margin-top:0.15rem;" data-meta-bestfor></div>
              </div>
            </div>

            <div class="dbs-elevated-box" style="padding:1rem 1.1rem;">
              <div style="font-size:0.78rem;font-weight:600;color:var(--text-primary);margin-bottom:0.25rem;">
                Sadia's Aftercare Seal Guide
              </div>
              <p style="margin:0 0 0.5rem;font-size:0.88rem;color:var(--text-secondary);line-height:1.55;" data-meta-aftercare></p>
              <div style="font-size:0.78rem;color:var(--text-secondary);opacity:0.9;" data-meta-safety></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const tabBtns = Array.from(mount.querySelectorAll('[data-formula-idx]'));
  const stageSlider = mount.querySelector('[data-stage-slider]');
  const stageBtns = Array.from(mount.querySelectorAll('[data-stage-btn]'));
  const stainGroup = mount.querySelector('[data-stain-art]');
  const stainFills = Array.from(mount.querySelectorAll('[data-stain-fill]'));
  const swatchEl = mount.querySelector('[data-stain-swatch]');
  const stageBadge = mount.querySelector('[data-stage-badge]');
  const stageLabel = mount.querySelector('[data-stage-label]');
  const labTitle = mount.querySelector('[data-lab-title]');
  const taglineEl = mount.querySelector('[data-formula-tagline]');
  const longevityEl = mount.querySelector('[data-meta-longevity]');
  const maturityEl = mount.querySelector('[data-meta-maturity]');
  const ingredientsEl = mount.querySelector('[data-meta-ingredients]');
  const bestForEl = mount.querySelector('[data-meta-bestfor]');
  const aftercareEl = mount.querySelector('[data-meta-aftercare]');
  const safetyEl = mount.querySelector('[data-meta-safety]');

  function renderLab() {
    const f = formulas[activeFormulaIdx] || formulas[0];
    const stages = Array.isArray(f.stainHexStages) && f.stainHexStages.length >= 5
      ? f.stainHexStages
      : DEFAULT_FORMULAS[0].stainHexStages;
    const hex = stages[stageIdx] || stages[stages.length - 1];
    const stageMeta = STAGE_LABELS[stageIdx] || STAGE_LABELS[4];

    tabBtns.forEach((btn, i) => btn.setAttribute('aria-pressed', String(i === activeFormulaIdx)));
    stageBtns.forEach((btn, i) => btn.setAttribute('aria-pressed', String(i === stageIdx)));
    if (stageSlider) stageSlider.value = String(stageIdx);

    if (stainGroup) stainGroup.setAttribute('stroke', hex);
    stainFills.forEach((el) => el.setAttribute('fill', hex));
    if (swatchEl) swatchEl.style.background = hex;
    if (stageBadge) stageBadge.textContent = `${stageMeta.hour} ${stageMeta.name}`;
    if (stageLabel) stageLabel.textContent = `${stageMeta.hour} ${stageMeta.name}`;
    if (labTitle) labTitle.textContent = f.name;
    if (taglineEl) taglineEl.textContent = f.tagline || '';
    if (longevityEl) longevityEl.textContent = f.longevityDays || '10 to 14 days';
    if (maturityEl) maturityEl.textContent = f.maturityHours || '48 hours';
    if (ingredientsEl) ingredientsEl.textContent = f.ingredients || '';
    if (bestForEl) bestForEl.textContent = f.bestFor || '';
    if (aftercareEl) aftercareEl.textContent = f.aftercareTip || '';
    if (safetyEl) safetyEl.textContent = f.safetyNote ? `Skin Guidance: ${f.safetyNote}` : '';
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFormulaIdx = Number(btn.getAttribute('data-formula-idx')) || 0;
      renderLab();
    });
  });

  stageSlider?.addEventListener('input', (ev) => {
    stageIdx = Math.max(0, Math.min(4, Number(ev.target.value)));
    renderLab();
  });

  stageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      stageIdx = Math.max(0, Math.min(4, Number(btn.getAttribute('data-stage-btn'))));
      renderLab();
    });
  });

  renderLab();
}

function buildEstimatorComponent(mount, studioData, onPresetBook) {
  if (!mount) return;
  const formulas =
    Array.isArray(studioData?.CONE_FORMULAS) && studioData.CONE_FORMULAS.length > 0
      ? studioData.CONE_FORMULAS
      : DEFAULT_FORMULAS;
  const travelZones =
    Array.isArray(studioData?.TRAVEL_ZONES) && studioData.TRAVEL_ZONES.length > 0
      ? studioData.TRAVEL_ZONES
      : DEFAULT_TRAVEL_ZONES;

  const state = {
    mode: 'individual', // 'individual' | 'party'
    tierId: 'festive',
    sides: 'single', // 'single' | 'both_sides'
    hands: 'both_hands', // 'one_hand' | 'both_hands'
    partyHours: 3,
    guestCount: 35,
    formulaId: formulas[0]?.id || 'organic',
    travelZoneId: travelZones[0]?.id || 'sterling-local'
  };

  function computeQuote() {
    const zone = travelZones.find((z) => z.id === state.travelZoneId) || travelZones[0];
    const formula = formulas.find((f) => f.id === state.formulaId) || formulas[0];
    const lines = [];
    let subtotal = 0;
    let totalMins = 0;
    let totalCones = 0;

    if (state.mode === 'party') {
      const ratePerHour = 115;
      const partyCost = state.partyHours * ratePerHour;
      subtotal += partyCost;
      totalMins = state.partyHours * 60;
      totalCones = Math.max(3, Math.ceil(state.guestCount / 6));
      lines.push({
        label: `Party Artist (${state.partyHours} hrs @ $${ratePerHour}/hr, ~${state.partyHours * 12} to ${state.partyHours * 15} guests)`,
        amount: partyCost
      });
      if (state.formulaId === 'jagua') {
        const jaguaAdd = 35;
        subtotal += jaguaAdd;
        lines.push({ label: 'Botanical Jagua Gel Event Upgrade', amount: jaguaAdd });
      } else {
        lines.push({ label: `${formula.name} Cones Included`, amount: 0 });
      }
    } else {
      const tier = COVERAGE_TIERS.find((t) => t.id === state.tierId) || COVERAGE_TIERS[1];
      let coveragePrice = tier.basePrice;
      let durationMins = tier.baseMins;
      let cones = tier.baseCones;

      if (tier.id === 'bridal') {
        // Base $280 covers Both Hands Palms + Forearms.
        if (state.hands === 'one_hand') {
          coveragePrice = 165;
          durationMins = 105;
          cones = 3;
        }
        if (state.sides === 'both_sides') {
          coveragePrice += 140;
          durationMins += 90;
          cones += 3;
        }
      } else {
        const handMult = state.hands === 'both_hands' ? 1.85 : 1;
        const sideMult = state.sides === 'both_sides' ? 1.7 : 1;
        coveragePrice = Math.round((tier.basePrice * handMult * sideMult) / 5) * 5;
        durationMins = Math.round(tier.baseMins * handMult * sideMult);
        cones = Math.ceil(tier.baseCones * handMult * sideMult);
      }

      subtotal += coveragePrice;
      totalMins = durationMins;
      totalCones = Math.max(1, Math.ceil(cones));
      const handLabel = state.hands === 'both_hands' ? 'Both Hands' : 'One Hand';
      const sideLabel = state.sides === 'both_sides' ? 'Palms + Dorsal' : 'Single Side';
      lines.push({
        label: `${tier.label} (${handLabel}, ${sideLabel})`,
        amount: coveragePrice
      });

      if (state.formulaId === 'jagua') {
        subtotal += 15;
        lines.push({ label: 'Botanical Jagua Gel Upgrade', amount: 15 });
      } else {
        lines.push({ label: `${formula.name} Paste`, amount: 0 });
      }
    }

    const travelFee = Number(zone?.fee || 0);
    if (travelFee > 0) {
      subtotal += travelFee;
    }
    lines.push({
      label: `Travel Zone: ${zone?.label || 'Local'}`,
      amount: travelFee
    });

    const retainer = Math.round(subtotal * 0.5);
    const maxGuestsAtHours = state.partyHours * 15;
    const partyAdvisory =
      state.mode === 'party' && state.guestCount > maxGuestsAtHours
        ? `At ~12 to 15 guests/hr, ${state.guestCount} guests fits best with ${Math.min(8, Math.ceil(state.guestCount / 13))} hours or a simpler motif rotation.`
        : '';

    return {
      subtotal,
      retainer,
      totalMins,
      durationLabel: formatDuration(totalMins),
      totalCones,
      lines,
      zone,
      formula,
      partyAdvisory
    };
  }

  function render() {
    const q = computeQuote();

    mount.innerHTML = `
      <div class="dbs-est-grid">
        <div class="dbs-panel" style="padding:1.75rem;display:grid;gap:1.45rem;">
          <div>
            <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);margin-bottom:0.55rem;">1. Booking Mode</div>
            <div class="dbs-choice-grid" role="group" aria-label="Booking mode">
              <button type="button" class="dbs-choice-card dbs-tactile-btn" data-est-mode="individual" aria-pressed="${state.mode === 'individual'}">
                <span style="font-weight:600;font-size:0.95rem;">Individual / Bridal Coverage</span>
                <span style="font-size:0.8rem;color:var(--text-secondary);">Custom studio or in-home appointment</span>
              </button>
              <button type="button" class="dbs-choice-card dbs-tactile-btn" data-est-mode="party" aria-pressed="${state.mode === 'party'}">
                <span style="font-weight:600;font-size:0.95rem;">Hourly Party &amp; Event Artist</span>
                <span style="font-size:0.8rem;color:var(--text-secondary);">$115/hr for ~12 to 15 guests per hour</span>
              </button>
            </div>
          </div>

          ${
            state.mode === 'individual'
              ? `
            <div>
              <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);margin-bottom:0.55rem;">2. Coverage Tier</div>
              <div class="dbs-choice-grid" role="group" aria-label="Coverage tier">
                ${COVERAGE_TIERS.map(
                  (tier) => `
                  <button type="button" class="dbs-choice-card dbs-tactile-btn" data-est-tier="${tier.id}" aria-pressed="${state.tierId === tier.id}">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
                      <span style="font-weight:600;font-size:0.9rem;">${escapeHtml(tier.label)}</span>
                      <span class="dbs-mono-meta" style="font-size:0.8rem;color:var(--accent-henna);">${escapeHtml(tier.priceLabel)}</span>
                    </div>
                    <span style="font-size:0.78rem;color:var(--text-secondary);line-height:1.4;">${escapeHtml(tier.description)}</span>
                  </button>
                `
                ).join('')}
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
              <div>
                <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);margin-bottom:0.5rem;">3A. Placement Sides</div>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" role="group" aria-label="Placement sides">
                  <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-est-sides="single" aria-pressed="${state.sides === 'single'}">Single Side</button>
                  <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-est-sides="both_sides" aria-pressed="${state.sides === 'both_sides'}">Palms + Dorsal (Both Sides)</button>
                </div>
              </div>
              <div>
                <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);margin-bottom:0.5rem;">3B. Hand Count</div>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" role="group" aria-label="Hand count">
                  <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-est-hands="one_hand" aria-pressed="${state.hands === 'one_hand'}">One Hand</button>
                  <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-est-hands="both_hands" aria-pressed="${state.hands === 'both_hands'}">Both Hands</button>
                </div>
              </div>
            </div>
          `
              : `
            <div style="display:grid;gap:1.1rem;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.45rem;">
                  <span style="font-size:0.84rem;font-weight:600;">2. Party Booking Hours ($115/hr)</span>
                  <span class="dbs-mono-meta" style="font-size:0.86rem;color:var(--accent-henna);">${state.partyHours} Hours</span>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" role="group" aria-label="Party booking hours">
                  ${[2, 3, 4, 5, 6]
                    .map(
                      (hr) => `
                    <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-est-hours="${hr}" aria-pressed="${state.partyHours === hr}">${hr} hrs</button>
                  `
                    )
                    .join('')}
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.45rem;">
                  <label for="dbs-guest-slider" style="font-size:0.84rem;font-weight:600;">3. Estimated Guest Count</label>
                  <span class="dbs-mono-meta" style="font-size:0.86rem;color:var(--accent-henna);">${state.guestCount} Guests</span>
                </div>
                <input
                  id="dbs-guest-slider"
                  class="dbs-range"
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value="${state.guestCount}"
                  data-est-guests
                />
                ${
                  q.partyAdvisory
                    ? `<div style="margin-top:0.5rem;font-size:0.8rem;color:var(--accent-henna);">${escapeHtml(q.partyAdvisory)}</div>`
                    : `<div style="margin-top:0.45rem;font-size:0.8rem;color:var(--text-secondary);">Comfortable pace at 12 to 15 guests per hour for party motifs.</div>`
                }
              </div>
            </div>
          `
          }

          <div>
            <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);margin-bottom:0.5rem;">4. Cone Medium</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;" role="group" aria-label="Cone medium">
              ${formulas
                .map((f) => {
                  const shortLabels = {
                    organic: 'Organic Henna',
                    jagua: `Botanical Jagua +$${state.mode === 'party' ? 35 : 15}`,
                    red: 'Festival Red',
                    black: 'Midnight Black'
                  };
                  const label = shortLabels[f.id] || f.name;
                  return `
                  <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-est-formula="${escapeHtml(f.id)}" aria-pressed="${state.formulaId === f.id}">
                    ${escapeHtml(label)}
                  </button>
                `;
                })
                .join('')}
            </div>
          </div>

          <div>
            <label for="dbs-travel-zone" style="display:block;font-size:0.84rem;font-weight:600;color:var(--text-primary);margin-bottom:0.45rem;">
              5. Northern Virginia &amp; DMV Travel Zone
            </label>
            <select
              id="dbs-travel-zone"
              data-est-zone
              style="width:100%;padding:0.8rem 0.95rem;border-radius:12px;background:var(--plane-1-surface);color:var(--text-primary);border:1px solid var(--border-specular);font-size:0.92rem;"
            >
              ${travelZones
                .map(
                  (z) => `
                <option value="${escapeHtml(z.id)}" ${state.travelZoneId === z.id ? 'selected' : ''}>
                  ${escapeHtml(z.label)} (${z.fee === 0 ? '$0 Travel' : `+$${z.fee} Travel`})
                </option>
              `
                )
                .join('')}
            </select>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:0.35rem;">
              Studio appointments in Sterling, VA always carry $0 travel fee.
            </div>
          </div>
        </div>

        <div class="dbs-panel" style="padding:1.75rem;display:grid;gap:1.25rem;position:sticky;top:5.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem;border-bottom:1px solid var(--border-specular);padding-bottom:1rem;">
            <div>
              <div style="font-size:0.8rem;color:var(--text-secondary);">Estimated Investment</div>
              <div class="dbs-mono-meta" style="font-size:clamp(2rem,3.5vw,2.6rem);font-weight:700;color:var(--accent-henna);line-height:1.1;margin-top:0.2rem;">
                $${q.subtotal}
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:0.78rem;color:var(--text-secondary);">50% Retainer to Lock Date</div>
              <div class="dbs-mono-meta" style="font-size:1.15rem;font-weight:600;color:var(--text-primary);margin-top:0.2rem;">$${q.retainer}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;">
            <div class="dbs-surface-box" style="padding:0.85rem 1rem;">
              <div style="font-size:0.74rem;color:var(--text-secondary);">Session Duration</div>
              <div class="dbs-mono-meta" style="font-size:0.98rem;font-weight:600;margin-top:0.15rem;">${escapeHtml(q.durationLabel)}</div>
            </div>
            <div class="dbs-surface-box" style="padding:0.85rem 1rem;">
              <div style="font-size:0.74rem;color:var(--text-secondary);">Hand-Rolled Cones Prepared</div>
              <div class="dbs-mono-meta" style="font-size:0.98rem;font-weight:600;margin-top:0.15rem;">${q.totalCones} fresh ${q.totalCones === 1 ? 'cone' : 'cones'}</div>
            </div>
          </div>

          <div class="dbs-surface-box" style="padding:1rem 1.1rem;display:grid;gap:0.65rem;">
            <div style="font-size:0.78rem;font-weight:600;color:var(--text-primary);">Itemized Quote Breakdown</div>
            ${q.lines
              .map(
                (line) => `
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.8rem;font-size:0.86rem;color:var(--text-secondary);">
                <span>${escapeHtml(line.label)}</span>
                <span class="dbs-mono-meta" style="color:var(--text-primary);white-space:nowrap;">
                  ${line.amount === 0 ? 'Included' : `+$${line.amount}`}
                </span>
              </div>
            `
              )
              .join('')}
          </div>

          <button type="button" class="dbs-btn-primary dbs-tactile-btn" style="width:100%;" data-est-book>
            Book Consultation
          </button>
          <p style="margin:0;font-size:0.78rem;color:var(--text-secondary);line-height:1.5;text-align:center;">
            Final bridal and intricate custom quotes are confirmed once Sadia reviews your moodboard and hand preferences.
          </p>
        </div>
      </div>
    `;

    mount.querySelectorAll('[data-est-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.mode = btn.getAttribute('data-est-mode');
        render();
      });
    });

    mount.querySelectorAll('[data-est-tier]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.tierId = btn.getAttribute('data-est-tier');
        render();
      });
    });

    mount.querySelectorAll('[data-est-sides]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.sides = btn.getAttribute('data-est-sides');
        render();
      });
    });

    mount.querySelectorAll('[data-est-hands]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.hands = btn.getAttribute('data-est-hands');
        render();
      });
    });

    mount.querySelectorAll('[data-est-hours]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.partyHours = Number(btn.getAttribute('data-est-hours')) || 3;
        render();
      });
    });

    mount.querySelector('[data-est-guests]')?.addEventListener('input', (ev) => {
      state.guestCount = Number(ev.target.value) || 35;
      render();
    });

    mount.querySelectorAll('[data-est-formula]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.formulaId = btn.getAttribute('data-est-formula');
        render();
      });
    });

    mount.querySelector('[data-est-zone]')?.addEventListener('change', (ev) => {
      state.travelZoneId = ev.target.value;
      render();
    });

    mount.querySelector('[data-est-book]')?.addEventListener('click', () => {
      const packageMap = {
        minimalist: 'intimate-nikah',
        festive: 'festive-duo-hands',
        full: 'custom-sketch-session',
        bridal: 'royal-bridal'
      };
      const preset = {
        mode: state.mode,
        tierId: state.tierId,
        packageId: state.mode === 'party' ? 'party-hourly' : packageMap[state.tierId] || 'festive-duo-hands',
        formulaId: state.formulaId,
        sides: state.sides,
        hands: state.hands,
        partyHours: state.partyHours,
        guestCount: state.guestCount,
        travelZoneId: state.travelZoneId,
        estimatedTotal: q.subtotal,
        retainerAmount: q.retainer,
        durationLabel: q.durationLabel,
        conesPrepared: q.totalCones,
        notes:
          state.mode === 'party'
            ? `Party booking: ${state.partyHours} hrs for ~${state.guestCount} guests.`
            : `Coverage quote: ${state.tierId}, ${state.hands}, ${state.sides}.`
      };
      if (typeof onPresetBook === 'function') {
        onPresetBook(preset);
      }
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  injectModuleStyles();
  buildSketchStainComponent(mountSketchStain, studioData, onPresetBook);
  buildStainLabComponent(mountStainLab, studioData);
  buildEstimatorComponent(mountEstimator, studioData, onPresetBook);
}
