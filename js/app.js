import * as studioData from "../data/studio-data.js?v=2";
import { initInteractiveTools } from "./interactive-tools.js?v=2";
import { initBookingEngine, openBookingWithPreset } from "./booking-engine.js?v=2";
import { initClientReviewMode } from "./client-review-mode.js?v=2";

const MOODBOARD_KEY = "sadia_moodboard_v1";

const portfolioItems = Array.isArray(studioData.PORTFOLIO_ITEMS) ? studioData.PORTFOLIO_ITEMS : [];
const testimonials = Array.isArray(studioData.TESTIMONIALS) ? studioData.TESTIMONIALS : [];
const faqItems = Array.isArray(studioData.FAQ_ITEMS) ? studioData.FAQ_ITEMS : [];
const brandProfile = studioData.BRAND_PROFILE || {};
const generatedArtifacts = studioData.GENERATED_ARTIFACTS || {};

const FALLBACK_SIGNATURE_STYLES = [
  {
    id: "royal-rajasthani",
    roman: "I",
    title: "Royal Rajasthani & Mughlai Bridal",
    notes: "Micro-jali latticework, negative-space lotus medallions, scalloped forearm cuffs, and partner initials woven cleanly into the palm.",
    src: generatedArtifacts.heroCouture || "./assets/portfolio/portfolio-02-royal-bridal-palms.jpg",
    packageId: "royal-bridal",
    formulaId: "organic",
  },
  {
    id: "khaleeji-gulf",
    roman: "II",
    title: "Khaleeji Shaded Rose & Gulf Vine",
    notes: "Sweeping diagonal rose clusters, high-contrast petal shading, and elongated index trails balanced by open skin breathing room.",
    src: generatedArtifacts.styleKhaleeji || "./assets/portfolio/portfolio-05-velvet-cuff-paisley.jpg",
    packageId: "custom-sketch-session",
    formulaId: "organic",
  },
  {
    id: "botanical-jagua",
    roman: "III",
    title: "Contemporary Botanical Jagua",
    notes: "Amazonian Genipa americana fine-line botanical cuffs and architectural florals oxidizing into deep slate blue-black over 48 hours.",
    src: generatedArtifacts.stainJagua || "./assets/portfolio/portfolio-14-minimalist-palm-sprigs.jpg",
    packageId: "intimate-nikah",
    formulaId: "jagua",
  },
  {
    id: "heirloom-initials",
    roman: "IV",
    title: "Bespoke Heirloom & Hidden Initials",
    notes: "Custom couple monograms, wedding dates, and delicate pearl-chain haathphool motifs composed freehand to match ring and bangle proportions.",
    src: "./assets/portfolio/portfolio-03-rose-vine-initials.jpg",
    packageId: "royal-bridal",
    formulaId: "organic",
  },
];

let activeCategory = "all";
let lightboxIndex = -1;
let lastFocusedBeforeModal = null;
let audioCtx = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function playTactileTick() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, now);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.009);
  } catch {
    // AudioContext blocked prior to user gesture or unavailable.
  }
}

