import * as studioData from "../data/studio-data.js?v=4";
import { initInteractiveTools } from "./interactive-tools.js?v=4";
import { initBookingEngine, openBookingWithPreset } from "./booking-engine.js?v=4";
import { initClientReviewMode } from "./client-review-mode.js?v=4";

const MOODBOARD_KEY = "sadia_moodboard_v1";

const portfolioItems = Array.isArray(studioData.PORTFOLIO_ITEMS) ? studioData.PORTFOLIO_ITEMS : [];
const testimonials = Array.isArray(studioData.TESTIMONIALS) ? studioData.TESTIMONIALS : [];
const faqItems = Array.isArray(studioData.FAQ_ITEMS) ? studioData.FAQ_ITEMS : [];
const brandProfile = studioData.BRAND_PROFILE || {};
const generatedArtifacts = studioData.GENERATED_ARTIFACTS || {};

const FALLBACK_HERO_REEL = [
  {
    id: "royal-bridal-palms",
    plateNumber: "01",
    src: "./assets/portfolio/portfolio-02-royal-bridal-palms.jpg",
    width: 1200,
    height: 1600,
    title: "Royal Mandala Palms & Forearm Cuffs",
    caption: "Royal Mandala Palms & Forearm Cuffs · Organic Henna",
    alt: "Royal mandala palms and botanical forearm cuffs in freehand organic henna by Sadia",
  },
  {
    id: "botanical-vine",
    plateNumber: "02",
    src: "./assets/portfolio/portfolio-01-botanical-vine.jpg",
    width: 900,
    height: 1200,
    title: "Shaded Lotus & Scalloped Arch Vine",
    caption: "Custom Proportion Study · Hand & Forearm Botanical Vine",
    alt: "Shaded lotus and scalloped arch vine freehand henna translated from digital study",
  },
  {
    id: "rose-vine-initials",
    plateNumber: "03",
    src: "./assets/portfolio/portfolio-03-rose-vine-initials.jpg",
    width: 1199,
    height: 1600,
    title: "Twin Rose-Vine Hands with Hidden Initials",
    caption: "Nikah Heirloom · Asymmetrical Rose Garlands & Monogram",
    alt: "Twin rose-vine hands with hidden couple initials in freehand organic henna",
  },
  {
    id: "scalloped-bridal-cuff",
    plateNumber: "04",
    src: "./assets/portfolio/portfolio-04-scalloped-bridal-cuff.jpg",
    width: 1200,
    height: 1600,
    title: "Scalloped Heritage Cuff & Finger Jaali",
    caption: "Bridal Dorsal Study · Layered Lotus Cuff & Finger Lattice",
    alt: "Scalloped heritage wrist cuff and fine diamond finger jaali in freehand henna",
  },
];

const FALLBACK_SIGNATURE_STYLES = [
  {
    id: "rajasthani-mughlai-bridal",
    numeral: "I",
    title: "Bridal & Forearm Couture",
    tradition: "Heritage Bridal Couture",
    categoryFilter: "bridal",
    description:
      "Dense micro-jali latticework, negative-space lotus medallions, scalloped forearm cuffs, and partner initials woven discreetly into fine architectural borders.",
    recommendedPackageId: "royal-bridal",
    formulaId: "organic",
  },
  {
    id: "khaleeji-gulf-vine",
    numeral: "II",
    title: "Floral Vines & Hidden Initials",
    tradition: "Gulf Floral & Moroccan Jali",
    categoryFilter: "vines",
    description:
      "Sculptural negative-space rose blossoms, gradient petal shading, geometric wrist bands, and elongated diagonal trails sweeping gracefully to the fingertips.",
    recommendedPackageId: "custom-sketch-session",
    formulaId: "organic",
  },
  {
    id: "contemporary-botanical-jagua",
    numeral: "III",
    title: "Mehndi Celebrations",
    tradition: "Festive Eid & Sangeet Works",
    categoryFilter: "festive",
    description:
      "Express starburst medallions, dotted pearl-chain hand harnesses, and symmetrical festive cuffs composed gracefully for sangeet nights and Eid.",
    recommendedPackageId: "party-hourly",
    formulaId: "organic",
  },
  {
    id: "bespoke-heirloom-initials",
    numeral: "IV",
    title: "Minimalist Botanicals",
    tradition: "Modern Negative-Space Artistry",
    categoryFilter: "minimalist",
    description:
      "Whisper-fine botanical stems, airy negative-space palm sprigs, and crisp finger cuffs tailored around statement rings for understated editorial elegance.",
    recommendedPackageId: "festive-duo-hands",
    formulaId: "jagua",
  },
];

