/**
 * ForexBridge Service Action Desk
 * Interactive front-end demo workflows for service detail pages.
 * Uses illustrative demo rates from rates.js. No real payment is processed.
 */
const ForexServiceActions = (() => {
  "use strict";

  const EXCHANGE_IDS = ["currency-exchange", "foreign-currency-buy", "foreign-currency-sell", "travel-money"];
  const TRANSFER_IDS = ["international-money-transfer", "foreign-remittance", "student-remittance"];
  const CARD_IDS = ["travel-card-loading", "travel-card-reloading"];
  const CORPORATE_IDS = ["corporate-forex"];
  const CONSULT_IDS = ["rate-consultation"];
  const DOC_IDS = ["forex-document-assistance"];

  function esc(value) {
    const str = String(value == null ? "" : value);
    return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
  }

  function money(value) {
    if (window.ForexRates && ForexRates.formatINR) return ForexRates.formatINR(value);
    return "₹" + Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function currencies() {
    if (window.ForexRates && ForexRates.getAllCurrencies) return ForexRates.getAllCurrencies();
    return [
      { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", decimals: 2 },
      { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", decimals: 2 },
      { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", decimals: 2 },
      { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", decimals: 2 },
    ];
  }

  function currencyOptions(selected) {
    return currencies().map((c) => `<option value="${c.code}" ${c.code === selected ? "selected" : ""}>${c.flag || ""} ${c.code} — ${esc(c.name)}</option>`).join("");
  }

  function getRate(code, type) {
    if (window.ForexRates && ForexRates.getRate) return ForexRates.getRate(code, type);
    const fallback = { USD: { buy: 83.42, sell: 84.15 }, EUR: { buy: 91.18, sell: 92.05 }, GBP: { buy: 105.72, sell: 106.80 }, AED: { buy: 22.70, sell: 23.15 } };
    return fallback[code] ? fallback[code][type] : 1;
  }

  function saveRequest(type, payload) {
    const item = {
      id: "FX-" + Date.now().toString(36).toUpperCase().slice(-7),
      type,
      createdAt: new Date().toISOString(),
      status: "Draft request",
      ...payload,
    };
    try {
      const existing = JSON.parse(localStorage.getItem("forexbridge_service_requests") || "[]");
      existing.unshift(item);
      localStorage.setItem("forexbridge_service_requests", JSON.stringify(existing.slice(0, 20)));
    } catch (_) {}
    return item;
  }

  function baseShell(title, description, icon, inner) {
    return `
      <section class="service-action-desk" aria-labelledby="serviceActionTitle">
        <div class="service-action-desk__head">
          <div>
            <span class="section-label">Service action</span>
            <h2 id="serviceActionTitle"><i class="${icon}" aria-hidden="true"></i> ${esc(title)}</h2>
            <p>${esc(description)}</p>
          </div>
          <span class="service-action-desk__demo"><i class="fas fa-circle-info" aria-hidden="true"></i> Illustrative demo rates</span>
        </div>
        ${inner}
      </section>`;
  }

  function resultBox() {
    return `<div class="service-action-result" data-action-result aria-live="polite">
      <div>
        <span class="service-action-result__label">Estimated result</span>
        <strong data-result-main>Enter an amount to calculate</strong>
        <span data-result-sub>Final rate is confirmed before processing.</span>
      </div>
      <div class="service-action-result__rate" data-result-rate>—</div>
    </div>`;
  }

  function exchangeMarkup(serviceId) {
    const defaultMode = serviceId === "foreign-currency-sell" ? "sell" : "buy";
    const showTabs = serviceId === "currency-exchange" || serviceId === "travel-money";
    const title = serviceId === "foreign-currency-sell" ? "Sell Foreign Currency" : serviceId === "foreign-currency-buy" ? "Buy Foreign Currency" : "Exchange Currency";
    return baseShell(
      title,
      "Check an indicative amount, choose how you want to exchange, and create a branch request in a few steps.",
      "fas fa-arrow-right-arrow-left",
      `<form class="service-action-form" data-exchange-form data-mode="${defaultMode}">
        ${showTabs ? `<div class="service-action-tabs" role="tablist" aria-label="Exchange action">
          <button class="service-action-tab ${defaultMode === "buy" ? "is-active" : ""}" type="button" data-exchange-mode="buy"><i class="fas fa-cart-shopping"></i> Buy Currency</button>
          <button class="service-action-tab ${defaultMode === "sell" ? "is-active" : ""}" type="button" data-exchange-mode="sell"><i class="fas fa-hand-holding-dollar"></i> Sell Currency</button>
        </div>` : ""}
        <div class="service-action-grid">
          <label class="service-action-field">
            <span>Currency</span>
            <select data-currency>${currencyOptions("USD")}</select>
          </label>
          <label class="service-action-field">
            <span>Foreign amount</span>
            <input type="number" inputmode="decimal" min="1" step="0.01" value="100" data-amount required>
          </label>
          <label class="service-action-field">
            <span data-method-label>${defaultMode === "sell" ? "Payout method" : "Fulfilment"}</span>
            <select data-method>
              ${defaultMode === "sell" ? '<option>UPI payout</option><option>Bank transfer</option><option>Cash payout</option>' : '<option>Branch pickup</option><option>Doorstep delivery</option>'}
            </select>
          </label>
          <label class="service-action-field">
            <span>Preferred city</span>
            <select data-city><option>Coimbatore</option><option>Chennai</option><option>Bengaluru</option><option>Mumbai</option><option>Delhi</option><option>Hyderabad</option><option>Kochi</option></select>
          </label>
        </div>
        ${resultBox()}
        <div class="service-action-footer">
          <p><i class="fas fa-shield-halved"></i> No payment is taken here. This creates a demo service request only.</p>
          <button class="btn btn-primary btn-lg" type="submit" data-submit-label>${defaultMode === "sell" ? "Create Sell Request" : "Reserve Exchange"}</button>
        </div>
      </form>`
    );
  }

  function transferMarkup(serviceId) {
    const isInward = serviceId === "foreign-remittance";
    const isStudent = serviceId === "student-remittance";
    const title = isInward ? "Plan an Inward Remittance" : isStudent ? "Plan a Student Remittance" : "Plan an International Transfer";
    return baseShell(
      title,
      isInward ? "Estimate how much INR may be received from an overseas transfer and prepare a branch enquiry." : "Estimate the foreign amount, choose a transfer purpose, and prepare a transfer request.",
      isInward ? "fas fa-money-bill-transfer" : "fas fa-paper-plane",
      `<form class="service-action-form" data-transfer-form data-inward="${isInward}">
        <div class="service-action-grid">
          <label class="service-action-field">
            <span>${isInward ? "Foreign currency" : "Destination currency"}</span>
            <select data-currency>${currencyOptions(isStudent ? "GBP" : "USD")}</select>
          </label>
          <label class="service-action-field">
            <span>${isInward ? "Foreign amount received" : "Amount to send (INR)"}</span>
            <input type="number" inputmode="decimal" min="1" step="0.01" value="${isInward ? "1000" : "50000"}" data-amount required>
          </label>
          <label class="service-action-field">
            <span>Purpose</span>
            <select data-purpose>
              ${isStudent ? '<option>Tuition fees</option><option>Living expenses</option><option>Education deposit</option>' : isInward ? '<option>Family maintenance</option><option>Freelance income</option><option>Gift / personal transfer</option><option>Export proceeds</option>' : '<option>Family maintenance</option><option>Education</option><option>Medical</option><option>Travel</option><option>Business payment</option>'}
            </select>
          </label>
          <label class="service-action-field">
            <span>${isInward ? "Receiving bank" : "Beneficiary country"}</span>
            <input type="text" value="${isInward ? "Indian bank account" : "United States"}" data-recipient required>
          </label>
        </div>
        ${resultBox()}
        <div class="service-action-footer">
          <p><i class="fas fa-file-circle-check"></i> Document and compliance checks are completed before any real transfer.</p>
          <button class="btn btn-primary btn-lg" type="submit">Create Transfer Request</button>
        </div>
      </form>`
    );
  }

  function cardMarkup(serviceId) {
    const reload = serviceId === "travel-card-reloading";
    return baseShell(
      reload ? "Reload Your Travel Card" : "Plan a Travel Card Load",
      "Estimate the INR value for a selected currency and create a travel-card service request.",
      "fas fa-credit-card",
      `<form class="service-action-form" data-card-form data-reload="${reload}">
        <div class="service-action-grid">
          <label class="service-action-field"><span>Load currency</span><select data-currency>${currencyOptions("USD")}</select></label>
          <label class="service-action-field"><span>Foreign amount</span><input type="number" min="1" step="0.01" value="500" data-amount required></label>
          <label class="service-action-field"><span>Card type</span><select data-card-type><option>${reload ? "Existing ForexBridge card" : "New multi-currency card"}</option><option>Student travel card</option><option>Business travel card</option></select></label>
          <label class="service-action-field"><span>Travel purpose</span><select data-purpose><option>Holiday</option><option>Business trip</option><option>Education</option><option>Medical travel</option></select></label>
        </div>
        ${resultBox()}
        <div class="service-action-footer"><p><i class="fas fa-lock"></i> Final load value depends on the confirmed card rate.</p><button class="btn btn-primary btn-lg" type="submit">${reload ? "Create Reload Request" : "Create Card Request"}</button></div>
      </form>`
    );
  }

  function corporateMarkup() {
    return baseShell(
      "Request a Corporate Forex Quote",
      "Share the transaction requirement and create a quote request for the corporate forex desk.",
      "fas fa-building",
      `<form class="service-action-form" data-corporate-form>
        <div class="service-action-grid">
          <label class="service-action-field"><span>Company name</span><input type="text" placeholder="Company / organisation" data-company required></label>
          <label class="service-action-field"><span>Currency</span><select data-currency>${currencyOptions("USD")}</select></label>
          <label class="service-action-field"><span>Foreign amount</span><input type="number" min="1" step="0.01" value="10000" data-amount required></label>
          <label class="service-action-field"><span>Transaction purpose</span><select data-purpose><option>Supplier payment</option><option>Import settlement</option><option>Export receipt</option><option>Employee travel</option><option>Hedging enquiry</option></select></label>
        </div>
        ${resultBox()}
        <div class="service-action-footer"><p><i class="fas fa-chart-line"></i> Corporate pricing is quoted after volume and documentation review.</p><button class="btn btn-primary btn-lg" type="submit">Request Corporate Quote</button></div>
      </form>`
    );
  }

  function consultationMarkup() {
    return baseShell(
      "Book a Forex Consultation",
      "Choose what you need help with and create a callback request from a ForexBridge specialist.",
      "fas fa-headset",
      `<form class="service-action-form" data-consult-form>
        <div class="service-action-grid">
          <label class="service-action-field"><span>Your name</span><input type="text" placeholder="Full name" data-name required></label>
          <label class="service-action-field"><span>Phone number</span><input type="tel" inputmode="numeric" maxlength="15" pattern="[0-9]*" placeholder="919876543210" data-rule="phone" data-phone required></label>
          <label class="service-action-field"><span>Topic</span><select data-topic><option>Best time to exchange</option><option>Travel money planning</option><option>International transfer</option><option>Corporate forex</option><option>Documentation help</option></select></label>
          <label class="service-action-field"><span>Preferred callback</span><select data-time><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
        </div>
        <div class="service-action-footer"><p><i class="fas fa-phone"></i> This demo stores the callback request only in your browser.</p><button class="btn btn-primary btn-lg" type="submit">Request Callback</button></div>
      </form>`
    );
  }

  function documentsMarkup(service) {
    const items = (service.documents || []).map((d, i) => `<label class="service-action-check"><input type="checkbox" data-doc value="${esc(d)}"><span><i class="fas fa-file-circle-check"></i>${esc(d)}</span></label>`).join("");
    return baseShell(
      "Prepare Your Document Checklist",
      "Tick the documents you already have and save a simple checklist before visiting the branch.",
      "fas fa-file-shield",
      `<form class="service-action-form" data-doc-form>
        <div class="service-action-checklist">${items}</div>
        <div class="service-action-result service-action-result--compact" data-doc-status><div><span class="service-action-result__label">Checklist progress</span><strong>0 of ${(service.documents || []).length} ready</strong><span>Tick each document as you prepare it.</span></div></div>
        <div class="service-action-footer"><p><i class="fas fa-circle-info"></i> Exact requirements can vary by transaction value and purpose.</p><button class="btn btn-primary btn-lg" type="submit">Save Checklist</button></div>
      </form>`
    );
  }

  function successMessage(container, request, message) {
    const existing = container.querySelector(".service-action-success");
    if (existing) existing.remove();
    const div = document.createElement("div");
    div.className = "service-action-success";
    div.innerHTML = `<i class="fas fa-circle-check" aria-hidden="true"></i><div><strong>${esc(message)}</strong><span>Reference: ${esc(request.id)} · Saved locally as a demo request.</span></div>`;
    const form = container.querySelector("form");
    if (form) form.insertAdjacentElement("afterend", div);
    div.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function bindExchange(container) {
    const form = container.querySelector("[data-exchange-form]");
    if (!form) return;
    const currency = form.querySelector("[data-currency]");
    const amount = form.querySelector("[data-amount]");
    const method = form.querySelector("[data-method]");
    const methodLabel = form.querySelector("[data-method-label]");
    const city = form.querySelector("[data-city]");
    const main = form.querySelector("[data-result-main]");
    const sub = form.querySelector("[data-result-sub]");
    const rateEl = form.querySelector("[data-result-rate]");
    const submitLabel = form.querySelector("[data-submit-label]");

    function update() {
      const mode = form.dataset.mode || "buy";
      const code = currency.value;
      const amt = Math.max(0, Number(amount.value || 0));
      const rate = getRate(code, mode === "buy" ? "sell" : "buy") || 0;
      const total = amt * rate;
      main.textContent = mode === "buy" ? `${money(total)} estimated payment` : `${money(total)} estimated payout`;
      sub.textContent = `${amt.toLocaleString("en-IN")} ${code} × ₹${Number(rate).toFixed(code === "JPY" ? 3 : 2)}`;
      rateEl.textContent = `₹${Number(rate).toFixed(code === "JPY" ? 3 : 2)} / ${code}`;
    }

    form.querySelectorAll("[data-exchange-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        form.dataset.mode = btn.dataset.exchangeMode;
        form.querySelectorAll("[data-exchange-mode]").forEach((b) => b.classList.toggle("is-active", b === btn));
        const selling = form.dataset.mode === "sell";
        methodLabel.textContent = selling ? "Payout method" : "Fulfilment";
        method.innerHTML = selling ? '<option>UPI payout</option><option>Bank transfer</option><option>Cash payout</option>' : '<option>Branch pickup</option><option>Doorstep delivery</option>';
        submitLabel.textContent = selling ? "Create Sell Request" : "Reserve Exchange";
        update();
      });
    });

    [currency, amount].forEach((el) => el.addEventListener("input", update));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const mode = form.dataset.mode || "buy";
      const request = saveRequest("currency-" + mode, { currency: currency.value, amount: amount.value, method: method.value, city: city.value });
      successMessage(container, request, mode === "buy" ? "Exchange reservation created" : "Currency sell request created");
    });
    update();
  }

  function bindTransfer(container) {
    const form = container.querySelector("[data-transfer-form]");
    if (!form) return;
    const currency = form.querySelector("[data-currency]");
    const amount = form.querySelector("[data-amount]");
    const purpose = form.querySelector("[data-purpose]");
    const recipient = form.querySelector("[data-recipient]");
    const main = form.querySelector("[data-result-main]");
    const sub = form.querySelector("[data-result-sub]");
    const rateEl = form.querySelector("[data-result-rate]");

    function update() {
      const inward = form.dataset.inward === "true";
      const code = currency.value;
      const amt = Math.max(0, Number(amount.value || 0));
      const rate = getRate(code, inward ? "buy" : "sell") || 0;
      if (inward) {
        const inr = amt * rate;
        main.textContent = `${money(inr)} estimated INR credit`;
        sub.textContent = `${amt.toLocaleString("en-IN")} ${code} converted at illustrative inward rate`;
      } else {
        const foreign = rate ? amt / rate : 0;
        const cur = (window.ForexRates && ForexRates.getCurrencyInfo) ? ForexRates.getCurrencyInfo(code) : null;
        main.textContent = `${cur && cur.symbol ? cur.symbol : ""}${foreign.toLocaleString("en-IN", { maximumFractionDigits: 2 })} ${code} estimated recipient amount`;
        sub.textContent = `${money(amt)} converted at illustrative outward rate`;
      }
      rateEl.textContent = `₹${Number(rate).toFixed(code === "JPY" ? 3 : 2)} / ${code}`;
    }

    [currency, amount].forEach((el) => el.addEventListener("input", update));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const request = saveRequest("remittance", { currency: currency.value, amount: amount.value, purpose: purpose.value, recipient: recipient.value });
      successMessage(container, request, "Transfer request created");
    });
    update();
  }

  function bindCard(container) {
    const form = container.querySelector("[data-card-form]");
    if (!form) return;
    const currency = form.querySelector("[data-currency]");
    const amount = form.querySelector("[data-amount]");
    const cardType = form.querySelector("[data-card-type]");
    const purpose = form.querySelector("[data-purpose]");
    const main = form.querySelector("[data-result-main]");
    const sub = form.querySelector("[data-result-sub]");
    const rateEl = form.querySelector("[data-result-rate]");

    function update() {
      const code = currency.value;
      const amt = Math.max(0, Number(amount.value || 0));
      const rate = getRate(code, "sell") || 0;
      main.textContent = `${money(amt * rate)} estimated INR load value`;
      sub.textContent = `${amt.toLocaleString("en-IN")} ${code} planned card load`;
      rateEl.textContent = `₹${Number(rate).toFixed(code === "JPY" ? 3 : 2)} / ${code}`;
    }

    [currency, amount].forEach((el) => el.addEventListener("input", update));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const request = saveRequest("travel-card", { currency: currency.value, amount: amount.value, cardType: cardType.value, purpose: purpose.value });
      successMessage(container, request, form.dataset.reload === "true" ? "Travel-card reload request created" : "Travel-card request created");
    });
    update();
  }

  function bindCorporate(container) {
    const form = container.querySelector("[data-corporate-form]");
    if (!form) return;
    const currency = form.querySelector("[data-currency]");
    const amount = form.querySelector("[data-amount]");
    const company = form.querySelector("[data-company]");
    const purpose = form.querySelector("[data-purpose]");
    const main = form.querySelector("[data-result-main]");
    const sub = form.querySelector("[data-result-sub]");
    const rateEl = form.querySelector("[data-result-rate]");

    function update() {
      const code = currency.value;
      const amt = Math.max(0, Number(amount.value || 0));
      const rate = getRate(code, "sell") || 0;
      main.textContent = `${money(amt * rate)} indicative transaction value`;
      sub.textContent = "Corporate desk may quote a custom rate based on volume.";
      rateEl.textContent = `Base ₹${Number(rate).toFixed(code === "JPY" ? 3 : 2)} / ${code}`;
    }

    [currency, amount].forEach((el) => el.addEventListener("input", update));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const request = saveRequest("corporate-quote", { company: company.value, currency: currency.value, amount: amount.value, purpose: purpose.value });
      successMessage(container, request, "Corporate quote request created");
    });
    update();
  }

  function bindConsultation(container) {
    const form = container.querySelector("[data-consult-form]");
    if (!form) return;

    const phone = form.querySelector("[data-phone]");
    const sanitizePhone = () => {
      if (!phone) return;
      phone.value = phone.value.replace(/\D/g, "").slice(0, 15);
    };

    if (phone) {
      phone.addEventListener("keydown", (event) => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.key && event.key.length === 1 && !/\d/.test(event.key)) {
          event.preventDefault();
        }
      });
      phone.addEventListener("input", sanitizePhone);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sanitizePhone();
      if (phone && !/^\d{7,15}$/.test(phone.value)) {
        phone.setCustomValidity("Please enter a valid phone number using numbers only");
        phone.reportValidity();
        return;
      }
      if (phone) phone.setCustomValidity("");

      const request = saveRequest("consultation", {
        name: form.querySelector("[data-name]").value,
        phone: phone ? phone.value : "",
        topic: form.querySelector("[data-topic]").value,
        time: form.querySelector("[data-time]").value,
      });
      successMessage(container, request, "Callback request saved");
    });
  }

  function bindDocs(container) {
    const form = container.querySelector("[data-doc-form]");
    if (!form) return;
    const checks = Array.from(form.querySelectorAll("[data-doc]"));
    const status = form.querySelector("[data-doc-status] strong");
    function update() {
      const done = checks.filter((c) => c.checked).length;
      status.textContent = `${done} of ${checks.length} ready`;
    }
    checks.forEach((c) => c.addEventListener("change", update));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const request = saveRequest("document-checklist", { ready: checks.filter((c) => c.checked).map((c) => c.value) });
      successMessage(container, request, "Document checklist saved");
    });
    update();
  }

  function markupFor(serviceId, service) {
    if (EXCHANGE_IDS.includes(serviceId)) return exchangeMarkup(serviceId);
    if (TRANSFER_IDS.includes(serviceId)) return transferMarkup(serviceId);
    if (CARD_IDS.includes(serviceId)) return cardMarkup(serviceId);
    if (CORPORATE_IDS.includes(serviceId)) return corporateMarkup();
    if (CONSULT_IDS.includes(serviceId)) return consultationMarkup();
    if (DOC_IDS.includes(serviceId)) return documentsMarkup(service);
    return exchangeMarkup("currency-exchange");
  }

  function mount(serviceId, service, container) {
    if (!container || !service) return;
    container.innerHTML = markupFor(serviceId, service);
    bindExchange(container);
    bindTransfer(container);
    bindCard(container);
    bindCorporate(container);
    bindConsultation(container);
    bindDocs(container);
  }

  return Object.freeze({ mount });
})();

window.ForexServiceActions = ForexServiceActions;
