/**
 * Branch Data — Currency Exchange & Forex Service
 * Shared module for branch listing, search, and map rendering.
 */

const ForexBranches = (() => {
  "use strict";

  // ─── Branch Data ─────────────────────────────────────────────────────

  const BRANCHES = [
    {
      id: "coimbatore-centre",
      name: "City Centre Branch",
      city: "Coimbatore",
      address: "123, Oppanakara Street, Gandhipuram, Coimbatore, Tamil Nadu 641012",
      phone: "+91-422-2345678",
      altPhone: "+91-9876543210",
      email: "coimbatore@forexservice.in",
      hours: {
        weekdays: "9:00 AM – 7:00 PM",
        saturday: "9:00 AM – 5:00 PM",
        sunday: "Closed",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "travel-card-loading",
        "travel-card-reloading",
        "international-money-transfer",
        "rate-consultation",
      ],
      coordinates: { lat: 11.0168, lng: 76.9558 },
      features: ["Wheelchair Accessible", "Parking Available", "AC Waiting Area"],
      isMain: true,
    },
    {
      id: "chennai-t-nagar",
      name: "T. Nagar Branch",
      city: "Chennai",
      address: "45, North Usman Road, T. Nagar, Chennai, Tamil Nadu 600017",
      phone: "+91-44-28345678",
      altPhone: "+91-9845123456",
      email: "chennai.tnagar@forexservice.in",
      hours: {
        weekdays: "9:00 AM – 8:00 PM",
        saturday: "9:00 AM – 6:00 PM",
        sunday: "10:00 AM – 2:00 PM",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "travel-card-loading",
        "international-money-transfer",
        "foreign-remittance",
        "corporate-forex",
        "rate-consultation",
      ],
      coordinates: { lat: 13.0418, lng: 80.2341 },
      features: ["Wheelchair Accessible", "VIP Lounge", "Document Scanning"],
      isMain: false,
    },
    {
      id: "chennai-airport",
      name: "Chennai Airport Branch",
      city: "Chennai",
      address: "Arrival Hall, Chennai International Airport (MAA), Meenambakkam, Chennai 600027",
      phone: "+91-44-22345678",
      altPhone: null,
      email: "chennai.airport@forexservice.in",
      hours: {
        weekdays: "24 Hours",
        saturday: "24 Hours",
        sunday: "24 Hours",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "travel-money",
      ],
      coordinates: { lat: 12.9941, lng: 80.1709 },
      features: ["24/7 Service", "Express Counter", "Multi-language Staff"],
      isMain: false,
    },
    {
      id: "bengaluru-kr-road",
      name: "K.R. Road Branch",
      city: "Bengaluru",
      address: "78, K.R. Road, Basavanagudi, Bengaluru, Karnataka 560004",
      phone: "+91-80-26543210",
      altPhone: "+91-9765432109",
      email: "bengaluru.krroad@forexservice.in",
      hours: {
        weekdays: "9:30 AM – 7:30 PM",
        saturday: "9:30 AM – 5:30 PM",
        sunday: "Closed",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "international-money-transfer",
        "travel-card-loading",
        "student-remittance",
        "corporate-forex",
        "rate-consultation",
      ],
      coordinates: { lat: 12.9437, lng: 77.5693 },
      features: ["Parking Available", "Digital Kiosk", "Café Lounge"],
      isMain: false,
    },
    {
      id: "bengaluru-airport",
      name: "Kempegowda Airport Branch",
      city: "Bengaluru",
      address: "Departure Hall, Kempegowda International Airport (BLR), Devanahalli, Bengaluru 560300",
      phone: "+91-80-27654321",
      altPhone: null,
      email: "bengaluru.airport@forexservice.in",
      hours: {
        weekdays: "24 Hours",
        saturday: "24 Hours",
        sunday: "24 Hours",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "travel-money",
      ],
      coordinates: { lat: 13.1986, lng: 77.7066 },
      features: ["24/7 Service", "Priority Counter", "Multi-language Support"],
      isMain: false,
    },
    {
      id: "hyderabad-begumpet",
      name: "Begumpet Branch",
      city: "Hyderabad",
      address: "23, SD Road, Begumpet, Hyderabad, Telangana 500016",
      phone: "+91-40-27765432",
      altPhone: "+91-9898765432",
      email: "hyderabad@forexservice.in",
      hours: {
        weekdays: "9:00 AM – 7:00 PM",
        saturday: "9:00 AM – 5:00 PM",
        sunday: "Closed",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "international-money-transfer",
        "foreign-remittance",
        "travel-card-loading",
        "student-remittance",
        "corporate-forex",
        "rate-consultation",
      ],
      coordinates: { lat: 17.4399, lng: 78.4636 },
      features: ["Wheelchair Accessible", "Free Wi-Fi", "Document Notarization"],
      isMain: false,
    },
    {
      id: "mumbai-andheri",
      name: "Andheri Branch",
      city: "Mumbai",
      address: "90, Andheri Kurla Road, Andheri East, Mumbai, Maharashtra 400069",
      phone: "+91-22-26789012",
      altPhone: "+91-9087654321",
      email: "mumbai.andheri@forexservice.in",
      hours: {
        weekdays: "9:00 AM – 8:00 PM",
        saturday: "9:00 AM – 6:00 PM",
        sunday: "11:00 AM – 4:00 PM",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "international-money-transfer",
        "foreign-remittance",
        "travel-card-loading",
        "travel-card-reloading",
        "corporate-forex",
        "student-remittance",
        "travel-money",
        "rate-consultation",
      ],
      coordinates: { lat: 19.1136, lng: 72.8697 },
      features: ["Full Service", "VIP Lounge", "Conference Room", "Valet Parking"],
      isMain: false,
    },
    {
      id: "mumbai-t2-airport",
      name: "Mumbai T2 International Branch",
      city: "Mumbai",
      address: "International Departure, Terminal 2, Chhatrapati Shivaji Maharaj International Airport (BOM), Mumbai 400099",
      phone: "+91-22-26890123",
      altPhone: null,
      email: "mumbai.airport@forexservice.in",
      hours: {
        weekdays: "24 Hours",
        saturday: "24 Hours",
        sunday: "24 Hours",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "travel-money",
      ],
      coordinates: { lat: 19.0896, lng: 72.8656 },
      features: ["24/7 Service", "Express Counter", "Multilingual"],
      isMain: false,
    },
    {
      id: "delhi-connaught",
      name: "Connaught Place Branch",
      city: "Delhi",
      address: "34, Block A, Connaught Place, New Delhi, Delhi 110001",
      phone: "+91-11-23456789",
      altPhone: "+91-9123456789",
      email: "delhi@forexservice.in",
      hours: {
        weekdays: "9:00 AM – 8:00 PM",
        saturday: "9:00 AM – 6:00 PM",
        sunday: "10:00 AM – 4:00 PM",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "international-money-transfer",
        "foreign-remittance",
        "travel-card-loading",
        "travel-card-reloading",
        "student-remittance",
        "corporate-forex",
        "travel-money",
        "rate-consultation",
      ],
      coordinates: { lat: 28.6315, lng: 77.2167 },
      features: ["Full Service", "Central Location", "Metro Accessible", "VIP Lounge"],
      isMain: false,
    },
    {
      id: "delhi-airport",
      name: "IGI Airport T3 Branch",
      city: "Delhi",
      address: "Arrivals Hall, Terminal 3, Indira Gandhi International Airport (DEL), New Delhi 110037",
      phone: "+91-11-25678901",
      altPhone: null,
      email: "delhi.airport@forexservice.in",
      hours: {
        weekdays: "24 Hours",
        saturday: "24 Hours",
        sunday: "24 Hours",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "travel-money",
      ],
      coordinates: { lat: 28.5562, lng: 77.1000 },
      features: ["24/7 Service", "Express Counter", "Duty Free Adjacent"],
      isMain: false,
    },
    {
      id: "kochi-marine-drive",
      name: "Marine Drive Branch",
      city: "Kochi",
      address: "15, M.G. Road, Marine Drive, Kochi, Kerala 682031",
      phone: "+91-484-2345678",
      altPhone: "+91-9495678123",
      email: "kochi@forexservice.in",
      hours: {
        weekdays: "9:00 AM – 7:00 PM",
        saturday: "9:00 AM – 5:00 PM",
        sunday: "Closed",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "international-money-transfer",
        "travel-card-loading",
        "student-remittance",
        "rate-consultation",
      ],
      coordinates: { lat: 9.9816, lng: 76.2689 },
      features: ["Waterfront Location", "Free Parking", "Wheelchair Accessible"],
      isMain: false,
    },
    {
      id: "coimbatore-rs-puram",
      name: "RS Puram Express Branch",
      city: "Coimbatore",
      address: "42, D.B. Road, RS Puram, Coimbatore, Tamil Nadu 641002",
      phone: "+91-422-4356789",
      altPhone: "+91-97890-22110",
      email: "rspuram@forexservice.in",
      hours: {
        weekdays: "9:30 AM – 7:00 PM",
        saturday: "9:30 AM – 5:30 PM",
        sunday: "Closed",
      },
      services: [
        "currency-exchange",
        "foreign-currency-buy",
        "foreign-currency-sell",
        "travel-card-loading",
        "international-money-transfer",
        "rate-consultation",
      ],
      coordinates: { lat: 11.0086, lng: 76.9504 },
      features: ["Express Counter", "Travel Card Support", "Document Assistance"],
      isMain: false,
    },
  ];

  // ─── Search & Filter ─────────────────────────────────────────────────

  function searchBranches(query) {
    if (!query || query.trim().length === 0) return [...BRANCHES];
    const q = query.toLowerCase().trim();

    return BRANCHES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        (b.features && b.features.some((f) => f.toLowerCase().includes(q)))
    );
  }

  function filterByCity(city) {
    if (!city || city === "all") return [...BRANCHES];
    return BRANCHES.filter((b) => b.city.toLowerCase() === city.toLowerCase());
  }

  function filterByService(serviceId) {
    if (!serviceId) return [...BRANCHES];
    return BRANCHES.filter((b) => b.services && b.services.includes(serviceId));
  }

  function getBranchById(id) {
    return BRANCHES.find((b) => b.id === id) || null;
  }

  function getAllCities() {
    const cities = [...new Set(BRANCHES.map((b) => b.city))];
    return cities.sort();
  }

  function getMainBranch() {
    return BRANCHES.find((b) => b.isMain) || BRANCHES[0];
  }

  function toTitleCase(str) {
    return String(str || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function simplifyServiceName(serviceId) {
    const map = {
      "currency-exchange": "Currency Exchange",
      "foreign-currency-buy": "Buy Currency",
      "foreign-currency-sell": "Sell Currency",
      "travel-card-loading": "Travel Card",
      "travel-card-reloading": "Card Reload",
      "international-money-transfer": "Money Transfer",
      "foreign-remittance": "Remittance",
      "student-remittance": "Student Remittance",
      "corporate-forex": "Corporate Forex",
      "rate-consultation": "Rate Help",
      "travel-money": "Travel Money"
    };
    return map[serviceId] || toTitleCase(serviceId);
  }

  function shortenAddress(address, city) {
    if (!address) return city || "";
    const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length <= 3) return address;
    const compact = parts.slice(0, 3).join(", ");
    return city && !compact.toLowerCase().includes(city.toLowerCase()) ? `${compact}, ${city}` : compact;
  }

  function primaryHours(hours) {
    if (!hours) return "Hours available on call";
    if (hours.weekdays === "24 Hours") return "Open 24/7";
    return `Mon–Fri: ${hours.weekdays}`;
  }

  function branchType(branch) {
    return /airport/i.test(branch.name) ? "Airport Counter" : "City Branch";
  }


  // ─── Distance Calculation ────────────────────────────────────────────

  function getDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function findNearestBranches(lat, lng, maxResults) {
    const limit = maxResults || 3;
    const scored = BRANCHES.map((b) => ({
      ...b,
      distance: getDistanceKm(lat, lng, b.coordinates.lat, b.coordinates.lng),
    }));
    scored.sort((a, b) => a.distance - b.distance);
    return scored.slice(0, limit);
  }

  // ─── Render Helpers ──────────────────────────────────────────────────

  function renderBranchCards(branches, options) {
    const opts = options || {};
    const target = opts.container || null;
    const list = branches || BRANCHES;
    const limitServices = opts.limitServices || 3;
    const limitFeatures = opts.limitFeatures || 2;

    const html = list
      .map(
        (b) => {
          const services = (b.services || []).slice(0, limitServices);
          const features = (b.features || []).slice(0, limitFeatures);
          return `
      <article class="branch-card" data-city="${_esc(b.city)}" data-branch-id="${b.id}">
        <div class="branch-card__header">
          <div>
            <div class="branch-card__eyebrow"><i class="fas fa-location-dot" aria-hidden="true"></i> ${_esc(branchType(b))}</div>
            <h3 class="branch-card__name">${_esc(b.name)}</h3>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:flex-end;">
            <span class="branch-card__city">${_esc(b.city)}</span>
            ${b.isMain ? '<span class="branch-card__badge">Main</span>' : ""}
          </div>
        </div>
        <p class="branch-card__address"><i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>${_esc(shortenAddress(b.address, b.city))}</span></p>
        <div class="branch-card__meta">
          <div class="branch-card__meta-item"><i class="fas fa-clock" aria-hidden="true"></i><span>${_esc(primaryHours(b.hours))}</span></div>
          <div class="branch-card__meta-item"><i class="fas fa-phone" aria-hidden="true"></i><a href="tel:${_esc(b.phone)}">${_esc(b.phone)}</a></div>
        </div>
        <div class="branch-card__services">
          ${services
            .map((sid) => `<span class="branch-card__service-tag">${_esc(simplifyServiceName(sid))}</span>`)
            .join("")}
          ${(b.services || []).length > limitServices ? `<span class="branch-card__service-more">+${(b.services || []).length - limitServices} more</span>` : ""}
        </div>
        <div class="branch-card__features">
          ${features
            .map((f) => `<span class="branch-card__feature"><i class="fas fa-check-circle" aria-hidden="true"></i>${_esc(f)}</span>`)
            .join("")}
        </div>
        <div class="branch-card__footer">
          <span class="branch-card__status">Quick walk-in support available</span>
          <a href="branches.html?id=${b.id}" class="branch-card__link" aria-label="View ${_esc(b.name)} details">View Branch <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </article>`;
        }
      )
      .join("\n");

    if (target) {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.innerHTML = html;
    }

    return html;
  }

  function renderAirportCards(branches) {
    const list = branches || [];
    return list
      .map(
        (b) => `
      <article class="airport-branch-card" data-branch-id="${b.id}">
        <div class="airport-branch-card__top">
          <div>
            <h4>${_esc(b.name)}</h4>
            <p>${_esc(shortenAddress(b.address, b.city))}</p>
          </div>
          <span class="airport-branch-card__badge">24/7</span>
        </div>
        <div class="airport-branch-card__meta">
          <span><i class="fas fa-location-dot" aria-hidden="true"></i>${_esc(b.city)}</span>
          <span><i class="fas fa-phone" aria-hidden="true"></i>${_esc(b.phone)}</span>
        </div>
      </article>`
      )
      .join("\n");
  }

  function renderBranchDetail(branchId) {
    const branch = getBranchById(branchId);
    if (!branch) return "<p>Branch not found.</p>";

    const servicesHtml = (branch.services || [])
      .slice(0, 6)
      .map((sid) => `<li><i class="fas fa-check-circle" aria-hidden="true"></i><span>${_esc(simplifyServiceName(sid))}</span></li>`)
      .join("\n");

    const featuresHtml = (branch.features || [])
      .map((f) => `<span class="branch-detail__feature"><i class="fas fa-check" aria-hidden="true"></i> ${_esc(f)}</span>`)
      .join("\n");

    const extraPhone = branch.altPhone ? `<li><i class="fas fa-mobile-screen-button" aria-hidden="true"></i><span><a href="tel:${_esc(branch.altPhone)}">${_esc(branch.altPhone)}</a></span></li>` : "";

    return `
      <div class="branch-detail">
        <header class="branch-detail__header">
          <h2>${_esc(branch.name)}</h2>
          <span class="branch-detail__city">${_esc(branch.city)}</span>
          ${branch.isMain ? '<span class="branch-detail__badge">Main Branch</span>' : ""}
        </header>
        <p class="branch-detail__intro">Simple in-person support for exchange, travel cards and remittance. Visit this branch for quick assistance and document guidance.</p>

        <div class="branch-detail__body">
          <section class="branch-detail__panel">
            <h3>Contact & Location</h3>
            <ul class="branch-detail__contact-list">
              <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>${_esc(branch.address)}</span></li>
              <li><i class="fas fa-phone" aria-hidden="true"></i><span><a href="tel:${_esc(branch.phone)}">${_esc(branch.phone)}</a></span></li>
              ${extraPhone}
              <li><i class="fas fa-envelope" aria-hidden="true"></i><span><a href="mailto:${_esc(branch.email)}">${_esc(branch.email)}</a></span></li>
            </ul>
          </section>

          <section class="branch-detail__panel">
            <h3>Working Hours</h3>
            <ul class="branch-detail__hours-list">
              <li><i class="fas fa-clock" aria-hidden="true"></i><span>Monday – Friday: ${_esc(branch.hours.weekdays)}</span></li>
              <li><i class="fas fa-clock" aria-hidden="true"></i><span>Saturday: ${_esc(branch.hours.saturday)}</span></li>
              <li><i class="fas fa-clock" aria-hidden="true"></i><span>Sunday: ${_esc(branch.hours.sunday)}</span></li>
            </ul>
          </section>

          <section class="branch-detail__panel">
            <h3>Available Services</h3>
            <ul class="branch-detail__service-list">${servicesHtml}</ul>
          </section>

          <section class="branch-detail__panel">
            <h3>Branch Highlights</h3>
            <div class="feature-tags">${featuresHtml}</div>
          </section>

          <section class="branch-detail__panel branch-detail__panel--full">
            <h3>Location Preview</h3>
            <div class="map-container" data-lat="${branch.coordinates.lat}" data-lng="${branch.coordinates.lng}" data-label="${_esc(branch.name)}"></div>
          </section>
        </div>
      </div>`;
  }

  // ─── Simple HTML Escape ──────────────────────────────────────────────

  function _esc(str) {
    if (typeof str !== "string") return "";
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return str.replace(/[&<>"']/g, (c) => map[c]);
  }

  // ─── Public API ──────────────────────────────────────────────────────

  return Object.freeze({
    BRANCHES,
    getAllCities,
    getMainBranch,
    getBranchById,
    searchBranches,
    filterByCity,
    filterByService,
    findNearestBranches,
    getDistanceKm,
    renderBranchCards,
    renderAirportCards,
    renderBranchDetail,
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ForexBranches;
}
window.ForexBranches = ForexBranches;
