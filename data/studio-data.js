export const BRAND_PROFILE = {
  name: "Design by Sadia",
  artistName: "Sadia Shoyeb",
  handle: "@design.by.sadia",
  personalHandle: "@sadia.shoyeb",
  role: "Northern Virginia Bespoke Henna & Body Art Atelier",
  location: "Sterling, VA",
  serviceAreas: [
    "Sterling",
    "Ashburn",
    "Herndon",
    "Reston",
    "Leesburg",
    "Tysons",
    "Fairfax",
    "Arlington",
    "Washington DC & MD",
  ],
  instagramUrl: "https://www.instagram.com/design.by.sadia/",
  igDmUrl: "https://ig.me/m/design.by.sadia",
  email: "bookings@designbysadia.com",
  stats: {
    posts: 33,
    coneFormulas: 4,
    bespokeDesigns: "100% Freehand",
  },
  bioSummary:
    "Sterling, Virginia henna atelier by Sadia Shoyeb (@sadia.shoyeb), composing hand-rolled Organic, Botanical Jagua, Crimson, and Jet-Black henna for brides, private studio sittings, and celebrations across Northern Virginia and Washington D.C.",
  bookingPolicies: [
    {
      title: "50% Retainer to Reserve Your Date",
      detail:
        "Bridal commissions, celebration bookings, and private studio sittings require a 50% retainer at reservation. The remaining balance is settled at the opening of your appointment.",
    },
    {
      title: "48-Hour Reschedule Notice",
      detail:
        "Retainers are non-refundable, though they transfer once without penalty when rescheduled at least 48 hours prior to your reserved window.",
    },
    {
      title: "Bridal Stain Maturation Window",
      detail:
        "Reserve Organic Henna or Botanical Jagua appointments 48 to 72 hours ahead of your ceremony so the paste completes full natural oxidation to espresso mahogany or deep indigo.",
    },
    {
      title: "Botanical & Instant Paste Disclosure",
      detail:
        "Organic henna and pure jagua gel are strictly plant-derived. Ceremonial Red and Midnight Black instant cones contain cosmetic colorants for immediate depth and carry a sensitivity notice.",
    },
  ],
  highlights: ["Clients", "Parties", "Price & Policy", "Stain Guide", "Past Events"],
};

