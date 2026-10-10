/**
 * ---------------------------------------------------------------------------
 * THIS IS THE ONLY FILE YOU NEED TO EDIT TO MAKE THE SITE YOURS.
 * ---------------------------------------------------------------------------
 * Everything the page renders — the studio name, the frames, the services,
 * the order form — comes from here. No component has hard-coded copy.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS SITE IS (and is not)
 * ---------------------------------------------------------------------------
 * This is the **picture framing studio** — the gallery of finished work and the
 * place customers commission their own pieces.
 *
 * It is NOT a software site. Everything about engineering, software, systems,
 * AI and cybersecurity belongs to the parent company, Evantra De-Buckman
 * Ventures, at https://www.evantradebuckman.com — the platform owner. They
 * built this site and they run the business; AziBK is the brand customers see.
 */

/* -------------------------------------------------------------------------- */
/*  STUDIO IDENTITY                                                           */
/* -------------------------------------------------------------------------- */

export const parent = {
  name: 'Evantra De-Buckman Ventures',
  short: 'Evantra',
  url: 'https://www.evantradebuckman.com',
  tagline: 'The company that owns and operates the AziBK platform.',
  /** Used in the footer credit and the attribution cards. */
  blurb:
    'Evantra De-Buckman Ventures builds technology ventures from Ghana for the world — engineering, AI and cybersecurity. They created and manage the AziBK framing platform, and they handle its online orders, hosting and support. AziBK is the framing brand you are dealing with; Evantra is the business behind it.',
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  /** Shown in the hero pill. */
  availability: string;
  /** Rotating words in the hero — keep them short, they are set at display size. */
  rotating: string[];
  blurb: string;
  about: string;
  socials: { label: string; href: string }[];
};

export const profile: Profile = {
  name: 'AziBK',
  initials: 'AZ',
  role: 'Picture Framing Studio',
  location: 'Accra, Ghana',
  email: 'Kofiaziben@gmail.com',
  phone: '+233 55 246 1958',
  availability: 'Taking commissions — 2 week turnaround',
  rotating: ['photographs.', 'artworks.', 'heirlooms.', 'memories.'],
  blurb:
    'We build frames around the things you cannot replace. Bespoke framing, conservation mounting and museum glazing — measured, cut and finished by hand in Accra.',
  about:
    'A frame is not decoration around a picture. It is the structure that decides whether that picture survives the next fifty years — the mount that stops it sticking, the glass that filters the light, the joints that keep it square when the air changes. We treat every commission as a small piece of conservation work, because the cheapest part of framing is the frame, and the most expensive part is regret.',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'WhatsApp', href: 'https://wa.me/233503190257' },
  ],
};

export type Stat = { value: string; label: string; note?: string };

export const stats: Stat[] = [
  { value: '120+', label: 'Pieces framed', note: 'since opening the studio' },
  { value: '40yr', label: 'Grade materials', note: 'conservation & archival boards' },
  { value: '99%', label: 'UV filtered', note: 'on museum glass options' },
  { value: '2wk', label: 'Typical turnaround', note: 'rush available on request' },
];

/* -------------------------------------------------------------------------- */
/*  MATERIALS & CRAFT — the framing equivalent of a capability matrix         */
/* -------------------------------------------------------------------------- */

export type Tier = 'house' | 'premium' | 'select';

export type Item = {
  name: string;
  tier: Tier;
  /** Explained in the detail panel — this is what sells the upgrade. */
  note: string;
  /** 0–100. Rendered as the depth bar; decorative, not a literal claim. */
  depth: number;
  /** Optional icon under /public/marks. Omit and a tier dot is drawn. */
  icon?: string;
};

export type ItemGroup = {
  id: string;
  title: string;
  caption: string;
  items: Item[];
};

