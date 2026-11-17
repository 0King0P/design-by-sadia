// Single-spread Private Reservation Desk and Atelier Dossier fulfillment for Design by Sadia (v2).

const BOOKING_STYLES_ID = 'dbs-booking-module-styles';
const STORAGE_BOOKINGS_KEY = 'sadia_bookings_v1';
const MOODBOARD_STORAGE_KEY = 'sadia_moodboard_v1';

const DEFAULT_PACKAGES = [
  {
    id: 'royal-bridal',
    category: 'bridal',
    name: 'Royal Bridal Palms & Forearms',
    subtitle: 'Signature Couture Mehndi',
    startingPrice: 280,
    priceUnit: 'starting',
    durationMins: 240,
    coverageLevel: 'Both hands (palms + backs) to mid-forearm'
  },
  {
    id: 'intimate-nikah',
    category: 'bridal',
    name: 'Intimate Nikah & Engagement',
    subtitle: 'Modern Minimalist Bridal',
    startingPrice: 165,
    priceUnit: 'starting',
    durationMins: 135,
    coverageLevel: 'Both hands (palms or backs) past the wrist'
  },
  {
    id: 'custom-sketch-session',
    category: 'private',
    name: 'Bespoke Concept-to-Stain Private Session',
    subtitle: 'iPad Sketch + Freehand Application',
    startingPrice: 120,
    priceUnit: 'starting',
    durationMins: 90,
    coverageLevel: 'Full hand + wrist cuff from custom digital proof'
  },
  {
    id: 'festive-duo-hands',
    category: 'private',
    name: 'Festive Eid & Sangeet Guest',
    subtitle: 'Private Single or Dual-Hand Appointment',
    startingPrice: 65,
    priceUnit: 'starting',
    durationMins: 50,
    coverageLevel: 'Half-hand to wrist floral garland or mandala'
  },
  {
    id: 'party-hourly',
    category: 'party',
    name: 'Mehndi Night & Birthday Party Artist',
    subtitle: 'Hourly Guest Speed-Artistry (2 Hr Minimum)',
    startingPrice: 115,
    priceUnit: 'per hour',
    durationMins: 120,
    coverageLevel: '12 to 15 guests per hour'
  },
  {
    id: 'corporate-cultural-events',
    category: 'events',
    name: 'Corporate, University & Pop-Up Events',
    subtitle: 'DMV Cultural Showcase & Campus Programming',
    startingPrice: 320,
    priceUnit: '3-hour block',
    durationMins: 180,
    coverageLevel: '35 to 45 guests across 3 hours'
  }
];

const DEFAULT_FORMULAS = [
  { id: 'organic', name: '100% Organic Hand-Rolled Henna' },
  { id: 'jagua', name: 'Pure Botanical Jagua Gel' },
  { id: 'red', name: 'Ceremonial Crimson Henna' },
  { id: 'black', name: 'Midnight Black Henna' }
];

const FORMULA_SHORT_LABELS = {
  organic: 'Organic Henna',
  jagua: 'Botanical Jagua',
  red: 'Ceremonial Crimson',
  black: 'Midnight Black'
};

const DEFAULT_TRAVEL_ZONES = [
  { id: 'loudoun-local', label: 'Sterling / Ashburn / Herndon', areas: 'Sterling, Ashburn, Herndon, Dulles', fee: 0, minBooking: 65 },
  { id: 'reston-leesburg', label: 'Reston / Leesburg / Chantilly', areas: 'Reston, Leesburg, Lansdowne, Chantilly', fee: 20, minBooking: 95 },
  { id: 'fairfax-tysons', label: 'Tysons / Fairfax / Vienna', areas: 'Tysons, Vienna, Fairfax, McLean', fee: 35, minBooking: 120 },
  { id: 'arlington-dc', label: 'Arlington / Alexandria / DC', areas: 'Arlington, Alexandria, Georgetown, NW DC', fee: 50, minBooking: 165 },
  { id: 'maryland-metro', label: 'Maryland Metro (Bethesda / Silver Spring)', areas: 'Bethesda, Potomac, Rockville, Silver Spring', fee: 65, minBooking: 220 }
];

const TIME_WINDOWS = [
  { id: '10:00', label: 'Morning 10:00 AM', hour24: 10, minute: 0 },
  { id: '13:30', label: 'Afternoon 1:30 PM', hour24: 13, minute: 30 },
  { id: '16:30', label: 'Late Afternoon 4:30 PM', hour24: 16, minute: 30 },
  { id: '19:00', label: 'Evening Mehndi 7:00 PM', hour24: 19, minute: 0 }
];

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