function getMoodboardIds() {
  try {
    const raw = localStorage.getItem(MOODBOARD_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function saveMoodboardIds(ids) {
  const unique = [...new Set(ids)];
  try {
    localStorage.setItem(MOODBOARD_KEY, JSON.stringify(unique));
  } catch {
    // Storage unavailable; dispatch event for active components.
  }
  document.dispatchEvent(new CustomEvent("sadia:moodboard-change", { detail: { ids: unique } }));
  syncMoodboardUi(unique);
}

function toggleMoodboardId(id) {
  const current = getMoodboardIds();
  const exists = current.includes(id);
  const next = exists ? current.filter((item) => item !== id) : [...current, id];
  playTactileTick();
  saveMoodboardIds(next);
  return !exists;
}

function scrollToBooking(preset = {}) {
  openBookingWithPreset(preset);
  const target = document.getElementById("book");
  if (target) {
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
}

function getVisiblePortfolioItems() {
  if (activeCategory === "all") return portfolioItems;
  return portfolioItems.filter((item) => item.category === activeCategory);
}

function getArchiveLayoutClass(item, idx) {
  if (activeCategory === "all") {
    if (idx === 0) return "archive-plate--lead";
    if (idx === 1) return "archive-plate--companion";
  }
  const w = Number(item.width) || 0;
  const h = Number(item.height) || 0;
  if (w > h * 1.15) return "archive-plate--wide";
  return "";
}

function formatPlateIndex(idx) {
  return String(idx + 1).padStart(2, "0");
}

function renderSignatureStyles() {
  const container = document.getElementById("signature-styles-grid");
  if (!container) return;

  const source = Array.isArray(studioData.SIGNATURE_STYLES) && studioData.SIGNATURE_STYLES.length
    ? studioData.SIGNATURE_STYLES
    : FALLBACK_SIGNATURE_STYLES;

  const romans = ["I", "II", "III", "IV"];

  container.innerHTML = source
    .slice(0, 4)
    .map((style, idx) => {
      const roman = style.numeral || style.roman || romans[idx] || String(idx + 1);
      const rawTitle = String(style.title || "").replace(/^\s*0?\d\s*\/\s*/i, "");
      const imgSrc = style.src || style.imageSrc || style.photoSrc || FALLBACK_SIGNATURE_STYLES[idx]?.src || "./assets/portfolio/portfolio-02-royal-bridal-palms.jpg";
      const notes = style.notes || style.description || style.summary || "";
      const pkgId = style.recommendedPackageId || style.packageId || (idx === 0 ? "royal-bridal" : "custom-sketch-session");
      const formulaId = style.formulaId || (idx === 2 ? "jagua" : "organic");

      return `
        <article class="style-column">
          <div class="style-column__media">
            <img
              src="${escapeHtml(imgSrc)}"
              alt="${escapeHtml(rawTitle)} freehand henna study"
              width="960"
              height="1200"
              loading="eager"
              decoding="async"
              onerror="this.onerror=null;this.src='./assets/portfolio/portfolio-02-royal-bridal-palms.jpg';"
            >
          </div>
          <span class="style-column__numeral">${escapeHtml(roman)}</span>
          <h3 class="style-column__title">${escapeHtml(rawTitle)}</h3>
          <p class="style-column__notes">${escapeHtml(notes)}</p>
          <div>
            <button
              type="button"
              class="editorial-link"
              data-style-inquire="${escapeHtml(pkgId)}"
              data-style-formula="${escapeHtml(formulaId)}"
            >
              Inquire for This Style
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPortfolioGrid() {
  const grid = document.getElementById("portfolio-grid");
  const countEl = document.getElementById("portfolio-visible-count");
  const totalEl = document.getElementById("portfolio-total-label");
  if (!grid) return;

  const visible = getVisiblePortfolioItems();
  const saved = new Set(getMoodboardIds());

  if (totalEl) totalEl.textContent = `${portfolioItems.length} REAL CLIENT WORKS`;
  if (countEl) countEl.textContent = `Showing ${visible.length} of ${portfolioItems.length} works`;

  const renderMarkup = () => {
    grid.innerHTML = visible
      .map((item, idx) => {
        const pinned = saved.has(item.id);
        const layoutClass = getArchiveLayoutClass(item, idx);
        const w = item.width || 1200;
        const h = item.height || 1600;
        const num = formatPlateIndex(idx);

        return `
          <article class="archive-plate ${layoutClass}" data-portfolio-id="${escapeHtml(item.id)}">
            <div class="archive-plate__media" role="button" tabindex="0" data-lightbox-id="${escapeHtml(item.id)}" aria-label="Inspect ${escapeHtml(item.title)} in lightbox">
              <img
                src="${escapeHtml(item.src)}"
                alt="${escapeHtml(item.title)} · ${escapeHtml(item.medium || "Organic Henna")} by Design by Sadia"
                width="${escapeHtml(w)}"
                height="${escapeHtml(h)}"
                loading="eager"
                decoding="async"
              >
            </div>
            <div class="archive-plate__caption">
              <div>
                <h3 class="archive-plate__title"><span class="archive-plate__index">${escapeHtml(num)} &middot;</span>${escapeHtml(item.title)}</h3>
                <div class="archive-plate__meta">${escapeHtml(item.medium || "Organic Henna")} &middot; ${escapeHtml(item.coverage || "Custom Freehand")}</div>
              </div>
              <button
                type="button"
                class="save-bookmark-btn"
                data-pin-id="${escapeHtml(item.id)}"
                aria-pressed="${pinned ? "true" : "false"}"
              >
                ${pinned ? "Saved" : "Save"}
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof document.startViewTransition === "function" && !reduceMotion) {
    document.startViewTransition(renderMarkup);
  } else {
    renderMarkup();
  }
}

function syncMoodboardUi(ids = getMoodboardIds()) {
  const countEl = document.getElementById("nav-moodboard-count");
  const pillBtn = document.getElementById("nav-moodboard-btn");
  if (countEl) countEl.textContent = `Saved (${ids.length})`;
  if (pillBtn) pillBtn.classList.toggle("has-items", ids.length > 0);

  const savedSet = new Set(ids);
  document.querySelectorAll("[data-pin-id]").forEach((btn) => {
    const id = btn.getAttribute("data-pin-id");
    const isPinned = savedSet.has(id);
    btn.setAttribute("aria-pressed", isPinned ? "true" : "false");
    btn.textContent = isPinned ? "Saved" : "Save";
  });

  if (lightboxIndex >= 0) {
    const visible = getVisiblePortfolioItems();
    const item = visible[lightboxIndex] || portfolioItems[lightboxIndex];
    const lbPinBtn = document.getElementById("lightbox-pin-btn");
    if (item && lbPinBtn) {
      const isPinned = savedSet.has(item.id);
      lbPinBtn.setAttribute("aria-pressed", isPinned ? "true" : "false");
      lbPinBtn.textContent = isPinned ? "Saved in Archive" : "Save to Archive";
    }
  }

  renderMoodboardDrawer(ids);
}

function renderMoodboardDrawer(ids = getMoodboardIds()) {
  const listEl = document.getElementById("moodboard-drawer-list");
  const subEl = document.getElementById("moodboard-drawer-sub");
  const clearBtn = document.getElementById("moodboard-clear-btn");
  if (!listEl) return;

  const savedItems = ids
    .map((id) => portfolioItems.find((item) => item.id === id))
    .filter(Boolean);

  if (subEl) {
    subEl.textContent = savedItems.length
      ? `${savedItems.length} saved archive plate${savedItems.length === 1 ? "" : "s"} attached to your reservation dossier.`
      : "Save designs from the client archive to share inspiration with Sadia.";
  }

  if (clearBtn) {
    clearBtn.disabled = savedItems.length === 0;
    clearBtn.style.opacity = savedItems.length === 0 ? "0.45" : "1";
  }

  if (!savedItems.length) {
    listEl.innerHTML = `<p style="font-size: 0.92rem; color: var(--text-secondary); padding-top: 0.5rem;">No plates saved yet. Browse the client archive and select "Save" on any work you would like to reference.</p>`;
    return;
  }

  listEl.innerHTML = savedItems
    .map(
      (item) => `
        <div class="moodboard-saved-item">
          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" width="64" height="80" loading="lazy">
          <div>
            <div style="font-family: var(--font-display); font-size: 1.12rem; color: var(--text-primary); line-height: 1.2;">${escapeHtml(item.title)}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">${escapeHtml(item.medium || "Organic Henna")} &middot; ${escapeHtml(item.coverage || "")}</div>
          </div>
          <button type="button" class="btn btn--destructive btn--sm" data-remove-moodboard="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.title)} from saved archive">Remove</button>
        </div>
      `
    )
    .join("");
}

function openLightboxById(id) {
  const visible = getVisiblePortfolioItems();
  const idx = visible.findIndex((item) => item.id === id);
  if (idx < 0) return;
  lightboxIndex = idx;
  lastFocusedBeforeModal = document.activeElement;
  renderLightboxItem();
  const backdrop = document.getElementById("portfolio-lightbox");
  if (backdrop) {
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close")?.focus();
  }
}

function renderLightboxItem() {
  const visible = getVisiblePortfolioItems();
  const item = visible[lightboxIndex];
  if (!item) return;

  const img = document.getElementById("lightbox-img");
  const title = document.getElementById("lightbox-title");
  const story = document.getElementById("lightbox-story");
  const medium = document.getElementById("lightbox-medium");
  const coverage = document.getElementById("lightbox-coverage");
  const occasion = document.getElementById("lightbox-occasion");
  const pinBtn = document.getElementById("lightbox-pin-btn");

  if (img) {
    img.src = item.src;
    img.alt = `${item.title} · ${item.medium || "Organic Henna"} by Design by Sadia`;
    img.width = item.width || 1200;
    img.height = item.height || 1600;
  }
  if (title) title.textContent = item.title;
  if (story) story.textContent = item.storyNote || "Hand-drawn freehand composition tailored to hand proportions.";
  if (medium) medium.textContent = item.medium || "Organic Henna";
  if (coverage) coverage.textContent = item.coverage || "Full Palm";
  if (occasion) occasion.textContent = item.occasion || "Bespoke Session";

  const isPinned = getMoodboardIds().includes(item.id);
  if (pinBtn) {
    pinBtn.setAttribute("aria-pressed", isPinned ? "true" : "false");
    pinBtn.textContent = isPinned ? "Saved in Archive" : "Save to Archive";
  }
}

function stepLightbox(delta) {
  const visible = getVisiblePortfolioItems();
  if (!visible.length) return;
  lightboxIndex = (lightboxIndex + delta + visible.length) % visible.length;
  playTactileTick();
  renderLightboxItem();
}

function closeLightbox() {
  const backdrop = document.getElementById("portfolio-lightbox");
  if (!backdrop || backdrop.hidden) return;
  backdrop.hidden = true;
  lightboxIndex = -1;
  document.body.style.overflow = "";
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
    lastFocusedBeforeModal.focus();
  }
}

function setMoodboardDrawerOpen(open) {
  const backdrop = document.getElementById("moodboard-drawer-backdrop");
  const trigger = document.getElementById("nav-moodboard-btn");
  if (!backdrop) return;
  backdrop.hidden = !open;
  if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    renderMoodboardDrawer();
    document.getElementById("moodboard-close-btn")?.focus();
  }
}

function renderHeroDetails() {
  const heroImg = document.getElementById("hero-editorial-img");
  if (heroImg && generatedArtifacts.heroCouture) {
    heroImg.src = generatedArtifacts.heroCouture;
  }

  const secondary =
    portfolioItems.find((item) => item.id === "rose-vine-initials") ||
    portfolioItems[1] ||
    portfolioItems[0];
  const floatBtn = document.getElementById("hero-float-preview");
  const floatImg = document.getElementById("hero-float-img");
  const floatTitle = document.getElementById("hero-float-title");
  const floatSub = document.getElementById("hero-float-sub");

  if (secondary && floatBtn) {
    if (floatImg) {
      floatImg.src = secondary.src;
      floatImg.alt = `${secondary.title} archival print`;
    }
    if (floatTitle) floatTitle.textContent = "Rose-Vine & Initials";
    if (floatSub) floatSub.textContent = `${secondary.medium || "Organic Henna"} · Inspect Plate`;
    floatBtn.addEventListener("click", () => {
      activeCategory = "all";
      syncFilterButtons();
      renderPortfolioGrid();
      openLightboxById(secondary.id);
    });
  }
}

function renderTestimonialsAndFaq() {
  const testGrid = document.getElementById("testimonials-grid");
  if (testGrid) {
    testGrid.innerHTML = testimonials
      .map(
        (t) => `
          <blockquote class="client-note">
            <p class="client-note__quote">"${escapeHtml(t.quote)}"</p>
            <footer class="client-note__meta">
              <span class="client-note__author">${escapeHtml(t.author)} &middot; ${escapeHtml(t.role || "Client")}</span>
              <span>${escapeHtml(t.location)} &middot; ${escapeHtml(t.service)}</span>
            </footer>
          </blockquote>
        `
      )
      .join("");
  }

  const faqEl = document.getElementById("faq-accordion");
  if (faqEl) {
    faqEl.innerHTML = faqItems
      .map(
        (item, idx) => `
          <details class="faq-item" ${idx === 0 ? "open" : ""}>
            <summary aria-expanded="${idx === 0 ? "true" : "false"}">
              <span>${escapeHtml(item.question)}</span>
              <span class="faq-item__icon" aria-hidden="true">+</span>
            </summary>
            <div class="faq-item__body">${escapeHtml(item.answer)}</div>
          </details>
        `
      )
      .join("");

    faqEl.querySelectorAll("details.faq-item").forEach((det) => {
      det.addEventListener("toggle", () => {
        const sum = det.querySelector("summary");
        if (sum) sum.setAttribute("aria-expanded", det.open ? "true" : "false");
      });
    });
  }

  const policiesEl = document.getElementById("policies-list");
  if (policiesEl && Array.isArray(brandProfile.bookingPolicies)) {
    policiesEl.innerHTML = brandProfile.bookingPolicies
      .map(
        (p) => `
          <div class="policy-row">
            <div class="policy-row__title">${escapeHtml(p.title)}</div>
            <div class="policy-row__detail">${escapeHtml(p.detail)}</div>
          </div>
        `
      )
      .join("");
  }
}

function renderFooterMetadata() {
  const bioEl = document.getElementById("footer-bio-summary");
  if (bioEl && brandProfile.bioSummary) {
    bioEl.textContent = brandProfile.bioSummary;
  }

  const areasEl = document.getElementById("footer-service-areas");
  if (areasEl && Array.isArray(brandProfile.serviceAreas)) {
    areasEl.innerHTML = brandProfile.serviceAreas
      .map((area, idx) => {
        const sep = idx < brandProfile.serviceAreas.length - 1 ? " &middot;" : "";
        return `<span class="footer-area-tag">${escapeHtml(area)}${sep}</span>`;
      })
      .join("");
  }
}

function syncFilterButtons() {
  document.querySelectorAll("#portfolio-filters .filter-tab").forEach((btn) => {
    const cat = btn.getAttribute("data-category");
    btn.setAttribute("aria-pressed", cat === activeCategory ? "true" : "false");
  });
}

function bindEvents() {
  const stylesGrid = document.getElementById("signature-styles-grid");
  stylesGrid?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-style-inquire]");
    if (!btn) return;
    playTactileTick();
    scrollToBooking({
      packageId: btn.getAttribute("data-style-inquire") || "royal-bridal",
      formulaId: btn.getAttribute("data-style-formula") || "organic",
    });
  });

  const filtersEl = document.getElementById("portfolio-filters");
  filtersEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    const cat = btn.getAttribute("data-category");
    if (!cat || cat === activeCategory) return;
    activeCategory = cat;
    playTactileTick();
    syncFilterButtons();
    renderPortfolioGrid();
  });

  const grid = document.getElementById("portfolio-grid");
  grid?.addEventListener("click", (e) => {
    const pinBtn = e.target.closest("[data-pin-id]");
    if (pinBtn) {
      e.stopPropagation();
      toggleMoodboardId(pinBtn.getAttribute("data-pin-id"));
      return;
    }
    const media = e.target.closest("[data-lightbox-id]");
    if (media) {
      openLightboxById(media.getAttribute("data-lightbox-id"));
    }
  });

  grid?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const media = e.target.closest("[data-lightbox-id]");
      if (media) {
        e.preventDefault();
        openLightboxById(media.getAttribute("data-lightbox-id"));
      }
    }
  });

  document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev")?.addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightbox-next")?.addEventListener("click", () => stepLightbox(1));

  document.getElementById("portfolio-lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "portfolio-lightbox") closeLightbox();
  });

  document.getElementById("lightbox-pin-btn")?.addEventListener("click", () => {
    const visible = getVisiblePortfolioItems();
    const item = visible[lightboxIndex];
    if (item) toggleMoodboardId(item.id);
  });

  document.getElementById("lightbox-book-btn")?.addEventListener("click", () => {
    const visible = getVisiblePortfolioItems();
    const item = visible[lightboxIndex];
    if (item) {
      const current = getMoodboardIds();
      if (!current.includes(item.id)) saveMoodboardIds([...current, item.id]);
      closeLightbox();
      scrollToBooking({ portfolioId: item.id, medium: item.medium, category: item.category });
    }
  });

  document.getElementById("nav-moodboard-btn")?.addEventListener("click", () => {
    playTactileTick();
    setMoodboardDrawerOpen(true);
  });

  document.getElementById("moodboard-close-btn")?.addEventListener("click", () => setMoodboardDrawerOpen(false));
  document.getElementById("moodboard-drawer-backdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "moodboard-drawer-backdrop") setMoodboardDrawerOpen(false);
  });

  document.getElementById("moodboard-drawer-list")?.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-remove-moodboard]");
    if (removeBtn) {
      const id = removeBtn.getAttribute("data-remove-moodboard");
      playTactileTick();
      saveMoodboardIds(getMoodboardIds().filter((item) => item !== id));
    }
  });

  document.getElementById("moodboard-clear-btn")?.addEventListener("click", () => {
    playTactileTick();
    saveMoodboardIds([]);
  });

  document.getElementById("moodboard-book-btn")?.addEventListener("click", () => {
    setMoodboardDrawerOpen(false);
    scrollToBooking({ moodboardIds: getMoodboardIds() });
  });

  document.querySelectorAll("[data-book-trigger]").forEach((el) => {
    el.addEventListener("click", () => {
      playTactileTick();
    });
  });

  const menuToggle = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const setMenuOpen = (open) => {
    if (!drawer || !menuToggle) return;
    drawer.hidden = !open;
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuToggle?.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isExpanded);
  });

  document.querySelectorAll("[data-drawer-link]").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("portfolio-lightbox");
    if (lb && !lb.hidden) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }

    const mb = document.getElementById("moodboard-drawer-backdrop");
    if (mb && !mb.hidden && e.key === "Escape") {
      setMoodboardDrawerOpen(false);
      return;
    }

    if (drawer && !drawer.hidden && e.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

function bootstrap() {
  renderHeroDetails();
  renderSignatureStyles();
  renderPortfolioGrid();
  renderTestimonialsAndFaq();
  renderFooterMetadata();
  syncMoodboardUi();
  bindEvents();

  initInteractiveTools({
    mountSketchStain: document.getElementById("sketch-stain-mount"),
    mountStainLab: document.getElementById("stain-lab-mount"),
    mountEstimator: document.getElementById("coverage-estimator-mount"),
    studioData,
    onPresetBook: (preset) => scrollToBooking(preset),
  });

  initBookingEngine({
    mountBooking: document.getElementById("booking-concierge-mount"),
    studioData,
    getMoodboardIds,
  });

  initClientReviewMode({
    mountReview: document.getElementById("client-review-mount"),
    studioData,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
