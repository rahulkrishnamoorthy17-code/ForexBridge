/**
 * Service Data — Currency Exchange & Forex Service
 * Shared module for all service listing and detail pages.
 */

const ForexServices = (() => {
  "use strict";  // ─── Service Catalogue ───────────────────────────────────────────────

  const SERVICES = [
    {
      id: "currency-exchange",
      title: "Currency Exchange",
      icon: "fas fa-exchange-alt",
      category: "exchange",
      image: "assets/images/services/service-currency-exchange.jpg",
      shortDesc: "Buy and sell foreign currencies at competitive rates across all branches.",
      description:
        "Get the best exchange rates for all major foreign currencies. We deal in over 11 global currencies including USD, EUR, GBP, AED, SAR, SGD, AUD, CAD, JPY, CHF, and NZD. Walk in to any of our branches across India for instant currency exchange with transparent pricing and proper documentation.",
      features: [
        "Exchange 11+ global currencies",
        "Competitive interbank-linked rates",
        "Instant cash dispensing",
        "No hidden charges",
        "Documented, compliance-ready process",
        "Doorstep delivery available in select cities",
      ],
      whoItsFor: [
        "Travellers going abroad",
        "Returning residents with foreign currency",
        "Business professionals",
        "Expatriates",
      ],
      documents: [
        "Valid government-issued photo ID (Aadhaar / Passport / PAN)",
        "PAN card for transactions above ₹50,000",
        "Passport (for FEMA compliance on high-value exchanges)",
      ],
      processSteps: [
        "Select your desired currency and amount",
        "Present valid identification documents",
        "Confirm the exchange rate and total amount",
        "Make payment via cash / UPI / bank transfer",
        "Receive your foreign currency and transaction receipt",
      ],
      fees: "Exchange rates include all applicable charges. No additional commission on transactions up to ₹2,00,000 equivalent.",
      faq: [
        {
          q: "What currencies can I exchange?",
          a: "We support USD, EUR, GBP, AED, SAR, SGD, AUD, CAD, JPY, CHF, and NZD against INR. Rates are updated regularly throughout the day.",
        },
        {
          q: "Is there a maximum limit for cash exchange?",
          a: "As per RBI guidelines, the maximum limit for cash exchange without PAN is ₹50,000 per transaction. Higher amounts require PAN and additional documentation.",
        },
        {
          q: "Can I exchange currency online?",
          a: "Yes, you can lock a rate online and collect currency from any of our branches within 48 hours.",
        },
      ],
    },
    {
      id: "foreign-currency-buy",
      title: "Foreign Currency Buy",
      icon: "fas fa-hand-holding-usd",
      category: "exchange",
      image: "assets/images/services/service-currency-buy.jpg",
      shortDesc: "Purchase foreign currency at the best buy rates for your international needs.",
      description:
        "Planning a trip abroad or need foreign currency for online payments? Buy foreign currency at the most competitive buy rates. Our experienced dealers ensure compliant, hassle-free transactions with proper documentation. Reserve rates online or visit any branch for instant purchase.",
      features: [
        "Best buy rates guaranteed",
        "Online rate locking available",
        "Multiple payment options — UPI, NEFT, IMPS, cash",
        "Same-day and next-day delivery",
        "FEMA-compliant transactions",
        "Rate alerts for favourable movement",
      ],
      whoItsFor: [
        "Travellers departing for international trips",
        "Parents funding children studying abroad",
        "Businesses paying overseas suppliers",
        "Online shoppers making foreign purchases",
      ],
      documents: [
        "Valid photo ID proof",
        "PAN card for transactions above ₹50,000",
        "Passport copy and visa (for travel-related purchases)",
        "Airline ticket or travel itinerary (recommended)",
      ],
      processSteps: [
        "Check live rates on our website or app",
        "Choose amount and lock your preferred rate",
        "Upload or present required documents",
        "Complete payment",
        "Collect foreign currency from your chosen branch",
      ],
      fees: "All-inclusive rates. No separate handling or processing fee.",
      faq: [
        {
          q: "How long is a locked rate valid?",
          a: "Online locked rates are valid for 24 hours from the time of confirmation. Within this window, the rate cannot change regardless of market movement.",
        },
        {
          q: "What if I need more currency than my locked amount?",
          a: "Additional amounts will be exchanged at the prevailing rate at the time of the transaction.",
        },
      ],
    },
    {
      id: "foreign-currency-sell",
      title: "Foreign Currency Sell",
      icon: "fas fa-coins",
      category: "exchange",
      image: "assets/images/services/service-currency-sell.jpg",
      shortDesc: "Sell your unused or surplus foreign currency at excellent sell-back rates.",
      description:
        "Returned from an international trip with leftover foreign currency? Sell it back to us at the best sell-back rates. We accept all major currencies in used or unused condition. Quick verification, instant payout via bank transfer or UPI, and fully documented for compliance.",
      features: [
        "High sell-back rates",
        "Instant bank transfer or UPI payout",
        "Accepts used and unused notes",
        "No appointment needed — walk-in service",
        "Torn or damaged notes accepted at fair evaluation",
        "Transparent note-counting with CCTV verification",
      ],
      whoItsFor: [
        "Returning travellers with leftover foreign currency",
        "Individuals holding old foreign notes",
        "Businesses with foreign currency receipts",
        "Gift card and foreign note holders",
      ],
      documents: [
        "Original passport with immigration stamp",
        "Original exchange receipt from when currency was purchased (recommended)",
        "Valid photo ID proof",
      ],
      processSteps: [
        "Bring your foreign currency to any branch",
        "Present your passport and exchange receipt",
        "Currency verification and counting in your presence",
        "Confirm payout mode — UPI, NEFT, or cash",
        "Receive payment instantly",
      ],
      fees: "No charges for sell-back transactions. Payout is net of applicable rates.",
      faq: [
        {
          q: "Can I sell foreign currency without a purchase receipt?",
          a: "Yes. While a purchase receipt helps, it is not mandatory. We accept valid foreign currency notes with proper ID verification.",
        },
        {
          q: "What about damaged or old-series notes?",
          a: "We evaluate and accept most damaged or discontinued notes. Rates may be adjusted based on the condition of the notes.",
        },
      ],
    },
    {
      id: "international-money-transfer",
      title: "International Money Transfer",
      icon: "fas fa-globe",
      category: "remittance",
      image: "assets/images/services/service-money-transfer.jpg",
      shortDesc: "Send money abroad quickly and securely with competitive exchange rates.",
      description:
        "Transfer funds internationally with ease. Whether it is personal remittance, family support, or business payments, our international wire transfer service covers 200+ countries with competitive rates and fast settlement. Outward remittance for individuals is supported under the Liberalised Remittance Scheme (LRS) with proper documentation.",
      features: [
        "Transfers to 200+ countries",
        "SWIFT / SEPA / ACH payment rails",
        "Competitive exchange rates",
        "Same-day processing for major currencies",
        "Track transfers online in real-time",
        "LRS-compliant for individuals",
      ],
      whoItsFor: [
        "Individuals sending money to family abroad",
        "Parents funding overseas education",
        "Freelancers receiving international payments",
        "Businesses making cross-border vendor payments",
      ],
      documents: [
        "Aadhaar and PAN card",
        "Passport copy",
        "Purpose of remittance declaration (A2 Form)",
        "Beneficiary bank details (IBAN / SWIFT / Routing)",
        "Invoice or supporting document for business transfers",
      ],
      processSteps: [
        "Provide recipient and bank details",
        "Select amount and preferred transfer speed",
        "Submit documents and complete KYC",
        "Confirm the transfer and make payment",
        "Receive transaction reference and tracking link",
      ],
      fees: "Transfer fee: ₹250 per transaction for personal remittances. GST additional. Corporate rates available on request.",
      faq: [
        {
          q: "What is the maximum amount I can send under LRS?",
          a: "Under the Liberalised Remittance Scheme, individuals can remit up to USD 2,50,000 (approximately ₹2 crore) per financial year.",
        },
        {
          q: "How long does an international transfer take?",
          a: "SWIFT transfers typically settle in 1-3 business days depending on the destination country and beneficiary bank.",
        },
      ],
    },
    {
      id: "foreign-remittance",
      title: "Foreign Remittance",
      icon: "fas fa-money-bill-wave",
      category: "remittance",
      image: "assets/images/services/service-foreign-remittance.jpg",
      shortDesc: "Receive foreign remittances directly into your Indian bank account.",
      description:
        "Receiving money from abroad? Our foreign inward remittance service ensures your funds land safely in your Indian bank account. We handle SWIFT transfers, Western Union, MoneyGram, and direct bank credits with competitive conversion rates and full FEMA compliance.",
      features: [
        "Inward SWIFT transfers",
        "Western Union & MoneyGram payout",
        "Direct bank credit",
        "Favourable conversion rates",
        "FEMA compliance guidance",
        "NRI-specific remittance services",
      ],
      whoItsFor: [
        "Individuals receiving money from relatives abroad",
        "NRIs sending money to family in India",
        "Freelancers receiving foreign payments",
        "Exporters receiving foreign receipts",
      ],
      documents: [
        "PAN card and Aadhaar",
        "Bank account details",
        "Purpose declaration form (if applicable)",
        "FCRA registration (for eligible NGO/trust)",
      ],
      processSteps: [
        "Provide your bank and PAN details to the sender",
        "Funds are received and verified",
        "Conversion at competitive rate applied",
        "Credited directly to your Indian bank account",
        "Transaction receipt and Form A2 issued",
      ],
      fees: "Inward remittance processing: Free. Conversion at applicable exchange rate. GST applicable on service fees where applicable.",
      faq: [
        {
          q: "Is TDS deducted on foreign remittances?",
          a: "TDS may be applicable on certain types of remittances under Section 195 of the Income Tax Act. Consult our team for specific guidance.",
        },
        {
          q: "Can I receive remittance in foreign currency into my NRE account?",
          a: "Yes, we support credits to NRE, NRO, and FCNR accounts. Please share the appropriate account details with your sender.",
        },
      ],
    },
    {
      id: "travel-card-loading",
      title: "Travel Card Loading",
      icon: "fas fa-credit-card",
      category: "travel",
      image: "assets/images/services/service-travel-card.jpg",
      shortDesc: "Load a multi-currency travel card for hassle-free spending abroad.",
      description:
        "Travel light with our multi-currency prepaid travel card. Load up to 12 currencies on a single card and use it for purchases, ATM withdrawals, and online payments worldwide. Locked-in exchange rates protect you from currency fluctuations while you travel.",
      features: [
        "Multi-currency — up to 12 currencies on one card",
        "Locked-in exchange rates at the time of loading",
        "Visa / Mastercard network — accepted worldwide",
        "Free ATM withdrawals at partner locations",
        "Online reload facility",
        "Emergency card replacement",
      ],
      whoItsFor: [
        "Leisure travellers",
        "Business travellers on frequent trips",
        "Students going abroad",
        "Pilgrims visiting foreign countries",
      ],
      documents: [
        "Passport copy with valid visa",
        "Airline ticket or travel itinerary",
        "Aadhaar / PAN card",
        "Signed application form",
      ],
      processSteps: [
        "Apply for a new travel card or request a reload",
        "Select currencies and amounts",
        "Make payment (UPI / NEFT / IMPS / cash)",
        "Card activated within 4 hours",
        "Collect card at branch or opt for courier delivery",
      ],
      fees: "Card issuance: ₹150 (one-time). Loading fee: 1% of loaded amount. Cross-currency markup: 2.5%. ATM withdrawal: ₹35 per transaction (partner ATMs free).",
      faq: [
        {
          q: "How many currencies can I load on a single card?",
          a: "You can load up to 12 currencies including USD, EUR, GBP, AED, SGD, AUD, CAD, JPY, CHF, and more.",
        },
        {
          q: "Can I reload the card while travelling?",
          a: "Yes. Log in to our online portal or use our mobile app to reload anytime. Funds are credited within a few hours.",
        },
      ],
    },
    {
      id: "travel-card-reloading",
      title: "Travel Card Reloading",
      icon: "fas fa-sync-alt",
      category: "travel",
      image: "assets/images/services/service-travel-card-reload.jpg",
      shortDesc: "Instantly reload your existing travel card from anywhere in the world.",
      description:
        "Running low on funds while abroad? Reload your existing travel card online or through our branches. Top up any of the loaded currencies at locked-in rates and continue spending without interruption. Online reloads are processed within 2 hours for major currencies.",
      features: [
        "Online reload from anywhere in the world",
        "Branch-based reload at all locations",
        "Rate lock at time of reload",
        "Multi-currency top-up",
        "2-hour processing for major currencies",
        "Reload history and balance tracking",
      ],
      whoItsFor: [
        "Travellers who need additional funds abroad",
        "Extended-stay travellers and students",
        "Business travellers on long assignments",
        "Parents reloading cards for children abroad",
      ],
      documents: [
        "Travel card number",
        "Cardholder identification (for branch reload)",
        "Payment for reload amount",
      ],
      processSteps: [
        "Log in to your travel card portal or visit a branch",
        "Select currency and amount to reload",
        "Confirm exchange rate and pay",
        "Funds loaded to card within 2 hours",
        "Confirmation via SMS and email",
      ],
      fees: "Online reload: ₹50 per transaction. Branch reload: ₹75 per transaction. Exchange rate as quoted at time of reload.",
      faq: [
        {
          q: "Is there a minimum reload amount?",
          a: "Minimum reload amount is USD 50 or equivalent in other supported currencies.",
        },
        {
          q: "Can I change the currency mix when reloading?",
          a: "Yes, you can reallocate across your existing currency wallets during reload.",
        },
      ],
    },
    {
      id: "corporate-forex",
      title: "Corporate Forex Solutions",
      icon: "fas fa-building",
      category: "corporate",
      image: "assets/images/services/service-corporate-forex.jpg",
      shortDesc: "Tailored forex solutions for businesses with bulk and regular currency needs.",
      description:
        "Simplify your business forex operations with our dedicated corporate solutions. From import-export payments to employee travel forex, we offer preferential rates, dedicated account managers, and streamlined compliance for businesses of all sizes. Bulk transaction pricing and credit facilities available.",
      features: [
        "Preferential corporate exchange rates",
        "Dedicated relationship manager",
        "Bulk currency orders",
        "Import/export payment facilitation",
        "Forward contracts for rate locking",
        "Credit facilities for regular clients",
        "Online corporate forex portal",
      ],
      whoItsFor: [
        "Importers and exporters",
        "IT companies with international clients",
        "Manufacturing firms",
        "Travel agencies and tour operators",
        "E-commerce businesses",
      ],
      documents: [
        "Company PAN and GST registration",
        "Board resolution authorising forex transactions",
        "Import-export code (IEC) for trade transactions",
        "KYC documents of authorised signatories",
        "Recent bank statements",
      ],
      processSteps: [
        "Open a corporate forex account with our team",
        "Submit KYC and business documents",
        "Get assigned a dedicated relationship manager",
        "Place orders via portal or direct request",
        "Receive preferential rates and swift processing",
      ],
      fees: "Customised fee structure based on volume. Contact our corporate desk for a tailored proposal.",
      faq: [
        {
          q: "What is a forward contract?",
          a: "A forward contract allows you to lock in an exchange rate for a future date, protecting your business from adverse currency movements.",
        },
        {
          q: "Do you offer credit for corporate forex?",
          a: "Yes, eligible businesses can avail credit facilities with pre-approved limits. Terms are discussed during onboarding.",
        },
      ],
    },
    {
      id: "student-remittance",
      title: "Student & Education Remittance",
      icon: "fas fa-graduation-cap",
      category: "education",
      image: "assets/images/services/service-student-remittance.jpg",
      shortDesc: "Specialised remittance for tuition fees, living expenses, and education-related transfers.",
      description:
        "Sending money abroad for education? Our student remittance service offers special rates, higher LRS limits for education, and dedicated support for education-related transfers. From tuition fee payments to maintenance fund transfers, we handle it all with compliance and care.",
      features: [
        "Special education forex rates",
        "Direct payment to foreign universities",
        "Higher LRS limit for education (₹7.5 lakh per annum under Section 206C)",
        "Living expense fund transfer",
        "Guarantee / SWIFT for university confirmation",
        "Education loan disbursement support",
      ],
      whoItsFor: [
        "Students going abroad for higher education",
        "Parents funding children's overseas studies",
        "Students on exchange programmes",
        "Education consultants",
      ],
      documents: [
        "Student passport and visa copy",
        "University admission letter / offer letter",
        "Fee structure from university",
        "PAN and Aadhaar of remitter (parent/guardian)",
        "Education loan sanction letter (if applicable)",
      ],
      processSteps: [
        "Share admission letter and fee structure",
        "We calculate the exact INR amount at locked rate",
        "Submit documents and complete compliance",
        "Direct transfer to university bank account",
        "Receive SWIFT confirmation and receipt",
      ],
      fees: "Education remittance: ₹200 per transfer. Guaranteed rate lock for 72 hours. No hidden charges.",
      faq: [
        {
          q: "Can I pay tuition fees directly to the university?",
          a: "Yes, we can transfer funds directly to the university's designated bank account via SWIFT or local rails.",
        },
        {
          q: "Is there a higher limit for education remittances?",
          a: "Education qualifies for a higher deduction under Section 206C of the Income Tax Act, allowing up to ₹7.5 lakh per year without TCS.",
        },
      ],
    },
    {
      id: "travel-money",
      title: "Travel Money",
      icon: "fas fa-suitcase-rolling",
      category: "travel",
      image: "assets/images/services/service-travel-money.jpg",
      shortDesc: "One-stop travel forex — cash, card, and transfer for every destination.",
      description:
        "Going abroad? Get everything you need for travel forex in one place. Choose from foreign currency cash, multi-currency travel cards, or wire transfers based on your destination and spending style. Our travel forex specialists help you pick the best combination to save on exchange costs.",
      features: [
        "Cash, card, and transfer — all options available",
        "Destination-specific forex packages",
        "Expert advice on forex mix",
        "Emergency cash support abroad",
        "Insurance tie-ups for travel",
        "Airport branch for last-minute needs",
      ],
      whoItsFor: [
        "Leisure travellers and vacationers",
        "Business travellers",
        "Backpackers and solo travellers",
        "Group tours and pilgrimage groups",
      ],
      documents: [
        "Passport copy",
        "Valid visa (if applicable)",
        "Flight tickets / itinerary",
        "Photo ID proof",
      ],
      processSteps: [
        "Consult our travel forex expert for a custom package",
        "Choose your mix of cash, card, and transfer",
        "Submit documents and make payment",
        "Receive forex kit before departure",
        "Support hotline available during travel",
      ],
      fees: "Travel money package starts at ₹199 (covers card issuance + first cash exchange). Wire transfer fee additional as applicable.",
      faq: [
        {
          q: "What is the best forex mix for travel?",
          a: "We recommend a mix of 70% travel card, 20% cash, and 10% wire transfer for most destinations. Our experts can customise this for your specific trip.",
        },
        {
          q: "Can I get forex at the airport?",
          a: "Yes, we have an airport branch at Coimbatore International Airport for last-minute forex needs.",
        },
      ],
    },
    {
      id: "rate-consultation",
      title: "Currency Rate Consultation",
      icon: "fas fa-chart-line",
      category: "consultation",
      image: "assets/images/services/service-rate-consultation.jpg",
      shortDesc: "Free expert consultation on exchange rates, trends, and forex strategy.",
      description:
        "Unsure about the right time to exchange? Book a free consultation with our forex experts. We analyse market trends, historical patterns, and your specific requirements to recommend the optimal time and method for your currency transactions. Make informed decisions backed by data.",
      features: [
        "Free 30-minute consultation",
        "Market trend analysis",
        "Personalised rate recommendations",
        "Rate alert setup",
        "Forward contract guidance",
        "Online and in-branch sessions",
      ],
      whoItsFor: [
        "Individuals planning large foreign transactions",
        "Businesses managing forex exposure",
        "First-time travellers unsure about forex",
        "Investors looking at forex hedging",
      ],
      documents: [
        "No documents required for free consultation",
        "Transaction details for personalised advice",
      ],
      processSteps: [
        "Book a consultation online or via phone",
        "Share your forex requirements",
        "Expert analyses current market and trends",
        "Receive a personalised recommendation",
        "Optional: place your transaction with us at the recommended time",
      ],
      fees: "Free for walk-in customers. Priority video consultation: ₹499 (waived on transaction).",
      faq: [
        {
          q: "How accurate are rate predictions?",
          a: "Our analysis is based on historical data and current market indicators. While we provide well-informed recommendations, forex markets are inherently volatile.",
        },
        {
          q: "Can I set up rate alerts?",
          a: "Yes. We can set up email and SMS alerts for your target rates on any supported currency pair.",
        },
      ],
    },
    {
      id: "forex-document-assistance",
      title: "Forex Document Assistance",
      icon: "fas fa-file-circle-check",
      category: "consultation",
      image: "assets/images/branch-office.jpg",
      shortDesc: "Get branch support to prepare and verify the documents needed for forex and remittance transactions.",
      description:
        "ForexBridge Document Assistance helps travellers, students, families and business customers understand the paperwork needed before a currency exchange or international remittance. Our team checks the basic documents, explains purpose requirements and helps reduce avoidable processing delays.",
      features: [
        "Pre-check of common forex documents",
        "Purpose-code and remittance guidance",
        "Passport, PAN and travel-document checklist",
        "Support for student and family remittances",
        "Branch appointment assistance",
        "Clear guidance before transaction processing",
      ],
      whoItsFor: [
        "First-time international travellers",
        "Students paying overseas education expenses",
        "Families sending money abroad",
        "Customers with document or purpose-code questions",
      ],
      documents: [
        "Valid government photo ID",
        "PAN card",
        "Passport and visa where applicable",
        "Purpose-specific supporting documents",
      ],
      processSteps: [
        "Choose the service you plan to use",
        "Bring or upload your available documents",
        "Our team checks the basic document requirements",
        "Complete any missing forms or supporting proofs",
        "Proceed with the forex or remittance transaction",
      ],
      fees: "Basic document guidance is free for ForexBridge customers. Additional service charges, if any, are confirmed before processing.",
      faq: [
        {
          q: "Can you tell me which documents I need before visiting a branch?",
          a: "Yes. Tell us the purpose of your forex or remittance transaction and our team will share the relevant checklist before your visit.",
        },
        {
          q: "Does document assistance guarantee transaction approval?",
          a: "No. It helps you prepare the required documents, but final processing remains subject to applicable RBI, FEMA, KYC and transaction-specific checks.",
        },
      ],
    },
  ];

  const CATEGORIES = {
    exchange: "Currency Exchange",
    remittance: "Remittance & Transfers",
    travel: "Travel Forex",
    corporate: "Corporate Solutions",
    education: "Education Remittance",
    consultation: "Consultation",
  };

  // ─── Search / Filter ─────────────────────────────────────────────────

  function filterServices(category, search) {
    let results = [...SERVICES];

    if (category && category !== "all") {
      results = results.filter((s) => s.category === category);
    }

    if (search && search.trim().length > 0) {
      const query = search.toLowerCase().trim();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.shortDesc.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    return results;
  }

  function getServiceById(id) {
    return SERVICES.find((s) => s.id === id) || null;
  }

  function getServicesByCategory(category) {
    return SERVICES.filter((s) => s.category === category);
  }

  function getAllCategories() {
    return { ...CATEGORIES };
  }

  // ─── Render Helpers ──────────────────────────────────────────────────

  function renderServiceCards(services, options) {
    const opts = options || {};
    const target = opts.container || null;
    const list = services || SERVICES;

    const html = list
      .map(
        (s) => `
      <article class="service-card" data-category="${s.category}" data-service-id="${s.id}">
        <div class="service-card__thumb">
          <img src="${s.image}" alt="${_esc(s.title)}" loading="lazy" width="600" height="340" class="service-card__img">
          <div class="service-card__icon-overlay">
            <i class="${s.icon}" aria-hidden="true"></i>
          </div>
        </div>
        <div class="service-card__body">
          <span class="service-card__category">${_esc(CATEGORIES[s.category] || s.category)}</span>
          <h3 class="service-card__title">${_esc(s.title)}</h3>
          <p class="service-card__desc">${_esc(s.shortDesc)}</p>
          <a href="services.html?id=${s.id}" class="service-card__link" aria-label="Learn more about ${_esc(s.title)}">
            Learn More <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </article>`
      )
      .join("\n");

    if (target) {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) el.innerHTML = html;
    }

    return html;
  }

  function renderServiceDetails(serviceId) {
    const service = getServiceById(serviceId);
    if (!service) return "<p>Service not found.</p>";

    const categoryLabel = _esc(CATEGORIES[service.category] || service.category);
    const audiencePreview = (service.whoItsFor || []).slice(0, 2).join(" • ");

    const faqHtml = service.faq
      .map(
        (f, i) => `
      <div class="faq-item" data-faq-index="${i}">
        <button class="faq-question" aria-expanded="false">
          <span>${_esc(f.q)}</span>
          <i class="fas fa-chevron-down" aria-hidden="true"></i>
        </button>
        <div class="faq-answer" role="region" hidden>
          <p>${_esc(f.a)}</p>
        </div>
      </div>`
      )
      .join("\n");

    const stepsHtml = service.processSteps
      .map(
        (step, i) => `
      <li class="process-step">
        <span class="process-step__number">${i + 1}</span>
        <span class="process-step__text">${_esc(step)}</span>
      </li>`
      )
      .join("\n");

    const featuresHtml = service.features
      .map((f) => `<li><i class="fas fa-check-circle" aria-hidden="true"></i><span>${_esc(f)}</span></li>`)
      .join("\n");

    const docsHtml = service.documents
      .map((d) => `<li><i class="fas fa-file-alt" aria-hidden="true"></i><span>${_esc(d)}</span></li>`)
      .join("\n");

    const whoHtml = service.whoItsFor
      .map((w) => `<li><i class="fas fa-user-check" aria-hidden="true"></i><span>${_esc(w)}</span></li>`)
      .join("\n");

    const quickFacts = [
      {
        icon: "fas fa-layer-group",
        value: categoryLabel,
        label: "Service category",
      },
      {
        icon: "fas fa-file-circle-check",
        value: `${service.documents.length}+ Docs`,
        label: "Typical documentation",
      },
      {
        icon: "fas fa-list-check",
        value: `${service.processSteps.length} steps`,
        label: "Simple guided process",
      },
      {
        icon: "fas fa-headset",
        value: "Branch support",
        label: "Online + in-person help",
      },
    ]
      .map(
        (item) => `
        <div class="service-detail__fact-card">
          <span class="service-detail__fact-icon"><i class="${item.icon}" aria-hidden="true"></i></span>
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </div>`
      )
      .join("\n");

    const html = `
      <div class="service-detail service-detail--enhanced">
        <div class="service-detail__banner mb-8">
          <img src="${service.image}" alt="${_esc(service.title)}" class="service-detail__banner-img" loading="lazy">
          <div class="service-detail__banner-overlay">
            <span class="service-detail__category-badge"><i class="${service.icon}" aria-hidden="true"></i> ${categoryLabel}</span>
            <h2 class="service-detail__banner-title">${_esc(service.title)}</h2>
            <p class="service-detail__banner-subtitle">${_esc(service.shortDesc || service.description)}</p>
          </div>
        </div>

        <div class="service-detail__hero-grid">
          <section class="service-detail__panel service-detail__panel--intro">
            <span class="section-label">Overview</span>
            <h2>Everything you should know before you choose this service</h2>
            <p>${_esc(service.description)}</p>
            <div class="service-detail__fact-grid">${quickFacts}</div>
          </section>

          <aside class="service-detail__panel service-detail__panel--summary">
            <h3>Quick Summary</h3>
            <ul class="service-detail__summary-list">
              <li><i class="fas fa-circle-check" aria-hidden="true"></i><span>Best for: ${_esc(audiencePreview || service.title)}</span></li>
              <li><i class="fas fa-wallet" aria-hidden="true"></i><span>${_esc(service.fees)}</span></li>
              <li><i class="fas fa-building-circle-check" aria-hidden="true"></i><span>Available across ForexBridge branches with document support.</span></li>
              <li><i class="fas fa-shield-halved" aria-hidden="true"></i><span>Transparent process with guided compliance at every step.</span></li>
            </ul>
            <div class="service-detail__summary-actions">
              <a class="btn btn-primary w-full" href="branches.html">Find a Branch</a>
              <a class="btn btn-secondary w-full" href="contact.html">Talk to a Specialist</a>
            </div>
          </aside>
        </div>

        <div class="service-detail__content-grid">
          <section class="service-detail__panel">
            <h2>Key Features</h2>
            <ul class="service-detail__icon-list">${featuresHtml}</ul>
          </section>

          <section class="service-detail__panel">
            <h2>Who Is This For?</h2>
            <ul class="service-detail__icon-list">${whoHtml}</ul>
          </section>

          <section class="service-detail__panel">
            <h2>Documents Required</h2>
            <ul class="service-detail__icon-list">${docsHtml}</ul>
          </section>

          <section class="service-detail__panel">
            <h2>How It Works</h2>
            <ol class="process-list">${stepsHtml}</ol>
          </section>

          <section class="service-detail__panel service-detail__panel--full service-detail__fees-card">
            <div>
              <span class="section-label">Transparent Pricing</span>
              <h2>Fees &amp; Charges</h2>
              <p>${_esc(service.fees)}</p>
            </div>
            <div class="service-detail__fees-note">
              <i class="fas fa-circle-info" aria-hidden="true"></i>
              <span>Final rates may vary based on market movement, currency pair, amount and supporting documents. Our team will confirm the final deal before processing.</span>
            </div>
          </section>

          <section class="service-detail__panel service-detail__panel--full">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">${faqHtml}</div>
          </section>
        </div>
      </div>`;

    return html;
  }

  // ─── Simple HTML Escape ──────────────────────────────────────────────

  function _esc(str) {
    if (typeof str !== "string") return "";
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return str.replace(/[&<>"']/g, (c) => map[c]);
  }

  // ─── Public API ──────────────────────────────────────────────────────

  return Object.freeze({
    SERVICES,
    CATEGORIES,
    getServiceById,
    getServicesByCategory,
    getAllCategories,
    filterServices,
    renderServiceCards,
    renderServiceDetails,
  });
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ForexServices;
}
window.ForexServices = ForexServices;