export const CONE_FORMULAS = [
  {
    id: "organic",
    name: "100% Organic Hand-Rolled Henna",
    badge: "Signature Plant Blend",
    stainPhotoSrc: "./assets/generated/stain-organic-macro.jpg",
    tagline:
      "Triple-sifted Rajasthani lawsone leaf steeped fresh with steam-distilled eucalyptus and lavender oils for a deep espresso-mahogany stain.",
    stainHexStages: ["#4A3B23", "#B95D29", "#9F3B1B", "#732312", "#4B130B"],
    longevityDays: "10-14 Days",
    maturityHours: "48 Hours",
    ingredients:
      "Triple-sifted Rajasthani henna powder, pure eucalyptus and lavender essential oils, organic cane sugar, filtered lemon water.",
    bestFor: "Bridal mehndi, nikah, engagement portraits, sangeet evenings, sensitive skin",
    aftercareTip:
      "Wear the dried paste for 6 to 8 hours, mist lightly with lemon-sugar seal, lift flakes gently with natural oil, and keep dry for the first 12 hours.",
    safetyNote:
      "100% plant-derived and preservative-free. Suitable for brides, children, and expectant mothers.",
  },
  {
    id: "jagua",
    name: "Pure Botanical Jagua Gel",
    badge: "Blue-Black Tattoo Tone",
    stainPhotoSrc: "./assets/generated/stain-jagua-macro.jpg",
    tagline:
      "Amazonian Genipa americana fruit extract blended into crisp fine-line gel that matures into deep navy-indigo.",
    stainHexStages: ["#1D2330", "#69778A", "#374963", "#1F2E47", "#111B2E"],
    longevityDays: "10-14 Days",
    maturityHours: "36-48 Hours",
    ingredients:
      "Pure Genipa americana fruit juice, lavender essential oil, food-grade xanthan gum.",
    bestFor: "Contemporary botanical cuffs, editorial portraits, minimalist body art, Eid",
    aftercareTip:
      "Leave dried gel on for 2.5 to 4 hours, rinse gently under cool water without abrasion, and allow the indigo tone to deepen overnight.",
    safetyNote:
      "Fruit-derived botanical stain. Avoid if you have known citrus, berry, or tropical fruit allergies.",
  },
  {
    id: "red",
    name: "Festival Instant Red Henna",
    badge: "Same-Day Crimson",
    stainPhotoSrc: "./assets/generated/stain-crimson-macro.jpg",
    tagline:
      "Fast-setting ceremonial cone mixed for saturated ruby-burgundy color the moment paste lifts from the skin.",
    stainHexStages: ["#691D1A", "#B9362C", "#A42521", "#8C1A19", "#6F1415"],
    longevityDays: "4-6 Days",
    maturityHours: "Instant (30 Mins)",
    ingredients:
      "Henna base blended with cosmetic-grade crimson pigment and quick-dry aromatic botanicals.",
    bestFor: "Same-day Eid gatherings, bridesmaids, stage performances, festive celebrations",
    aftercareTip:
      "Allow paste to dry completely for 30 to 45 minutes, peel away gently, and finish with a drop of sweet almond oil.",
    safetyNote:
      "Contains synthetic cosmetic colorants for immediate payoff and may cause mild irritation on reactive skin. Patch test advised.",
  },
  {
    id: "black",
    name: "Midnight Instant Black Henna",
    badge: "Same-Day Obsidian",
    stainPhotoSrc: "./assets/generated/stain-obsidian-macro.jpg",
    tagline:
      "High-contrast jet-black paste formulated for sharp Khaleeji florals, editorial shoots, and same-day statement cuffs.",
    stainHexStages: ["#242322", "#3A3837", "#2B2928", "#1F1D1C", "#141313"],
    longevityDays: "4-6 Days",
    maturityHours: "Instant (30 Mins)",
    ingredients:
      "Synthetic black body-ink paste formulated for rapid matte dark surface staining.",
    bestFor: "Same-day editorial shoots, evening galas, statement floral cuffs, cultural showcases",
    aftercareTip:
      "Lift dried paste gently after 30 minutes and protect the skin from water for 2 hours to preserve crisp edges.",
    safetyNote:
      "Synthetic body-ink formula that may irritate sensitive skin. Choose Organic Henna or Botanical Jagua for natural long-wear staining.",
  },
];

export const SERVICE_PACKAGES = [
  {
    id: "royal-bridal",
    category: "bridal",
    name: "Royal Bridal Palms & Forearms",
    subtitle: "Signature Couture Mehndi",
    startingPrice: 280,
    priceUnit: "starting",
    durationMins: 240,
    coverageLevel: "Both hands (palms + backs) to mid-forearm",
    includes: [
      "Private pre-session concept consultation and motif composition",
      "Hidden partner initials or ceremony date woven into the linework",
      "Freshly rolled Organic Henna or Botanical Jagua cones",
      "Lemon-sugar seal kit and printed 48-hour stain care notes",
    ],
    featured: true,
  },
  {
    id: "intimate-nikah",
    category: "bridal",
    name: "Intimate Nikah & Engagement",
    subtitle: "Modern Minimalist Bridal",
    startingPrice: 165,
    priceUnit: "starting",
    durationMins: 135,
    coverageLevel: "Both hands (palms or backs) past the wrist",
    includes: [
      "Fine-line floral vines, scalloped cuffs, or twin-hand symmetry",
      "Optional hidden couple initials along the index vine or wrist band",
      "Choice of Organic Henna or Botanical Jagua Gel",
      "Aftercare balm and overnight wrap guidance",
    ],
    featured: false,
  },
  {
    id: "custom-sketch-session",
    category: "private",
    name: "Bespoke Concept-to-Stain Sitting",
    subtitle: "iPad Blueprint + Freehand Application",
    startingPrice: 120,
    priceUnit: "starting",
    durationMins: 90,
    coverageLevel: "Full hand + wrist cuff from custom digital study",
    includes: [
      "Bespoke digital iPad hand study approved before your sitting",
      "Exact freehand composition across hand and forearm",
      "Choice of Organic, Jagua, Crimson, or Obsidian paste",
      "Sterling, VA studio sitting or private local travel",
    ],
    featured: true,
  },
  {
    id: "festive-duo-hands",
    category: "private",
    name: "Festive Eid & Sangeet Guest",
    subtitle: "Private Single or Dual-Hand Sitting",
    startingPrice: 65,
    priceUnit: "starting",
    durationMins: 50,
    coverageLevel: "Half-hand to wrist floral garland or medallion",
    includes: [
      "Botanical vines, lotus medallions, or fine finger lattice",
      "Available in Organic, Jagua, Crimson, or Obsidian formula",
      "Composed for Eid, Diwali, Karwa Chauth, and wedding guests",
    ],
    featured: false,
  },
  {
    id: "party-hourly",
    category: "party",
    name: "Mehndi Night & Celebration Artist",
    subtitle: "On-Location Guest Artistry (2 Hr Minimum)",
    startingPrice: 115,
    priceUnit: "per hour",
    durationMins: 120,
    coverageLevel: "12 to 15 guests per hour (delicate strip & mandala motifs)",
    includes: [
      "Dedicated on-location artist table across Northern Virginia",
      "Tailored guest motif lookbook so celebrations move gracefully",
      "Freshly rolled Organic Henna cones (Crimson/Black by request)",
      "Complimentary travel inside Sterling, Ashburn, and Herndon",
    ],
    featured: true,
  },
  {
    id: "corporate-cultural-events",
    category: "events",
    name: "Galas, University & Brand Pop-Ups",
    subtitle: "DMV Cultural Showcase Commission",
    startingPrice: 320,
    priceUnit: "3-hour block",
    durationMins: 180,
    coverageLevel: "35 to 45 guests across 3 hours",
    includes: [
      "Express botanical, paisley, and contemporary minimalist motif menu",
      "Plant-based cones paired with printed botanical ingredient cards",
      "Available for private receptions, cultural galas, and university showcases",
    ],
    featured: false,
  },
];