export const skillGroups: ItemGroup[] = [
  {
    id: 'mouldings',
    title: 'Mouldings & Frames',
    caption: 'The visible structure, and the one that has to stay straight.',
    items: [
      { name: 'Hand-finished Hardwood', tier: 'house', depth: 96, icon: '/marks/hardwood.svg', note: 'Solid timber section, joined with mitred corners, pinned and filled. Available in oak, mahogany and local hardwood.' },
      { name: 'Gesso & Gilded', tier: 'select', depth: 88, icon: '/marks/gilded.svg', note: 'Traditional gesso build-up, bole underlay and gold leaf, burnished by hand for depth.' },
      { name: 'Metal Section', tier: 'house', depth: 84, icon: '/marks/metal.svg', note: 'Anodised aluminium profiles — the slimmest sight line we offer, and the most stable in humid rooms.' },
      { name: 'Deep Shadow Box', tier: 'premium', depth: 90, icon: '/marks/shadowbox.svg', note: 'Built for objects with real depth: medals, garments, textiles, cast sculptures. Interior lining to your colour.' },
      { name: 'Floating Mount', tier: 'premium', depth: 86, icon: '/marks/floating.svg', note: 'The artwork sits visibly clear of the mount on archival risers — for canvas, board and paper alike.' },
      { name: 'Restoration Moulding', tier: 'select', depth: 78, icon: '/marks/restoration.svg', note: 'Matched or replicated profiles for existing frames, so a new piece can sit beside an old one without a seam.' },
    ],
  },
  {
    id: 'glazing',
    title: 'Glazing',
    caption: 'What stands between your work and the light.',
    items: [
      { name: 'Museum Glass', tier: 'select', depth: 92, icon: '/marks/museumglass.svg', note: 'Abrasion-resistant, non-reflective coating on both faces and 99% UV filtering. The choice for anything on paper you intend to keep.' },
      { name: 'UV-Filtered Clear', tier: 'premium', depth: 88, icon: '/marks/uvclear.svg', note: 'Roughly 99% UV block with full clarity — the sensible middle ground for sunlight-facing walls.' },
      { name: 'Standard Clear', tier: 'house', depth: 70, icon: '/marks/clear.svg', note: 'Clean float glass. Correct for posters and pieces that will be re-framed later.' },
      { name: 'Acrylic Glazing', tier: 'premium', depth: 82, icon: '/marks/acrylic.svg', note: 'Lightweight, shatter-resistant and safer to ship. Recommended above A1 size or for children\u2019s rooms.' },
      { name: 'Anti-Reflective Etched', tier: 'premium', depth: 80, icon: '/marks/antireflective.svg', note: 'Reduces reflections for pieces hung in bright galleries where the artwork must be seen, not the room.' },
      { name: 'No Glazing', tier: 'house', depth: 74, icon: '/marks/noglazing.svg', note: 'For oils, acrylics on canvas and textiles — these surfaces need to breathe and should never be sealed behind glass.' },
    ],
  },
  {
    id: 'mounts',
    title: 'Mounts & Backing',
    caption: 'The invisible layer that actually protects the work.',
    items: [
      { name: 'Conservation Board', tier: 'select', depth: 94, icon: '/marks/conservation.svg', note: 'Cotton-rag, lignin-free board with a pH-neutral face. It will not yellow, and it will not bleed into your artwork.' },
      { name: 'Alpha-Cellulose Mount', tier: 'premium', depth: 88, icon: '/marks/alphacellulose.svg', note: 'Purer than standard board and cheaper than cotton rag — the sweet spot for most commissions.' },
      { name: 'Acid-Free Standard Board', tier: 'house', depth: 78, icon: '/marks/acidfree.svg', note: 'Colour-fast mount board, appropriate for everyday framing where the paper is not archival.' },
      { name: 'Moisture Barrier', tier: 'premium', depth: 84, icon: '/marks/moisture.svg', note: 'A sealed foil layer behind the artwork so damp moves around the frame rather than through it.' },
      { name: 'Stainless Hanging Method', tier: 'select', depth: 90, icon: '/marks/stainless.svg', note: 'Hinged with Japanese paper and starch paste, or stainless pins through existing holes — never pressure-sensitive tape.' },
      { name: 'Fluted & Foam Board', tier: 'house', depth: 72, icon: '/marks/fluted.svg', note: 'Dimensional backing for rigid mounting of photographs and open-edition prints on board.' },
    ],
  },
  {
    id: 'finishing',
    title: 'Finishing & Fitting',
    caption: 'Everything you only notice when it is missing.',
    items: [
      { name: 'Mitred & Cross-Nailed', tier: 'house', depth: 92, icon: '/marks/mitred.svg', note: 'Corners cut on a calibrated mitre saw, glued, pinned and filled — no gaps that open with the seasons.' },
      { name: 'Dust Sealing', tier: 'house', depth: 86, icon: '/marks/dustsealed.svg', note: 'Tape-sealed backing so insects and dust cannot reach the artwork from behind.' },
      { name: 'Anti-Slip Felt Pads', tier: 'house', depth: 84, icon: '/marks/feltpads.svg', note: 'Felt on every bottom edge, so your walls and paintwork are never the casualty of moving it.' },
      { name: 'D-Rings & Hanging Kit', tier: 'house', depth: 88, icon: '/marks/hangingkit.svg', note: 'Load-rated rings and a wall fixing matched to your wall type, with instructions. Nothing leaves the studio unfixable.' },
      { name: 'Hand-Painted Accent Line', tier: 'select', depth: 76, icon: '/marks/accentline.svg', note: 'A painted slip between mount and frame when a plain gap would feel unresolved.' },
      { name: 'Printed Plaque', tier: 'premium', depth: 70, icon: '/marks/plaque.svg', note: 'Brushed metal or engraved plate with a title, name or date, fixed to the frame face.' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  THE GALLERY — showcase pieces and their stories                          */
/* -------------------------------------------------------------------------- */

export type ProjectImage = {
  /** Path under /public, e.g. "/work/comm-photograph-cover.svg". */
  src: string;
  /** Describe what is IN the image — read aloud by screen readers. */
  alt: string;
  /** Override the default gallery preview ratio when matching a supplied photo. */
  previewRatio?: string;
  caption?: string;
  /**
   * `photo`  — product/frame photography. Rendered object-cover, fills frame.
   * `detail` — close-up of a joint, mount or texture. Also object-cover.
   * `plane`  — flat artwork, plan or diagram. object-contain, never cropped.
   */
  kind: 'photo' | 'detail' | 'plane';
  /** Preserve source ratio when a supplied photograph is portrait-oriented. */
  naturalAspect?: boolean;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** The piece type, e.g. "Photograph". */
  category: string;
  tagline: string;
  year: string;
  role: string;
  /** One line on what was made and what governed the decision. */
  outcome: string;
  /** Materials used — shown as chips. */
  stack: string[];
  /** rgb triplet, e.g. "91 140 255" — tints the page while this card is hovered. */
  accent: [string, string, string];
  /** Price guide. Keep honest or remove. */
  from: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  brief: string;
  approach: string;
  highlights: string[];
  specs: { value: string; label: string }[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'upsa-src-annual-dinner',
    index: '01',
    title: 'UPSA SRC Annual Dinner',
    category: 'Event portrait',
    tagline: 'A keepsake portrait celebrating the people behind the event',
    year: '2025',
    role: 'AziBK featured work',
    outcome: 'UPSA SRC Annual Dinner attendees recognized as beneficiaries of the AziBK project.',
    stack: ['Event photography', 'UPSA SRC', 'AziBK showcase'],
    accent: ['91', '140', '255'],
    from: 'Request a quote',
    cover: {
      src: '/marks/upsa.png',
      alt: 'Four UPSA SRC representatives standing together at the UPSA SRC Annual Dinner, with event branding behind them',
      previewRatio: '16 / 9',
      caption: 'UPSA SRC Annual Dinner — beneficiaries of the AziBK project.',
      kind: 'photo',
    },
    gallery: [],

    brief:
      'A group portrait from the UPSA SRC Annual Dinner featuring individuals identified as beneficiaries of the AziBK project. The photograph celebrates their contribution and connection to the project.',
    approach:
      'This supplied photograph is shown as a real project image, not as a claim that the people pictured commissioned a particular frame. If you would like a print like this framed for your home, office or organisation, send the image and dimensions with your enquiry.',
    highlights: [
      'Actual event photograph supplied for the AziBK showcase.',
      'Suitable for a framed group portrait, office display or event keepsake.',
      'Frame, mount and glazing options can be discussed when requesting a quote.',
    ],
    specs: [
      { value: 'UPSA', label: 'event' },
      { value: 'SRC', label: 'community' },
      { value: 'AziBK', label: 'framing brand' },
    ],
    links: [],
  },
  {
    slug: 'concept-photograph',
    index: '02',
    title: 'Archival Photograph — concept',
    category: 'Concept example',
    tagline: 'An example of how an archival print could be framed',
    year: 'Concept',
    role: 'Illustrative mockup — not a completed commission',
    outcome: 'Museum glass and a cotton-rag mount are options to discuss for a real print.',
    stack: ['Museum Glass option', 'Cotton-rag mount option', 'Oak section concept'],
    accent: ['255', '122', '89'],
    from: 'Request a quote',
    cover: {
      src: '/work/comm-photograph-cover.svg',
      alt: 'Illustrative mockup of a photograph in a pale oak frame; this is not a photograph of a completed AziBK commission',
      caption: 'Concept mockup only — replace with a photograph of a real completed frame.',
      kind: 'photo',
    },
    gallery: [
      {
        src: '/work/comm-photograph-detail.svg',
        alt: 'Illustrative close-up of a frame corner, not a photograph of a completed AziBK commission',
        caption: 'Illustrative mockup only.',
        kind: 'detail',
      },
    ],
    brief:
      'An illustrative example showing how a photograph might be framed. It is not a record of a completed commission.',
    approach:
      'The pictured frame is a generated mockup. Share your print size, where it will hang, and the finish you like; AziBK can then recommend materials and provide an accurate quote.',
    highlights: [
      'Museum glass is an optional upgrade for light-exposed photographs.',
      'Cotton-rag mount board is an option for conservation-minded framing.',
      'Final materials and pricing depend on the real piece and its dimensions.',
    ],
    specs: [
      { value: 'Concept', label: 'example only' },
      { value: 'Custom', label: 'made to measure' },
      { value: 'Quote', label: 'based on your piece' },
    ],
    links: [],
  },
  {
    slug: 'comm-abstract',
    index: '02',
    title: 'Floating Canvas — concept',
    category: 'Concept example',
    tagline: 'An example of a canvas floated inside a box frame',
    year: 'Concept',
    role: 'Illustrative mockup — not a completed commission',
    outcome: 'A floating frame can show the canvas edge with a deliberate shadow gap.',
    stack: ['Floating frame concept', 'Deep box option', 'No glazing option'],
    accent: ['255', '122', '89'],
    from: 'from GH\u20b5 2,100',
    cover: {
      src: '/work/comm-abstract-cover.svg',
      alt: 'Illustrative mockup of an abstract canvas in a warm-toned floating frame; not a completed AziBK commission',
      caption: 'Concept mockup only — replace with a photograph of a real completed frame.',
      kind: 'photo',
    },
    gallery: [
      {
        src: '/work/comm-abstract-detail.svg',
        alt: 'Close-up of the shadow gap between the edge of the canvas and the frame',
        caption: 'The gap is set with archival risers, so air moves freely behind the canvas.',
        kind: 'detail',
      },
      {
        src: '/work/comm-abstract-elevation.svg',
        alt: 'Scale drawing of the floating frame showing the moulding profile and shadow gap',
        caption: 'Every oversized frame is drawn to scale before a single cut is made.',
        kind: 'plane',
      },
    ],
    brief:
      'Illustrative example of a large canvas where the artist may want the painted edges to remain visible. This is not a completed AziBK commission.',
    approach:
      'The generated image demonstrates one possible floating-frame look. Actual framing, hanging hardware and dimensions would be specified from the real canvas and wall before quoting.',
    highlights: [
      'French cleat hanging system — the whole 1.6m piece lifts off for transport.',
      'Canvas set on archival risers with an even 8mm shadow gap all round.',
      'Deliberately unglazed. Oils and acrylics need airflow; sealing them causes bloom.',
    ],
    specs: [
      { value: '1.6m', label: 'longest edge' },
      { value: '8mm', label: 'shadow gap' },
      { value: 'No glass', label: 'by design' },
    ],
    links: [],
  },
  {
    slug: 'comm-certificate',
    index: '03',
    title: 'Certificate Frame — concept',
    category: 'Concept example',
    tagline: 'An example of a certificate with a layered mount',
    year: 'Concept',
    role: 'Illustrative mockup — not a completed commission',
    outcome: 'A double mount can add depth while leaving a certificate visible.',
    stack: ['UV-Filtered Clear', 'Alpha-cellulose mount', 'Metal section'],
    accent: ['126', '231', '163'],
    from: 'from GH\u20b5 780',
    cover: {
      src: '/work/comm-certificate-cover.svg',
      alt: 'A framed certificate with a two-tone mount and a thin dark metal frame',
      caption: 'Double mount reveal in two tones, sized so the seal sits clear of the edge.',
      kind: 'photo',
    },
    gallery: [
      {
        src: '/work/comm-certificate-detail.svg',
        alt: 'Close-up of the double mount reveal showing the inner and outer board tones',
        caption: 'The inner reveal is cut to the seal, so the framing never crops the document.',
        kind: 'detail',
      },
    ],
    brief:
      'A certificate with an embossed seal near the margin, to be hung in a bright office corridor for decades. The seal had to remain fully visible and the document could not be trimmed.',
    approach:
      'We cut a double mount with a two-tone reveal: the outer board frames the whole sheet, the inner reveal aligns to the seal. The document is held with edge mounts rather than hinges, so nothing touches the printed surface. Aluminium section keeps the sight line thin and stays flat in an air-conditioned corridor.',
    highlights: [
      'Edge-mounted, not hinged — nothing adheres to the document surface.',
      'Alpha-cellulose board: purer than standard, far cheaper than cotton rag.',
      'Aluminium section holds straight where a thin timber frame would bow.',
    ],
    specs: [
      { value: 'A3', label: 'frame size' },
      { value: '2', label: 'mount layers' },
      { value: 'Flat', label: 'stays straight' },
    ],
    links: [],
  },
  {
    slug: 'comm-memorabilia',
    index: '04',
    title: 'Memorabilia Shadow Box — concept',
    category: 'Concept example',
    tagline: 'An example of how keepsakes could be arranged in a shadow box',
    year: 'Concept',
    role: 'Illustrative mockup — not a completed commission',
    outcome: 'A shadow box can display keepsakes without fixing through the objects.',
    stack: ['Deep shadow box', 'Acrylic glazing', 'Lined interior'],
    accent: ['192', '132', '252'],
    from: 'from GH\u20b5 1,650',
    cover: {
      src: '/work/comm-memorabilia-cover.svg',
      alt: 'A deep shadow box frame holding medals, ribbons and a small photograph',
      caption: 'Lined interior in a deep subframe — the objects sit inside, not on a backing sheet.',
      kind: 'photo',
    },
    gallery: [
      {
        src: '/work/comm-memorabilia-detail.svg',
        alt: 'Close-up showing how a medal is held by a concealed mount rather than adhesive',
        caption: 'Every fixing is concealed behind the object, and none of them are adhesive.',
        kind: 'detail',
      },
      {
        src: '/work/comm-memorabilia-plan.svg',
        alt: 'Layout plan showing the arranged position of each object in the case',
        caption: 'The arrangement is drawn and agreed before anything is fixed in place.',
        kind: 'plane',
      },
    ],
    brief:
      'Medals, service ribbons and a portrait photograph, to be kept together in one piece that could be carried between houses. Nothing could be pinned through, glued, or polished in a way that risked the originals.',
    approach:
      'A deep shadow box with a lined subframe, so the objects sit within real depth rather than against a flat sheet. Each medal is held by a formed acrylic cradle concealed behind it, and the ribbons are laid over an inert board. Acrylic glazing because it is light and shatter-resistant, since the piece was built to be moved.',
    highlights: [
      'Concealed acrylic cradles — every object is held without adhesive or pin holes.',
      'Acrylic rather than glass: the case was designed to be transported and rehung.',
      'Subframe interior lined to the customer\u2019s colour, matched against the photo.',
    ],
    specs: [
      { value: '60mm', label: 'interior depth' },
      { value: '9', label: 'objects mounted' },
      { value: '0', label: 'adhesive fixes' },
    ],
    links: [],
  },
  {
    slug: 'comm-fabric',
    index: '05',
    title: 'Textile Display — concept',
    category: 'Concept example',
    tagline: 'An example of a textile displayed within a deep frame',
    year: 'Concept',
    role: 'Illustrative mockup — not a completed commission',
    outcome: 'Textiles need a support method chosen for the specific fabric and its condition.',
    stack: ['Cotton-rag mount', 'Deep shadow box', 'UV glass'],
    accent: ['252', '211', '77'],
    from: 'from GH\u20b5 1,900',
    cover: {
      src: '/work/comm-fabric-cover.svg',
      alt: 'A full-length woven kente cloth framed flat inside a deep dark frame',
      caption: 'Held flat by tension alone — no stitches, no pins, no adhesive.',
      kind: 'photo',
    },
    gallery: [
      {
        src: '/work/comm-fabric-detail.svg',
        alt: 'Close-up of a hand-stitched edge channel holding the cloth under tension',
        caption: 'A stitched edge channel carries the tension, hidden behind the frame lip.',
        kind: 'detail',
      },
      {
        src: '/work/comm-fabric-section.svg',
        alt: 'Cross-section drawing showing how the cloth is tensioned clear of the mount board',
        caption: 'The cloth sits clear of the board so air moves behind the weave.',
        kind: 'plane',
      },
    ],
    brief:
      'A full-length kente cloth with real weight and open weave, to be displayed flat. It had to remain intact — meaning no stitching through the fabric, no adhesive, and no holes where the weave could later tear.',
    approach:
      'We built a tension mount: the cloth is held by a stitched edge channel that wraps the back of a rigid board under even tension, taking the load across the full length rather than at a few points. It sits clear of the mount board so air moves behind the weave, behind UV glass in a deep frame. Every stitch is in the channel and reversible.',
    highlights: [
      'Hand-stitched edge channel carries the load evenly — no focal points to tear.',
      'Cloth held clear of the board, allowing airflow through an open weave.',
      'Fully reversible: the cloth can be removed with nothing but the stitches undone.',
    ],
    specs: [
      { value: '2.4m', label: 'cloth length' },
      { value: 'UV', label: 'glass type' },
      { value: '0', label: 'pins used' },
    ],
    links: [],
  },
];

/* -------------------------------------------------------------------------- */
/*  HOW WE WORK                                                               */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Measure the piece, and the wall',
    body: 'We look at what is being framed — the paper, the pigment, the depth, the weight — and where it will actually hang. Light direction and humidity decide more of the specification than taste does.',
    deliverable: 'A written specification and a firm quote.',
  },
  {
    step: '02',
    title: 'Choose materials against the risk',
    body: 'Museum glass or UV clear. Cotton rag or alpha-cellulose. Glazed, or left to breathe. Each choice is a trade-off, so we explain what you are buying and what happens if you skip it.',
    deliverable: 'Moulding, glazing and mount samples in hand.',
  },
  {
    step: '03',
    title: 'Cut, join and finish by hand',
    body: 'The quiet ninety percent. Corners mitred, glued, pinned and filled. The mount cut with a hand-torn or bevelled edge. Everything dust-sealed before it leaves the bench.',
    deliverable: 'The finished frame, fitted and checked.',
  },
  {
    step: '04',
    title: 'Hang it, then leave it alone',
    body: 'We supply the right fixing for your wall and show you how it goes up. After that the frame should disappear — you should only ever notice the picture.',
    deliverable: 'Load-rated hanging kit and fitting instructions.',
  },
];

/* -------------------------------------------------------------------------- */
/*  ORDERING                                                                  */
/* -------------------------------------------------------------------------- */

export type OrderStep = { step: string; title: string; body: string };

export const orderSteps: OrderStep[] = [
  {
    step: '01',
    title: 'Send us the details',
    body: 'Tell us what you have, roughly how big it is, and how you would like it to look. A photo from your phone is enough to start.',
  },
  {
    step: '02',
    title: 'Get a quote in 24 hours',
    body: 'We come back with a specification and a firm price. No obligation, and no surprises later in the process.',
  },
  {
    step: '03',
    title: 'Approve, then we build',
    body: 'Once you approve, the piece goes on the bench. Typical turnaround is two weeks; we will tell you if it will be longer.',
  },
  {
    step: '04',
    title: 'Collect or have it delivered',
    body: 'Collect from the studio, or we arrange delivery and fit. Rush turnaround is available on request.',
  },
];

/** Options that populate the order form dropdowns. */
export const orderOptions = {
  itemTypes: [
    'Photograph / print',
    'Painting (canvas)',
    'Painting (paper)',
    'Certificate / document',
    'Textile / fabric',
    'Memorabilia / 3D object',
    'Mirror',
    'Something else',
  ],
  sizes: ['Small (under A4)', 'Medium (A3–A2)', 'Large (A1)', 'Oversized (over A1)', 'Not sure'],
  materials: [
    'Best protection (museum glass + conservation)',
    'Balance of cost and protection',
    'Simple and affordable',
    'Not sure — please advise',
  ],
};

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { id: 'gallery', label: 'Gallery', index: '01' },
  { id: 'materials', label: 'Materials', index: '02' },
  { id: 'process', label: 'Process', index: '03' },
  { id: 'about', label: 'About', index: '04' },
  { id: 'order', label: 'Order', index: '05' },
];
