/**
 * Admin Dashboard — Currency Exchange & Forex Service
 * Powers admin-dashboard.html (staff-only demo panel, never part of the
 * public customer journey). Includes sidebar behaviour, KPI counters,
 * lightweight canvas charts and demo table rendering.
 */

const ForexAdmin = (() => {
  "use strict";

  // ─── Sidebar (collapsible, persists across screens) ────────────────
  function _initSidebar() {
    const sidebar = document.querySelector("[data-admin-sidebar]");
    const content = document.querySelector("[data-admin-content]");
    const toggleBtn = document.querySelector("[data-admin-toggle]");

    if (!sidebar) return;

    const saved = _lsGet("fx-admin-sidebar");
    const startCollapsed = saved === "collapsed" && window.innerWidth > 1024;

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.toggle("is-open");
        } else {
          sidebar.classList.toggle("collapsed");
          if (content) content.classList.toggle("expanded", sidebar.classList.contains("collapsed"));
          _lsSet("fx-admin-sidebar", sidebar.classList.contains("collapsed") ? "collapsed" : "open");
        }
      });
    }

    // Keyboard: Esc closes mobile sidebar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.classList.contains("is-open")) {
        sidebar.classList.remove("is-open");
      }
    });
  }

  // ─── Active nav state ───────────────────────────────────────────────
  function _initActiveNav() {
    const links = document.querySelectorAll("[data-admin-nav] [data-nav]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        links.forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
        if (window.ForexApp) ForexApp.showToast(`Navigated to: ${link.textContent.trim()}`, {
          type: "info",
          duration: 1800,
        });
      });
    });
  }

  // ─── KPI counters ───────────────────────────────────────────────────
  function _animateCounters() {
    const counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.getAttribute("data-count-to"));
          const duration = 900;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString("en-IN");
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString("en-IN");
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  // ─── Lightweight Charts (canvas, no external libraries) ─────────────
  function _drawBarChart(canvas, data, labels, color) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 480;
    const cssH = canvas.clientHeight || 200;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, cssW, cssH);
    const pad = { top: 16, right: 16, bottom: 32, left: 40 };
    const chartW = cssW - pad.left - pad.right;
    const chartH = cssH - pad.top - pad.bottom;
    const max = Math.max(...data) * 1.15;

    // grid lines
    ctx.strokeStyle = "rgba(120,140,160,0.12)";
    ctx.fillStyle = "rgba(120,140,160,0.65)";
    ctx.font = "10px sans-serif";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + chartH - (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(cssW - pad.right, y);
      ctx.stroke();
      const val = Math.round((max / 4) * i);
      ctx.fillText(String(val), 0, y + 3);
    }

    const barW = Math.min(40, (chartW / data.length) * 0.55);
    const gap = chartW / data.length;
    data.forEach((value, i) => {
      const barH = Math.max(2, (value / max) * chartH);
      const x = pad.left + i * gap + (gap - barW) / 2;
      const y = pad.top + chartH - barH;
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, color || "#0D9373");
      grad.addColorStop(1, (color || "#0D9373") + "55");
      ctx.fillStyle = grad;
      _roundRect(ctx, x, y, barW, barH, 6);
      ctx.fill();
      ctx.fillStyle = "rgba(120,140,160,0.85)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(labels[i] || "", x + barW / 2, cssH - pad.bottom + 16);
      ctx.textAlign = "left";
    });
  }

  function _drawLineChart(canvas, data, labels, color) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 480;
    const cssH = canvas.clientHeight || 200;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, cssW, cssH);
    const pad = { top: 16, right: 16, bottom: 32, left: 40 };
    const chartW = cssW - pad.left - pad.right;
    const chartH = cssH - pad.top - pad.bottom;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    const top = max + span * 0.15;
    const bottom = Math.max(0, min - span * 0.15);

    // grid lines
    ctx.strokeStyle = "rgba(120,140,160,0.12)";
    ctx.fillStyle = "rgba(120,140,160,0.65)";
    ctx.font = "10px sans-serif";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + chartH - (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(cssW - pad.right, y);
      ctx.stroke();
      const val = Math.round(top - ((top - bottom) / 4) * i);
      ctx.fillText(String(val), 0, y + 3);
    }

    ctx.strokeStyle = color || "#0D9373";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = pad.left + (i / (data.length - 1 || 1)) * chartW;
      const y = pad.top + chartH - ((value - bottom) / (top - bottom)) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.lineWidth = 1;
    data.forEach((value, i) => {
      const x = pad.left + (i / (data.length - 1 || 1)) * chartW;
      const y = pad.top + chartH - ((value - bottom) / (top - bottom)) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color || "#0D9373";
      ctx.fill();
    });
    ctx.fillStyle = "rgba(120,140,160,0.85)";
    ctx.textAlign = "center";
    labels.forEach((label, i) => {
      if (i % Math.ceil(labels.length / 6) !== 0 && i !== labels.length - 1) return;
      const x = pad.left + (i / (data.length - 1 || 1)) * chartW;
      ctx.fillText(label, x, cssH - pad.bottom + 16);
    });
    ctx.textAlign = "left";
  }

  function _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function _initCharts() {
    const bar1 = document.querySelector("[data-chart='enquiries']");
    if (bar1) {
      _drawBarChart(bar1, [42, 38, 51, 47, 63, 58, 72], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "#0D9373");
    }
    const line1 = document.querySelector("[data-chart='rates']");
    if (line1) {
      _drawLineChart(line1, [83.1, 83.34, 83.22, 83.48, 83.4, 83.55, 83.42],
        ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "Now"], "#0D9373");
    }
    const bar2 = document.querySelector("[data-chart='remittance']");
    if (bar2) {
      _drawBarChart(bar2, [120, 138, 96, 150, 174, 132], ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], "#D4A574");
    }
    window.addEventListener("resize", () => {
      if (bar1) _drawBarChart(bar1, [42, 38, 51, 47, 63, 58, 72], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "#0D9373");
      if (line1) _drawLineChart(line1, [83.1, 83.34, 83.22, 83.48, 83.4, 83.55, 83.42],
        ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "Now"], "#0D9373");
      if (bar2) _drawBarChart(bar2, [120, 138, 96, 150, 174, 132], ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], "#D4A574");
    });
  }

  // ─── Demo toggle actions (toast feedback, no backend) ───────────────
  function _initDemoActions() {
    document.querySelectorAll("[data-admin-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-admin-action") || "Saved";
        if (window.ForexApp) {
          ForexApp.showToast(`${action} (demo — connect your backend to persist)`, {
            type: "success",
            duration: 2600,
          });
        }
      });
    });
  }

  // ─── Helpers ────────────────────────────────────────────────────────
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
      /* private mode */
    }
  }

  // Boot on DOM ready
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
      _initSidebar();
      _initActiveNav();
      _animateCounters();
      _initCharts();
      _initDemoActions();
    });
  }

  return Object.freeze({
    drawBarChart: _drawBarChart,
    drawLineChart: _drawLineChart,
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ForexAdmin;
}
window.ForexAdmin = ForexAdmin;
