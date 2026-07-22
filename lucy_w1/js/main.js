/* ============================================================
   Lucy Compass — site behavior (no build step, plain JS)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveals();
  initHeroVideo();
  initFiveElements();
  initForms();
});

/* ---------------- Navbar ---------------- */
function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector(".nav-mobile");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = toggle.classList.toggle("is-open");
      mobile.classList.toggle("is-open", open);
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("a, .btn").forEach((el) => {
      el.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        mobile.classList.remove("is-open");
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/* ---------------- Scroll reveals ---------------- */
function initReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------------- Hero video: parallax + sound toggle ---------------- */
function initHeroVideo() {
  const hero = document.querySelector(".hero");
  const video = document.querySelector(".hero-video");
  const soundBtn = document.querySelector(".hero-sound-toggle");
  if (!hero || !video) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (hero.offsetHeight * 0.9)));
        video.style.transform = `scale(${1.02 + progress * 0.12})`;
        video.style.opacity = String(1 - progress * 0.55);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      soundBtn.textContent = video.muted ? "Sound Off" : "Sound On";
      soundBtn.setAttribute("aria-pressed", String(!video.muted));
    });
  }
}

/* ---------------- Five Elements interactive selector ---------------- */
function initFiveElements() {
  const buttons = document.querySelectorAll(".element-btn");
  const detail = document.querySelector(".element-detail");
  const image = document.querySelector(".element-bg");
  if (!buttons.length || !detail) return;

  const data = window.LUCY_ELEMENTS || [];

  function render(index) {
    const el = data[index];
    if (!el) return;
    detail.querySelector(".swatch").style.backgroundColor = el.color;
    detail.querySelector(".swatch").textContent = el.chinese;
    detail.querySelector(".meta").textContent = `${el.season} \u00B7 ${el.trait}`;
    detail.querySelector("h3").textContent = el.name;
    detail.querySelector("p").textContent = el.description;
    buttons.forEach((b, i) => b.classList.toggle("active", i === index));

    if (image) {
      image.classList.remove("is-loaded");
      image.onload = () => image.classList.add("is-loaded");
      image.src = `assets/img/elements/${el.id}.jpg`;
      image.alt = `${el.name} element`;
    }
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => render(i));
    btn.addEventListener("mouseenter", () => render(i));
  });

  render(0);
}

/* ---------------- Contact / booking forms ---------------- */
function initForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // NOTE: wire this up to your backend, form service, or Shopify
      // checkout / booking endpoint. This demo just shows a confirmation.
      const success = document.querySelector(
        `[data-form-success="${form.dataset.form}"]`
      );
      form.classList.add("is-hidden");
      if (success) success.classList.add("is-visible");
    });
  });
}
