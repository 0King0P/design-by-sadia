import * as studioData from "../data/studio-data.js";
import { initInteractiveTools } from "./interactive-tools.js";
import { initBookingEngine, openBookingWithPreset } from "./booking-engine.js";
import { initClientReviewMode } from "./client-review-mode.js";

const MOODBOARD_KEY = "sadia_moodboard_v1";

const portfolioItems = Array.isArray(studioData.PORTFOLIO_ITEMS) ? studioData.PORTFOLIO_ITEMS : [];
const servicePackages = Array.isArray(studioData.SERVICE_PACKAGES) ? studioData.SERVICE_PACKAGES : [];
const testimonials = Array.isArray(studioData.TESTIMONIALS) ? studioData.TESTIMONIALS : [];
const faqItems = Array.isArray(studioData.FAQ_ITEMS) ? studioData.FAQ_ITEMS : [];
const brandProfile = studioData.BRAND_PROFILE || {};
const generatedArtifacts = studioData.GENERATED_ARTIFACTS || {};

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
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.009);
  } catch {
    // Ignore audio context restrictions before gesture or unsupported environments.
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
    // Storage unavailable in strict private mode; continue with event broadcast.
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

function getCardLayoutClass(item, idx) {
  const w = Number(item.width) || 0;
  const h = Number(item.height) || 0;
  if (w > h * 1.15) return "portfolio-card--wide";
  if (idx === 0 || idx === 5) return "portfolio-card--tall";
  return "";
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
        const layoutClass = getCardLayoutClass(item, idx);
        const w = item.width || 1200;
        const h = item.height || 1600;
        const loading = idx < 4 ? "eager" : "lazy";
        return `
          <article class="portfolio-card ${layoutClass}" data-portfolio-id="${escapeHtml(item.id)}">
            <div class="portfolio-card__media" role="button" tabindex="0" data-lightbox-id="${escapeHtml(item.id)}" aria-label="Inspect ${escapeHtml(item.title)} in lightbox">
              <img
                src="${escapeHtml(item.src)}"
                alt="${escapeHtml(item.title)} - ${escapeHtml(item.medium)} by Design by Sadia"
                width="${escapeHtml(w)}"
                height="${escapeHtml(h)}"
                loading="${loading}"
                decoding="async"
              >
              <div class="portfolio-card__scrim" aria-hidden="true"></div>
              <div class="portfolio-card__badges">
                <span class="card-chip card-chip--accent">${escapeHtml(item.medium || "Organic Henna")}</span>
                <span class="card-chip">${escapeHtml(item.occasion || "Bespoke")}</span>
              </div>
            </div>
            <div class="portfolio-card__body">
              <div>
                <h3 class="portfolio-card__title">${escapeHtml(item.title)}</h3>
                <div class="portfolio-card__meta">${escapeHtml(item.coverage || "Custom Freehand")}</div>
              </div>
              <button
                type="button"
                class="pin-btn"
                data-pin-id="${escapeHtml(item.id)}"
                aria-pressed="${pinned ? "true" : "false"}"
              >
                ${pinned ? "Saved" : "Pin to Moodboard"}
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
  if (countEl) countEl.textContent = `${ids.length} Saved`;
  if (pillBtn) pillBtn.classList.toggle("has-items", ids.length > 0);

  const savedSet = new Set(ids);
  document.querySelectorAll("[data-pin-id]").forEach((btn) => {
    const id = btn.getAttribute("data-pin-id");
    const isPinned = savedSet.has(id);
    btn.setAttribute("aria-pressed", isPinned ? "true" : "false");
    btn.textContent = isPinned ? "Saved" : "Pin to Moodboard";
  });

  if (lightboxIndex >= 0) {
    const visible = getVisiblePortfolioItems();
    const item = visible[lightboxIndex] || portfolioItems[lightboxIndex];
    const lbPinBtn = document.getElementById("lightbox-pin-btn");
    if (item && lbPinBtn) {
      const isPinned = savedSet.has(item.id);
      lbPinBtn.setAttribute("aria-pressed", isPinned ? "true" : "false");
      lbPinBtn.textContent = isPinned ? "Pinned to Moodboard" : "Pin to Moodboard";
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
      ? `${savedItems.length} pinned inspiration piece${savedItems.length === 1 ? "" : "s"} attached to your booking brief.`
      : "Pin designs from the portfolio to share inspiration with Sadia.";
  }

  if (clearBtn) {
    clearBtn.disabled = savedItems.length === 0;
    clearBtn.style.opacity = savedItems.length === 0 ? "0.45" : "1";
  }

  if (!savedItems.length) {
    listEl.innerHTML = `<p class="prose-body">No designs pinned yet. Browse the portfolio gallery and select "Pin to Moodboard" on any look you love.</p>`;
    return;
  }

  listEl.innerHTML = savedItems
    .map(
      (item) => `
        <div class="moodboard-saved-item">
          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" width="64" height="76" loading="lazy">
          <div>
            <div style="font-family: var(--font-display); font-size: 1.12rem; color: var(--text-primary);">${escapeHtml(item.title)}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">${escapeHtml(item.medium)} &middot; ${escapeHtml(item.coverage)}</div>
          </div>
          <button type="button" class="btn btn--destructive btn--sm" data-remove-moodboard="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.title)} from moodboard">Remove</button>
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
    img.alt = `${item.title} - ${item.medium} by Design by Sadia`;
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
    pinBtn.textContent = isPinned ? "Pinned to Moodboard" : "Pin to Moodboard";
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
  if (heroImg && generatedArtifacts.heroEditorial) {
    heroImg.src = generatedArtifacts.heroEditorial;
  }

  const featured = portfolioItems.find((item) => item.featured) || portfolioItems[0];
  const floatBtn = document.getElementById("hero-float-preview");
  const floatImg = document.getElementById("hero-float-img");
  const floatTitle = document.getElementById("hero-float-title");
  const floatSub = document.getElementById("hero-float-sub");

  if (featured && floatBtn) {
    if (floatImg) {
      floatImg.src = featured.src;
      floatImg.alt = `${featured.title} preview`;
    }
    if (floatTitle) floatTitle.textContent = featured.title;
    if (floatSub) floatSub.textContent = `${featured.medium} · Inspect Work`;
    floatBtn.addEventListener("click", () => {
      activeCategory = "all";
      syncFilterButtons();
      renderPortfolioGrid();
      openLightboxById(featured.id);
    });
  }
}

function renderPackagesBento() {
  const container = document.getElementById("packages-bento");
  if (!container) return;

  const bridalMoodSrc = generatedArtifacts.bridalMood || "./assets/generated/bridal-editorial.jpg";
  const editorialCard = `
    <article class="package-editorial-card">
      <img
        class="package-editorial-card__bg"
        src="${escapeHtml(bridalMoodSrc)}"
        alt="Luxury South Asian bridal mehndi stain on emerald silk"
        width="896"
        height="1200"
        loading="lazy"
        decoding="async"
      >
      <div class="package-editorial-card__scrim" aria-hidden="true"></div>
      <div class="package-editorial-card__content">
        <span class="card-chip card-chip--accent" style="align-self: flex-start;">Bridal Couture Atelier</span>
        <h3>Bespoke Mehndi &amp; Hidden Partner Initials</h3>
        <p>Every bridal session includes custom hand-mapped proportions, fresh essential-oil organic cones, lemon-sugar sealant care, and optional hidden partner initials woven seamlessly into your vine work.</p>
        <div>
          <button type="button" class="btn btn--primary" data-package-book="${escapeHtml(servicePackages[0]?.id || "bridal-royal")}">Book Consultation</button>
        </div>
      </div>
    </article>
  `;

  const packageCards = servicePackages
    .map(
      (pkg) => `
        <article class="package-card ${pkg.featured ? "package-card--featured" : ""}">
          <div class="package-card__head">
            <div>
              <div class="package-card__cat">${escapeHtml(pkg.category || "Session")}</div>
              <h3 style="margin-top: 0.25rem;">${escapeHtml(pkg.name)}</h3>
              <p style="font-size: 0.85rem; margin-top: 0.2rem;">${escapeHtml(pkg.subtitle || "")}</p>
            </div>
            ${pkg.featured ? `<span class="card-chip card-chip--accent">Most Requested</span>` : ""}
          </div>

          <div class="package-card__price-row">
            <span class="package-card__price">$${escapeHtml(pkg.startingPrice)}</span>
            <span class="package-card__unit">${escapeHtml(pkg.priceUnit || "starting")}</span>
          </div>

          <ul class="package-card__list">
            ${(Array.isArray(pkg.includes) ? pkg.includes : []).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>

          <div>
            <button type="button" class="btn ${pkg.featured ? "btn--primary" : "btn--secondary"}" style="width: 100%;" data-package-book="${escapeHtml(pkg.id)}">Book Consultation</button>
          </div>
        </article>
      `
    )
    .join("");

  container.innerHTML = editorialCard + packageCards;
}

function renderTestimonialsAndFaq() {
  const testGrid = document.getElementById("testimonials-grid");
  if (testGrid) {
    testGrid.innerHTML = testimonials
      .map(
        (t) => `
          <blockquote class="testimonial-card" style="margin: 0;">
            <p class="testimonial-card__quote">${escapeHtml(t.quote)}</p>
            <footer class="testimonial-card__footer">
              <span class="testimonial-card__author">${escapeHtml(t.author)} &middot; ${escapeHtml(t.role || "Client")}</span>
              <span class="testimonial-card__meta">${escapeHtml(t.location)} &middot; ${escapeHtml(t.service)}</span>
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
      .map((area) => `<span class="footer-area-tag">${escapeHtml(area)}</span>`)
      .join("");
  }
}

function syncFilterButtons() {
  document.querySelectorAll("#portfolio-filters .filter-pill").forEach((btn) => {
    const cat = btn.getAttribute("data-category");
    btn.setAttribute("aria-pressed", cat === activeCategory ? "true" : "false");
  });
}

function bindEvents() {
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

  document.getElementById("packages-bento")?.addEventListener("click", (e) => {
    const pkgBtn = e.target.closest("[data-package-book]");
    if (!pkgBtn) return;
    playTactileTick();
    scrollToBooking({ packageId: pkgBtn.getAttribute("data-package-book") });
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
  renderPortfolioGrid();
  renderPackagesBento();
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