let activeBookingApi = null;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toIsoDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatReadableDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return 'Pending date';
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDuration(mins) {
  const safe = Math.max(30, Math.round(Number(mins) || 60));
  const hrs = Math.floor(safe / 60);
  const rem = safe % 60;
  if (hrs === 0) return `${rem} mins`;
  if (rem === 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${hrs} hr${hrs > 1 ? 's' : ''} ${rem} mins`;
}

function formatPackageOptionLabel(pkg) {
  if (pkg.priceUnit === 'per hour') return `${pkg.name} ($${pkg.startingPrice} / hr)`;
  if (pkg.priceUnit === '3-hour block') return `${pkg.name} ($${pkg.startingPrice} / 3 hrs)`;
  return `${pkg.name} (from $${pkg.startingPrice})`;
}

function generateBookingRef() {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DBS-${year}-${suffix}`;
}

function loadSavedBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBookingRecord(record) {
  try {
    const existing = loadSavedBookings().filter((b) => b.ref !== record.ref);
    existing.unshift(record);
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(existing.slice(0, 12)));
  } catch {
    // Ignore storage restriction errors.
  }
}

async function copyTextSafe(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below.
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
  } catch {
    return false;
  }
}

function formatIcsUtc(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeIcsText(val) {
  return String(val || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function buildIcsContent(record) {
  const [y, m, d] = record.dateIso.split('-').map(Number);
  const startLocal = new Date(y, m - 1, d, record.hour24 || 13, record.minute || 0, 0);
  const endLocal = new Date(startLocal.getTime() + (record.durationMins || 90) * 60000);
  const dtStamp = formatIcsUtc(new Date());

  const summary = `Design by Sadia | ${record.packageName}`;
  const descLines = [
    `Reference: ${record.ref}`,
    `Commission: ${record.packageName}`,
    `Paste Formula: ${record.formulaName}`,
    `Estimated Investment: $${record.estimatedAmount} (50% Retainer: $${Math.round(record.estimatedAmount * 0.5)})`,
    record.hiddenInitials ? `Hidden Initials / Motif: ${record.hiddenInitials}` : '',
    record.moodboardTitles?.length ? `Archive References: ${record.moodboardTitles.join(', ')}` : '',
    `IG Concierge: @design.by.sadia`
  ]
    .filter(Boolean)
    .join('\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Design by Sadia//Atelier Reservation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${record.ref.toLowerCase()}@designbysadia.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${formatIcsUtc(startLocal)}`,
    `DTEND:${formatIcsUtc(endLocal)}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `LOCATION:${escapeIcsText(record.venue || record.travelZoneLabel || 'Sterling, VA Studio')}`,
    `DESCRIPTION:${escapeIcsText(descLines)}`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

function buildDossierPlainText(record) {
  const lines = [
    `DESIGN BY SADIA | ATELIER RESERVATION DOSSIER`,
    `Reference: ${record.ref}`,
    `Client: ${record.clientName}`,
    `Email: ${record.clientEmail}`,
    `Phone: ${record.clientPhone}`,
    `Date: ${formatReadableDate(record.dateIso)}`,
    `Time Window: ${record.timeSlotLabel}`,
    `Travel Zone: ${record.travelZoneLabel}`,
    `Venue / Neighborhood: ${record.venue || 'Sterling Studio / To Be Confirmed'}`,
    `Commission Type: ${record.packageName}`,
    `Paste Formula: ${record.formulaName}`,
    record.hiddenInitials ? `Hidden Initials / Motif Note: ${record.hiddenInitials}` : '',
    `Estimated Investment: $${record.estimatedAmount} (50% Retainer: $${Math.round(record.estimatedAmount * 0.5)})`,
    record.moodboardTitles?.length ? `Saved Archive References: ${record.moodboardTitles.join(' | ')}` : ''
  ];
  return lines.filter(Boolean).join('\n');
}

function injectBookingStyles() {
  if (document.getElementById(BOOKING_STYLES_ID)) return;
  const style = document.createElement('style');
  style.id = BOOKING_STYLES_ID;
  style.textContent = `
    .dbs-desk-shell {
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      border-radius: 2px;
      background: var(--plane-1-surface, #191512);
    }
    .dbs-desk-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0.9rem 1.75rem;
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
      background: color-mix(in oklch, var(--accent-henna, #c9a96e) 8%, transparent);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.85rem;
      color: var(--text-primary, #f4ece0);
    }
    .dbs-desk-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .dbs-desk-col {
      padding: clamp(1.5rem, 3vw, 2.5rem);
      display: grid;
      gap: 1.45rem;
      align-content: start;
      min-width: 0;
    }
    .dbs-desk-col--left {
      border-right: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
    }
    @media (max-width: 920px) {
      .dbs-desk-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      .dbs-desk-col--left {
        border-right: 0;
        border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
      }
    }

    .dbs-desk-kicker {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--accent-henna, #c9a96e);
    }
    .dbs-desk-heading {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 1.68rem;
      font-weight: 500;
      font-variant-numeric: lining-nums proportional-nums;
      line-height: 1.12;
      color: var(--text-primary, #f4ece0);
      margin: 0.25rem 0 0;
    }
    .dbs-desk-label {
      display: block;
      margin-bottom: 0.45rem;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.69rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted, #8e8171);
    }
    .dbs-desk-input,
    .dbs-desk-select {
      width: 100%;
      min-height: 44px;
      padding: 0.68rem 0.85rem;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      background: var(--plane-0-void, #120f0d);
      color: var(--text-primary, #f4ece0);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.9rem;
      transition: border-color 160ms ease;
    }
    .dbs-desk-input::placeholder {
      color: var(--text-muted, #8e8171);
      opacity: 0.75;
    }
    .dbs-desk-input:focus,
    .dbs-desk-select:focus {
      outline: none;
      border-color: var(--accent-henna, #c9a96e);
    }
    .dbs-desk-input[aria-invalid="true"] {
      border-color: var(--color-destructive, #d96b5b);
    }
    .dbs-desk-error {
      margin-top: 0.32rem;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.78rem;
      color: var(--color-destructive, #e07c6d);
    }

    /* Architectural Monthly Calendar */
    .dbs-cal-box {
      border: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
      border-radius: 2px;
      padding: 1.05rem;
      background: var(--plane-0-void, #120f0d);
    }
    .dbs-cal-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.85rem;
      padding-bottom: 0.65rem;
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.08));
    }
    .dbs-cal-month {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 1.28rem;
      font-weight: 500;
      color: var(--text-primary, #f4ece0);
    }
    .dbs-cal-nav {
      width: 32px;
      height: 32px;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      background: transparent;
      color: var(--text-primary, #f4ece0);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .dbs-cal-nav:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .dbs-cal-grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 4px;
    }
    .dbs-cal-weekday {
      text-align: center;
      padding: 0.25rem 0;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.66rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted, #8e8171);
    }
    .dbs-cal-day {
      min-height: 38px;
      border-radius: 2px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-primary, #f4ece0);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.82rem;
      font-variant-numeric: tabular-nums lining-nums;
      cursor: pointer;
      transition: border-color 150ms ease, background-color 150ms ease;
    }
    .dbs-cal-day:hover:not(:disabled) {
      border-color: var(--border-strong, rgba(244, 236, 224, 0.28));
    }
    .dbs-cal-day[aria-pressed="true"] {
      border-color: var(--accent-henna, #c9a96e);
      background: var(--accent-henna-soft, rgba(201, 169, 110, 0.14));
      color: var(--accent-henna, #c9a96e);
      font-weight: 600;
    }
    .dbs-cal-day:disabled {
      opacity: 0.24;
      cursor: not-allowed;
    }

    /* Time Windows & Formula Square Toggles */
    .dbs-slot-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem;
    }
    @media (max-width: 480px) {
      .dbs-slot-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .dbs-slot-btn {
      padding: 0.68rem 0.8rem;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.14));
      background: var(--plane-0-void, #120f0d);
      color: var(--text-secondary, #b8ab9a);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.82rem;
      font-variant-numeric: tabular-nums lining-nums;
      text-align: left;
      cursor: pointer;
      transition: border-color 150ms ease, background-color 150ms ease, color 150ms ease;
    }
    .dbs-slot-btn[aria-pressed="true"] {
      border-color: var(--accent-henna, #c9a96e);
      background: var(--accent-henna-soft, rgba(201, 169, 110, 0.13));
      color: var(--text-primary, #f4ece0);
    }

    /* Saved Archive References Strip */
    .dbs-archive-strip {
      border-top: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
      padding: 0.85rem 0;
      display: grid;
      gap: 0.55rem;
    }
    .dbs-archive-thumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }
    .dbs-archive-thumb {
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.18));
      overflow: hidden;
      background: var(--plane-0-void, #120f0d);
    }
    .dbs-archive-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .dbs-archive-remove {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 18px;
      height: 18px;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.25));
      background: rgba(14, 11, 9, 0.86);
      color: var(--text-primary, #f4ece0);
      font-size: 0.72rem;
      line-height: 1;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
    }

    .dbs-contact-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }
    @media (max-width: 560px) {
      .dbs-contact-row {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .dbs-desk-summary {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.85rem 0;
      border-top: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
    }
    .dbs-desk-price {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 2rem;
      font-weight: 500;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--text-primary, #f4ece0);
    }

    .dbs-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      min-height: 46px;
      padding: 0.85rem 1.65rem;
      border-radius: 2px;
      border: 1px solid var(--accent-henna, #c9a96e);
      background: var(--accent-henna, #c9a96e);
      color: var(--accent-ink, #14100d);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 160ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .dbs-btn-primary:hover {
      background: var(--accent-henna-hover, #d8ba82);
    }
    .dbs-btn-primary:active {
      transform: scale(0.985);
    }
    .dbs-btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 44px;
      padding: 0.78rem 1.25rem;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.18));
      background: transparent;
      color: var(--text-primary, #f4ece0);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: border-color 160ms ease, background-color 160ms ease;
    }
    .dbs-btn-ghost:hover {
      border-color: var(--accent-henna, #c9a96e);
      background: color-mix(in oklch, var(--accent-henna, #c9a96e) 8%, transparent);
    }

    /* Reservation Dossier */
    .dbs-dossier {
      padding: clamp(1.75rem, 3.5vw, 3rem);
      display: grid;
      gap: 1.75rem;
    }
    .dbs-dossier-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.12));
    }
    .dbs-dossier-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 2.5rem;
      border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
    }
    @media (max-width: 720px) {
      .dbs-dossier-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .dbs-dossier-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 1rem;
      padding: 0.85rem 0;
      border-top: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.09));
    }
    .dbs-dossier-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  `;
  document.head.appendChild(style);
}

export function initBookingEngine({ mountBooking, studioData = {}, getMoodboardIds } = {}) {
  if (!mountBooking) return;
  injectBookingStyles();

  const packages = Array.isArray(studioData.SERVICE_PACKAGES) && studioData.SERVICE_PACKAGES.length
    ? studioData.SERVICE_PACKAGES
    : DEFAULT_PACKAGES;
  const formulas = Array.isArray(studioData.CONE_FORMULAS) && studioData.CONE_FORMULAS.length
    ? studioData.CONE_FORMULAS
    : DEFAULT_FORMULAS;
  const travelZones = Array.isArray(studioData.TRAVEL_ZONES) && studioData.TRAVEL_ZONES.length
    ? studioData.TRAVEL_ZONES
    : DEFAULT_TRAVEL_ZONES;
  const portfolioItems = Array.isArray(studioData.PORTFOLIO_ITEMS) ? studioData.PORTFOLIO_ITEMS : [];
  const brandProfile = studioData.BRAND_PROFILE || {};
  const igDmUrl = brandProfile.igDmUrl || 'https://ig.me/m/design.by.sadia';
  const studioEmail = brandProfile.email || 'bookings@designbysadia.com';

  const now = new Date();
  const todayIso = toIsoDate(now);
  const defaultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
  const baseMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);

  const state = {
    monthOffset: 0,
    dateIso: toIsoDate(defaultDate),
    timeSlotId: TIME_WINDOWS[1].id,
    travelZoneId: travelZones[0].id,
    venue: '',
    packageId: packages[0].id,
    formulaId: formulas[0].id,
    hiddenInitials: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    estimatedTotal: null,
    durationMins: null,
    presetBanner: '',
    errors: {},
    confirmedRecord: null,
    dmNotice: ''
  };

  function getSelectedPackage() {
    return packages.find((p) => p.id === state.packageId) || packages[0];
  }

  function getSelectedFormula() {
    return formulas.find((f) => f.id === state.formulaId) || formulas[0];
  }

  function getSelectedZone() {
    return travelZones.find((z) => z.id === state.travelZoneId) || travelZones[0];
  }

  function resolveMoodboardItems() {
    let ids = [];
    if (typeof getMoodboardIds === 'function') {
      ids = getMoodboardIds();
    } else {
      try {
        const raw = localStorage.getItem(MOODBOARD_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        ids = Array.isArray(parsed) ? parsed : [];
      } catch {
        ids = [];
      }
    }
    return ids
      .map((id) => portfolioItems.find((item) => item.id === id))
      .filter(Boolean);
  }

  function removeMoodboardRef(id) {
    const current = resolveMoodboardItems().map((item) => item.id).filter((itemId) => itemId !== id);
    try {
      localStorage.setItem(MOODBOARD_STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Ignore storage failures.
    }
    document.dispatchEvent(new CustomEvent('sadia:moodboard-change', { detail: { ids: current } }));
    render();
  }

  function computeSummary() {
    const pkg = getSelectedPackage();
    const zone = getSelectedZone();
    const base = state.estimatedTotal !== null
      ? Number(state.estimatedTotal)
      : (Number(pkg.startingPrice) || 120) + (state.formulaId === 'jagua' ? 15 : 0) + (Number(zone.fee) || 0);
    const durationMins = state.durationMins !== null ? Number(state.durationMins) : Number(pkg.durationMins) || 90;
    return {
      amount: Math.max(0, Math.round(base)),
      retainer: Math.round(base * 0.5),
      durationMins
    };
  }

  function renderArchiveStripHtml() {
    const pinned = resolveMoodboardItems();
    if (!pinned.length) return '';
    return `
      <div class="dbs-archive-strip" data-archive-strip>
        <div class="dbs-desk-label" style="margin: 0;">Saved Archive References (${pinned.length})</div>
        <div class="dbs-archive-thumbs">
          ${pinned
            .map(
              (item) => `
                <div class="dbs-archive-thumb" title="${escapeHtml(item.title)}">
                  <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" width="56" height="56" loading="eager">
                  <button
                    type="button"
                    class="dbs-archive-remove"
                    data-remove-archive-ref="${escapeHtml(item.id)}"
                    aria-label="Remove ${escapeHtml(item.title)} from reservation references"
                  >&times;</button>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  function renderCalendarHtml() {
    const viewDate = new Date(baseMonthDate.getFullYear(), baseMonthDate.getMonth() + state.monthOffset, 1);
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstWeekday = viewDate.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push('<div></div>');
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPast = iso < todayIso;
      const isSelected = iso === state.dateIso;
      cells.push(`
        <button
          type="button"
          class="dbs-cal-day"
          data-cal-date="${iso}"
          aria-label="${escapeHtml(MONTH_SHORT[month])} ${day}, ${year}"
          aria-pressed="${isSelected ? 'true' : 'false'}"
          ${isPast ? 'disabled' : ''}
        >${day}</button>
      `);
    }

    return `
      <div class="dbs-cal-box">
        <div class="dbs-cal-head">
          <button type="button" class="dbs-cal-nav" data-cal-prev aria-label="Previous month" ${state.monthOffset <= 0 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span class="dbs-cal-month">${escapeHtml(MONTH_FULL[month])} ${year}</span>
          <button type="button" class="dbs-cal-nav" data-cal-next aria-label="Next month" ${state.monthOffset >= 6 ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="dbs-cal-grid" role="group" aria-label="Select preferred session date">
          ${WEEKDAYS.map((w) => `<span class="dbs-cal-weekday">${w}</span>`).join('')}
          ${cells.join('')}
        </div>
      </div>
    `;
  }

  function validateForm() {
    const errors = {};
    if (!state.dateIso || state.dateIso < todayIso) {
      errors.dateIso = 'Select an upcoming date from the calendar.';
    }
    if (!state.clientName.trim()) {
      errors.clientName = 'Enter your full name.';
    }
    const email = state.clientEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.clientEmail = 'Enter a valid email address for your dossier.';
    }
    if (!state.clientPhone.trim() || state.clientPhone.replace(/\D/g, '').length < 7) {
      errors.clientPhone = 'Enter a reachable phone number.';
    }
    state.errors = errors;
    return Object.keys(errors).length === 0;
  }

  function renderConfirmedDossier(record) {
    const emailSubject = encodeURIComponent(`Reservation Inquiry ${record.ref} | ${record.packageName}`);
    const emailBody = encodeURIComponent(buildDossierPlainText(record));
    const mailtoHref = `mailto:${studioEmail}?subject=${emailSubject}&body=${emailBody}`;

    mountBooking.innerHTML = `
      <div class="dbs-desk-shell">
        <div class="dbs-dossier">
          <div class="dbs-dossier-head">
            <div>
              <span class="dbs-desk-kicker">Atelier Reservation Dossier</span>
              <h3 class="dbs-desk-heading" style="font-size: clamp(1.9rem, 3vw, 2.5rem);">${escapeHtml(record.ref)}</h3>
            </div>
            <div style="text-align: right;">
              <div class="dbs-desk-label" style="margin-bottom: 0.15rem;">Estimated Investment</div>
              <div class="dbs-desk-price">$${record.estimatedAmount}</div>
            </div>
          </div>

          <div class="dbs-dossier-grid">
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Client</span>
              <span>${escapeHtml(record.clientName)}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Preferred Date</span>
              <span style="font-variant-numeric: tabular-nums lining-nums;">${escapeHtml(formatReadableDate(record.dateIso))}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Time Window</span>
              <span>${escapeHtml(record.timeSlotLabel)}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Location &amp; Zone</span>
              <span>${escapeHtml(record.venue ? `${record.venue} (${record.travelZoneLabel})` : record.travelZoneLabel)}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Commission Type</span>
              <span>${escapeHtml(record.packageName)}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Paste Formula</span>
              <span>${escapeHtml(record.formulaName)}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">50% Retainer to Lock</span>
              <span style="font-variant-numeric: tabular-nums lining-nums;">$${Math.round(record.estimatedAmount * 0.5)}</span>
            </div>
            <div class="dbs-dossier-row">
              <span class="dbs-desk-label" style="margin: 0;">Estimated Duration</span>
              <span>${escapeHtml(formatDuration(record.durationMins))}</span>
            </div>
          </div>

          ${
            record.hiddenInitials
              ? `<div style="font-size: 0.9rem; color: var(--text-secondary);">Hidden Motif Note: <strong style="color: var(--text-primary); font-weight: 500;">${escapeHtml(record.hiddenInitials)}</strong></div>`
              : ''
          }

          ${
            record.moodboardTitles?.length
              ? `<div style="font-size: 0.88rem; color: var(--text-secondary);">Archive References Attached: <span style="color: var(--text-primary);">${escapeHtml(record.moodboardTitles.join(', '))}</span></div>`
              : ''
          }

          ${
            state.dmNotice
              ? `<div role="status" style="padding: 0.85rem 1rem; border: 1px solid var(--accent-henna, #c9a96e); border-radius: 2px; background: var(--accent-henna-soft, rgba(201, 169, 110, 0.12)); font-size: 0.88rem; color: var(--text-primary);">
                  ${escapeHtml(state.dmNotice)}
                </div>`
              : ''
          }

          <div class="dbs-dossier-actions">
            <a
              href="${escapeHtml(igDmUrl)}"
              target="_blank"
              rel="noopener noreferrer"
              class="dbs-btn-primary"
              data-action-ig
            >Send Dossier via Instagram DM</a>
            <button type="button" class="dbs-btn-ghost" data-action-ics>Download .ICS Hold</button>
            <a href="${escapeHtml(mailtoHref)}" class="dbs-btn-ghost">Compose Studio Email</a>
            <button type="button" class="dbs-btn-ghost" data-action-print>Print Dossier</button>
            <button type="button" class="dbs-btn-ghost" data-action-new-inquiry>Edit Details</button>
          </div>
        </div>
      </div>
    `;

    mountBooking.querySelector('[data-action-ig]')?.addEventListener('click', () => {
      const text = buildDossierPlainText(record);
      void copyTextSafe(text).then(() => {
        state.dmNotice = 'Dossier copied to clipboard. Paste directly into your @design.by.sadia Instagram message.';
        render();
      });
    });

    mountBooking.querySelector('[data-action-ics]')?.addEventListener('click', () => {
      const ics = buildIcsContent(record);
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `design-by-sadia-${record.ref.toLowerCase()}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    mountBooking.querySelector('[data-action-print]')?.addEventListener('click', () => {
      window.print();
    });

    mountBooking.querySelector('[data-action-new-inquiry]')?.addEventListener('click', () => {
      state.confirmedRecord = null;
      state.dmNotice = '';
      render();
    });
  }

  function render() {
    if (state.confirmedRecord) {
      renderConfirmedDossier(state.confirmedRecord);
      return;
    }

    const pkg = getSelectedPackage();
    const summary = computeSummary();

    mountBooking.innerHTML = `
      <div class="dbs-desk-shell">
        ${
          state.presetBanner
            ? `<div class="dbs-desk-banner" role="status">
                <span>${escapeHtml(state.presetBanner)}</span>
                <button type="button" class="dbs-btn-ghost" style="min-height: 30px; padding: 0.25rem 0.7rem; font-size: 0.68rem;" data-dismiss-banner>Clear</button>
              </div>`
            : ''
        }

        <div class="dbs-desk-grid">
          <div class="dbs-desk-col dbs-desk-col--left">
            <div>
              <span class="dbs-desk-kicker">01 / Select Date, Time &amp; Location</span>
              <h3 class="dbs-desk-heading">Preferred Studio Date</h3>
            </div>

            <div>
              ${renderCalendarHtml()}
              ${state.errors.dateIso ? `<div class="dbs-desk-error">${escapeHtml(state.errors.dateIso)}</div>` : ''}
            </div>

            <div>
              <span class="dbs-desk-label">Preferred Time Window</span>
              <div class="dbs-slot-grid" role="group" aria-label="Preferred time window">
                ${TIME_WINDOWS.map((slot) => {
                  const pressed = slot.id === state.timeSlotId;
                  return `
                    <button
                      type="button"
                      class="dbs-slot-btn"
                      data-book-slot="${escapeHtml(slot.id)}"
                      aria-pressed="${pressed ? 'true' : 'false'}"
                    >${escapeHtml(slot.label)}</button>
                  `;
                }).join('')}
              </div>
            </div>

            <div>
              <label for="dbs-book-zone" class="dbs-desk-label">Northern Virginia / DMV Area</label>
              <select id="dbs-book-zone" class="dbs-desk-select">
                ${travelZones
                  .map((z) => {
                    const feeNote = z.fee === 0 ? 'Sterling Studio / $0 Travel' : `+$${z.fee} Travel`;
                    return `<option value="${escapeHtml(z.id)}" ${z.id === state.travelZoneId ? 'selected' : ''}>${escapeHtml(z.label)} (${feeNote})</option>`;
                  })
                  .join('')}
              </select>
            </div>

            <div>
              <label for="dbs-venue" class="dbs-desk-label">Venue or Neighborhood</label>
              <input
                id="dbs-venue"
                type="text"
                class="dbs-desk-input"
                value="${escapeHtml(state.venue)}"
                placeholder="e.g., Sterling Studio, Stone Tower Winery, Private Home in Ashburn"
              >
            </div>
          </div>

          <div class="dbs-desk-col">
            <div>
              <span class="dbs-desk-kicker">02 / Commission Details &amp; Client Contact</span>
              <h3 class="dbs-desk-heading">Private Dossier Brief</h3>
            </div>

            <div>
              <label for="dbs-commission-type" class="dbs-desk-label">Commission Type</label>
              <select id="dbs-commission-type" class="dbs-desk-select">
                ${packages
                  .map(
                    (p) => `<option value="${escapeHtml(p.id)}" ${p.id === state.packageId ? 'selected' : ''}>${escapeHtml(formatPackageOptionLabel(p))}</option>`
                  )
                  .join('')}
              </select>
            </div>

            <div>
              <span class="dbs-desk-label">Paste Formula</span>
              <div class="dbs-slot-grid" role="group" aria-label="Paste formula">
                ${formulas
                  .map((f) => {
                    const label = FORMULA_SHORT_LABELS[f.id] || f.name;
                    const pressed = f.id === state.formulaId;
                    return `
                      <button
                        type="button"
                        class="dbs-slot-btn"
                        data-book-formula="${escapeHtml(f.id)}"
                        aria-pressed="${pressed ? 'true' : 'false'}"
                      >${escapeHtml(label)}</button>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <div>
              <label for="dbs-hidden-initials" class="dbs-desk-label">Hidden Bridal Initials or Motif Note (Optional)</label>
              <input
                id="dbs-hidden-initials"
                type="text"
                class="dbs-desk-input"
                value="${escapeHtml(state.hiddenInitials)}"
                placeholder='e.g., weave "S & R" into right index vine'
              >
            </div>

            <div data-moodboard-live-container>
              ${renderArchiveStripHtml()}
            </div>

            <div>
              <label for="dbs-client-name" class="dbs-desk-label">Client Full Name</label>
              <input
                id="dbs-client-name"
                type="text"
                class="dbs-desk-input"
                value="${escapeHtml(state.clientName)}"
                placeholder="Amina Khan"
                aria-invalid="${state.errors.clientName ? 'true' : 'false'}"
              >
              ${state.errors.clientName ? `<div class="dbs-desk-error">${escapeHtml(state.errors.clientName)}</div>` : ''}
            </div>

            <div class="dbs-contact-row">
              <div>
                <label for="dbs-client-email" class="dbs-desk-label">Email Address</label>
                <input
                  id="dbs-client-email"
                  type="email"
                  class="dbs-desk-input"
                  value="${escapeHtml(state.clientEmail)}"
                  placeholder="amina@example.com"
                  aria-invalid="${state.errors.clientEmail ? 'true' : 'false'}"
                >
                ${state.errors.clientEmail ? `<div class="dbs-desk-error">${escapeHtml(state.errors.clientEmail)}</div>` : ''}
              </div>
              <div>
                <label for="dbs-client-phone" class="dbs-desk-label">Phone Number</label>
                <input
                  id="dbs-client-phone"
                  type="tel"
                  class="dbs-desk-input"
                  value="${escapeHtml(state.clientPhone)}"
                  placeholder="(703) 555-0194"
                  aria-invalid="${state.errors.clientPhone ? 'true' : 'false'}"
                >
                ${state.errors.clientPhone ? `<div class="dbs-desk-error">${escapeHtml(state.errors.clientPhone)}</div>` : ''}
              </div>
            </div>

            <div class="dbs-desk-summary">
              <div>
                <div class="dbs-desk-label" style="margin-bottom: 0.15rem;">${escapeHtml(pkg.name)}</div>
                <div style="font-size: 0.82rem; color: var(--text-secondary); font-variant-numeric: tabular-nums lining-nums;">
                  ${escapeHtml(formatReadableDate(state.dateIso))} &middot; 50% Retainer: $${summary.retainer}
                </div>
              </div>
              <div class="dbs-desk-price">$${summary.amount}</div>
            </div>

            <button type="button" class="dbs-btn-primary" style="width: 100%;" data-submit-booking>Reserve a Date</button>
          </div>
        </div>
      </div>
    `;

    mountBooking.querySelector('[data-dismiss-banner]')?.addEventListener('click', () => {
      state.presetBanner = '';
      render();
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
        state.dateIso = btn.getAttribute('data-cal-date') || state.dateIso;
        delete state.errors.dateIso;
        render();
      });
    });

    mountBooking.querySelectorAll('[data-book-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.timeSlotId = btn.getAttribute('data-book-slot') || TIME_WINDOWS[0].id;
        render();
      });
    });

    mountBooking.querySelector('#dbs-book-zone')?.addEventListener('change', (ev) => {
      state.travelZoneId = ev.target.value;
      state.estimatedTotal = null;
      render();
    });

    mountBooking.querySelector('#dbs-venue')?.addEventListener('input', (ev) => {
      state.venue = ev.target.value;
    });

    mountBooking.querySelector('#dbs-commission-type')?.addEventListener('change', (ev) => {
      state.packageId = ev.target.value;
      state.estimatedTotal = null;
      state.durationMins = null;
      render();
    });

    mountBooking.querySelectorAll('[data-book-formula]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.formulaId = btn.getAttribute('data-book-formula') || formulas[0].id;
        state.estimatedTotal = null;
        render();
      });
    });

    mountBooking.querySelector('#dbs-hidden-initials')?.addEventListener('input', (ev) => {
      state.hiddenInitials = ev.target.value;
    });

    mountBooking.querySelectorAll('[data-remove-archive-ref]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-archive-ref');
        if (id) removeMoodboardRef(id);
      });
    });

    mountBooking.querySelector('#dbs-client-name')?.addEventListener('input', (ev) => {
      state.clientName = ev.target.value;
      if (state.errors.clientName && ev.target.value.trim()) {
        delete state.errors.clientName;
      }
    });

    mountBooking.querySelector('#dbs-client-email')?.addEventListener('input', (ev) => {
      state.clientEmail = ev.target.value;
      if (state.errors.clientEmail && ev.target.value.trim()) {
        delete state.errors.clientEmail;
      }
    });

    mountBooking.querySelector('#dbs-client-phone')?.addEventListener('input', (ev) => {
      state.clientPhone = ev.target.value;
      if (state.errors.clientPhone && ev.target.value.trim()) {
        delete state.errors.clientPhone;
      }
    });

    mountBooking.querySelector('[data-submit-booking]')?.addEventListener('click', () => {
      if (!validateForm()) {
        render();
        const firstInvalid = mountBooking.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus();
        return;
      }

      const selectedPkg = getSelectedPackage();
      const selectedFormula = getSelectedFormula();
      const selectedZone = getSelectedZone();
      const slot = TIME_WINDOWS.find((s) => s.id === state.timeSlotId) || TIME_WINDOWS[0];
      const finalSummary = computeSummary();
      const pinned = resolveMoodboardItems();

      const record = {
        ref: generateBookingRef(),
        createdAt: new Date().toISOString(),
        packageId: selectedPkg.id,
        packageName: selectedPkg.name,
        formulaId: selectedFormula.id,
        formulaName: selectedFormula.name,
        hiddenInitials: state.hiddenInitials.trim(),
        dateIso: state.dateIso,
        timeSlotId: slot.id,
        timeSlotLabel: slot.label,
        hour24: slot.hour24,
        minute: slot.minute,
        travelZoneId: selectedZone.id,
        travelZoneLabel: selectedZone.label,
        venue: state.venue.trim(),
        estimatedAmount: finalSummary.amount,
        durationMins: finalSummary.durationMins,
        clientName: state.clientName.trim(),
        clientEmail: state.clientEmail.trim(),
        clientPhone: state.clientPhone.trim(),
        moodboardIds: pinned.map((p) => p.id),
        moodboardTitles: pinned.map((p) => p.title)
      };

      saveBookingRecord(record);
      state.confirmedRecord = record;
      state.dmNotice = '';
      render();
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
      const partyPkg = packages.find((p) => p.category === 'party');
      if (partyPkg) state.packageId = partyPkg.id;
    }

    if (preset.formulaId) {
      const fMatch = formulas.find((f) => f.id === preset.formulaId);
      if (fMatch) state.formulaId = fMatch.id;
    } else if (preset.medium) {
      const lower = String(preset.medium).toLowerCase();
      const fMatch = formulas.find((f) => lower.includes(f.id));
      if (fMatch) state.formulaId = fMatch.id;
    }

    if (preset.travelZoneId) {
      const zMatch = travelZones.find((z) => z.id === preset.travelZoneId);
      if (zMatch) state.travelZoneId = zMatch.id;
    }

    if (preset.estimatedTotal) {
      state.estimatedTotal = Number(preset.estimatedTotal);
    } else {
      state.estimatedTotal = null;
    }

    if (preset.durationMins) {
      state.durationMins = Number(preset.durationMins);
    } else {
      state.durationMins = null;
    }

    const selectedPkg = getSelectedPackage();
    if (preset.estimatedTotal) {
      state.presetBanner = `${selectedPkg.name} ($${preset.estimatedTotal} estimate) synced from Calculator.`;
    } else if (preset.customSketch) {
      state.presetBanner = `Custom iPad Blueprint session synced (${selectedPkg.name}).`;
    } else {
      state.presetBanner = `${selectedPkg.name} selected for your reservation brief.`;
    }

    render();
  }

  activeBookingApi = { applyPreset };

  document.addEventListener('sadia:moodboard-change', () => {
    const liveContainer = mountBooking.querySelector('[data-moodboard-live-container]');
    if (liveContainer) {
      liveContainer.innerHTML = renderArchiveStripHtml();
      mountBooking.querySelectorAll('[data-remove-archive-ref]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-remove-archive-ref');
          if (id) removeMoodboardRef(id);
        });
      });
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
