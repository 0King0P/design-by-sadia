// 4-step Booking Atelier, availability calendar, and zero-backend dossier fulfillment.

const BOOKING_STYLES_ID = 'dbs-booking-module-styles';
const STORAGE_BOOKINGS_KEY = 'sadia_bookings_v1';

const DEFAULT_PACKAGES = [
  {
    id: 'royal-bridal',
    category: 'bridal',
    name: 'Royal Bridal Couture',
    subtitle: 'Full palms, dorsal filigree, and intricate forearm cuffs with custom hidden initials',
    startingPrice: 280,
    priceUnit: 'starting',
    durationMins: 180,
    coverageLevel: 'Bridal Full Palms + Forearms',
    includes: ['Pre-event consultation & custom concept motifs', '4 to 6 fresh hand-rolled organic cones', 'Hidden partner initials woven seamlessly']
  },
  {
    id: 'bridal-deluxe',
    category: 'bridal',
    name: 'Heirloom Bridal + Feet',
    subtitle: 'Extended bridal coverage across palms, forearms, and matching ankle-to-toe patterns',
    startingPrice: 420,
    priceUnit: 'starting',
    durationMins: 270,
    coverageLevel: 'Full Bridal + Feet',
    includes: ['Custom iPad sketch preview prior to session', '6+ fresh organic cones', 'Bridal aftercare seal kit']
  },
  {
    id: 'intricate-full-hand',
    category: 'private',
    name: 'Intricate Full-Hand Signature',
    subtitle: 'Dense botanical mandalas, rose vines, and fine shading up to mid-forearm',
    startingPrice: 120,
    priceUnit: 'per hand/pair option',
    durationMins: 75,
    coverageLevel: 'Full Hand + Wrist',
    includes: ['Choice of Organic, Jagua, Red, or Black cone', 'Studio appointment in Sterling, VA', 'Lemon-sugar aftercare guide']
  },
  {
    id: 'festive-half-hand',
    category: 'private',
    name: 'Festive Half-Hand & Eid Edit',
    subtitle: 'Signature Eid, Diwali, and Karwa Chauth floral lattice flowing past the wrist',
    startingPrice: 65,
    priceUnit: 'starting',
    durationMins: 45,
    coverageLevel: 'Half-Hand',
    includes: ['100% hand-rolled fresh paste', 'Fast-flow studio slot', 'Peak 48-hour stain guidance']
  },
  {
    id: 'minimalist-accent',
    category: 'private',
    name: 'Minimalist Botanical Sprigs',
    subtitle: 'Delicate modern finger vines, wrist cuffs, and airy palm blossoms',
    startingPrice: 35,
    priceUnit: 'starting',
    durationMins: 25,
    coverageLevel: 'Minimalist Accent',
    includes: ['Organic Henna or Botanical Jagua', 'Sterling studio session', 'Ideal for first-timers & shoots']
  },
  {
    id: 'party-hourly',
    category: 'party',
    name: 'Hourly Party & Sangeet Artist',
    subtitle: 'On-location speed artistry serving 12 to 15 guests per hour across NoVA & DMV',
    startingPrice: 115,
    priceUnit: 'per hour (2 hr min)',
    durationMins: 180,
    coverageLevel: 'Guest Party Speed Designs',
    includes: ['Freshly rolled cones for every guest', 'Custom motif board for event flow', 'On-location setup in NoVA & DMV']
  }
];

const DEFAULT_FORMULAS = [
  { id: 'organic', name: 'Organic Henna', badge: '100% Botanical' },
  { id: 'jagua', name: 'Botanical Jagua', badge: 'Blue-Black Ink' },
  { id: 'red', name: 'Festival Red', badge: 'Instant Crimson' },
  { id: 'black', name: 'Midnight Black', badge: 'Matte Contrast' }
];

const DEFAULT_TRAVEL_ZONES = [
  { id: 'sterling-local', label: 'Sterling / Ashburn / Herndon', areas: 'Loudoun County Studio & Local', fee: 0, minBooking: 65 },
  { id: 'fairfax-reston', label: 'Reston / Leesburg / Fairfax / Tysons', areas: 'Western & Central Fairfax', fee: 25, minBooking: 120 },
  { id: 'arlington-dc', label: 'Arlington / Alexandria / Washington DC', areas: 'Inside the Beltway & DC', fee: 45, minBooking: 180 },
  { id: 'maryland-metro', label: 'Bethesda / Rockville / Silver Spring MD', areas: 'Maryland Metro', fee: 60, minBooking: 220 }
];