export const TRAVEL_ZONES = [
  {
    id: "loudoun-local",
    label: "Sterling / Ashburn / Herndon",
    areas: "Sterling, Ashburn, Herndon, Dulles, Countryside",
    fee: 0,
    minBooking: 65,
  },
  {
    id: "reston-leesburg",
    label: "Reston / Leesburg / Chantilly",
    areas: "Reston, Leesburg, Lansdowne, Chantilly, Oakton",
    fee: 20,
    minBooking: 95,
  },
  {
    id: "fairfax-tysons",
    label: "Tysons / Fairfax / Vienna",
    areas: "Tysons, Vienna, Fairfax, McLean, Falls Church, Burke",
    fee: 35,
    minBooking: 120,
  },
  {
    id: "arlington-dc",
    label: "Arlington / Alexandria / DC",
    areas: "Arlington, Alexandria, Georgetown, Capitol Hill, NW DC",
    fee: 50,
    minBooking: 165,
  },
  {
    id: "maryland-metro",
    label: "Maryland Metro (Bethesda / Silver Spring)",
    areas: "Bethesda, Potomac, Rockville, Silver Spring, National Harbor",
    fee: 65,
    minBooking: 220,
  },
];

export const SKETCH_TO_STAIN = {
  sketchSrc: "./assets/portfolio/sketch-floral-vine.jpg",
  stainSrc: "./assets/portfolio/stain-floral-vine.jpg",
  title: "From Digital Study to Living Stain",
  description:
    "Draw the rule across the frame to compare Sadia's digital iPad composition against the finished freehand organic henna sitting. Every shaded petal, scalloped arch, and finger lattice translates line-for-line onto skin.",
  completionMinutes: 45,
  formulaUsed: "100% Organic Hand-Rolled Henna",
};

export const GENERATED_ARTIFACTS = {
  heroCouture: "./assets/generated/hero-couture-bridal.jpg",
  heroEditorial: "./assets/generated/hero-atelier.jpg",
  bridalMood: "./assets/generated/bridal-editorial.jpg",
  coneMacro: "./assets/generated/cone-alchemy.jpg",
  stainOrganic: "./assets/generated/stain-organic-macro.jpg",
  stainJagua: "./assets/generated/stain-jagua-macro.jpg",
  stainCrimson: "./assets/generated/stain-crimson-macro.jpg",
  stainObsidian: "./assets/generated/stain-obsidian-macro.jpg",
  styleKhaleeji: "./assets/generated/style-khaleeji-plate.jpg",
};

