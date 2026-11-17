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
    "Sterling, VA henna studio by Sadia Shoyeb (@sadia.shoyeb) offering hand-rolled Organic, Jagua, Red, and Black henna for brides, private appointments, and DMV celebrations.",
  bookingPolicies: [
    {
      title: "50% Retainer to Lock Your Date",
      detail:
        "All bridal, party, and private appointments require a 50% retainer at booking. Remaining balance is due at the start of your session.",
    },
    {
      title: "48-Hour Reschedule Notice",
      detail:
        "Retainers are non-refundable but transfer cleanly once if you reschedule at least 48 hours ahead of your appointment window.",
    },
    {
      title: "Bridal Peak Stain Timing",
      detail:
        "Schedule Organic Henna or Jagua Gel sessions 48 to 72 hours before your wedding or ceremony so the stain reaches peak mahogany or indigo depth.",
    },
    {
      title: "Natural vs. Synthetic Transparency",
      detail:
        "Organic henna and pure jagua gel are plant-derived. Red and Black instant cones use synthetic dyes for immediate color and carry a mild skin-sensitivity disclaimer.",
    },
  ],
  highlights: ["Clients", "Parties", "Price & Policy", "Stain Guide", "Past Events"],
};

export const CONE_FORMULAS = [
  {
    id: "organic",
    name: "100% Organic Hand-Rolled Henna",
    badge: "Signature Plant Blend",
    tagline:
      "Triple-sifted Rajasthani lawsone leaf mixed fresh with eucalyptus and lavender oils for a rich mahogany stain.",
    stainHexStages: ["#4A3B23", "#B95D29", "#9F3B1B", "#732312", "#4B130B"],
    longevityDays: "10-14 Days",
    maturityHours: "48 Hours",
    ingredients:
      "Triple-sifted Rajasthani henna powder, pure eucalyptus and lavender essential oils, organic cane sugar, filtered lemon water.",
    bestFor: "Bridal mehndi, nikah, engagement shoots, sangeet nights, sensitive skin",
    aftercareTip:
      "Leave dried paste on 6 to 8 hours, seal with lemon-sugar dab, scrape gently with oil, and avoid water for the first 12 hours.",
    safetyNote:
      "100% plant-derived and preservative-free. Safe for brides, kids, and expectant mothers.",
  },
  {
    id: "jagua",
    name: "Pure Botanical Jagua Gel",
    badge: "Blue-Black Tattoo Tone",
    tagline:
      "Amazonian Genipa americana fruit extract blended into crisp fine-line gel that oxidizes into deep slate indigo.",
    stainHexStages: ["#1D2330", "#69778A", "#374963", "#1F2E47", "#111B2E"],
    longevityDays: "10-14 Days",
    maturityHours: "36-48 Hours",
    ingredients:
      "Pure Genipa americana fruit juice, lavender essential oil, food-grade xanthan gum.",
    bestFor: "Khaleeji minimalism, modern editorial looks, temporary body-art trials, Eid",
    aftercareTip:
      "Keep dry paste on 2.5 to 4 hours, rinse gently with cool water without scrubbing, and let the blue-black tint oxidize overnight.",
    safetyNote:
      "Fruit-derived botanical stain. Skip if you have known citrus, berry, or tropical fruit allergies.",
  },
  {
    id: "red",
    name: "Festival Instant Red Henna",
    badge: "Same-Day Crimson",
    tagline:
      "Fast-setting ceremonial cone formulated for vibrant crimson-red payoff right after paste removal.",
    stainHexStages: ["#691D1A", "#B9362C", "#A42521", "#8C1A19", "#6F1415"],
    longevityDays: "4-6 Days",
    maturityHours: "Instant (30 Mins)",
    ingredients:
      "Henna base blended with cosmetic-grade red pigment and quick-dry aromatic botanicals.",
    bestFor: "Last-minute Eid parties, bridesmaids, cultural stage dances, same-day events",
    aftercareTip:
      "Wear paste 30 to 45 minutes until completely dry, peel off gently, and apply light almond oil for crisp edges.",
    safetyNote:
      "Contains synthetic cosmetic colorants for instant payoff and may cause mild skin irritation on reactive skin. Patch test advised.",
  },
  {
    id: "black",
    name: "Midnight Instant Black Henna",
    badge: "Same-Day Charcoal",
    tagline:
      "High-contrast charcoal-black instant paste designed for crisp same-day photoshoots and bold statement vines.",
    stainHexStages: ["#242322", "#3A3837", "#2B2928", "#1F1D1C", "#141313"],
    longevityDays: "4-6 Days",
    maturityHours: "Instant (30 Mins)",
    ingredients:
      "Synthetic black body-ink paste formulated for rapid dark surface staining.",
    bestFor: "Same-day photoshoots, costume events, editorial accents, festival booths",
    aftercareTip:
      "Remove gently once dry after 30 minutes and keep clean and dry for 2 hours to preserve sharp line work.",
    safetyNote:
      "Synthetic ink formula that may cause skin irritation on sensitive skin. Request Organic or Jagua for natural long-wear staining.",
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
      "Custom pre-session concept consultation and motif planning",
      "Hidden partner initials or wedding date woven into the design",
      "Freshly rolled Organic Henna or Jagua Gel cones",
      "Lemon-sugar seal kit and printed 48-hour stain care guide",
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
      "Optional hidden couple initials on index finger or wrist band",
      "Choice of Organic Henna or Botanical Jagua Gel",
      "Aftercare balm and post-session wrap instructions",
    ],
    featured: false,
  },
  {
    id: "custom-sketch-session",
    category: "private",
    name: "Bespoke Concept-to-Stain Private Session",
    subtitle: "iPad Sketch + Freehand Application",
    startingPrice: 120,
    priceUnit: "starting",
    durationMins: 90,
    coverageLevel: "Full hand + wrist cuff from custom digital proof",
    includes: [
      "Custom digital iPad hand sketch approved before your session",
      "Precision freehand transfer onto hand and forearm",
      "Organic, Jagua, Red, or Black cone selection",
      "Sterling, VA studio seating or local travel",
    ],
    featured: true,
  },
  {
    id: "festive-duo-hands",
    category: "private",
    name: "Festive Eid & Sangeet Guest",
    subtitle: "Private Single or Dual-Hand Appointment",
    startingPrice: 65,
    priceUnit: "starting",
    durationMins: 50,
    coverageLevel: "Half-hand to wrist floral garland or mandala",
    includes: [
      "Choice of botanical vines, lotus mandalas, or geometric finger lattice",
      "Available in Organic, Jagua, Red, or Black formula",
      "Ideal for Eid, Diwali, Karwa Chauth, and wedding guests",
    ],
    featured: false,
  },
  {
    id: "party-hourly",
    category: "party",
    name: "Mehndi Night & Birthday Party Artist",
    subtitle: "Hourly Guest Speed-Artistry (2 Hr Minimum)",
    startingPrice: 115,
    priceUnit: "per hour",
    durationMins: 120,
    coverageLevel: "12 to 15 guests per hour (delicate strip & mandala motifs)",
    includes: [
      "Dedicated on-location artist setup across Northern Virginia",
      "Curated guest motif lookbook so lines move quickly",
      "Freshly rolled Organic Henna cones (Red/Black available by request)",
      "Zero travel fee inside Sterling, Ashburn, and Herndon",
    ],
    featured: true,
  },
  {
    id: "corporate-cultural-events",
    category: "events",
    name: "Corporate, University & Pop-Up Events",
    subtitle: "DMV Cultural Showcase & Campus Programming",
    startingPrice: 320,
    priceUnit: "3-hour block",
    durationMins: 180,
    coverageLevel: "35 to 45 guests across 3 hours",
    includes: [
      "High-throughput floral, paisley, and modern minimalist menu board",
      "All-natural plant cones plus printed stain & ingredient cards",
      "Serving corporate ERGs, university MSA/ISA nights, and DMV pop-ups",
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
  title: "Bespoke Concept to Living Stain",
  description:
    "Drag the slider to compare Sadia's digital iPad botanical concept sketch against the finished freehand organic henna application. Every petal, scalloped arch, and finger lattice translates line-for-line onto skin.",
  completionMinutes: 45,
  formulaUsed: "100% Organic Hand-Rolled Henna",
};

export const GENERATED_ARTIFACTS = {
  heroEditorial: "./assets/generated/hero-atelier.jpg",
  bridalMood: "./assets/generated/bridal-editorial.jpg",
  coneMacro: "./assets/generated/cone-alchemy.jpg",
};

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
    title: "Twin Rose-Vine Hands with Hidden Initials (SUR♡)",
    category: "bridal",
    src: "./assets/portfolio/portfolio-03-rose-vine-initials.jpg",
    width: 1199,
    height: 1600,
    medium: "Organic Henna",
    coverage: "Full Dorsal Hands + Wrists",
    occasion: "Nikah & Engagement",
    storyNote:
      "Asymmetrical rose-bud garlands curving around a solitaire ring, with custom partner initials SUR♡ tucked along the index finger vine.",
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
      "Brought straight from digital iPad draft to living skin: bold shaded petals rising up the forearm into delicate finger netting.",
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
      "Inspired by traditional hand-harness jewelry with dual beaded arches arching toward intricate ring-finger cuffs.",
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
      "Two distinct moods side by side: an open floral mandala on one hand and bold shaded petals on the other.",
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
      "Clean, airy dual floral sprigs spaced thoughtfully around statement gold rings for understated elegance.",
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
      "Botanical lavender stems and wild poppy buds resting cleanly in open palms, speckled with micro leaf clusters.",
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
      "Sadia drew my bridal sketch ahead of time and matched every petal onto my arms. By the wedding morning the stain turned a deep espresso mahogany.",
    author: "Amina K.",
    role: "Bride, Loudoun County",
    location: "Ashburn, VA",
    service: "Royal Bridal Palms & Forearms",
  },
  {
    quote:
      "Booked Sadia for our sister's mehndi night in Herndon. She handled 26 guests in two hours without rushing a single vine or smudging a finger tip.",
    author: "Zara M.",
    role: "Mehndi Host",
    location: "Herndon, VA",
    service: "Mehndi Night Party Artist",
  },
  {
    quote:
      "I wanted delicate modern palms with zero heavy fill, and her lavender sprig design looked like fine-line botanical ink. Everyone asked for her handle.",
    author: "Nadia R.",
    role: "Private Studio Client",
    location: "Reston, VA",
    service: "Minimalist Private Session",
  },
  {
    quote:
      "Hiding our initials inside the rose vine on my index finger was my favorite detail of the entire weekend. Fresh organic cones smelled amazing too.",
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
      "Every organic cone is hand-rolled in Sterling, VA using triple-sifted Rajasthani lawsone leaf, steam-distilled eucalyptus and lavender essential oils, cane sugar, and lemon water. Jagua gel uses pure Amazonian Genipa americana fruit extract. Red and Black cones are synthetic instant-color options with a mild sensitivity notice.",
  },
  {
    question: "How many days before my wedding should I book bridal henna?",
    answer:
      "Book your bridal session 48 to 72 hours before your wedding day or main ceremony. Organic henna starts bright terracotta orange upon removal and deepens over 48 hours into a rich dark mahogany stain.",
  },
  {
    question: "Can you weave custom hidden partner initials or motifs into my design?",
    answer:
      "Yes. Custom initials, wedding dates, or meaningful botanical motifs can be hidden cleanly inside bridal vines, cuffs, or finger trails at no extra charge for bridal packages.",
  },
  {
    question: "How do deposits, reschedules, and cancellations work?",
    answer:
      "A 50% retainer locks your date on Sadia's calendar. Retainers are non-refundable, though you may transfer your retainer once to a new available date with at least 48 hours advance notice.",
  },
  {
    question: "How do I care for my organic henna stain after the session?",
    answer:
      "Keep the dried paste on for 6 to 8 hours (overnight works best with a breathable wrap), dab lightly with lemon-sugar seal if needed, scrape paste off with olive or coconut oil instead of water, and avoid washing the area for 12 hours.",
  },
  {
    question: "Do you travel across Northern Virginia, Washington DC, and Maryland?",
    answer:
      "Yes. Local travel in Sterling, Ashburn, and Herndon carries $0 travel fee. Appointments in Reston, Leesburg, Tysons, Fairfax, Arlington, DC, and Maryland Metro include transparent flat-rate travel tiers shown in the quote estimator.",
  },
];
