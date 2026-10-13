/**
 * Exchange Rate Data, API Configuration & Rate Utilities
 * Currency Exchange & Forex Service — Shared Module
 *
 * Provides demo/illustrative rates for 11 major currencies against INR,
 * API configuration (no secrets), and helper functions.
 */

const ForexRates = (() => {
  "use strict";

  // ─── Currency Metadata ────────────────────────────────────────────────

  const CURRENCIES = {
    USD: { code: "USD", name: "US Dollar", symbol: "$", flag: "\uD83C\uDDFA\uD83C\uDDF8", decimals: 2 },
    EUR: { code: "EUR", name: "Euro", symbol: "\u20AC", flag: "\uD83C\uDDEA\uD83C\uDDFA", decimals: 2 },
    GBP: { code: "GBP", name: "British Pound", symbol: "\u00A3", flag: "\uD83C\uDDEC\uD83C\uDDE7", decimals: 2 },
    AED: { code: "AED", name: "UAE Dirham", symbol: "\u062F.\u0625", flag: "\uD83C\uDDF8\uD83C\uDDE6", decimals: 2 },
    SAR: { code: "SAR", name: "Saudi Riyal", symbol: "\uFDFC", flag: "\uD83C\uDDF8\uD83C\uDDE6", decimals: 2 },
    SGD: { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "\uD83C\uDDF8\uD83C\uDDEC", decimals: 2 },
    AUD: { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "\uD83C\uDDE6\uD83C\uDDFA", decimals: 2 },
    CAD: { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "\uD83C\uDDE8\uD83C\uDDE6", decimals: 2 },
    JPY: { code: "JPY", name: "Japanese Yen", symbol: "\u00A5", flag: "\uD83C\uDDEF\uD83C\uDDF5", decimals: 0 },
    CHF: { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "\uD83C\uDDE8\uD83C\uDDED", decimals: 2 },
    NZD: { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "\uD83C\uDDF3\uD83C\uDDFF", decimals: 2 },
  };

  const INR_CURRENCY = { code: "INR", name: "Indian Rupee", symbol: "\u20B9", decimals: 2 };

  // ─── Illustrative / Demo Rates (per 1 unit of foreign currency → INR) ─

  const DEMO_RATES = {
    USD: { buy: 83.42, sell: 84.15, lastUpdated: "2026-09-10T06:30:00+05:30" },
    EUR: { buy: 91.18, sell: 92.05, lastUpdated: "2026-09-10T06:30:00+05:30" },
    GBP: { buy: 105.72, sell: 106.80, lastUpdated: "2026-09-10T06:30:00+05:30" },
    AED: { buy: 22.70, sell: 23.15, lastUpdated: "2026-09-10T06:30:00+05:30" },
    SAR: { buy: 22.22, sell: 22.64, lastUpdated: "2026-09-10T06:30:00+05:30" },
    SGD: { buy: 62.30, sell: 63.05, lastUpdated: "2026-09-10T06:30:00+05:30" },
    AUD: { buy: 54.80, sell: 55.55, lastUpdated: "2026-09-10T06:30:00+05:30" },
    CAD: { buy: 61.45, sell: 62.10, lastUpdated: "2026-09-10T06:30:00+05:30" },
    JPY: { buy: 0.559, sell: 0.568, lastUpdated: "2026-09-10T06:30:00+05:30" },
    CHF: { buy: 93.60, sell: 94.50, lastUpdated: "2026-09-10T06:30:00+05:30" },
    NZD: { buy: 50.15, sell: 50.88, lastUpdated: "2026-09-10T06:30:00+05:30" },
  };

  // Previous snapshot for trend computation
  const DEMO_PREVIOUS_RATES = {
    USD: { buy: 83.35, sell: 84.10 },
    EUR: { buy: 91.05, sell: 91.90 },
    GBP: { buy: 105.60, sell: 106.65 },
    AED: { buy: 22.68, sell: 23.12 },
    SAR: { buy: 22.18, sell: 22.60 },
    SGD: { buy: 62.22, sell: 62.98 },
    AUD: { buy: 54.70, sell: 55.42 },
    CAD: { buy: 61.38, sell: 62.02 },
    JPY: { buy: 0.558, sell: 0.567 },
    CHF: { buy: 93.45, sell: 94.35 },
    NZD: { buy: 50.05, sell: 50.78 },
  };

  // ─── API Configuration (no secret keys) ──────────────────────────────

  const API_CONFIG = {
    endpoint: "https://api.example.com/forex/v1",
    refreshIntervalMs: 300_000,
    timeoutMs: 10_000,
    retryAttempts: 3,
    retryDelayMs: 1_500,
    currencyPairPath: "/rates",
    historicalPath: "/rates/history",
    currencyListPath: "/currencies",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Version": "2026-09-01",
    },
  };

  // ─── Internal State ──────────────────────────────────────────────────

  let _currentRates = structuredClone(DEMO_RATES);
  let _refreshTimer = null;
  let _loadState = "idle"; // idle | loading | success | error
  let _lastError = null;
  let _subscribers = [];

  // ─── Helpers ─────────────────────────────────────────────────────────

  function formatRate(value, currencyCode) {
    const cur = CURRENCIES[currencyCode];
    if (cur === undefined) {
      throw new Error(`Unknown currency code: ${currencyCode}`);
    }
    const decimals = cur.decimals !== undefined ? cur.decimals : 2;
    return Number(value).toFixed(decimals);
  }

  function formatRateWithSymbol(value, currencyCode) {
    const cur = CURRENCIES[currencyCode];
    if (cur === undefined) {
      throw new Error(`Unknown currency code: ${currencyCode}`);
    }
    return `${cur.symbol}${formatRate(value, "INR")}`;
  }

  function formatINR(value) {
    const num = Number(value);
    if (Number.isNaN(num)) {
      return "\u20B90.00";
    }
    return "\u20B9" + num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // ─── Trend Detection ─────────────────────────────────────────────────

  function getRateTrend(currencyCode) {
    if (!(currencyCode in DEMO_RATES)) {
      throw new Error(`Unknown currency code: ${currencyCode}`);
    }
    const current = _currentRates[currencyCode];
    const previous = DEMO_PREVIOUS_RATES[currencyCode];
    if (!current || !previous) {
      return { direction: "stable", change: 0, percentage: "0.00" };
    }

    const diff = current.buy - previous.buy;
    const pct = previous.buy !== 0 ? (diff / previous.buy) * 100 : 0;

    let direction;
    if (diff > 0.001) direction = "up";
    else if (diff < -0.001) direction = "down";
    else direction = "stable";

    return {
      direction,
      change: Number(diff.toFixed(4)),
      percentage: pct.toFixed(2),
      arrow: direction === "up" ? "\u2191" : direction === "down" ? "\u2193" : "\u2192",
    };
  }

  // ─── Spread / Margin ─────────────────────────────────────────────────

  function getSpread(currencyCode) {
    const rate = _currentRates[currencyCode];
    if (!rate) return null;
    const spread = rate.sell - rate.buy;
    const spreadPct = rate.buy !== 0 ? ((spread / rate.buy) * 100).toFixed(3) : "0.000";
    return { absolute: Number(spread.toFixed(4)), percentage: spreadPct };
  }

  // ─── Public Getters ──────────────────────────────────────────────────

  function getRates() {
    return structuredClone(_currentRates);
  }

  function getRate(currencyCode, type) {
    if (!(currencyCode in _currentRates)) {
      return null;
    }
    const rate = _currentRates[currencyCode];
    if (type === "buy" || type === "sell") {
      return rate[type];
    }
    return structuredClone(rate);
  }

  function getCurrencyInfo(currencyCode) {
    return CURRENCIES[currencyCode] || null;
  }

  function getAllCurrencies() {
    return Object.values(CURRENCIES);
  }

  function getLoadState() {
    return _loadState;
  }

  function getLastError() {
    return _lastError;
  }

  // ─── Subscriber Pattern ──────────────────────────────────────────────

  function onRatesUpdate(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback must be a function");
    }
    _subscribers.push(callback);
    return () => {
      _subscribers = _subscribers.filter((fn) => fn !== callback);
    };
  }

  function _notifySubscribers() {
    const snapshot = getRates();
    for (const fn of _subscribers) {
      try {
        fn(snapshot, _loadState);
      } catch (_) {
        // subscriber errors must not break the loop
      }
    }
  }

  // ─── API Fetch with Retry ────────────────────────────────────────────

  async function _fetchWithRetry(url, attempt) {
    const attemptNum = attempt || 1;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: API_CONFIG.headers,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      clearTimeout(timer);
      if (attemptNum < API_CONFIG.retryAttempts) {
        await new Promise((r) => setTimeout(r, API_CONFIG.retryDelayMs * attemptNum));
        return _fetchWithRetry(url, attemptNum + 1);
      }
      throw err;
    }
  }

  // ─── Refresh / Fetch ─────────────────────────────────────────────────

  async function refreshRates() {
    _loadState = "loading";
    _lastError = null;
    _notifySubscribers();

    try {
      const url = `${API_CONFIG.endpoint}${API_CONFIG.currencyPairPath}`;
      const data = await _fetchWithRetry(url);

      if (data && data.rates && typeof data.rates === "object") {
        for (const code of Object.keys(_currentRates)) {
          if (data.rates[code]) {
            _currentRates[code] = {
              buy: Number(data.rates[code].buy) || _currentRates[code].buy,
              sell: Number(data.rates[code].sell) || _currentRates[code].sell,
              lastUpdated: data.rates[code].lastUpdated || new Date().toISOString(),
            };
          }
        }
      }

      _loadState = "success";
    } catch (err) {
      _loadState = "error";
      _lastError = err && err.message ? err.message : "Unknown error";
    }

    _notifySubscribers();
    return getRates();
  }

  // ─── Auto-Refresh Control ────────────────────────────────────────────

  function startAutoRefresh() {
    stopAutoRefresh();
    _refreshTimer = setInterval(refreshRates, API_CONFIG.refreshIntervalMs);
  }

  function stopAutoRefresh() {
    if (_refreshTimer !== null) {
      clearInterval(_refreshTimer);
      _refreshTimer = null;
    }
  }

  // ─── Formatting Utilities (exported) ─────────────────────────────────

  function getFlagEmoji(currencyCode) {
    const cur = CURRENCIES[currencyCode];
    return cur ? cur.flag : "";
  }

  function getCurrencySymbol(currencyCode) {
    const cur = CURRENCIES[currencyCode];
    return cur ? cur.symbol : "";
  }

  function convertAmount(amount, fromCurrency, toCurrency, rateType) {
    const type = rateType || "sell";
    if (fromCurrency === "INR") {
      const rate = getRate(toCurrency, type);
      if (!rate || rate === 0) return null;
      return Number((amount / rate).toFixed(CURRENCIES[toCurrency]?.decimals ?? 2));
    }
    if (toCurrency === "INR") {
      const rate = getRate(fromCurrency, type);
      if (!rate) return null;
      return Number((amount * rate).toFixed(2));
    }
    const toINR = getRate(fromCurrency, type);
    if (!toINR) return null;
    const inrAmount = amount * toINR;
    const targetRate = getRate(toCurrency, type);
    if (!targetRate || targetRate === 0) return null;
    return Number((inrAmount / targetRate).toFixed(CURRENCIES[toCurrency]?.decimals ?? 2));
  }

  function getLastUpdated(currencyCode) {
    const rate = _currentRates[currencyCode];
    if (!rate) return null;
    return rate.lastUpdated || null;
  }

  function getSpread(currencyCode) {
    const rate = _currentRates[currencyCode];
    if (!rate) return null;
    const spread = rate.sell - rate.buy;
    const spreadPct = rate.buy !== 0 ? ((spread / rate.buy) * 100).toFixed(3) : "0.000";
    return { absolute: Number(spread.toFixed(4)), percentage: spreadPct };
  }

  // ─── Public API ──────────────────────────────────────────────────────

  return Object.freeze({
    CURRENCIES,
    INR_CURRENCY,
    API_CONFIG,
    DEMO_RATES,

    getRates,
    getRate,
    getCurrencyInfo,
    getAllCurrencies,
    getLoadState,
    getLastError,

    refreshRates,
    startAutoRefresh,
    stopAutoRefresh,
    onRatesUpdate,

    getRateTrend,
    getSpread,
    getFlagEmoji,
    getCurrencySymbol,
    convertAmount,
    getLastUpdated,

    formatRate,
    formatRateWithSymbol,
    formatINR,
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ForexRates;
}
window.ForexRates = ForexRates;