const TIME_SLOTS = [
  { id: '10:00', label: '10:00 AM', sub: 'Morning Studio', hour24: 10, minute: 0 },
  { id: '13:30', label: '1:30 PM', sub: 'Afternoon Session', hour24: 13, minute: 30 },
  { id: '16:30', label: '4:30 PM', sub: 'Golden Hour', hour24: 16, minute: 30 },
  { id: '19:00', label: '7:00 PM', sub: 'Evening / Event', hour24: 19, minute: 0 }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let activeBookingApi = null;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function injectBookingStyles() {
  if (document.getElementById(BOOKING_STYLES_ID)) return;
  const style = document.createElement('style');
  style.id = BOOKING_STYLES_ID;
  style.textContent = `
    .dbs-booking-shell {
      background: var(--plane-2-card, #16201c);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      border-radius: 22px;
      padding: 2rem;
      color: var(--text-primary, #f4f0e8);
    }
    .dbs-stepper {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.65rem;
      margin-bottom: 1.75rem;
    }
    .dbs-step-pill {
      padding: 0.85rem 0.95rem;
      border-radius: 14px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      background: var(--plane-1-surface, #101714);
      color: var(--text-secondary, #b8c2bc);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms ease, background-color 180ms ease;
    }
    .dbs-step-pill:active {
      transform: scale(0.97);
    }
    .dbs-step-pill[aria-current="step"] {
      background: var(--plane-3-elevated, #1e2b26);
      border-color: var(--accent-henna, #d98a3c);
      color: var(--text-primary, #f4f0e8);
    }
    .dbs-step-pill[data-completed="true"]:not([aria-current="step"]) {
      border-color: rgba(217, 138, 60, 0.4);
      color: var(--text-primary, #f4f0e8);
    }
    .dbs-field-group {
      display: grid;
      gap: 0.4rem;
    }
    .dbs-field-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary, #f4f0e8);
    }
    .dbs-input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.82rem 0.95rem;
      border-radius: 12px;
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.14));
      font-family: inherit;
      font-size: 0.94rem;
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }
    .dbs-input:focus {
      outline: none;
      border-color: var(--accent-henna, #d98a3c);
      box-shadow: 0 0 0 3px rgba(217, 138, 60, 0.18);
    }
    .dbs-input[aria-invalid="true"] {
      border-color: var(--color-destructive, #e05a47);
    }
    .dbs-field-help {
      font-size: 0.78rem;
      color: var(--text-secondary, #b8c2bc);
      line-height: 1.45;
    }
    .dbs-field-error {
      font-size: 0.79rem;
      color: var(--color-destructive, #e05a47);
      font-weight: 500;
      min-height: 1.1em;
    }
    .dbs-pkg-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.85rem;
    }
    .dbs-pkg-card {
      padding: 1.15rem;
      border-radius: 14px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.65rem;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms ease, background-color 180ms ease;
    }
    .dbs-pkg-card:active {
      transform: scale(0.97);
    }
    .dbs-pkg-card[aria-pressed="true"] {
      background: var(--plane-3-elevated, #1e2b26);
      border-color: var(--accent-henna, #d98a3c);
      box-shadow: inset 0 0 0 1px rgba(217, 138, 60, 0.32);
    }
    .dbs-cal-wrap {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 1.5rem;
      align-items: start;
    }
    .dbs-cal-grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 0.35rem;
    }
    .dbs-cal-day {
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.1));
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-variant-numeric: tabular-nums;
      font-size: 0.85rem;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms ease, border-color 150ms ease;
    }
    .dbs-cal-day:active:not(:disabled) {
      transform: scale(0.95);
    }
    .dbs-cal-day:hover:not(:disabled):not([aria-pressed="true"]) {
      border-color: rgba(217, 138, 60, 0.55);
    }
    .dbs-cal-day[aria-pressed="true"] {
      background: var(--accent-henna, #d98a3c);
      color: var(--accent-ink, #140d06);
      border-color: var(--accent-henna, #d98a3c);
      font-weight: 700;
    }
    .dbs-cal-day:disabled {
      opacity: 0.28;
      cursor: not-allowed;
      background: transparent;
      border-color: transparent;
    }
    .dbs-moodboard-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      align-items: center;
    }
    .dbs-mood-thumb {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.4rem 0.65rem 0.4rem 0.4rem;
      border-radius: 12px;
      background: var(--plane-1-surface, #101714);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      font-size: 0.8rem;
    }
    .dbs-mood-thumb img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      object-fit: cover;
      display: block;
    }
    .dbs-actions-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }
    @media (max-width: 920px) {
      .dbs-pkg-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .dbs-cal-wrap {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    @media (max-width: 680px) {
      .dbs-booking-shell {
        padding: 1.25rem;
      }
      .dbs-stepper,
      .dbs-pkg-grid,
      .dbs-actions-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `;
  document.head.appendChild(style);
}

function getTodayFloor() {
  const now = new Date();
  // Anchor minimum calendar month cleanly at Nov 2026 if system clock is earlier, otherwise live clock.
  const floor = now.getFullYear() < 2026 ? new Date(2026, 10, 16) : now;
  return new Date(floor.getFullYear(), floor.getMonth(), floor.getDate());
}

function formatIsoDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatPrettyDate(isoStr) {
  if (!isoStr) return 'Flexible Date';
  const [y, m, d] = isoStr.split('-').map(Number);
  if (!y || !m || !d) return isoStr;
  const dt = new Date(y, m - 1, d);
  return `${WEEKDAYS[dt.getDay()]}, ${MONTH_NAMES[dt.getMonth()]} ${d}, ${y}`;
}

function defaultSuggestedDate(today) {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
  return formatIsoDate(d);
}

function loadSavedBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function saveBookingRecord(record) {
  try {
    const existing = loadSavedBookings();
    const updated = [record, ...existing.filter((r) => r.ref !== record.ref)].slice(0, 20);
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (_) {
    return [record];
  }
}

function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DBS-2026-${code}`;
}

async function copyTextSafe(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fall through to legacy textarea copy.
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (_) {
    return false;
  }
}

function escapeIcsText(str) {
  return String(str ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function formatIcsLocalStamp(year, month1, day, hour24, minute) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${year}${pad(month1)}${pad(day)}T${pad(hour24)}${pad(minute)}00`;
}

function buildIcsContent(record) {
  const [y, m, d] = (record.dateIso || '2026-11-20').split('-').map(Number);
  const slot = TIME_SLOTS.find((s) => s.id === record.timeSlotId) || TIME_SLOTS[0];
  const durationMins = Math.max(30, Number(record.durationMins || 90));
  const startDt = new Date(y, m - 1, d, slot.hour24, slot.minute, 0);
  const endDt = new Date(startDt.getTime() + durationMins * 60 * 1000);

  const dtStart = formatIcsLocalStamp(
    startDt.getFullYear(),
    startDt.getMonth() + 1,
    startDt.getDate(),
    startDt.getHours(),
    startDt.getMinutes()
  );
  const dtEnd = formatIcsLocalStamp(
    endDt.getFullYear(),
    endDt.getMonth() + 1,
    endDt.getDate(),
    endDt.getHours(),
    endDt.getMinutes()
  );

  const now = new Date();
  const dtStamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(
    now.getUTCDate()
  ).padStart(2, '0')}T${String(now.getUTCHours()).padStart(2, '0')}${String(
    now.getUTCMinutes()
  ).padStart(2, '0')}${String(now.getUTCSeconds()).padStart(2, '0')}Z`;

  const locationText = record.venue
    ? `${record.venue} (${record.travelZoneLabel})`
    : `Design by Sadia Studio, Sterling, VA (${record.travelZoneLabel})`;

  const descParts = [
    `Booking Reference: ${record.ref}`,
    `Service: ${record.packageName}`,
    `Cone Formula: ${record.formulaName}`,
    record.customSketch ? 'Custom iPad Concept Sketch: Requested' : '',
    record.hiddenInitials ? `Hidden Partner Initials: ${record.hiddenInitials}` : '',
    `Estimated Investment: ${record.estimatedLabel}`,
    record.moodboardTitles?.length ? `Pinned Moodboard: ${record.moodboardTitles.join(', ')}` : '',
    record.notes ? `Notes: ${record.notes}` : '',
    'Instagram: @design.by.sadia'
  ].filter(Boolean);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Design by Sadia//Booking Atelier//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${record.ref}@designbysadia.studio`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(`Design by Sadia Henna Appointment (${record.packageName})`)}`,
    `LOCATION:${escapeIcsText(locationText)}`,
    `DESCRIPTION:${escapeIcsText(descParts.join('\n'))}`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

function buildDossierPlainText(record) {
  const lines = [
    `DESIGN BY SADIA | BOOKING INQUIRY BRIEF`,
    `Reference: ${record.ref}`,
    `Client: ${record.clientName}`,
    `Email: ${record.clientEmail}`,
    record.clientPhone ? `Phone: ${record.clientPhone}` : '',
    record.clientInstagram ? `Instagram: ${record.clientInstagram}` : '',
    ``,
    `APPOINTMENT DETAILS`,
    `Service: ${record.packageName}`,
    `Cone Formula: ${record.formulaName}`,
    `Custom iPad Sketch: ${record.customSketch ? 'Yes, requested' : 'Standard freehand consultation'}`,
    record.hiddenInitials ? `Hidden Partner Initials: ${record.hiddenInitials}` : '',
    `Preferred Date: ${formatPrettyDate(record.dateIso)}`,
    `Time Window: ${record.timeSlotLabel}`,
    `Zone: ${record.travelZoneLabel}`,
    record.venue ? `Venue / City: ${record.venue}` : '',
    `Estimated Investment: ${record.estimatedLabel}`,
    record.moodboardTitles?.length ? `Pinned Portfolio Looks: ${record.moodboardTitles.join(', ')}` : '',
    record.notes ? `Client Notes: ${record.notes}` : ''
  ].filter((line) => line !== '');
  return lines.join('\n');
}

export function initBookingEngine({ mountBooking, studioData = {}, getMoodboardIds } = {}) {
  if (!mountBooking) return;
  injectBookingStyles();

  const packages =
    Array.isArray(studioData?.SERVICE_PACKAGES) && studioData.SERVICE_PACKAGES.length > 0
      ? studioData.SERVICE_PACKAGES
      : DEFAULT_PACKAGES;
  const formulas =
    Array.isArray(studioData?.CONE_FORMULAS) && studioData.CONE_FORMULAS.length > 0
      ? studioData.CONE_FORMULAS
      : DEFAULT_FORMULAS;
  const travelZones =
    Array.isArray(studioData?.TRAVEL_ZONES) && studioData.TRAVEL_ZONES.length > 0
      ? studioData.TRAVEL_ZONES
      : DEFAULT_TRAVEL_ZONES;
  const portfolioItems = Array.isArray(studioData?.PORTFOLIO_ITEMS) ? studioData.PORTFOLIO_ITEMS : [];
  const brand = studioData?.BRAND_PROFILE || {};
  const igDmUrl = brand.igDmUrl || 'https://ig.me/m/design.by.sadia';
  const studioEmail = brand.email || 'hello@designbysadia.com';

  const todayFloor = getTodayFloor();

  const state = {
    step: 1,
    packageId: packages[0]?.id || 'royal-bridal',
    formulaId: formulas[0]?.id || 'organic',
    customSketch: false,
    hiddenInitials: '',
    coverageNotes: '',
    monthOffset: 0, // 0..6 from current month (Nov 2026..May 2027)
    dateIso: defaultSuggestedDate(todayFloor),
    timeSlotId: TIME_SLOTS[1].id,
    travelZoneId: travelZones[0]?.id || 'sterling-local',
    venue: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientInstagram: '',
    notes: '',
    estimatedTotal: null,
    durationLabel: '',
    presetBanner: '',
    errors: {},
    confirmedRecord: null,
    showSavedDrawer: false,
    dmNotice: ''
  };

  function resolveMoodboardItems() {
    let ids = [];
    if (typeof getMoodboardIds === 'function') {
      try {
        const res = getMoodboardIds();
        if (Array.isArray(res)) ids = res;
      } catch (_) {
        ids = [];
      }
    } else {
      try {
        const raw = JSON.parse(localStorage.getItem('sadia_moodboard_v1') || '[]');
        if (Array.isArray(raw)) ids = raw;
      } catch (_) {
        ids = [];
      }
    }
    return ids
      .map((id) => portfolioItems.find((item) => item.id === id))
      .filter(Boolean);
  }

  function getSelectedPackage() {
    return packages.find((p) => p.id === state.packageId) || packages[0];
  }

  function getSelectedFormula() {
    return formulas.find((f) => f.id === state.formulaId) || formulas[0];
  }

  function getSelectedZone() {
    return travelZones.find((z) => z.id === state.travelZoneId) || travelZones[0];
  }

  function computeEstimateSummary() {
    const pkg = getSelectedPackage();
    const zone = getSelectedZone();
    const formula = getSelectedFormula();
    if (state.estimatedTotal && Number(state.estimatedTotal) > 0) {
      return {
        amount: Number(state.estimatedTotal),
        label: `$${state.estimatedTotal} configured estimate (50% retainer $${Math.round(state.estimatedTotal * 0.5)})`,
        durationMins: pkg?.durationMins || 90
      };
    }
    const base = Number(pkg?.startingPrice || 65);
    const jaguaAdd = formula?.id === 'jagua' ? 15 : 0;
    const travelAdd = Number(zone?.fee || 0);
    const total = base + jaguaAdd + travelAdd;
    return {
      amount: total,
      label: `$${total}+ estimated (${pkg?.priceUnit || 'starting'}, 50% retainer $${Math.round(total * 0.5)})`,
      durationMins: pkg?.durationMins || 90
    };
  }

  function validateStep(stepNum) {
    const errors = {};
    if (stepNum === 3) {
      if (!state.dateIso) {
        errors.dateIso = 'Please pick a preferred appointment date from the calendar.';
      }
    }
    if (stepNum === 4) {
      if (!state.clientName.trim()) {
        errors.clientName = 'Please enter your full name so Sadia can address your booking brief.';
      }
      const emailVal = state.clientEmail.trim();
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        errors.clientEmail = 'Please provide a valid email address for your confirmation packet.';
      }
    }
    state.errors = errors;
    return Object.keys(errors).length === 0;
  }

  function renderMoodboardBlock() {
    const pinned = resolveMoodboardItems();
    if (pinned.length === 0) {
      return `
        <div class="dbs-surface-box" style="padding:0.95rem 1.1rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div style="font-size:0.84rem;color:var(--text-secondary);">
            No portfolio looks pinned yet. Tap <strong>Pin to Moodboard</strong> on any gallery piece above to attach visual references automatically.
          </div>
          <a href="#portfolio" class="dbs-btn-ghost" style="text-decoration:none;font-size:0.8rem;">Browse Portfolio</a>
        </div>
      `;
    }
    return `
      <div class="dbs-surface-box" style="padding:1rem 1.1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;margin-bottom:0.65rem;flex-wrap:wrap;">
          <span style="font-size:0.84rem;font-weight:600;color:var(--text-primary);">
            Pinned Moodboard References (${pinned.length})
          </span>
          <a href="#portfolio" style="font-size:0.78rem;color:var(--accent-henna);text-decoration:none;">Edit in Portfolio</a>
        </div>
        <div class="dbs-moodboard-strip">
          ${pinned
            .map(
              (item) => `
            <div class="dbs-mood-thumb">
              <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" width="40" height="40" />
              <div>
                <div style="font-weight:600;color:var(--text-primary);font-size:0.78rem;">${escapeHtml(item.title)}</div>
                <div style="font-size:0.7rem;color:var(--text-secondary);">${escapeHtml(item.medium || '')}</div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  function renderCalendarGrid() {
    const baseDate = new Date(todayFloor.getFullYear(), todayFloor.getMonth() + state.monthOffset, 1);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstWeekday = baseDate.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push('<div aria-hidden="true"></div>');
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const cellDate = new Date(year, month, day);
      const iso = formatIsoDate(cellDate);
      const isPast = cellDate.getTime() < todayFloor.getTime();
      const isSelected = state.dateIso === iso;
      cells.push(`
        <button
          type="button"
          class="dbs-cal-day"
          data-cal-date="${iso}"
          aria-label="${MONTH_NAMES[month]} ${day}, ${year}"
          aria-pressed="${isSelected}"
          ${isPast ? 'disabled aria-disabled="true"' : ''}
        >
          ${day}
        </button>
      `);
    }

    return `
      <div class="dbs-surface-box" style="padding:1.15rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.9rem;">
          <button
            type="button"
            class="dbs-btn-ghost"
            data-cal-prev
            ${state.monthOffset <= 0 ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''}
            aria-label="Previous month"
          >
            Prev
          </button>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;">
            ${MONTH_NAMES[month]} ${year}
          </div>
          <button
            type="button"
            class="dbs-btn-ghost"
            data-cal-next
            ${state.monthOffset >= 6 ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''}
            aria-label="Next month"
          >
            Next
          </button>
        </div>

        <div class="dbs-cal-grid" style="margin-bottom:0.4rem;">
          ${WEEKDAYS.map(
            (w) => `<div style="text-align:center;font-size:0.72rem;color:var(--text-secondary);padding-bottom:0.25rem;">${w}</div>`
          ).join('')}
        </div>
        <div class="dbs-cal-grid">
          ${cells.join('')}
        </div>
        <div class="dbs-field-help" style="margin-top:0.75rem;">
          Selected Date: <strong style="color:var(--accent-henna);">${escapeHtml(formatPrettyDate(state.dateIso))}</strong>. For organic bridal henna, book 2 to 3 days before your ceremony for peak mahogany stain.
        </div>
        <div class="dbs-field-error" aria-live="polite">${escapeHtml(state.errors.dateIso || '')}</div>
      </div>
    `;
  }

  function renderConfirmedDossier(record) {
    const savedList = loadSavedBookings();
    const emailSubject = encodeURIComponent(`Henna Booking Inquiry ${record.ref} | ${record.clientName}`);
    const emailBody = encodeURIComponent(buildDossierPlainText(record));

    return `
      <div class="dbs-booking-shell" data-booking-confirmed>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;border-bottom:1px solid var(--border-specular);padding-bottom:1.25rem;margin-bottom:1.5rem;">
          <div>
            <span class="dbs-mono-meta" style="display:inline-block;padding:0.3rem 0.7rem;border-radius:999px;background:rgba(217,138,60,0.16);color:var(--accent-henna);font-size:0.74rem;margin-bottom:0.55rem;">
              INQUIRY DOSSIER READY
            </span>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,3vw,2.35rem);line-height:1.12;margin:0;">
              Your Booking Brief Is Saved, ${escapeHtml(record.clientName)}
            </h3>
          </div>
          <div class="dbs-surface-box" style="padding:0.75rem 1.05rem;text-align:right;">
            <div style="font-size:0.74rem;color:var(--text-secondary);">Booking Reference</div>
            <div class="dbs-mono-meta" style="font-size:1.08rem;font-weight:700;color:var(--accent-henna);">${escapeHtml(record.ref)}</div>
          </div>
        </div>

        ${
          state.dmNotice
            ? `<div role="status" style="margin-bottom:1.2rem;padding:0.85rem 1.1rem;border-radius:12px;background:rgba(217,138,60,0.15);border:1px solid var(--accent-henna);color:var(--text-primary);font-size:0.9rem;">
                ${escapeHtml(state.dmNotice)}
              </div>`
            : ''
        }

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.85rem;margin-bottom:1.5rem;">
          <div class="dbs-surface-box" style="padding:1rem;">
            <div style="font-size:0.74rem;color:var(--text-secondary);">Package &amp; Formula</div>
            <div style="font-weight:600;margin-top:0.2rem;">${escapeHtml(record.packageName)}</div>
            <div style="font-size:0.84rem;color:var(--accent-henna);margin-top:0.15rem;">${escapeHtml(record.formulaName)}</div>
          </div>
          <div class="dbs-surface-box" style="padding:1rem;">
            <div style="font-size:0.74rem;color:var(--text-secondary);">Requested Date &amp; Window</div>
            <div style="font-weight:600;margin-top:0.2rem;">${escapeHtml(formatPrettyDate(record.dateIso))}</div>
            <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:0.15rem;">${escapeHtml(record.timeSlotLabel)}</div>
          </div>
          <div class="dbs-surface-box" style="padding:1rem;">
            <div style="font-size:0.74rem;color:var(--text-secondary);">Location &amp; Quote</div>
            <div style="font-weight:600;margin-top:0.2rem;">${escapeHtml(record.venue || 'Sterling Studio / DMV')}</div>
            <div class="dbs-mono-meta" style="font-size:0.82rem;color:var(--accent-henna);margin-top:0.15rem;">${escapeHtml(record.estimatedLabel)}</div>
          </div>
        </div>

        ${
          record.hiddenInitials || record.customSketch || record.notes || (record.moodboardTitles && record.moodboardTitles.length)
            ? `
          <div class="dbs-surface-box" style="padding:1.1rem;margin-bottom:1.5rem;display:grid;gap:0.45rem;font-size:0.88rem;color:var(--text-secondary);">
            ${record.customSketch ? `<div><strong style="color:var(--text-primary);">Custom iPad Concept Sketch:</strong> Requested ahead of appointment</div>` : ''}
            ${record.hiddenInitials ? `<div><strong style="color:var(--text-primary);">Hidden Partner Initials:</strong> ${escapeHtml(record.hiddenInitials)}</div>` : ''}
            ${record.moodboardTitles?.length ? `<div><strong style="color:var(--text-primary);">Pinned Moodboard Looks:</strong> ${escapeHtml(record.moodboardTitles.join(', '))}</div>` : ''}
            ${record.notes ? `<div><strong style="color:var(--text-primary);">Notes:</strong> ${escapeHtml(record.notes)}</div>` : ''}
          </div>
        `
            : ''
        }

        <div class="dbs-actions-grid" style="margin-bottom:1.25rem;">
          <a
            class="dbs-btn-primary dbs-tactile-btn"
            style="text-decoration:none;"
            href="${escapeHtml(igDmUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            data-action-ig
          >
            Send Brief via Instagram DM (@design.by.sadia)
          </a>
          <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-action-ics>
            Download .ics Calendar Invite
          </button>
          <a
            class="dbs-btn-ghost dbs-tactile-btn"
            style="text-decoration:none;"
            href="mailto:${escapeHtml(studioEmail)}?subject=${emailSubject}&body=${emailBody}"
          >
            Send via Email Brief
          </a>
          <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-action-print>
            Print / Save Dossier
          </button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
          <button type="button" class="dbs-btn-ghost" data-action-new-inquiry>
            Start Another Inquiry
          </button>
          ${
            savedList.length > 0
              ? `<button type="button" class="dbs-btn-ghost" data-toggle-saved>
                  ${state.showSavedDrawer ? 'Hide' : 'View'} Previous Saved Inquiries (${savedList.length})
                </button>`
              : ''
          }
        </div>

        ${state.showSavedDrawer ? renderSavedDrawer(savedList) : ''}
      </div>
    `;
  }

  function renderSavedDrawer(savedList) {
    if (!savedList.length) return '';
    return `
      <div class="dbs-surface-box" style="margin-top:1.25rem;padding:1.1rem;display:grid;gap:0.75rem;">
        <div style="font-size:0.86rem;font-weight:600;color:var(--text-primary);">Saved Local Inquiries</div>
        ${savedList
          .map(
            (item) => `
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;padding:0.7rem 0.85rem;border-radius:10px;background:var(--plane-2-card);border:1px solid var(--border-specular);">
            <div>
              <div class="dbs-mono-meta" style="font-size:0.76rem;color:var(--accent-henna);">${escapeHtml(item.ref)}</div>
              <div style="font-size:0.88rem;font-weight:600;">${escapeHtml(item.packageName)} (${escapeHtml(formatPrettyDate(item.dateIso))})</div>
              <div style="font-size:0.78rem;color:var(--text-secondary);">${escapeHtml(item.clientName)} | ${escapeHtml(item.formulaName)}</div>
            </div>
            <button type="button" class="dbs-btn-ghost" data-load-saved="${escapeHtml(item.ref)}" style="font-size:0.78rem;">
              Open Dossier
            </button>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  function render() {
    if (state.confirmedRecord) {
      mountBooking.innerHTML = renderConfirmedDossier(state.confirmedRecord);
      bindConfirmedEvents(state.confirmedRecord);
      return;
    }

    const savedList = loadSavedBookings();
    const pkg = getSelectedPackage();
    const formula = getSelectedFormula();
    const quote = computeEstimateSummary();

    const stepLabels = [
      { num: 1, title: 'Service & Package' },
      { num: 2, title: 'Formula & Custom' },
      { num: 3, title: 'Date & DMV Venue' },
      { num: 4, title: 'Details & Confirm' }
    ];

    let stepBody = '';

    if (state.step === 1) {
      stepBody = `
        <div style="display:grid;gap:1.2rem;">
          <div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.65rem;margin:0 0 0.25rem;">1. Select Your Service &amp; Package</h3>
            <p style="margin:0;color:var(--text-secondary);font-size:0.92rem;">Choose bridal couture, private studio artistry, or hourly party coverage across Northern Virginia.</p>
          </div>
          <div class="dbs-pkg-grid" role="group" aria-label="Service packages">
            ${packages
              .map(
                (p) => `
              <button type="button" class="dbs-pkg-card" data-book-pkg="${escapeHtml(p.id)}" aria-pressed="${state.packageId === p.id}">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:baseline;gap:0.5rem;">
                    <span style="font-weight:600;font-size:0.98rem;">${escapeHtml(p.name)}</span>
                    <span class="dbs-mono-meta" style="color:var(--accent-henna);font-size:0.86rem;">$${escapeHtml(p.startingPrice)}+</span>
                  </div>
                  <p style="margin:0.4rem 0 0;font-size:0.81rem;color:var(--text-secondary);line-height:1.45;">${escapeHtml(p.subtitle || '')}</p>
                </div>
                <div class="dbs-mono-meta" style="font-size:0.72rem;color:var(--text-secondary);border-top:1px solid var(--border-specular);padding-top:0.55rem;">
                  ${escapeHtml(p.coverageLevel || '')} · ~${escapeHtml(p.durationMins || 60)} min
                </div>
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    } else if (state.step === 2) {
      stepBody = `
        <div style="display:grid;gap:1.25rem;">
          <div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.65rem;margin:0 0 0.25rem;">2. Cone Formula, Coverage &amp; Custom Initials</h3>
            <p style="margin:0;color:var(--text-secondary);font-size:0.92rem;">Selected package: <strong style="color:var(--text-primary);">${escapeHtml(pkg.name)}</strong>.</p>
          </div>

          <div>
            <div class="dbs-field-label" style="margin-bottom:0.5rem;">Cone Medium</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.55rem;" role="group" aria-label="Cone formula">
              ${formulas
                .map(
                  (f) => `
                <button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-book-formula="${escapeHtml(f.id)}" aria-pressed="${state.formulaId === f.id}">
                  ${escapeHtml(f.name)} ${f.id === 'jagua' ? '(+$15)' : ''}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="dbs-surface-box" style="padding:1rem 1.15rem;display:flex;align-items:flex-start;gap:0.8rem;">
            <input
              id="dbs-custom-sketch"
              type="checkbox"
              ${state.customSketch ? 'checked' : ''}
              style="width:18px;height:18px;margin-top:0.15rem;accent-color:var(--accent-henna);cursor:pointer;"
            />
            <div>
              <label for="dbs-custom-sketch" class="dbs-field-label" style="cursor:pointer;">
                Request Custom iPad Concept Sketch Preview
              </label>
              <div class="dbs-field-help">
                Sadia drafts your tailored floral or architectural motif digitally before application so you can review placement.
              </div>
            </div>
          </div>

          <div class="dbs-field-group">
            <label for="dbs-hidden-initials" class="dbs-field-label">Hidden Partner Initials (Optional)</label>
            <input
              id="dbs-hidden-initials"
              class="dbs-input"
              type="text"
              maxlength="40"
              value="${escapeHtml(state.hiddenInitials)}"
              placeholder="e.g. S + R"
            />
            <div class="dbs-field-help">Optional hidden partner initials in bridal vine, e.g. S + R.</div>
            <div class="dbs-field-error" aria-live="polite"></div>
          </div>

          <div class="dbs-field-group">
            <label for="dbs-coverage-notes" class="dbs-field-label">Coverage &amp; Motif Preferences (Optional)</label>
            <textarea
              id="dbs-coverage-notes"
              class="dbs-input"
              rows="3"
              placeholder="Tell Sadia about sleeve length, rose motifs, wrist cuffs, or party guest count."
            >${escapeHtml(state.coverageNotes)}</textarea>
            <div class="dbs-field-help">Any inspiration details here attach directly to your booking brief.</div>
            <div class="dbs-field-error" aria-live="polite"></div>
          </div>
        </div>
      `;
    } else if (state.step === 3) {
      stepBody = `
        <div style="display:grid;gap:1.25rem;">
          <div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.65rem;margin:0 0 0.25rem;">3. Availability Calendar, Time Slot &amp; DMV Venue</h3>
            <p style="margin:0;color:var(--text-secondary);font-size:0.92rem;">Sterling studio sessions carry $0 travel. On-location travel covers Loudoun, Fairfax, Arlington, DC, and MD.</p>
          </div>

          <div class="dbs-cal-wrap">
            ${renderCalendarGrid()}
            <div style="display:grid;gap:1.1rem;">
              <div>
                <div class="dbs-field-label" style="margin-bottom:0.5rem;">Preferred Time Window</div>
                <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.55rem;" role="group" aria-label="Time slot">
                  ${TIME_SLOTS.map(
                    (slot) => `
                    <button type="button" class="dbs-btn-ghost dbs-tactile-btn" style="flex-direction:column;align-items:flex-start;border-radius:12px;padding:0.75rem 0.9rem;" data-book-slot="${slot.id}" aria-pressed="${state.timeSlotId === slot.id}">
                      <span class="dbs-mono-meta" style="font-size:0.82rem;font-weight:700;">${escapeHtml(slot.label)}</span>
                      <span style="font-size:0.74rem;opacity:0.85;">${escapeHtml(slot.sub)}</span>
                    </button>
                  `
                  ).join('')}
                </div>
              </div>

              <div class="dbs-field-group">
                <label for="dbs-book-zone" class="dbs-field-label">Travel Zone / Service Area</label>
                <select id="dbs-book-zone" class="dbs-input">
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
                <div class="dbs-field-help">Select Sterling Studio or your Northern Virginia / DMV event area.</div>
                <div class="dbs-field-error" aria-live="polite"></div>
              </div>

              <div class="dbs-field-group">
                <label for="dbs-venue" class="dbs-field-label">Venue, Neighborhood, or Studio Preference (Optional)</label>
                <input
                  id="dbs-venue"
                  class="dbs-input"
                  type="text"
                  value="${escapeHtml(state.venue)}"
                  placeholder="e.g. Sterling Studio, Ashburn Residence, or Tysons Ritz-Carlton"
                />
                <div class="dbs-field-help">Exact studio address is shared privately upon deposit confirmation.</div>
                <div class="dbs-field-error" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      const pinned = resolveMoodboardItems();
      stepBody = `
        <div style="display:grid;gap:1.25rem;">
          <div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.65rem;margin:0 0 0.25rem;">4. Client Details &amp; Booking Dossier</h3>
            <p style="margin:0;color:var(--text-secondary);font-size:0.92rem;">Review your selected details and generate your instant calendar invite + Instagram DM brief.</p>
          </div>

          <div class="dbs-surface-box" style="padding:1rem 1.15rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:0.75rem;font-size:0.84rem;">
            <div>
              <div style="color:var(--text-secondary);font-size:0.74rem;">Package</div>
              <div style="font-weight:600;">${escapeHtml(pkg.name)}</div>
            </div>
            <div>
              <div style="color:var(--text-secondary);font-size:0.74rem;">Cone Medium</div>
              <div style="font-weight:600;">${escapeHtml(formula.name)}</div>
            </div>
            <div>
              <div style="color:var(--text-secondary);font-size:0.74rem;">Date &amp; Time</div>
              <div style="font-weight:600;">${escapeHtml(formatPrettyDate(state.dateIso))}</div>
            </div>
            <div>
              <div style="color:var(--text-secondary);font-size:0.74rem;">Estimated Quote</div>
              <div class="dbs-mono-meta" style="font-weight:700;color:var(--accent-henna);">$${quote.amount}+</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;">
            <div class="dbs-field-group">
              <label for="dbs-client-name" class="dbs-field-label">Full Name *</label>
              <input
                id="dbs-client-name"
                class="dbs-input"
                type="text"
                required
                aria-invalid="${state.errors.clientName ? 'true' : 'false'}"
                value="${escapeHtml(state.clientName)}"
                placeholder="Your full name"
              />
              <div class="dbs-field-help">Used on your calendar invite and consultation brief.</div>
              <div class="dbs-field-error" role="alert" aria-live="polite">${escapeHtml(state.errors.clientName || '')}</div>
            </div>

            <div class="dbs-field-group">
              <label for="dbs-client-email" class="dbs-field-label">Email Address *</label>
              <input
                id="dbs-client-email"
                class="dbs-input"
                type="email"
                required
                aria-invalid="${state.errors.clientEmail ? 'true' : 'false'}"
                value="${escapeHtml(state.clientEmail)}"
                placeholder="you@example.com"
              />
              <div class="dbs-field-help">Used if you choose the email inquiry action.</div>
              <div class="dbs-field-error" role="alert" aria-live="polite">${escapeHtml(state.errors.clientEmail || '')}</div>
            </div>

            <div class="dbs-field-group">
              <label for="dbs-client-phone" class="dbs-field-label">Phone / WhatsApp (Optional)</label>
              <input
                id="dbs-client-phone"
                class="dbs-input"
                type="tel"
                value="${escapeHtml(state.clientPhone)}"
                placeholder="(571) 555-0142"
              />
              <div class="dbs-field-help">Helpful for bridal day-of coordination in Northern Virginia.</div>
              <div class="dbs-field-error" aria-live="polite"></div>
            </div>

            <div class="dbs-field-group">
              <label for="dbs-client-ig" class="dbs-field-label">Instagram Handle (Optional)</label>
              <input
                id="dbs-client-ig"
                class="dbs-input"
                type="text"
                value="${escapeHtml(state.clientInstagram)}"
                placeholder="@yourhandle"
              />
              <div class="dbs-field-help">So Sadia can recognize your DM inquiry immediately.</div>
              <div class="dbs-field-error" aria-live="polite"></div>
            </div>
          </div>

          <div class="dbs-field-group">
            <label for="dbs-final-notes" class="dbs-field-label">Event Date, Ceremony Type, or Special Requests</label>
            <textarea
              id="dbs-final-notes"
              class="dbs-input"
              rows="3"
              placeholder="Share wedding ceremony dates, skin sensitivities, or additional guests."
            >${escapeHtml(state.notes || state.coverageNotes)}</textarea>
            <div class="dbs-field-help">${pinned.length} pinned portfolio ${pinned.length === 1 ? 'photo' : 'photos'} will be included in your inquiry brief.</div>
            <div class="dbs-field-error" aria-live="polite"></div>
          </div>
        </div>
      `;
    }

    mountBooking.innerHTML = `
      <div class="dbs-booking-shell">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.25rem;">
          <div class="dbs-mono-meta" style="font-size:0.75rem;color:var(--accent-henna);">
            STEP ${state.step} OF 4 · STERLING, VA &amp; DMV CONCIERGE
          </div>
          ${
            savedList.length > 0
              ? `<button type="button" class="dbs-btn-ghost" data-toggle-saved style="font-size:0.78rem;">
                  ${state.showSavedDrawer ? 'Hide' : 'View'} Previous Saved Inquiries (${savedList.length})
                </button>`
              : ''
          }
        </div>

        ${
          state.presetBanner
            ? `<div style="margin-bottom:1.1rem;padding:0.75rem 1rem;border-radius:12px;background:rgba(217,138,60,0.14);border:1px solid rgba(217,138,60,0.45);font-size:0.86rem;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <span>${escapeHtml(state.presetBanner)}</span>
                <button type="button" class="dbs-btn-ghost" data-dismiss-banner style="padding:0.25rem 0.65rem;font-size:0.75rem;">Dismiss</button>
              </div>`
            : ''
        }

        <div class="dbs-stepper" role="navigation" aria-label="Booking progress">
          ${stepLabels
            .map(
              (st) => `
            <button
              type="button"
              class="dbs-step-pill"
              data-goto-step="${st.num}"
              aria-current="${state.step === st.num ? 'step' : 'false'}"
              data-completed="${st.num < state.step}"
            >
              <span class="dbs-mono-meta" style="font-size:0.68rem;color:var(--accent-henna);">STEP 0${st.num}</span>
              <span style="font-weight:600;font-size:0.88rem;">${escapeHtml(st.title)}</span>
            </button>
          `
            )
            .join('')}
        </div>

        <div style="margin-bottom:1.35rem;" data-moodboard-live-container>
          ${renderMoodboardBlock()}
        </div>

        ${stepBody}

        ${state.showSavedDrawer ? renderSavedDrawer(savedList) : ''}

        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-top:1.75rem;padding-top:1.25rem;border-top:1px solid var(--border-specular);flex-wrap:wrap;">
          <div>
            ${
              state.step > 1
                ? `<button type="button" class="dbs-btn-ghost dbs-tactile-btn" data-step-prev>Back</button>`
                : `<span style="font-size:0.82rem;color:var(--text-secondary);">50% retainer locks your date once Sadia confirms availability.</span>`
            }
          </div>
          <div style="display:flex;gap:0.75rem;align-items:center;">
            ${
              state.step < 4
                ? `<button type="button" class="dbs-btn-primary dbs-tactile-btn" data-step-next>Continue to Step ${state.step + 1}</button>`
                : `<button type="button" class="dbs-btn-primary dbs-tactile-btn" data-submit-booking>Generate Booking Dossier</button>`
            }
          </div>
        </div>
      </div>
    `;

    bindFormEvents();
  }

  function bindFormEvents() {
    mountBooking.querySelector('[data-dismiss-banner]')?.addEventListener('click', () => {
      state.presetBanner = '';
      render();
    });

    mountBooking.querySelector('[data-toggle-saved]')?.addEventListener('click', () => {
      state.showSavedDrawer = !state.showSavedDrawer;
      render();
    });

    mountBooking.querySelectorAll('[data-load-saved]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ref = btn.getAttribute('data-load-saved');
        const found = loadSavedBookings().find((b) => b.ref === ref);
        if (found) {
          state.confirmedRecord = found;
          state.dmNotice = '';
          render();
        }
      });
    });

    mountBooking.querySelectorAll('[data-goto-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = Number(btn.getAttribute('data-goto-step'));
        if (target >= 1 && target <= 4) {
          state.step = target;
          state.errors = {};
          render();
        }
      });
    });

    mountBooking.querySelectorAll('[data-book-pkg]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.packageId = btn.getAttribute('data-book-pkg');
        state.estimatedTotal = null;
        render();
      });
    });

    mountBooking.querySelectorAll('[data-book-formula]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.formulaId = btn.getAttribute('data-book-formula');
        state.estimatedTotal = null;
        render();
      });
    });

    mountBooking.querySelector('#dbs-custom-sketch')?.addEventListener('change', (ev) => {
      state.customSketch = Boolean(ev.target.checked);
    });

    mountBooking.querySelector('#dbs-hidden-initials')?.addEventListener('input', (ev) => {
      state.hiddenInitials = ev.target.value;
    });

    mountBooking.querySelector('#dbs-coverage-notes')?.addEventListener('input', (ev) => {
      state.coverageNotes = ev.target.value;
    });

    mountBooking.querySelector('[data-cal-prev]')?.addEventListener('click', () => {
      if (state.monthOffset > 0) {
        state.monthOffset -= 1;
        render();
      }
    });

    mountBooking.querySelector('[data-cal-next]')?.addEventListener('click', () => {
      if (state.monthOffset < 6) {
        state.monthOffset += 1;
        render();
      }
    });

    mountBooking.querySelectorAll('[data-cal-date]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.dateIso = btn.getAttribute('data-cal-date');
        delete state.errors.dateIso;
        render();
      });
    });

    mountBooking.querySelectorAll('[data-book-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.timeSlotId = btn.getAttribute('data-book-slot');
        render();
      });
    });

    mountBooking.querySelector('#dbs-book-zone')?.addEventListener('change', (ev) => {
      state.travelZoneId = ev.target.value;
      state.estimatedTotal = null;
    });

    mountBooking.querySelector('#dbs-venue')?.addEventListener('input', (ev) => {
      state.venue = ev.target.value;
    });

    mountBooking.querySelector('#dbs-client-name')?.addEventListener('input', (ev) => {
      state.clientName = ev.target.value;
      if (state.errors.clientName && ev.target.value.trim()) {
        delete state.errors.clientName;
      }
    });

    mountBooking.querySelector('#dbs-client-email')?.addEventListener('input', (ev) => {
      state.clientEmail = ev.target.value;
    });

    mountBooking.querySelector('#dbs-client-phone')?.addEventListener('input', (ev) => {
      state.clientPhone = ev.target.value;
    });

    mountBooking.querySelector('#dbs-client-ig')?.addEventListener('input', (ev) => {
      state.clientInstagram = ev.target.value;
    });

    mountBooking.querySelector('#dbs-final-notes')?.addEventListener('input', (ev) => {
      state.notes = ev.target.value;
    });

    mountBooking.querySelector('[data-step-prev]')?.addEventListener('click', () => {
      if (state.step > 1) {
        state.step -= 1;
        state.errors = {};
        render();
      }
    });

    mountBooking.querySelector('[data-step-next]')?.addEventListener('click', () => {
      if (!validateStep(state.step)) {
        render();
        return;
      }
      if (state.step < 4) {
        state.step += 1;
        render();
      }
    });

    mountBooking.querySelector('[data-submit-booking]')?.addEventListener('click', () => {
      if (!validateStep(4)) {
        render();
        const firstInvalid = mountBooking.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus();
        return;
      }
      const pkg = getSelectedPackage();
      const formula = getSelectedFormula();
      const zone = getSelectedZone();
      const slot = TIME_SLOTS.find((s) => s.id === state.timeSlotId) || TIME_SLOTS[0];
      const quote = computeEstimateSummary();
      const pinned = resolveMoodboardItems();

      const record = {
        ref: generateBookingRef(),
        createdAt: new Date().toISOString(),
        packageId: pkg.id,
        packageName: pkg.name,
        formulaId: formula.id,
        formulaName: formula.name,
        customSketch: state.customSketch,
        hiddenInitials: state.hiddenInitials.trim(),
        dateIso: state.dateIso,
        timeSlotId: slot.id,
        timeSlotLabel: `${slot.label} (${slot.sub})`,
        travelZoneId: zone.id,
        travelZoneLabel: zone.label,
        venue: state.venue.trim(),
        estimatedAmount: quote.amount,
        estimatedLabel: quote.label,
        durationMins: quote.durationMins,
        clientName: state.clientName.trim(),
        clientEmail: state.clientEmail.trim(),
        clientPhone: state.clientPhone.trim(),
        clientInstagram: state.clientInstagram.trim(),
        notes: (state.notes || state.coverageNotes).trim(),
        moodboardIds: pinned.map((p) => p.id),
        moodboardTitles: pinned.map((p) => p.title)
      };

      saveBookingRecord(record);
      state.confirmedRecord = record;
      state.dmNotice = '';
      render();
    });
  }

  function bindConfirmedEvents(record) {
    mountBooking.querySelector('[data-action-ics]')?.addEventListener('click', () => {
      const ics = buildIcsContent(record);
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-by-sadia-${record.ref.toLowerCase()}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    mountBooking.querySelector('[data-action-ig]')?.addEventListener('click', () => {
      const text = buildDossierPlainText(record);
      void copyTextSafe(text).then(() => {
        state.dmNotice = 'Brief copied! Opening @design.by.sadia... Paste directly into your Instagram message.';
        render();
      });
    });

    mountBooking.querySelector('[data-action-print]')?.addEventListener('click', () => {
      window.print();
    });

    mountBooking.querySelector('[data-action-new-inquiry]')?.addEventListener('click', () => {
      state.confirmedRecord = null;
      state.dmNotice = '';
      state.step = 1;
      render();
    });

    mountBooking.querySelector('[data-toggle-saved]')?.addEventListener('click', () => {
      state.showSavedDrawer = !state.showSavedDrawer;
      render();
    });

    mountBooking.querySelectorAll('[data-load-saved]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ref = btn.getAttribute('data-load-saved');
        const found = loadSavedBookings().find((b) => b.ref === ref);
        if (found) {
          state.confirmedRecord = found;
          state.dmNotice = '';
          render();
        }
      });
    });
  }

  function applyPreset(preset = {}) {
    state.confirmedRecord = null;
    state.dmNotice = '';

    if (preset.packageId) {
      const match =
        packages.find((p) => p.id === preset.packageId) ||
        packages.find((p) => p.id.includes(preset.packageId) || p.category === preset.packageId);
      if (match) state.packageId = match.id;
    } else if (preset.mode === 'party') {
      const partyPkg = packages.find((p) => p.category === 'party' || p.id.includes('party'));
      if (partyPkg) state.packageId = partyPkg.id;
    }

    if (preset.formulaId) {
      const fMatch = formulas.find((f) => f.id === preset.formulaId);
      if (fMatch) state.formulaId = fMatch.id;
    }
    if (typeof preset.customSketch === 'boolean') {
      state.customSketch = preset.customSketch;
    }
    if (preset.travelZoneId) {
      const zMatch = travelZones.find((z) => z.id === preset.travelZoneId);
      if (zMatch) state.travelZoneId = zMatch.id;
    }
    if (preset.estimatedTotal) {
      state.estimatedTotal = Number(preset.estimatedTotal);
    }
    if (preset.notes) {
      state.coverageNotes = preset.notes;
    }

    const pkg = getSelectedPackage();
    if (preset.customSketch) {
      state.step = 2;
      state.presetBanner = 'Custom iPad concept sketch option selected. Add optional hidden initials or continue to pick your date.';
    } else if (preset.estimatedTotal) {
      state.step = 3;
      state.presetBanner = `Configured quote ($${preset.estimatedTotal} estimate) applied for ${pkg.name}. Select your date and DMV location below.`;
    } else {
      state.step = 2;
      state.presetBanner = `${pkg.name} selected. Choose your cone formula and custom preferences below.`;
    }
    render();
  }

  activeBookingApi = { applyPreset };

  document.addEventListener('sadia:moodboard-change', () => {
    const liveContainer = mountBooking.querySelector('[data-moodboard-live-container]');
    if (liveContainer) {
      liveContainer.innerHTML = renderMoodboardBlock();
    }
  });

  render();
}

export function openBookingWithPreset(preset = {}) {
  if (activeBookingApi && typeof activeBookingApi.applyPreset === 'function') {
    activeBookingApi.applyPreset(preset);
  }
  const bookSection = document.getElementById('book');
  if (bookSection) {
    bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