const CATEGORY_LABELS = {
  bridal: "Bridal",
  vines: "Vines",
  festive: "Celebration",
  minimalist: "Minimalist",
};

let activeCategory = "all";
let lightboxIndex = -1;
let lastFocusedBeforeModal = null;
let audioCtx = null;
let archiveObserver = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function playTactileTick() {
  if (prefersReducedMotion()) return;
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
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
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

function initHeroReel() {
  const stage = document.getElementById("hero-stage");
  const frame = document.getElementById("hero-frame");
  const parallaxLayer = document.getElementById("hero-parallax-layer");
  const controlsEl = document.getElementById("hero-reel-controls");
  const captionIdxEl = document.getElementById("hero-caption-index");
  const captionTextEl = document.getElementById("hero-caption-text");

  const slides = Array.isArray(studioData.HERO_REEL_PLATES) && studioData.HERO_REEL_PLATES.length
    ? studioData.HERO_REEL_PLATES
    : FALLBACK_HERO_REEL;

  if (parallaxLayer && slides.length) {
    const firstImg = document.getElementById("hero-editorial-img");
    if (firstImg) {
      firstImg.src = slides[0].src;
      firstImg.alt = slides[0].alt || slides[0].title;
      firstImg.width = slides[0].width || 1200;
      firstImg.height = slides[0].height || 1600;
    }

    const extraMarkup = slides
      .slice(1)
      .map(
        (slide, offset) => `
          <img
            class="cover-reel__img"
            src="${escapeHtml(slide.src)}"
            alt="${escapeHtml(slide.alt || slide.title)}"
            width="${escapeHtml(slide.width || 1200)}"
            height="${escapeHtml(slide.height || 1600)}"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            data-reel-slide="${offset + 1}"
          >
        `
      )
      .join("");
    if (extraMarkup) parallaxLayer.insertAdjacentHTML("beforeend", extraMarkup);
  }

  if (controlsEl && slides.length) {
    controlsEl.innerHTML = slides
      .map(
        (slide, idx) => `
          <button
            type="button"
            class="cover-reel-btn"
            data-reel-btn="${idx}"
            aria-pressed="${idx === 0 ? "true" : "false"}"
            aria-label="View Plate ${escapeHtml(slide.plateNumber || formatPlateIndex(idx))}: ${escapeHtml(slide.title)}"
          >
            <span class="cover-reel-btn__num">${escapeHtml(slide.plateNumber || formatPlateIndex(idx))}</span>
            <span class="cover-reel-btn__track"><span class="cover-reel-btn__fill"></span></span>
          </button>
        `
      )
      .join("");
  }

  let activeSlide = 0;
  let timerId = null;

  const setActiveSlide = (nextIdx, userInitiated = false) => {
    if (!slides.length) return;
    activeSlide = ((nextIdx % slides.length) + slides.length) % slides.length;
    const plate = slides[activeSlide];

    parallaxLayer?.querySelectorAll("[data-reel-slide]").forEach((img) => {
      const idx = Number(img.getAttribute("data-reel-slide"));
      const active = idx === activeSlide;
      img.classList.toggle("is-active", active);
      img.setAttribute("aria-hidden", active ? "false" : "true");
    });

    controlsEl?.querySelectorAll("[data-reel-btn]").forEach((btn) => {
      const idx = Number(btn.getAttribute("data-reel-btn"));
      const active = idx === activeSlide;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      if (active && userInitiated) {
        const fill = btn.querySelector(".cover-reel-btn__fill");
        if (fill) {
          fill.style.animation = "none";
          void fill.offsetWidth;
          fill.style.animation = "";
        }
      }
    });

    if (captionIdxEl) {
      captionIdxEl.textContent = `Plate ${plate.plateNumber || formatPlateIndex(activeSlide)}`;
    }
    if (captionTextEl) {
      captionTextEl.textContent = plate.caption || `${plate.title} · ${plate.medium || "Organic Henna"}`;
    }
  };

  const startTimer = () => {
    if (timerId) clearInterval(timerId);
    if (prefersReducedMotion() || slides.length < 2) return;
    timerId = setInterval(() => {
      if (document.hidden || stage?.classList.contains("is-paused")) return;
      setActiveSlide(activeSlide + 1, false);
    }, 4600);
  };

  controlsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-reel-btn]");
    if (!btn) return;
    const idx = Number(btn.getAttribute("data-reel-btn"));
    if (Number.isNaN(idx)) return;
    playTactileTick();
    setActiveSlide(idx, true);
    startTimer();
  });

  if (stage) {
    stage.addEventListener("mouseenter", () => stage.classList.add("is-paused"));
    stage.addEventListener("mouseleave", () => stage.classList.remove("is-paused"));
    stage.addEventListener("focusin", () => stage.classList.add("is-paused"));
    stage.addEventListener("focusout", () => stage.classList.remove("is-paused"));
  }

  if (frame && parallaxLayer && !prefersReducedMotion() && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    frame.addEventListener("mousemove", (e) => {
      const rect = frame.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, nx)) * -6;
      targetY = Math.max(-1, Math.min(1, ny)) * -6;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          parallaxLayer.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`;
          rafId = 0;
        });
      }
    });

    frame.addEventListener("mouseleave", () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      parallaxLayer.style.transform = "translate3d(0, 0, 0)";
    });
  }

  setActiveSlide(0, false);
  startTimer();

  const floatBtn = document.getElementById("hero-float-preview");
  const floatImg = document.getElementById("hero-float-img");
  const floatTitle = document.getElementById("hero-float-title");
  const floatSub = document.getElementById("hero-float-sub");
  const sketchSrc = generatedArtifacts.heroEditorial || "./assets/portfolio/sketch-floral-vine.jpg";

  if (floatBtn) {
    if (floatImg) {
      floatImg.src = sketchSrc;
      floatImg.alt = "Original iPad botanical floral vine sketch before application on skin";
    }
    if (floatTitle) floatTitle.textContent = "Botanical Proportion Study";
    if (floatSub) floatSub.textContent = "Sketch-to-Skin ↓";
    floatBtn.addEventListener("click", () => {
      playTactileTick();
      const target = document.getElementById("sketch-to-stain") || document.getElementById("process");
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    });
  }
}

function initBotanicalOrnament() {
  const ornament = document.getElementById("traditions-ornament");
  const svg = document.getElementById("traditions-vine-svg");
  if (!ornament || !svg) return;

  const paths = [...svg.querySelectorAll(".vine-path")];
  paths.forEach((path, idx) => {
    const len = Math.ceil(path.getTotalLength());
    path.style.strokeDasharray = String(len);
    if (prefersReducedMotion()) {
      path.style.strokeDashoffset = "0";
    } else {
      path.style.strokeDashoffset = String(len);
      path.style.transitionDelay = `${idx * 75}ms`;
    }
  });

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    ornament.classList.add("is-drawn");
    return;
  }

  const reveal = () => {
    ornament.classList.add("is-drawn");
    paths.forEach((path) => {
      path.style.strokeDashoffset = "0";
    });
  };

  const rect = ornament.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.95) {
    reveal();
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        obs.disconnect();
      }
    },
    { threshold: 0.25 }
  );
  obs.observe(ornament);
}

function renderSignatureStyles() {
  const container = document.getElementById("signature-styles-grid");
  if (!container) return;

  const source = Array.isArray(studioData.SIGNATURE_STYLES) && studioData.SIGNATURE_STYLES.length
    ? studioData.SIGNATURE_STYLES
    : FALLBACK_SIGNATURE_STYLES;

  const romans = ["I", "II", "III", "IV"];
  const defaultFilters = ["bridal", "vines", "festive", "minimalist"];

  container.innerHTML = source
    .slice(0, 4)
    .map((style, idx) => {
      const fallback = FALLBACK_SIGNATURE_STYLES[idx] || {};
      const roman = style.numeral || style.roman || romans[idx] || String(idx + 1);
      const rawTitle = String(style.title || fallback.title || "").replace(/^\s*0?\d\s*\/\s*/i, "");
      const sub = style.tradition || fallback.tradition || "";
      const notes = style.notes || style.description || fallback.description || "";
      const cat = style.categoryFilter || fallback.categoryFilter || defaultFilters[idx] || "all";
      const catLabel = CATEGORY_LABELS[cat] || "Archive";
      const pkgId = style.recommendedPackageId || style.packageId || fallback.recommendedPackageId || "royal-bridal";
      const formulaId = style.formulaId || fallback.formulaId || (cat === "minimalist" ? "jagua" : "organic");

      return `
        <article class="tradition-column" data-tradition-idx="${idx}" data-tradition-cat="${escapeHtml(cat)}">
          <div class="tradition-column__head">
            <span class="tradition-column__numeral">${escapeHtml(roman)}</span>
            <span class="tradition-column__sub">${escapeHtml(sub)}</span>
          </div>
          <h3 class="tradition-column__title">${escapeHtml(rawTitle)}</h3>
          <p class="tradition-column__notes">${escapeHtml(notes)}</p>
          <div class="tradition-column__actions">
            <button
              type="button"
              class="editorial-link"
              data-tradition-filter="${escapeHtml(cat)}"
            >
              View ${escapeHtml(catLabel)} Works
            </button>
            <button
              type="button"
              class="tradition-inquire-link"
              data-style-inquire="${escapeHtml(pkgId)}"
              data-style-formula="${escapeHtml(formulaId)}"
            >
              Inquire
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function observeArchiveReveals() {
  if (archiveObserver) {
    archiveObserver.disconnect();
    archiveObserver = null;
  }

  const plates = [...document.querySelectorAll("#portfolio-grid .archive-plate")];
  if (!plates.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    plates.forEach((plate) => plate.classList.add("is-revealed"));
    return;
  }

  document.documentElement.classList.add("has-reveal-anim");
  const viewportBottom = window.innerHeight * 0.96;
  const pending = [];

  plates.forEach((plate) => {
    const rect = plate.getBoundingClientRect();
    if (rect.top < viewportBottom) {
      plate.classList.add("is-revealed");
    } else {
      pending.push(plate);
    }
  });

  if (!pending.length) return;

  archiveObserver = new IntersectionObserver(
    (entries) => {
      let revealBatch = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.transitionDelay = `${(revealBatch % 3) * 65}ms`;
        revealBatch += 1;
        el.classList.add("is-revealed");
        archiveObserver?.unobserve(el);
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
  );

  pending.forEach((plate) => archiveObserver.observe(plate));
}

function renderPortfolioGrid(animate = false) {
  const grid = document.getElementById("portfolio-grid");
  const allCountEl = document.getElementById("portfolio-all-count");
  if (!grid) return;

  const visible = getVisiblePortfolioItems();
  const saved = new Set(getMoodboardIds());

  if (allCountEl) allCountEl.textContent = String(portfolioItems.length);

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
                loading="lazy"
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
    observeArchiveReveals();
  };

  const canTransition =
    animate &&
    typeof document.startViewTransition === "function" &&
    document.visibilityState === "visible" &&
    !prefersReducedMotion();

  if (canTransition) {
    try {
      const vt = document.startViewTransition(renderMarkup);
      vt?.ready?.catch(() => {});
      vt?.finished?.catch(() => {});
    } catch {
      renderMarkup();
    }
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

function filterArchiveAndScroll(cat) {
  if (!cat) return;
  activeCategory = cat;
  playTactileTick();
  syncFilterButtons();
  renderPortfolioGrid(true);
  const archive = document.getElementById("portfolio");
  if (archive) {
    archive.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

function bindEvents() {
  const stylesGrid = document.getElementById("signature-styles-grid");
  const ornament = document.getElementById("traditions-ornament");

  stylesGrid?.addEventListener("click", (e) => {
    const inquireBtn = e.target.closest("[data-style-inquire]");
    if (inquireBtn) {
      e.stopPropagation();
      playTactileTick();
      scrollToBooking({
        packageId: inquireBtn.getAttribute("data-style-inquire") || "royal-bridal",
        formulaId: inquireBtn.getAttribute("data-style-formula") || "organic",
      });
      return;
    }

    const filterBtn = e.target.closest("[data-tradition-filter]");
    if (filterBtn) {
      filterArchiveAndScroll(filterBtn.getAttribute("data-tradition-filter"));
      return;
    }

    const col = e.target.closest("[data-tradition-cat]");
    if (col) {
      filterArchiveAndScroll(col.getAttribute("data-tradition-cat"));
    }
  });

  if (stylesGrid && ornament) {
    stylesGrid.addEventListener("mouseover", (e) => {
      if (e.target.closest(".tradition-column")) ornament.classList.add("is-hovered");
    });
    stylesGrid.addEventListener("mouseleave", () => {
      ornament.classList.remove("is-hovered");
    });
    stylesGrid.addEventListener("focusin", (e) => {
      if (e.target.closest(".tradition-column")) ornament.classList.add("is-hovered");
    });
    stylesGrid.addEventListener("focusout", () => {
      ornament.classList.remove("is-hovered");
    });
  }

  const filtersEl = document.getElementById("portfolio-filters");
  filtersEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    const cat = btn.getAttribute("data-category");
    if (!cat || cat === activeCategory) return;
    activeCategory = cat;
    playTactileTick();
    syncFilterButtons();
    renderPortfolioGrid(true);
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
  initHeroReel();
  renderSignatureStyles();
  initBotanicalOrnament();
  renderPortfolioGrid(false);
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
