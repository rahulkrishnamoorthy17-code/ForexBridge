/**
 * Core Shared Functionality — Currency Exchange & Forex Service
 * Theme, RTL, navigation, animations, modals, forms, and common utilities.
 */

const ForexApp = (() => {
  "use strict";

  // ─── State ───────────────────────────────────────────────────────────

  const state = {
    theme: "light",
    rtl: false,
    mobileMenuOpen: false,
    openDropdown: null,
    openModal: null,
    scrollY: 0,
  };

  // ─── DOM Ready ───────────────────────────────────────────────────────

  function init() {
    const inits = [
      _initTheme,
      _initRTL,
      _initStickyHeader,
      _initMobileMenu,
      _initDropdowns,
      _initNavFooterClickMotion,
      _initPremiumMotion,
      _initScrollReveal,
      _initBackToTop,
      _initFaqAccordion,
      _initModals,
      _initSmoothScroll,
      _initFormValidation,
      _initFooterNewsletter,
      _initKeyboardShortcuts,
    ];
    inits.forEach((fn) => {
      try {
        fn();
      } catch (_) {
        /* isolate failures so one module can never blank the page */
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ─── Theme Toggle (Dark / Light) ─────────────────────────────────────

  function _initTheme() {
    const saved = _lsGet("forex-theme");
    if (saved === "dark" || saved === "light") {
      state.theme = saved;
    } else if (_prefersDark()) {
      state.theme = "dark";
    }
    _applyTheme();
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => toggleTheme());
    });
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    _lsSet("forex-theme", state.theme);
    _applyTheme();
    _emit("themechange", { theme: state.theme });
  }

  function setTheme(theme) {
    if (theme !== "dark" && theme !== "light") return;
    state.theme = theme;
    _lsSet("forex-theme", theme);
    _applyTheme();
  }

  function _applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    const toggleBtns = document.querySelectorAll("[data-theme-toggle]");
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = state.theme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
      btn.setAttribute("aria-label", `Switch to ${state.theme === "dark" ? "light" : "dark"} mode`);
    });
  }

  function _prefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // ─── RTL / LTR Toggle ────────────────────────────────────────────────

  function _initRTL() {
    const saved = _lsGet("forex-rtl");
    if (saved === "true") {
      state.rtl = true;
    }
    _applyRTL();
    document.querySelectorAll("[data-rtl-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => toggleRTL());
    });
  }

  function toggleRTL() {
    state.rtl = !state.rtl;
    _lsSet("forex-rtl", String(state.rtl));
    _applyRTL();
    _emit("directionchange", { rtl: state.rtl });
  }

  function _applyRTL() {
    const dir = state.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", state.rtl ? "ar" : "en");
    const rtlBtns = document.querySelectorAll("[data-rtl-toggle]");
    rtlBtns.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(state.rtl));
      const label = btn.querySelector(".toggle-label");
      if (label) label.textContent = state.rtl ? "LTR" : "RTL";
    });
  }

  // ─── Sticky Header ──────────────────────────────────────────────────

  function _initStickyHeader() {
    const header = document.querySelector(".site-header, [data-sticky-header]");
    if (!header) return;

    let lastScroll = 0;
    const threshold = 60;

    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > threshold) {
          header.classList.add("is-sticky");
        } else {
          header.classList.remove("is-sticky");
        }

        /* Header must always stay visible while scrolling. */
        header.classList.remove("is-hidden");
        lastScroll = currentScroll;
      },
      { passive: true }
    );
  }

  // ─── Mobile Menu ────────────────────────────────────────────────────

  function _initMobileMenu() {
    const menu = document.querySelector("[data-mobile-menu]");
    const overlay = document.querySelector("[data-mobile-menu-overlay]");

    if (!menu) return;

    const toggleBtns = document.querySelectorAll("[data-mobile-menu-toggle]");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleMobileMenu();
      });
    });

    if (overlay) {
      overlay.addEventListener("click", () => {
        closeMobileMenu();
      });
    }

    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }

  function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    const toggleBtn = document.querySelector("[data-mobile-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const overlay = document.querySelector("[data-mobile-menu-overlay]");
    const body = document.body;

    if (menu) menu.classList.toggle("is-open", state.mobileMenuOpen);
    if (overlay) overlay.classList.toggle("is-visible", state.mobileMenuOpen);
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", String(state.mobileMenuOpen));

    document.body.classList.toggle("menu-open", state.mobileMenuOpen); document.body.classList.toggle("mobile-menu-open", state.mobileMenuOpen);

    if (state.mobileMenuOpen) {
      const firstLink = menu ? menu.querySelector("a, button") : null;
      if (firstLink) firstLink.focus();
    }
  }

  function closeMobileMenu() {
    if (!state.mobileMenuOpen) return;
    state.mobileMenuOpen = false;
    const toggleBtn = document.querySelector("[data-mobile-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const overlay = document.querySelector("[data-mobile-menu-overlay]");

    if (menu) menu.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-visible");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
    document.body.classList.remove("menu-open"); document.body.classList.remove("mobile-menu-open");
  }

  // ─── Dropdown Navigation (Accessible) ───────────────────────────────

  function _initDropdowns() {
    const triggers = document.querySelectorAll("[data-dropdown-trigger]");

    triggers.forEach((trigger) => {
      const dropdownId = trigger.getAttribute("data-dropdown-trigger");
      const panel = document.getElementById(dropdownId);
      if (!panel) return;

      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        _toggleDropdown(trigger, panel);
      });

      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          _toggleDropdown(trigger, panel);
        } else if (e.key === "Escape") {
          _closeDropdown(trigger, panel);
        }
      });

      panel.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          _closeDropdown(trigger, panel);
        }
        if (e.key === "Tab") {
          const focusables = panel.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    });

    document.addEventListener("click", () => {
      _closeAllDropdowns();
    });
  }

  function _toggleDropdown(trigger, panel) {
    const isOpen = panel.classList.contains("is-open");
    _closeAllDropdowns();
    if (!isOpen) {
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      state.openDropdown = panel;
      const firstItem = panel.querySelector("a, button");
      if (firstItem) firstItem.focus();
    }
  }

  function _closeDropdown(trigger, panel) {
    panel.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    state.openDropdown = null;
    trigger.focus();
  }

  function _closeAllDropdowns() {
    document.querySelectorAll("[data-dropdown-panel].is-open").forEach((panel) => {
      panel.classList.remove("is-open");
    });
    document.querySelectorAll("[data-dropdown-trigger][aria-expanded='true']").forEach((trigger) => {
      trigger.setAttribute("aria-expanded", "false");
    });
    state.openDropdown = null;
  }

  // ─── Navbar + Footer Brand Click Motion ─────────────────────────────

  function _initNavFooterClickMotion() {
    const reduced = _prefersReducedMotion();
    const navControls = document.querySelectorAll('.site-header .icon-btn, .site-header .header-cta');
    const footerBrands = document.querySelectorAll('.footer-brand__logo');

    function replayClass(el, className, duration) {
      if (!el || reduced) return;
      el.classList.remove(className);
      void el.offsetWidth;
      el.classList.add(className);
      window.setTimeout(() => el.classList.remove(className), duration || 520);
    }

    navControls.forEach((control) => {
      if (control.dataset.fxClickMotionBound === 'true') return;
      control.dataset.fxClickMotionBound = 'true';

      control.addEventListener('pointerdown', () => replayClass(control, 'fx-nav-press', 430));
      control.addEventListener('click', (event) => {
        replayClass(control, 'fx-nav-click', 560);

        const icon = control.querySelector('i');
        if (icon) {
          if (control.matches('[data-theme-toggle]')) replayClass(icon, 'fx-icon-theme-spin', 580);
          else if (control.matches('.hamburger,[data-mobile-menu-toggle]')) replayClass(icon, 'fx-icon-menu-pop', 480);
          else if (control.matches('a[href*="login"],a[aria-label*="Login" i]')) replayClass(icon, 'fx-icon-user-pop', 520);
          else replayClass(icon, 'fx-icon-pulse', 480);
        }

        if (control.matches('[data-rtl-toggle]')) {
          const label = control.querySelector('.toggle-label');
          if (label) replayClass(label, 'fx-rtl-flip', 560);
        }

        if (
          control.matches('a[href]') &&
          event.button === 0 &&
          !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
          control.target !== '_blank'
        ) {
          const href = control.getAttribute('href');
          if (href && href !== '#' && !href.startsWith('javascript:')) {
            event.preventDefault();
            window.setTimeout(() => { window.location.href = href; }, reduced ? 0 : 150);
          }
        }
      });
    });

    footerBrands.forEach((brand) => {
      if (brand.dataset.fxBrandMotionBound === 'true') return;
      brand.dataset.fxBrandMotionBound = 'true';

      brand.addEventListener('pointerdown', () => replayClass(brand, 'fx-brand-press', 420));
      brand.addEventListener('click', (event) => {
        replayClass(brand, 'fx-brand-click', 680);
        const mark = brand.querySelector('.logo-mark');
        if (mark) replayClass(mark, 'fx-brand-mark-spin', 680);

        if (
          brand.matches('a[href]') &&
          event.button === 0 &&
          !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
          brand.target !== '_blank'
        ) {
          const href = brand.getAttribute('href');
          if (href && href !== '#') {
            event.preventDefault();
            window.setTimeout(() => { window.location.href = href; }, reduced ? 0 : 210);
          }
        }
      });
    });
  }

  // ─── Premium Site Motion ─────────────────────────────────────────────

  function _initPremiumMotion() {
    const root = document.documentElement;
    root.classList.add("fx-motion-ready");

    if (_prefersReducedMotion() || !("IntersectionObserver" in window)) {
      root.classList.add("fx-reduced-motion");
      return;
    }

    const targetSelector = [
      ".hero-content",
      ".page-hero__content",
      ".hero .converter",
      ".hero-visual",
      ".section-head",
      ".section-header",
      ".card",
      ".blog-card",
      ".branch-card",
      ".rate-card",
      ".pricing-card",
      ".stat-card",
      ".service-card",
      ".branch-helper-card",
      ".blog-insight-card",
      ".service-detail__panel",
      ".faq-item",
      ".contact-card",
      ".testimonial-card",
      ".timeline-item",
      ".rate-table",
      ".table-card",
      ".admin-card",
      ".dashboard-card",
      ".footer-top > *",
      ".footer-bottom"
    ].join(",");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("fx-in");
          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    function bindElement(el) {
      if (!(el instanceof Element) || el.dataset.fxMotionBound === "true") return;
      el.dataset.fxMotionBound = "true";
      el.classList.add("fx-animate");

      if (el.matches(".hero .converter, .hero-visual")) {
        el.classList.add("fx-from-right");
      } else if (el.matches(".hero-content")) {
        el.classList.add("fx-from-left");
      } else if (el.matches(".page-hero__content, .blog-insight-card")) {
        el.classList.add("fx-scale-in");
      } else if (el.matches(".reveal-left")) {
        el.classList.add("fx-from-left");
      } else if (el.matches(".reveal-right")) {
        el.classList.add("fx-from-right");
      }

      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((node) => node.matches && node.matches(targetSelector));
        const index = Math.max(0, siblings.indexOf(el));
        el.style.setProperty("--fx-delay", `${Math.min((index % 6) * 70, 350)}ms`);
      }

      try {
        revealObserver.observe(el);
      } catch (_) {
        el.classList.add("fx-in");
      }
    }

    function decorate(scope) {
      if (!scope) return;
      if (scope.nodeType === 1 && scope.matches && scope.matches(targetSelector)) bindElement(scope);
      if (!scope.querySelectorAll) return;
      scope.querySelectorAll(targetSelector).forEach(bindElement);
    }

    decorate(document);

    // Animate newly-rendered service, blog, branch and rate cards too.
    if ("MutationObserver" in window && document.body) {
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) decorate(node);
          });
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Header entrance is intentionally short so navigation remains instantly usable.
    const header = document.querySelector(".site-header");
    if (header) {
      const items = header.querySelectorAll(".brand, .logo, .site-logo, .navbar-brand, nav > *, .header-actions > *, .nav-actions > *");
      items.forEach((el, index) => {
        el.classList.add("fx-nav-item");
        el.style.setProperty("--fx-nav-delay", `${Math.min(index * 45, 270)}ms`);
      });
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("fx-page-loaded")));
    }

    // Smooth count-up for high-level stats only; values keep their original suffixes.
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          counterObserver.unobserve(el);
          _animatePremiumCounter(el);
        });
      },
      { threshold: 0.55 }
    );

    document.querySelectorAll(".hero-stat__number, .stat-card__number, [data-counter]").forEach((el) => {
      if (el.dataset.fxCounterBound === "true") return;
      el.dataset.fxCounterBound = "true";
      counterObserver.observe(el);
    });
  }

  function _animatePremiumCounter(el) {
    if (!el || el.dataset.fxCounterDone === "true") return;
    const original = (el.textContent || "").trim();
    const match = original.match(/^([^0-9-]*)(-?[0-9][0-9,.]*)(.*)$/);
    if (!match) return;

    const prefix = match[1] || "";
    const numericText = match[2].replace(/,/g, "");
    const suffix = match[3] || "";
    const target = Number(numericText);
    if (!Number.isFinite(target)) return;

    const decimals = numericText.includes(".") ? numericText.split(".")[1].length : 0;
    const duration = 850;
    const start = performance.now();
    el.dataset.fxCounterDone = "true";

    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      const formatted = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = original;
    }

    requestAnimationFrame(frame);
  }

  // ─── Scroll Reveal Animations ───────────────────────────────────────

  function _initScrollReveal() {
    if (_prefersReducedMotion()) return;
    if (!("IntersectionObserver" in window)) return;

    const selector = "[data-reveal], .reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger";
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    // Only toggle hidden starting states once we can guarantee every
    // reveal element will be observed (progressive enhancement).
    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
            if (delay > 0) {
              setTimeout(() => el.classList.add("revealed"), delay);
            } else {
              el.classList.add("revealed");
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
      try {
        observer.observe(el);
      } catch (_) {
        el.classList.add("revealed");
      }
    });
  }

  // ─── Back to Top Button ─────────────────────────────────────────────

  function _initBackToTop() {
    const btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.pageYOffset > 400) {
          btn.classList.add("is-visible");
        } else {
          btn.classList.remove("is-visible");
        }
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      // Replay a visible premium feedback animation before/while scrolling.
      btn.classList.remove("is-clicking");
      void btn.offsetWidth;
      btn.classList.add("is-clicking");
      window.setTimeout(() => btn.classList.remove("is-clicking"), 680);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ─── FAQ Accordion ──────────────────────────────────────────────────

  function _initFaqAccordion() {
    const containers = document.querySelectorAll("[data-faq], .faq-list, .faq-accordion");

    containers.forEach((container) => {
      const questions = container.querySelectorAll(".faq-question, [data-faq-question]");
      questions.forEach((btn) => {
        btn.addEventListener("click", () => {
          const answer = btn.nextElementSibling || btn.parentElement.querySelector(".faq-answer, [data-faq-answer]");
          if (!answer) return;

          const isOpen = btn.getAttribute("aria-expanded") === "true";

          container.querySelectorAll(".faq-question[aria-expanded='true'], [data-faq-question][aria-expanded='true']").forEach((openBtn) => {
            openBtn.setAttribute("aria-expanded", "false");
            const openAnswer = openBtn.nextElementSibling || openBtn.parentElement.querySelector(".faq-answer, [data-faq-answer]");
            if (openAnswer) {
              openAnswer.hidden = true;
              openBtn.parentElement.classList.remove("is-open");
            }
          });

          if (!isOpen) {
            btn.setAttribute("aria-expanded", "true");
            answer.hidden = false;
            btn.parentElement.classList.add("is-open");
          }
        });

        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
          }
        });
      });
    });
  }

  // ─── Toast Notifications ────────────────────────────────────────────

  function showToast(message, options) {
    const opts = options || {};
    const type = opts.type || "info";
    const duration = opts.duration || 4000;
    const position = opts.position || "bottom-right";

    let container = document.querySelector("[data-toast-container]");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("data-toast-container", "");
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "true");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.setAttribute("role", "alert");

    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle",
    };

    toast.innerHTML = `
      <i class="${icons[type] || icons.info} toast__icon" aria-hidden="true"></i>
      <span class="toast__message">${_esc(message)}</span>
      <button class="toast__close" aria-label="Dismiss notification">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>`;

    toast.querySelector(".toast__close").addEventListener("click", () => _removeToast(toast));

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("toast--visible");
    });

    if (duration > 0) {
      setTimeout(() => _removeToast(toast), duration);
    }

    return toast;
  }

  function _removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.remove("toast--visible");
    toast.classList.add("toast--exiting");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }

  // ─── Modal / Dialog Management ──────────────────────────────────────

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    _closeCurrentModal();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    state.openModal = modal;

    const focusTrap = modal.querySelector("[data-focus-trap]");
    if (focusTrap) {
      focusTrap.focus();
    } else {
      const firstFocusable = modal.querySelector(
        'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) firstFocusable.focus();
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.matches("[data-modal-close]")) {
        closeModal(modalId);
      }
    });
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (state.openModal === modal) state.openModal = null;

    const trigger = document.querySelector(`[data-modal-trigger="${modalId}"]`);
    if (trigger) trigger.focus();
  }

  function _closeCurrentModal() {
    if (state.openModal) {
      const id = state.openModal.id;
      if (id) closeModal(id);
    }
  }

  function _initModals() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.openModal) {
        _closeCurrentModal();
      }
    });

    document.querySelectorAll("[data-modal-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const target = trigger.getAttribute("data-modal-trigger");
        if (target) openModal(target);
      });
    });

    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest("[role='dialog'], .modal");
        if (modal && modal.id) closeModal(modal.id);
      });
    });

    document.querySelectorAll("[data-open-modal]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-open-modal");
        if (target) openModal(target);
      });
    });
  }

  // ─── Smooth Scrolling ───────────────────────────────────────────────

  function _initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#" || href === "#!") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerHeight = _getHeaderHeight();
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({ top, behavior: _prefersReducedMotion() ? "auto" : "smooth" });

        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  function _getHeaderHeight() {
    const header = document.querySelector(".site-header, [data-sticky-header]");
    return header ? header.offsetHeight : 0;
  }

  function scrollToElement(selector, offset) {
    const el = document.querySelector(selector);
    if (!el) return;
    const headerH = _getHeaderHeight();
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerH - (offset || 20);
    window.scrollTo({ top, behavior: _prefersReducedMotion() ? "auto" : "smooth" });
  }

  // ─── Form Validation Utilities ──────────────────────────────────────

  function _initFormValidation() {
    document.querySelectorAll("[data-validate-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        if (!validateForm(form)) {
          e.preventDefault();
          e.stopPropagation();
        }
      });

      form.querySelectorAll("input, select, textarea").forEach((field) => {
        field.addEventListener("blur", () => _validateField(field));
        field.addEventListener("input", () => {
          if (field.classList.contains("is-invalid")) {
            _validateField(field);
          }
        });
      });
    });
  }

  function validateForm(form) {
    if (!form) return false;
    let valid = true;
    const fields = form.querySelectorAll("[required], [data-rule]");

    fields.forEach((field) => {
      if (!_validateField(field)) {
        valid = false;
      }
    });

    return valid;
  }

  function _validateField(field) {
    const value = field.value.trim();
    const rules = (field.getAttribute("data-rule") || "").split("|");
    const errorEl = field.parentElement ? field.parentElement.querySelector(".field-error") : null;
    let error = "";

    if (field.hasAttribute("required") && value === "") {
      error = "This field is required";
    } else if (rules.includes("email") && value !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email address";
    } else if (rules.includes("phone") && value !== "" && !/^[+]?[\d\s\-()]{7,15}$/.test(value)) {
      error = "Please enter a valid phone number";
    } else if (rules.includes("minlength")) {
      const minMatch = rules.find((r) => r.startsWith("minlength"));
      if (minMatch) {
        const min = parseInt(minMatch.split(":")[1] || "0", 10);
        if (value.length > 0 && value.length < min) {
          error = `Minimum ${min} characters required`;
        }
      }
    } else if (rules.includes("maxlength")) {
      const maxMatch = rules.find((r) => r.startsWith("maxlength"));
      if (maxMatch) {
        const max = parseInt(maxMatch.split(":")[1] || "999", 10);
        if (value.length > max) {
          error = `Maximum ${max} characters allowed`;
        }
      }
    } else if (rules.includes("numeric") && value !== "" && !/^\d+(\.\d+)?$/.test(value)) {
      error = "Please enter a valid number";
    }

    if (error) {
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.hidden = false;
      } else {
        const msg = document.createElement("span");
        msg.className = "field-error";
        msg.setAttribute("role", "alert");
        msg.textContent = error;
        field.parentElement.appendChild(msg);
      }
      return false;
    } else {
      field.classList.remove("is-invalid");
      field.setAttribute("aria-invalid", "false");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.hidden = true;
      }
      return true;
    }
  }

  function resetForm(form) {
    if (!form) return;
    form.reset();
    form.querySelectorAll(".is-invalid").forEach((f) => {
      f.classList.remove("is-invalid");
      f.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".field-error").forEach((e) => {
      e.textContent = "";
      e.hidden = true;
    });
  }

  // ─── Number Formatting (Indian System) ──────────────────────────────

  function formatINR(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return "\u20B90";
    return "\u20B9" + num.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  function formatINRFull(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return "\u20B90.00";
    return "\u20B9" + num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatNumber(value, decimals) {
    const num = Number(value);
    if (Number.isNaN(num)) return "0";
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || 0,
    });
  }

  function formatCompact(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return "0";
    if (num >= 10000000) return "\u20B9" + (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return "\u20B9" + (num / 100000).toFixed(2) + " L";
    if (num >= 1000) return "\u20B9" + (num / 1000).toFixed(1) + " K";
    return "\u20B9" + String(num);
  }

  // ─── Utility Functions ──────────────────────────────────────────────

  function _lsGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function _lsSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_) {
      /* quota exceeded or private mode */
    }
  }

  function _prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function _esc(str) {
    if (typeof str !== "string") return "";
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return str.replace(/[&<>"']/g, (c) => map[c]);
  }

  // ─── Simple Event Emitter ───────────────────────────────────────────

  const _events = {};

  function on(event, handler) {
    if (!_events[event]) _events[event] = [];
    _events[event].push(handler);
    return () => {
      _events[event] = _events[event].filter((h) => h !== handler);
    };
  }

  function _emit(event, data) {
    const handlers = _events[event] || [];
    handlers.forEach((h) => {
      try {
        h(data);
      } catch (_) {
        /* swallow subscriber errors */
      }
    });
  }

  // ─── Debounce / Throttle ────────────────────────────────────────────

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function throttle(fn, limit) {
    let inThrottle = false;
    return function (...args) {
      if (inThrottle) return;
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    };
  }

  // ─── Clipboard ──────────────────────────────────────────────────────

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard", { type: "success", duration: 2000 });
        return true;
      } catch (_) {
        /* fall through to fallback */
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;left:-9999px;opacity:0";
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }
    document.body.removeChild(textarea);
    if (ok) {
      showToast("Copied to clipboard", { type: "success", duration: 2000 });
    }
    return ok;
  }


  // ─── Footer Newsletter ─────────────────────────────────────────────

  function _initFooterNewsletter() {
    document.querySelectorAll("[data-footer-newsletter]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input) return;
        if (!input.checkValidity()) {
          input.reportValidity();
          return;
        }
        showToast("Subscribed to ForexBridge updates (demo)", { type: "success", duration: 2600 });
        form.reset();
      });
    });
  }

  // ─── Keyboard Shortcuts ─────────────────────────────────────────────

  function _initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "t") {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // ─── Public API ──────────────────────────────────────────────────────

  return Object.freeze({
    state,

    toggleTheme,
    setTheme,
    toggleRTL,

    toggleMobileMenu,
    closeMobileMenu,

    openModal,
    closeModal,

    showToast,

    scrollToElement,
    validateForm,
    resetForm,

    formatINR,
    formatINRFull,
    formatNumber,
    formatCompact,

    copyToClipboard,

    debounce,
    throttle,

    on,

    init,
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ForexApp;
}
window.ForexApp = ForexApp;
