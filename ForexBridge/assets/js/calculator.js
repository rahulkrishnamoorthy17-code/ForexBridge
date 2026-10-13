/**
 * Rate Calculator — Currency Exchange & Forex Service
 * Powers the rate-calculator.html page and the quick converter widgets
 * found across the homepage hero sections.
 */

const ForexCalculator = (() => {
  "use strict";

  // ─── Currency Select Population ──────────────────────────────────────
  // Currencies usable in the calculator (all except INR base conversions
  // where appropriate). INR is available as one side of the pair.
  const CALC_CURRENCIES = ["USD", "EUR", "GBP", "AED", "SAR", "SGD", "AUD", "CAD", "JPY", "CHF", "NZD", "INR"];

  function populateSelect(selectEl, selectedCode) {
    if (!selectEl) return;
    const codes = CALC_CURRENCIES;
    selectEl.innerHTML = codes
      .map((code) => {
        const info = (window.ForexRates && ForexRates.getCurrencyInfo(code)) || { name: code, flag: "" };
        return `<option value="${code}">${info.flag ? info.flag + " " : ""}${code} - ${info.name}</option>`;
      })
      .join("");
    if (selectedCode) selectEl.value = selectedCode;
  }

  // ─── Conversion ──────────────────────────────────────────────────────
  // Builds a conversion rate between arbitrary pairs using INR as the base.
  // rate[A] is buy rate of A expressed as units of INR per 1 unit of A.
  // When the target is INR and the source is a foreign currency:
  //   amount(INR) = amount(F) * rate[F]
  // When source is INR and target is foreign currency:
  //   amount(F) = amount(INR) / rate[F]
  // Otherwise convert source -> INR -> target using the sell (dealer) spread
  // for the directions used.
  function getPairRate(fromCode, toCode) {
    if (!window.ForexRates) return null;
    try {
      const rates = ForexRates.getRates();

      if (fromCode === toCode) return 1;

      if (fromCode === "INR") {
        // INR -> FOREIGN : for each 1 INR you receive 1/rate sell
        const r = rates[toCode];
        if (!r) return null;
        return 1 / r.sell;
      }

      if (toCode === "INR") {
        // FOREIGN -> INR : you sell foreign currency, dealer buys at buy rate
        const r = rates[fromCode];
        if (!r) return null;
        return r.buy;
      }

      // FOREIGN -> FOREIGN : source sold at buy rate to the dealer,
      // target purchased from the dealer at sell rate.
      const from = rates[fromCode];
      const to = rates[toCode];
      if (!from || !to) return null;
      const inINR = from.buy;
      return inINR / to.sell;
    } catch (_) {
      return null;
    }
  }

  // ─── Formatting ──────────────────────────────────────────────────────
  function formatAmount(value, code) {
    const info = (window.ForexRates && ForexRates.getCurrencyInfo(code)) || null;
    const symbol = info ? info.symbol : "";
    const decimals = info ? info.decimals : 2;
    let formatted = Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    if (code === "INR") return "\u20B9" + formatted;
    return symbol + formatted;
  }

  // ─── Validation ──────────────────────────────────────────────────────
  function validateAmountInput(input) {
    const wrap = input.closest(".converter__field");
    const errorEl = wrap ? wrap.querySelector(".converter__field-error") : null;
    const raw = input.value.trim();
    let message = "";

    if (raw === "") {
      message = "Please enter an amount to convert.";
    } else {
      const num = Number(raw.replace(/,/g, ""));
      if (Number.isNaN(num)) {
        message = "Please enter a valid number.";
      } else if (num <= 0) {
        message = "Amount must be greater than zero.";
      }
    }

    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = !message;
    }
    if (message) {
      input.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
    } else {
      input.classList.remove("is-invalid");
      input.setAttribute("aria-invalid", "false");
    }
    return !message;
  }

  // ─── Bind a quick converter widget (index.html hero etc.) ───────────
  // markup contract:
  //   .converter[data-converter]
  //     #amount (input), select[data-converter-from], select[data-converter-to]
  //     [data-converter-swap] button
  //     [data-converter-submit] button
  //     [data-converter-result] container
  //     [data-converter-rate] text node
  function initWidget(rootEl) {
    const root = rootEl || document.querySelector("[data-converter]");
    if (!root) return;

    const amountInput = root.querySelector("[data-converter-amount]") || root.querySelector("#amount");
    const fromSelect = root.querySelector("[data-converter-from]");
    const toSelect = root.querySelector("[data-converter-to]");
    const swapBtn = root.querySelector("[data-converter-swap]");
    const submitBtn = root.querySelector("[data-converter-submit]");
    const resultEl = root.querySelector("[data-converter-result]");
    const rateEl = root.querySelector("[data-converter-rate]");

    if (!amountInput || !fromSelect || !toSelect) return;

    function renderRate() {
      if (!rateEl) return;
      if (!window.ForexRates) return;
      const rate = getPairRate(fromSelect.value, toSelect.value);
      if (rate == null) {
        rateEl.textContent = "Rate unavailable at the moment.";
        return;
      }
      rateEl.textContent = `1 ${fromSelect.value} = ${formatAmount(rate, toSelect.value)}`;
    }

    function swap() {
      const fromVal = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = fromVal;
      renderRate();
      if (resultEl) resultEl.innerHTML = "";
    }

    function calculate() {
      if (!validateAmountInput(amountInput)) {
        if (window.ForexApp) ForexApp.showToast("Please enter a valid amount", { type: "error" });
        return;
      }
      if (!window.ForexRates) return;

      const amount = Number(amountInput.value.replace(/,/g, ""));
      const from = fromSelect.value;
      const to = toSelect.value;
      const rate = getPairRate(from, to);

      if (rate == null) {
        if (resultEl) {
          resultEl.innerHTML = `<p class="inline-alert inline-alert--warning">
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
            <span>Rates could not be retrieved. Showing illustrative demo rates instead.</span>
          </p>`;
        }
        return;
      }

      const converted = amount * rate;
      renderRate();

      if (resultEl) {
        resultEl.innerHTML = `
          <div class="converter-result">
            <div class="converter-result__row">
              <span class="converter-result__label">You Convert</span>
              <strong class="converter-result__value">${formatAmount(amount, from)}</strong>
            </div>
            <div class="converter-result__row">
              <span class="converter-result__label">You Receive</span>
              <strong class="converter-result__value converter-result__value--accent">${formatAmount(converted, to)}</strong>
            </div>
            <div class="converter-result__rate">
              <i class="fas fa-info-circle" aria-hidden="true"></i>
              Indicative rate: 1 ${from} = ${formatAmount(rate, to)}
            </div>
          </div>`;
      }

      if (window.ForexApp) ForexApp.showToast("Conversion complete", { type: "success", duration: 2200 });
    }

    if (swapBtn) swapBtn.addEventListener("click", swap);
    if (submitBtn) submitBtn.addEventListener("click", calculate);
    if (amountInput) amountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") calculate();
    });
    [fromSelect, toSelect].forEach((sel) => sel.addEventListener("change", renderRate));

    populateSelect(fromSelect, "USD");
    populateSelect(toSelect, "INR");
    renderRate();
  }

  // ─── Mega level component (rate-calculator page) ────────────────────
  function initFullCalculator() {
    const form = document.querySelector("[data-calc-form]");
    if (!form) return;
    initWidget(form);

    const amountInput = form.querySelector("[data-converter-amount]");
    const fromSelect = form.querySelector("[data-converter-from]");
    const toSelect = form.querySelector("[data-converter-to]");
    const feeInput = form.querySelector("[data-calc-fee]");
    const resetBtn = form.querySelector("[data-calc-reset]");
    const feeEstimateEl = form.querySelector("[data-calc-estimate]");
    const timestampEl = form.querySelector("[data-calc-rate-time]");
    const popularBtns = form.querySelectorAll("[data-calc-popular]");

    function renderFeeEstimate() {
      if (!feeInput || !feeEstimateEl) return;
      const resultBox = form.querySelector("[data-converter-result]");
      const receiveEl = resultBox ? resultBox.querySelector(".converter-result__value--accent") : null;
      if (!receiveEl) return;

      const feeRaw = feeInput.value.trim();
      const fee = feeRaw === "" ? 0 : Math.max(0, Number(feeRaw.replace(/,/g, "")));
      const shown = receiveEl.textContent;
      const num = Number(String(shown).replace(/[^0-9.]/g, ""));
      if (!Number.isFinite(num)) return;
      const net = Math.max(0, num - fee);
      feeEstimateEl.innerHTML = `
        <strong>Estimated amount received</strong>
        <span class="text-accent">${formatAmount(Number(feeRaw === "" ? num : net), toSelect ? toSelect.value : "INR")}</span>`;
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        form.reset();
        populateSelect(fromSelect, "USD");
        populateSelect(toSelect, "INR");
        const resultEl = form.querySelector("[data-converter-result]");
        if (resultEl) resultEl.innerHTML = "";
        if (feeEstimateEl) feeEstimateEl.innerHTML = "";
        if (timestampEl) timestampEl.textContent = "";
        if (window.ForexApp) ForexApp.showToast("Calculator reset", { type: "info", duration: 2000 });
      });
    }

    if (feeInput) feeInput.addEventListener("input", renderFeeEstimate);
    if (amountInput) {
      amountInput.addEventListener("input", () => {
        if (feeEstimateEl) feeEstimateEl.innerHTML = "";
      });
    }

    popularBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-calc-popular");
        if (!target) return;
        const [fromCode, toCode] = target.split("/");
        populateSelect(fromSelect, fromCode);
        populateSelect(toSelect, toCode);
        populateSelect;
        const rateEl = form.querySelector("[data-converter-rate]");
        const rate = getPairRate(fromCode, toCode);
        if (rateEl && rate != null) {
          rateEl.textContent = `1 ${fromCode} = ${formatAmount(rate, toCode)}`;
        }
        if (window.ForexApp) ForexApp.showToast(`Set ${fromCode} to ${toCode}`, { type: "info", duration: 1800 });
      });
    });

    // Timestamp
    if (timestampEl && window.ForexRates) {
      const ts = ForexRates.getLastUpdated();
      if (ts) timestampEl.textContent = "Rates last updated: " + ts;
    }
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
      // Any [data-converter] widget not already initialised
      document.querySelectorAll("[data-converter]:not([data-calc-form])").forEach((w) => initWidget(w));
    });
  }

  return Object.freeze({
    initWidget,
    initFullCalculator,
    getPairRate,
    populateSelect,
    formatAmount,
    validateAmountInput,
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ForexCalculator;
}
window.ForexCalculator = ForexCalculator;