export const SIGNATURE_STYLES = [
  {
    id: "rajasthani-mughlai-bridal",
    index: "01",
    numeral: "I",
    label: "01 / Royal Rajasthani & Mughlai Bridal",
    title: "Royal Rajasthani & Mughlai Bridal",
    tradition: "Heritage Bridal Couture",
    src: "./assets/generated/hero-couture-bridal.jpg",
    medium: "Organic Henna",
    description:
      "Dense micro-jali latticework, negative-space lotus medallions, scalloped forearm cuffs, and partner initials woven discreetly into fine architectural borders.",
    recommendedPackageId: "royal-bridal",
  },
  {
    id: "khaleeji-gulf-vine",
    index: "02",
    numeral: "II",
    label: "02 / Khaleeji Shaded Rose & Gulf Vine",
    title: "Khaleeji Shaded Rose & Gulf Vine",
    tradition: "Gulf Floral & Moroccan Jali",
    src: "./assets/generated/style-khaleeji-plate.jpg",
    medium: "Organic or Obsidian",
    description:
      "Sculptural negative-space rose blossoms, gradient petal shading, geometric wrist bands, and elongated diagonal trails sweeping gracefully to the fingertips.",
    recommendedPackageId: "custom-sketch-session",
  },
  {
    id: "contemporary-botanical-jagua",
    index: "03",
    numeral: "III",
    label: "03 / Contemporary Botanical Jagua",
    title: "Contemporary Botanical Jagua",
    tradition: "Modern Indigo Body Art",
    src: "./assets/generated/stain-jagua-macro.jpg",
    medium: "Botanical Jagua Gel",
    description:
      "Whisper-fine botanical ferns, architectural cuff geometry, and airy negative space rendered in cool navy-indigo fruit gel for editorial portraits.",
    recommendedPackageId: "festive-duo-hands",
  },
  {
    id: "bespoke-heirloom-initials",
    index: "04",
    numeral: "IV",
    label: "04 / Bespoke Heirloom & Hidden Initials",
    title: "Bespoke Heirloom & Hidden Initials",
    tradition: "Nikah & Engagement Commissions",
    src: "./assets/portfolio/portfolio-03-rose-vine-initials.jpg",
    medium: "Organic Henna",
    description:
      "Asymmetrical twin-hand rose garlands tailored around engagement rings, hiding custom couple monograms and ceremony dates directly inside the foliage.",
    recommendedPackageId: "intimate-nikah",
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: "royal-bridal-palms",
    title: "Royal Mandala Palms & Botanical Forearm Cuffs",
    category: "bridal",
    src: "./assets/portfolio/portfolio-02-royal-bridal-palms.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Full Palms + Mid-Forearms",
    occasion: "Bridal Ceremony",
    storyNote:
      "Balanced dual-palm lotus mandalas framed by scalloped cuff bands and trailing leaf-vine borders up both forearms.",
    featured: true,
  },
  {
    id: "rose-vine-initials",
    title: "Twin Rose-Vine Hands with Hidden Initials (SUR)",
    category: "bridal",
    src: "./assets/portfolio/portfolio-03-rose-vine-initials.jpg",
    width: 1199,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Full Dorsal Hands + Wrists",
    occasion: "Nikah & Engagement",
    storyNote:
      "Asymmetrical rose-bud garlands curving around a solitaire ring, with custom partner initials woven along the index finger vine.",
    featured: true,
  },
  {
    id: "scalloped-bridal-cuff",
    title: "Scalloped Heritage Cuff & Finger Jaali",
    category: "bridal",
    src: "./assets/portfolio/portfolio-04-scalloped-bridal-cuff.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Full Dorsal Hand + Wrist Cuff",
    occasion: "Bridal / Walima",
    storyNote:
      "Layered lotus bracelet and deep scalloped hand arch paired with diamond finger jaali and crisp dot accents.",
    featured: true,
  },
  {
    id: "velvet-cuff-paisley",
    title: "Velvet Couture Dual-Hand Paisley Trails",
    category: "bridal",
    src: "./assets/portfolio/portfolio-05-velvet-cuff-paisley.jpg",
    width: 1600,
    height: 1200,
    medium: "Organic Henna",
    coverage: "Both Dorsal Hands",
    occasion: "Engagement & Reception",
    storyNote:
      "Sweeping diagonal rose-and-paisley vines flowing into opposing lattice and leaf-tip index fingers.",
    featured: true,
  },
  {
    id: "botanical-vine",
    title: "Shaded Lotus & Scalloped Arch Vine",
    category: "vines",
    src: "./assets/portfolio/portfolio-01-botanical-vine.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Full Hand + Forearm Trail",
    occasion: "Custom Sketch Commission",
    storyNote:
      "Translated directly from digital iPad study to living skin: bold shaded petals rising up the forearm into delicate finger netting.",
    featured: true,
  },
  {
    id: "sunburst-mandala-duo",
    title: "Sunburst Medallion & Floral Lattice Duo",
    category: "festive",
    src: "./assets/portfolio/portfolio-06-sunburst-mandala-duo.jpg",
    width: 1600,
    height: 1200,
    medium: "Organic Henna",
    coverage: "Both Dorsal Hands",
    occasion: "Eid & Mehndi Night",
    storyNote:
      "Left-hand floral sunburst paired with a sweeping right-hand vine and alternating finger cuff detailing.",
    featured: true,
  },
  {
    id: "beaded-garland-duo",
    title: "Beaded Pearl Drapes & Symmetrical Vines",
    category: "festive",
    src: "./assets/portfolio/portfolio-07-beaded-garland-duo.jpg",
    width: 1600,
    height: 1200,
    medium: "Organic Henna",
    coverage: "Both Dorsal Hands",
    occasion: "Sangeet & Family Party",
    storyNote:
      "Cascading dotted pearl chains linking wrist florals to ring-style finger bands and fine jaali.",
    featured: false,
  },
  {
    id: "floral-garland-trail",
    title: "Haathphool Pearl-Chain Floral Garland",
    category: "vines",
    src: "./assets/portfolio/portfolio-08-floral-garland-trail.jpg",
    width: 1600,
    height: 1200,
    medium: "Organic Henna",
    coverage: "Single Dorsal Hand",
    occasion: "Bridesmaid & Festive",
    storyNote:
      "Inspired by traditional hand-harness jewelry with dual beaded arches curving toward intricate ring-finger cuffs.",
    featured: false,
  },
  {
    id: "geometric-lattice-wrist",
    title: "Diamond Window Paisley & Index Lattice",
    category: "festive",
    src: "./assets/portfolio/portfolio-09-geometric-lattice-wrist.jpg",
    width: 1600,
    height: 1200,
    medium: "Organic Henna",
    coverage: "Wrist to Index Tip",
    occasion: "Eid & Cultural Gathering",
    storyNote:
      "Architectural open-diamond wrist frame anchored by bold paisley scallops and full-length finger netting.",
    featured: false,
  },
  {
    id: "medallion-pearl-drape",
    title: "Starburst Medallion & Dotted Hand Chain",
    category: "festive",
    src: "./assets/portfolio/portfolio-10-medallion-pearl-drape.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Full Dorsal Hand",
    occasion: "Engagement Party",
    storyNote:
      "Centered rosette medallion surrounded by floating four-petal motifs and draped pearl strands across the back of the hand.",
    featured: false,
  },
  {
    id: "bangle-rose-trail",
    title: "Bangle-Side Diagonal Rose & Lattice Trail",
    category: "vines",
    src: "./assets/portfolio/portfolio-11-bangle-rose-trail.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Wrist to Ring Finger",
    occasion: "Shaadi & Mehndi Guest",
    storyNote:
      "Lush spiral-rose cluster sweeping diagonally from gold bangles down to a floral-studded lattice finger.",
    featured: false,
  },
  {
    id: "shaded-floral-duo",
    title: "Dual-Style Shaded Hibiscus & Classic Mandala",
    category: "vines",
    src: "./assets/portfolio/portfolio-12-shaded-floral-duo.jpg",
    width: 1600,
    height: 1200,
    medium: "Organic Henna",
    coverage: "Both Dorsal Hands",
    occasion: "Weekend Private Studio",
    storyNote:
      "Two distinct studies side by side: an open floral mandala on one hand and bold shaded petals on the other.",
    featured: false,
  },
  {
    id: "twin-dorsal-sprigs",
    title: "Twin Botanical Sprigs & Beaded Ring Trail",
    category: "minimalist",
    src: "./assets/portfolio/portfolio-13-twin-dorsal-sprigs.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Minimalist Dorsal Hand",
    occasion: "Private Appointment",
    storyNote:
      "Airy dual floral sprigs spaced thoughtfully around statement gold rings for understated elegance.",
    featured: false,
  },
  {
    id: "minimalist-palm-sprigs",
    title: "Delicate Lavender & Poppy Open-Palm Sprigs",
    category: "minimalist",
    src: "./assets/portfolio/portfolio-14-minimalist-palm-sprigs.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Open Palms + Finger Leaves",
    occasion: "Modern Everyday & Bridal Shower",
    storyNote:
      "Botanical lavender stems and wild poppy buds resting cleanly in open palms, accented with micro leaf clusters.",
    featured: true,
  },
  {
    id: "crescent-arch-mandala",
    title: "Moonlit Botanical Arch & Mandala Bands",
    category: "minimalist",
    src: "./assets/portfolio/portfolio-15-crescent-arch-mandala.jpg",
    width: 1200,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Both Dorsal Hands",
    occasion: "Eid & Chand Raat",
    storyNote:
      "Delicate hanging vine arch on one hand paired with a dark-centered lotus mandala and matching finger cuffs.",
    featured: false,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Sadia composed my bridal study ahead of time and matched every petal onto my arms. By the wedding morning the stain turned a deep espresso mahogany.",
    author: "Amina K.",
    role: "Bride, Loudoun County",
    location: "Ashburn, VA",
    service: "Royal Bridal Palms & Forearms",
  },
  {
    quote:
      "Booked Sadia for my sister's mehndi night in Herndon. She completed 26 guests in two hours without rushing a single vine or smudging a fingertip.",
    author: "Zara M.",
    role: "Mehndi Host",
    location: "Herndon, VA",
    service: "Mehndi Night Celebration Artist",
  },
  {
    quote:
      "I wanted delicate modern palms with open negative space, and her lavender sprig work looked like fine botanical etching. Everyone asked for her studio.",
    author: "Nadia R.",
    role: "Private Studio Client",
    location: "Reston, VA",
    service: "Minimalist Private Sitting",
  },
  {
    quote:
      "Weaving our initials inside the rose vine on my index finger was my favorite detail of the entire weekend. Fresh organic cones smelled of eucalyptus and lavender.",
    author: "Sana & Bilal",
    role: "Nikah Couple",
    location: "Tysons, VA",
    service: "Intimate Nikah & Engagement",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What ingredients are in Sadia's organic henna and jagua cones?",
    answer:
      "Every organic cone is hand-rolled in Sterling, Virginia using triple-sifted Rajasthani lawsone leaf, steam-distilled eucalyptus and lavender essential oils, organic cane sugar, and filtered lemon water. Jagua gel uses pure Amazonian Genipa americana fruit extract. Crimson and Obsidian cones are synthetic instant-color pastes with a mild sensitivity notice.",
  },
  {
    question: "How many days before my wedding should I reserve bridal henna?",
    answer:
      "Reserve your bridal sitting 48 to 72 hours ahead of your ceremony or portrait session. Organic henna lifts as warm terracotta and deepens over 48 hours into rich espresso mahogany.",
  },
  {
    question: "Can custom partner initials or meaningful motifs be woven into my design?",
    answer:
      "Yes. Custom initials, ceremony dates, or meaningful botanical motifs can be hidden within bridal vines, wrist cuffs, or finger trails at no additional fee on bridal commissions.",
  },
  {
    question: "How do retainers, reschedules, and cancellations work?",
    answer:
      "A 50% retainer secures your date on Sadia's calendar. Retainers are non-refundable, though you may transfer your retainer once to an available date with at least 48 hours notice.",
  },
  {
    question: "How should I care for my organic henna stain after the appointment?",
    answer:
      "Wear the dried paste for 6 to 8 hours, mist lightly with a lemon-sugar seal if needed, lift flakes gently using olive or coconut oil instead of water, and keep the skin dry for 12 hours.",
  },
  {
    question: "Do you travel across Northern Virginia, Washington D.C., and Maryland?",
    answer:
      "Yes. Private sittings and events in Sterling, Ashburn, and Herndon carry zero travel fee. Appointments across Reston, Leesburg, Tysons, Fairfax, Arlington, D.C., and Maryland Metro include transparent flat-rate travel shown in the session estimator.",
  },
];
