// Client Staging Sign-Off Drawer for Design by Sadia (v3), mounted strictly when ?review=1 is present.

const REVIEW_STYLES_ID = 'dbs-review-module-styles';
const STORAGE_REVIEW_KEY = 'sadia_client_review_v1';

const REVIEW_SECTIONS = [
  { id: 'hero-voice', label: 'Hero Editorial & Brand Voice' },
  { id: 'styles-archive', label: 'Four Traditions & Curated Client Archive' },
  { id: 'sketch-stain', label: 'Blueprint & 48-Hour Stain Oxidation Lab' },
  { id: 'rates-booking', label: 'Studio Rates & Private IG DM Dossier' },
  { id: 'notes-policies', label: 'Bride Testimonials, FAQ & Studio Terms' }
];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function injectReviewStyles() {
  if (document.getElementById(REVIEW_STYLES_ID)) return;
  const style = document.createElement('style');
  style.id = REVIEW_STYLES_ID;
  style.textContent = `
    .dbs-review-trigger {
      position: fixed;
      bottom: 1.25rem;
      left: 1.25rem;
      z-index: 60;
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.68rem 1.05rem;
      border-radius: 2px;
      background: var(--plane-1-surface, #191512);
      color: var(--text-primary, #f4ece0);
      border: 1px solid var(--accent-henna, #c9a96e);
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.52);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-variant-numeric: tabular-nums lining-nums;
      cursor: pointer;
      transition: border-color 160ms ease, background-color 160ms ease;
    }
    .dbs-review-trigger:hover {
      background: var(--plane-2-card, #211c17);
    }
    .dbs-review-dot {
      width: 7px;
      height: 7px;
      border-radius: 2px;
      background: var(--accent-henna, #c9a96e);
      flex-shrink: 0;
    }
    .dbs-review-dot--approved {
      background: var(--color-success, #7aa885);
    }
    .dbs-review-backdrop {
      position: fixed;
      inset: 0;
      z-index: 80;
      background: rgba(10, 8, 7, 0.78);
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: flex-start;
    }
    .dbs-review-drawer {
      width: min(440px, 100vw);
      height: 100dvh;
      overflow-y: auto;
      background: var(--plane-1-surface, #191512);
      color: var(--text-primary, #f4ece0);
      border-right: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      padding: 1.75rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow: 24px 0 64px rgba(0, 0, 0, 0.65);
    }
    .dbs-review-kicker {
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.84rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      text-transform: none;
      font-variant-numeric: tabular-nums lining-nums;
      color: var(--accent-henna, #c9a96e);
    }
    .dbs-review-title {
      font-family: var(--font-display, "Cormorant Garamond", Georgia, serif);
      font-size: 1.8rem;
      font-weight: 500;
      font-variant-numeric: lining-nums proportional-nums;
      line-height: 1.1;
      margin: 0.25rem 0 0;
      color: var(--text-primary, #f4ece0);
    }
    .dbs-review-check {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.82rem 0.9rem;
      border-radius: 2px;
      background: var(--plane-0-void, #120f0d);
      border: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));
      cursor: pointer;
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.88rem;
      color: var(--text-secondary, #b8ab9a);
      transition: border-color 160ms ease, color 160ms ease;
    }
    .dbs-review-check[data-checked="true"] {
      border-color: var(--accent-henna, #c9a96e);
      color: var(--text-primary, #f4ece0);
    }
    .dbs-review-textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 0.85rem 0.95rem;
      border-radius: 2px;
      background: var(--plane-0-void, #120f0d);
      color: var(--text-primary, #f4ece0);
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.16));
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.88rem;
      line-height: 1.55;
      resize: vertical;
    }
    .dbs-review-textarea:focus {
      outline: none;
      border-color: var(--accent-henna, #c9a96e);
    }
    .dbs-review-btn-primary {
      width: 100%;
      min-height: 44px;
      padding: 0.82rem 1.25rem;
      border-radius: 2px;
      border: 1px solid var(--accent-henna, #c9a96e);
      background: var(--accent-henna, #c9a96e);
      color: var(--accent-ink, #14100d);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.74rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .dbs-review-btn-ghost {
      width: 100%;
      min-height: 42px;
      padding: 0.75rem 1.15rem;
      border-radius: 2px;
      border: 1px solid var(--border-specular, rgba(244, 236, 224, 0.18));
      background: transparent;
      color: var(--text-primary, #f4ece0);
      font-family: var(--font-sans, "DM Sans", sans-serif);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .dbs-review-btn-ghost:hover {
      border-color: var(--accent-henna, #c9a96e);
    }
  `;
  document.head.appendChild(style);
}

