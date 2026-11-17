// Floating Client Staging Review drawer for Sadia's pre-production sign-off.

const REVIEW_STYLES_ID = 'dbs-review-module-styles';
const STORAGE_REVIEW_KEY = 'sadia_client_review_v1';

const REVIEW_SECTIONS = [
  { id: 'hero-voice', label: 'Hero & Brand Voice' },
  { id: 'portfolio-15', label: '15 Real Portfolio Photos' },
  { id: 'sketch-stain', label: 'Sketch-to-Stain Slider' },
  { id: 'stain-lab', label: '4-Formula Stain Lab' },
  { id: 'nova-pricing', label: 'NoVA Pricing & Travel Zones' },
  { id: 'booking-ig', label: 'Booking & IG DM Flow' }
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
    .dbs-review-pill {
      position: fixed;
      bottom: 1.25rem;
      left: 1.25rem;
      z-index: 60;
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.65rem 1rem;
      border-radius: 999px;
      background: var(--plane-2-card, #16201c);
      color: var(--text-primary, #f4f0e8);
      border: 1px solid rgba(217, 138, 60, 0.48);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(10px);
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms ease;
    }
    .dbs-review-pill:active {
      transform: scale(0.97);
    }
    .dbs-review-pill:hover {
      border-color: var(--accent-henna, #d98a3c);
    }
    @media (max-width: 639px) {
      .dbs-review-pill {
        bottom: 0.75rem;
        left: 0.75rem;
        padding: 0.48rem 0.78rem;
        font-size: 0.74rem;
      }
    }
    .dbs-review-backdrop {
      position: fixed;
      inset: 0;
      z-index: 70;
      background: rgba(9, 13, 11, 0.72);
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: flex-start;
    }
    .dbs-review-drawer {
      width: min(440px, 100vw);
      height: 100dvh;
      overflow-y: auto;
      background: var(--plane-2-card, #16201c);
      color: var(--text-primary, #f4f0e8);
      border-right: 1px solid var(--border-specular, rgba(244, 240, 232, 0.14));
      padding: 1.5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      box-shadow: 20px 0 60px rgba(0, 0, 0, 0.55);
    }
    .dbs-review-check {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0.9rem;
      border-radius: 12px;
      background: var(--plane-1-surface, #101714);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.12));
      cursor: pointer;
      font-size: 0.9rem;
      transition: border-color 160ms ease, background-color 160ms ease;
    }
    .dbs-review-check[data-checked="true"] {
      border-color: rgba(217, 138, 60, 0.55);
      background: var(--plane-3-elevated, #1e2b26);
    }
    .dbs-review-textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 0.82rem 0.95rem;
      border-radius: 12px;
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.14));
      font-family: inherit;
      font-size: 0.9rem;
      line-height: 1.5;
      resize: vertical;
    }
    .dbs-review-textarea:focus {
      outline: none;
      border-color: var(--accent-henna, #d98a3c);
      box-shadow: 0 0 0 3px rgba(217, 138, 60, 0.18);
    }
    .dbs-review-btn-primary {
      width: 100%;
      padding: 0.85rem 1.2rem;
      border-radius: 999px;
      border: 1px solid transparent;
      background: var(--accent-henna, #d98a3c);
      color: var(--accent-ink, #140d06);
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), filter 150ms ease;
    }
    .dbs-review-btn-primary:active {
      transform: scale(0.97);
    }
    .dbs-review-btn-ghost {
      width: 100%;
      padding: 0.78rem 1.15rem;
      border-radius: 999px;
      border: 1px solid var(--border-specular, rgba(244, 240, 232, 0.16));
      background: var(--plane-1-surface, #101714);
      color: var(--text-primary, #f4f0e8);
      font-weight: 600;
      font-size: 0.86rem;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), border-color 150ms ease;
    }
    .dbs-review-btn-ghost:active {
      transform: scale(0.97);
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
  } catch (_) {
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
  } catch (_) {
    // Ignore storage quota errors cleanly.
  }
}

async function copyClipboardSafe(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
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
  } catch (_) {
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
  if (!mountReview) return;
  injectReviewStyles();

  const artistName = studioData?.BRAND_PROFILE?.artistName || 'Sadia Shoyeb';
  const reviewState = loadReviewState();

  const params = new URLSearchParams(window.location.search || '');
  let isOpen = params.get('review') === '1';
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
        class="dbs-review-pill"
        data-review-trigger
        aria-expanded="${isOpen ? 'true' : 'false'}"
        aria-controls="dbs-review-drawer"
      >
        <span style="width:9px;height:9px;border-radius:999px;background:${reviewState.approvedForProduction ? '#4ade80' : 'var(--accent-henna, #d98a3c)'};"></span>
        <span>Client Staging Review</span>
        <span style="font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums;font-size:0.74rem;color:var(--accent-henna);">${completedCount}/${REVIEW_SECTIONS.length}</span>
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
            aria-label="Client Staging Review for ${escapeHtml(artistName)}"
          >
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;">
              <div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;letter-spacing:0.08em;color:var(--accent-henna);">
                  PRE-PRODUCTION SIGN-OFF
                </div>
                <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.7rem;line-height:1.12;margin:0.2rem 0 0;">
                  Client Staging Review
                </h2>
              </div>
              <button
                type="button"
                class="dbs-review-btn-ghost"
                style="width:auto;padding:0.45rem 0.85rem;font-size:0.8rem;"
                data-review-close
                aria-label="Close staging review drawer"
              >
                Close
              </button>
            </div>

            <p style="margin:0;font-size:0.88rem;color:var(--text-secondary);line-height:1.5;">
              Review each section on staging, jot any price or text adjustments below, then copy your sign-off packet for Wali.
            </p>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:0.35rem;">
                <span style="color:var(--text-secondary);">Sign-off progress</span>
                <span style="font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums;color:var(--accent-henna);">${completedCount} / ${REVIEW_SECTIONS.length} (${pct}%)</span>
              </div>
              <div style="height:6px;border-radius:999px;background:var(--plane-1-surface);overflow:hidden;">
                <div style="height:100%;width:${pct}%;background:var(--accent-henna);transition:width 200ms ease;"></div>
              </div>
            </div>

            <div style="display:grid;gap:0.55rem;" role="group" aria-label="Section sign-off checklist">
              ${REVIEW_SECTIONS.map((sec) => {
                const isChecked = Boolean(reviewState.checked[sec.id]);
                return `
                  <label class="dbs-review-check" data-checked="${isChecked}">
                    <input
                      type="checkbox"
                      data-review-item="${escapeHtml(sec.id)}"
                      ${isChecked ? 'checked' : ''}
                      style="width:18px;height:18px;accent-color:var(--accent-henna);cursor:pointer;flex-shrink:0;"
                    />
                    <span>${escapeHtml(sec.label)}</span>
                  </label>
                `;
              }).join('')}
            </div>

            <div style="display:grid;gap:0.4rem;">
              <label for="dbs-review-notes" style="font-size:0.85rem;font-weight:600;color:var(--text-primary);">
                Revision or Price Adjustment Notes
              </label>
              <textarea
                id="dbs-review-notes"
                class="dbs-review-textarea"
                rows="4"
                placeholder="Example: Update bridal starting price to $300, swap photo #4 caption, or approve as shown."
              >${escapeHtml(reviewState.notes)}</textarea>
              <div style="font-size:0.76rem;color:var(--text-secondary);">
                Saved automatically in this browser while you preview.
              </div>
            </div>

            ${
              statusBanner
                ? `<div role="status" style="padding:0.75rem 0.95rem;border-radius:12px;background:rgba(217,138,60,0.16);border:1px solid var(--accent-henna);font-size:0.84rem;color:var(--text-primary);">
                    ${escapeHtml(statusBanner)}
                  </div>`
                : ''
            }

            <div style="display:grid;gap:0.65rem;margin-top:auto;padding-top:0.5rem;">
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
        ? 'Site marked Approved for Production and sign-off packet copied to clipboard!'
        : 'Site marked Approved for Production and saved locally.';
      render();
    });

    mountReview.querySelector('[data-review-copy]')?.addEventListener('click', async () => {
      persistReviewState(reviewState);
      const md = buildSignOffMarkdown(reviewState, artistName, window.location.href);
      const copied = await copyClipboardSafe(md);
      statusBanner = copied
        ? 'Review notes copied to clipboard! Paste into WhatsApp or iMessage for Wali.'
        : 'Review notes saved locally (clipboard access was blocked by browser).';
      render();
    });
  }

  render();
}