function loadReviewState() {
  const base = {
    checked: {},
    notes: '',
    approvedForProduction: false,
    updatedAt: ''
  };
  try {
    const raw = localStorage.getItem(STORAGE_REVIEW_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    return {
      checked: parsed && typeof parsed.checked === 'object' && parsed.checked ? parsed.checked : {},
      notes: typeof parsed?.notes === 'string' ? parsed.notes : '',
      approvedForProduction: Boolean(parsed?.approvedForProduction),
      updatedAt: typeof parsed?.updatedAt === 'string' ? parsed.updatedAt : ''
    };
  } catch {
    return base;
  }
}

function persistReviewState(state) {
  try {
    localStorage.setItem(
      STORAGE_REVIEW_KEY,
      JSON.stringify({
        checked: state.checked,
        notes: state.notes,
        approvedForProduction: state.approvedForProduction,
        updatedAt: new Date().toISOString()
      })
    );
  } catch {
    // Ignore storage quota errors.
  }
}

async function copyClipboardSafe(text) {
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

function buildSignOffMarkdown(reviewState, artistName, studioUrl) {
  const checkedCount = REVIEW_SECTIONS.filter((s) => Boolean(reviewState.checked[s.id])).length;
  const lines = [
    `## Design by Sadia | Staging Review Sign-Off`,
    `- **Reviewer:** ${artistName}`,
    `- **Status:** ${reviewState.approvedForProduction ? 'APPROVED FOR PRODUCTION' : 'REVIEW IN PROGRESS'}`,
    `- **Checklist:** ${checkedCount} / ${REVIEW_SECTIONS.length} sections signed off`,
    `- **Preview URL:** ${studioUrl}`,
    `- **Timestamp:** ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`,
    ``,
    `### Section Checklist`,
    ...REVIEW_SECTIONS.map(
      (sec) => `- [${reviewState.checked[sec.id] ? 'x' : ' '}] ${sec.label}`
    ),
    ``,
    `### Revision & Price Adjustment Notes`,
    reviewState.notes.trim() ? reviewState.notes.trim() : 'No edits requested; pricing and copy look ready.'
  ];
  return lines.join('\n');
}

export function initClientReviewMode({ mountReview, studioData = {} } = {}) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('review') !== '1') return;
  if (!mountReview) return;

  injectReviewStyles();

  const artistName = studioData?.BRAND_PROFILE?.artistName || 'Sadia Shoyeb';
  const reviewState = loadReviewState();
  let isOpen = true;
  let statusBanner = '';

  function handleEscape(ev) {
    if (ev.key === 'Escape' && isOpen) {
      isOpen = false;
      render();
      mountReview.querySelector('[data-review-trigger]')?.focus();
    }
  }

  document.addEventListener('keydown', handleEscape);

  function render() {
    const completedCount = REVIEW_SECTIONS.filter((s) => Boolean(reviewState.checked[s.id])).length;
    const pct = Math.round((completedCount / REVIEW_SECTIONS.length) * 100);

    mountReview.innerHTML = `
      <button
        type="button"
        class="dbs-review-trigger"
        data-review-trigger
        aria-expanded="${isOpen ? 'true' : 'false'}"
        aria-controls="dbs-review-drawer"
      >
        <span class="dbs-review-dot ${reviewState.approvedForProduction ? 'dbs-review-dot--approved' : ''}"></span>
        <span>Staging Sign-Off</span>
        <span style="color: var(--accent-henna, #c9a96e);">${completedCount}/${REVIEW_SECTIONS.length}</span>
      </button>

      ${
        isOpen
          ? `
        <div class="dbs-review-backdrop" data-review-backdrop>
          <aside
            id="dbs-review-drawer"
            class="dbs-review-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Staging Sign-Off for ${escapeHtml(artistName)}"
          >
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle, rgba(244, 236, 224, 0.10));">
              <div>
                <div class="dbs-review-kicker">Pre-Production Sign-Off</div>
                <h2 class="dbs-review-title">Atelier Staging Review</h2>
              </div>
              <button
                type="button"
                class="dbs-review-btn-ghost"
                style="width: auto; min-height: 36px; padding: 0.4rem 0.85rem;"
                data-review-close
                aria-label="Close staging review drawer"
              >Close</button>
            </div>

            <p style="margin: 0; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Review each section on staging, add any copy or rate notes below, and copy your sign-off dossier for Wali.
            </p>

            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <span class="dbs-review-kicker" style="color: var(--text-secondary);">Sign-off progress</span>
                <span class="dbs-review-kicker">${completedCount} / ${REVIEW_SECTIONS.length} (${pct}%)</span>
              </div>
              <div style="height: 3px; background: var(--plane-0-void, #120f0d); overflow: hidden;">
                <div style="height: 100%; width: ${pct}%; background: var(--accent-henna, #c9a96e); transition: width 200ms ease;"></div>
              </div>
            </div>

            <div style="display: grid; gap: 0.5rem;" role="group" aria-label="Section sign-off checklist">
              ${REVIEW_SECTIONS.map((sec) => {
                const isChecked = Boolean(reviewState.checked[sec.id]);
                return `
                  <label class="dbs-review-check" data-checked="${isChecked}">
                    <input
                      type="checkbox"
                      data-review-item="${escapeHtml(sec.id)}"
                      ${isChecked ? 'checked' : ''}
                      style="width: 16px; height: 16px; accent-color: var(--accent-henna, #c9a96e); cursor: pointer; flex-shrink: 0;"
                    >
                    <span>${escapeHtml(sec.label)}</span>
                  </label>
                `;
              }).join('')}
            </div>

            <div style="display: grid; gap: 0.45rem;">
              <label for="dbs-review-notes" class="dbs-review-kicker" style="color: var(--text-secondary);">Revision &amp; Rate Notes</label>
              <textarea
                id="dbs-review-notes"
                class="dbs-review-textarea"
                rows="4"
                placeholder="Example: Adjust bridal starting rate to $300, update Sterling travel note, or approve as shown."
              >${escapeHtml(reviewState.notes)}</textarea>
              <div style="font-size: 0.78rem; color: var(--text-muted);">
                Saved automatically in this browser while previewing.
              </div>
            </div>

            ${
              statusBanner
                ? `<div role="status" style="padding: 0.8rem 0.95rem; border-radius: 2px; background: var(--accent-henna-soft, rgba(201, 169, 110, 0.12)); border: 1px solid var(--accent-henna, #c9a96e); font-size: 0.84rem; color: var(--text-primary);">
                    ${escapeHtml(statusBanner)}
                  </div>`
                : ''
            }

            <div style="display: grid; gap: 0.65rem; margin-top: auto; padding-top: 0.5rem;">
              <button type="button" class="dbs-review-btn-primary" data-review-approve>
                Approve Site for Production
              </button>
              <button type="button" class="dbs-review-btn-ghost" data-review-copy>
                Copy Review Notes for Wali
              </button>
            </div>
          </aside>
        </div>
      `
          : ''
      }
    `;

    mountReview.querySelector('[data-review-trigger]')?.addEventListener('click', () => {
      isOpen = !isOpen;
      statusBanner = '';
      render();
    });

    if (!isOpen) return;

    mountReview.querySelector('[data-review-close]')?.addEventListener('click', () => {
      isOpen = false;
      render();
    });

    mountReview.querySelector('[data-review-backdrop]')?.addEventListener('click', (ev) => {
      if (ev.target.hasAttribute('data-review-backdrop')) {
        isOpen = false;
        render();
      }
    });

    mountReview.querySelectorAll('[data-review-item]').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const id = checkbox.getAttribute('data-review-item');
        reviewState.checked[id] = Boolean(checkbox.checked);
        if (!checkbox.checked) {
          reviewState.approvedForProduction = false;
        }
        persistReviewState(reviewState);
        render();
      });
    });

    mountReview.querySelector('#dbs-review-notes')?.addEventListener('input', (ev) => {
      reviewState.notes = ev.target.value;
      persistReviewState(reviewState);
    });

    mountReview.querySelector('[data-review-approve]')?.addEventListener('click', async () => {
      REVIEW_SECTIONS.forEach((s) => {
        reviewState.checked[s.id] = true;
      });
      reviewState.approvedForProduction = true;
      persistReviewState(reviewState);
      const md = buildSignOffMarkdown(reviewState, artistName, window.location.href);
      const copied = await copyClipboardSafe(md);
      statusBanner = copied
        ? 'Approved for production. Sign-off packet copied to clipboard.'
        : 'Approved for production and saved locally.';
      render();
    });

    mountReview.querySelector('[data-review-copy]')?.addEventListener('click', async () => {
      persistReviewState(reviewState);
      const md = buildSignOffMarkdown(reviewState, artistName, window.location.href);
      const copied = await copyClipboardSafe(md);
      statusBanner = copied
        ? 'Review notes copied to clipboard for Wali.'
        : 'Review notes saved locally (clipboard blocked by browser).';
      render();
    });
  }

  render();
}
