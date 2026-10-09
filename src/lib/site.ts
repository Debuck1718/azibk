/**
 * ---------------------------------------------------------------------------
 * THIS IS THE ONLY FILE YOU NEED TO EDIT TO MAKE THE SITE YOURS.
 * ---------------------------------------------------------------------------
 * Everything the page renders — your name, links, frameworks, projects —
 * comes from here. No component has hard-coded copy.
 */

export type Profile = {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  availability: string;
  /** Rotating words in the hero. Keep them short — they are set at display size. */
  rotating: string[];
  blurb: string;
  /** Longer, two-sentence pitch used in the About section. */
  about: string;
  socials: { label: string; href: string }[];
};

export const profile: Profile = {
  name: 'Debuck',
  initials: 'DB',
  role: 'Framework & Systems Engineer',
  location: 'Remote · Worldwide',
  email: 'hello@example.com',
  availability: 'Taking on 2 projects for the next quarter',
  rotating: ['frameworks.', 'engines.', 'systems.', 'interfaces.'],
  blurb:
    'I build the load-bearing layer: the framework, the engine, the design system that a product is assembled from. Not pages — platforms.',
  about:
    'Most of my work happens one level below the product. I take an idea that is too slow, too coupled or too inconsistent to ship twice, and I turn it into a framework the rest of a team can build on without thinking about it. The measure of that work is not how clever the abstraction is, but how boring it becomes to use — and how little it needs me afterwards.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Debuck1718' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'X', href: 'https://x.com' },
    { label: 'Read.cv', href: 'https://read.cv' },
  ],
};

export type Stat = { value: string; label: string; note?: string };

export const stats: Stat[] = [
  { value: '11', label: 'Frameworks shipped', note: 'open source + in-house' },
  { value: '3.2k', label: 'GitHub stars earned', note: 'across repositories' },
  { value: '48ms', label: 'p95 render budget', note: 'worst-case measured frame' },
  { value: '7yrs', label: 'Building abstractions', note: 'and deleting them again' },
];

/* -------------------------------------------------------------------------- */
/*  THE ARSENAL — categorised, tiered competence                              */
/* -------------------------------------------------------------------------- */

export type Tier = 'core' | 'fluent' | 'working';

export type Skill = {
  name: string;
  tier: Tier;
  /** Shown in the detail panel — be specific, this is what sells it. */
  note: string;
  /** 0–100. Rendered as the bar. Only used for layout, not a literal claim. */
  depth: number;
  /** Optional path to a monochrome logo mark under /public. */
  icon?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  caption: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Frameworks',
    caption: 'Where I spend most of my hours.',
    skills: [
      { name: 'React', tier: 'core', depth: 96, icon: '/marks/react.svg', note: 'Suspense, RSC boundaries, concurrent rendering, custom reconciler experiments.' },
      { name: 'Next.js', tier: 'core', depth: 94, icon: '/marks/nextjs.svg', note: 'App Router, streaming SSR, route handlers, ISR strategies, edge middleware.' },
      { name: 'TypeScript', tier: 'core', depth: 95, icon: '/marks/typescript.svg', note: 'Conditional & mapped types, generic inference design, type-level APIs teams can actually read.' },
      { name: 'Vue 3', tier: 'fluent', depth: 78, icon: '/marks/vue.svg', note: 'Composition API, custom renderers, `v-memo` profiling.' },
      { name: 'Svelte / SvelteKit', tier: 'fluent', depth: 74, icon: '/marks/svelte.svg', note: 'Compiler-first mental model, runes, form actions.' },
      { name: 'Astro', tier: 'working', depth: 66, icon: '/marks/astro.svg', note: 'Islands architecture for content-heavy, zero-JS-by-default sites.' },
    ],
  },
  {
    id: 'styling',
    title: 'UI Systems & Styling',
    caption: 'Design engineering, not decoration.',
    skills: [
      { name: 'Tailwind CSS', tier: 'core', depth: 93, icon: '/marks/tailwind.svg', note: 'Token pipelines, theme plugins, and the config discipline that keeps a design system honest.' },
      { name: 'CSS Architecture', tier: 'core', depth: 90, icon: '/marks/css.svg', note: 'Cascade layers, container queries, custom properties as an API surface, subgrid.' },
      { name: 'Framer Motion', tier: 'fluent', depth: 82, icon: '/marks/framer.svg', note: 'Layout animations, shared element transitions, gesture & scroll choreography.' },
      { name: 'Radix / Headless UI', tier: 'fluent', depth: 80, icon: '/marks/radix.svg', note: 'Accessible primitives wired into a typed component library.' },
      { name: 'Storybook', tier: 'working', depth: 68, icon: '/marks/storybook.svg', note: 'Component contracts, visual regression, docs as a deliverable.' },
    ],
  },
  {
    id: 'graphics',
    title: 'Graphics & Real-time',
    caption: 'Pixels on a deadline.',
    skills: [
      { name: 'Three.js', tier: 'core', depth: 88, icon: '/marks/three.svg', note: 'Custom shaders, instanced geometry, post-processing, instancing at 60fps on mid-tier phones.' },
      { name: 'WebGL / GLSL', tier: 'core', depth: 85, icon: '/marks/webgl.svg', note: 'Hand-written vertex + fragment shaders, SDF rendering, noise fields, GPU particles.' },
      { name: 'Canvas 2D', tier: 'fluent', depth: 84, icon: '/marks/canvas.svg', note: 'Before/after WebGL: the fastest path to a bespoke visual that still ships.' },
      { name: 'WebGPU', tier: 'working', depth: 58, icon: '/marks/webgl.svg', note: 'Compute passes and render pipelines — currently in production trials.' },
    ],
  },
  {
    id: 'data',
    title: 'Backend & Data',
    caption: 'A framework without a backend is a demo.',
    skills: [
      { name: 'Node.js', tier: 'core', depth: 91, icon: '/marks/node.svg', note: 'Streams, worker threads, backpressure, profiler-led optimisation.' },
      { name: 'PostgreSQL', tier: 'fluent', depth: 80, icon: '/marks/postgres.svg', note: 'Query planning, indexing strategy, migrations that do not lock your table.' },
      { name: 'Prisma / Drizzle', tier: 'fluent', depth: 82, icon: '/marks/drizzle.svg', note: 'Typed data layers with migrations wired into CI.' },
      { name: 'tRPC / GraphQL', tier: 'fluent', depth: 79, icon: '/marks/graphql.svg', note: 'End-to-end types, batching, and cache normalisation.' },
      { name: 'Redis', tier: 'working', depth: 70, icon: '/marks/redis.svg', note: 'Caching layers, rate limiting, pub/sub fan-out.' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform & Tooling',
    caption: 'How it gets to production.',
    skills: [
      { name: 'Vite', tier: 'core', depth: 87, icon: '/marks/vite.svg', note: 'Custom plugins, transform pipelines, HMR for non-standard file types.' },
      { name: 'Docker', tier: 'fluent', depth: 78, icon: '/marks/docker.svg', note: 'Multi-stage builds, reproducible images, small layers.' },
      { name: 'CI/CD', tier: 'fluent', depth: 81, icon: '/marks/github.svg', note: 'GitHub Actions, preview environments, automated visual + a11y gates.' },
      { name: 'Playwright', tier: 'fluent', depth: 83, icon: '/marks/playwright.svg', note: 'End-to-end suites that are trusted enough to actually block a merge.' },
      { name: 'Performance Auditing', tier: 'core', depth: 89, icon: '/marks/lighthouse.svg', note: 'Lighthouse, WebPageTest, INP/LCP forensics, bundle budgets enforced in CI.' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS — each one carries its own accent colour                         */
/* -------------------------------------------------------------------------- */

export type ProjectImage = {
  /** Path under /public, e.g. "/work/atlas-cover.png". */
  src: string;
  /** Describe what is IN the image — this is read aloud by screen readers. */
  alt: string;
  caption?: string;
  /**
   * `screen` — UI screenshot. Rendered object-contain so nothing is cropped.
   * `scene`  — render / photo / visual. Rendered object-cover to fill the frame.
   */
  kind: 'screen' | 'scene';
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  /** The one-line result. Numbers beat adjectives. */
  outcome: string;
  stack: string[];
  /** rgb triplet, e.g. "91 140 255" — drives the accent while this card is hovered. */
  accent: [string, string, string];
  /**
   * Cover image, shown as the thumbnail in the collapsed row and as the large
   * figure in the expanded case study. Create this file first; see README.
   */
  cover: ProjectImage;
  /** Additional screenshots for the case study gallery. */
  gallery: ProjectImage[];
  problem: string;
  approach: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'atlas',
    index: '01',
    title: 'Atlas UI',
    tagline: 'A headless design system with a compiler',
    year: '2025',
    role: 'Creator & maintainer',
    outcome: 'Reduced new-feature UI build time by 64% across four product teams.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    accent: ['91', '140', '255'],
    cover: {
      src: '/work/atlas-cover.svg',
      alt: 'Atlas UI component gallery showing button variants, input states and dark mode tokens',
      caption: 'The generated component gallery — every variant rendered from source types.',
      kind: 'screen',
    },
    gallery: [
      {
        src: '/work/atlas-codemod.svg',
        alt: 'Terminal output of the Atlas codemod migrating 1,400 legacy call-sites',
        caption: 'The codemod run that migrated 1,400 call-sites without a manual edit.',
        kind: 'screen',
      },
      {
        src: '/work/atlas-tokens.svg',
        alt: 'The Atlas token pipeline diagram from declaration through compile to component API',
        caption: 'Tokens declared once, compiled into a typed API.',
        kind: 'scene',
      },
    ],
    problem:
      'Four teams, four component folders, four subtly different buttons. Every new feature re-litigated spacing, focus states and dark mode.',
    approach:
      'I wrote the styling layer as a compile step. Tokens are declared once, components consume them through a typed API, and a build-time codemod rewrites legacy call-sites so adoption never required a big-bang migration.',
    highlights: [
      'Fully typed variant API — invalid prop combinations fail at compile time, not in review.',
      'Codemod migrated 1,400 legacy call-sites with zero manual edits.',
      'Accessibility gates in CI: axe + keyboard-trap tests block the merge.',
    ],
    metrics: [
      { value: '64%', label: 'faster UI builds' },
      { value: '1.4k', label: 'call-sites migrated' },
      { value: '100', label: 'Lighthouse a11y' },
    ],
    links: [{ label: 'Repository', href: 'https://github.com/Debuck1718' }],
  },
  {
    slug: 'flux-engine',
    index: '02',
    title: 'Flux Engine',
    tagline: 'A WebGL particle runtime for the browser',
    year: '2024',
    role: 'Architect',
    outcome: '1.2M particles at a locked 60fps on a three-year-old laptop GPU.',
    stack: ['WebGL2', 'GLSL', 'Three.js', 'TypeScript'],
    accent: ['255', '122', '89'],
    cover: {
      src: '/work/flux-cover.svg',
      alt: 'A dense orange particle swarm curving through dark space, rendered live in the browser',
      caption: '1.2M particles in flight — a single instanced draw call.',
      kind: 'scene',
    },
    gallery: [
      {
        src: '/work/flux-shader.svg',
        alt: 'The fragment shader source for the particle simulation with ping-pong framebuffers',
        caption: 'Simulation state lives in two textures; the CPU only sets uniforms.',
        kind: 'screen',
      },
      {
        src: '/work/flux-profiler.svg',
        alt: 'Frame timing graph holding a steady 16 millisecond budget on a mid-tier laptop GPU',
        caption: 'Frame budget held at 60fps on three-year-old hardware.',
        kind: 'screen',
      },
    ],
    problem:
      'The visual target for a product launch needed swarms of moving particles — and the existing DOM/CSS approach collapsed at roughly 4,000 elements.',
    approach:
      'I moved everything onto the GPU. Simulation runs in a fragment shader with ping-pong framebuffers; the CPU only uploads initial state and a handful of uniforms per frame. Geometry is a single instanced draw call.',
    highlights: [
      'Zero CPU-side particle updates — state lives entirely in two textures.',
      'Adaptive quality controller drops simulation resolution instead of framerate.',
      'Deterministic given a seed, so the marketing capture and the live site match exactly.',
    ],
    metrics: [
      { value: '1.2M', label: 'live particles' },
      { value: '60fps', label: 'locked on mid-tier' },
      { value: '1', label: 'draw call' },
    ],
    links: [{ label: 'Live demo', href: 'https://github.com/Debuck1718' }],
  },
  {
    slug: 'halo',
    index: '03',
    title: 'Halo',
    tagline: 'Edge-rendered commerce storefront',
    year: '2024',
    role: 'Lead engineer',
    outcome: 'LCP went from 4.1s to 0.9s; conversion up 23% in the following quarter.',
    stack: ['Next.js', 'Edge Runtime', 'Redis', 'PostgreSQL'],
    accent: ['126', '231', '163'],
    cover: {
      src: '/work/halo-cover.svg',
      alt: 'The edge-rendered storefront product grid with streamed skeleton placeholders',
      caption: 'Streamed skeletons above the fold; every section resumable.',
      kind: 'screen',
    },
    gallery: [
      {
        src: '/work/halo-lighthouse.svg',
        alt: 'Lighthouse report showing 0.9 second largest contentful paint and a perfect performance score',
        caption: 'LCP 4.1s → 0.9s, verified on the production origin.',
        kind: 'screen',
      },
      {
        src: '/work/halo-architecture.svg',
        alt: 'Architecture diagram of the edge cache, tag invalidation and origin database',
        caption: 'Tag-based invalidation keeps every region under two seconds stale.',
        kind: 'scene',
      },
    ],
    problem:
      'A storefront rendering every product grid on the origin server, in one region, against a database that buckled during every campaign.',
    approach:
      'Moved the render to edge functions with streamed skeletons, pushed the catalogue into a distributed cache with tag-based invalidation, and made every route resumable so a slow downstream never blocks first paint.',
    highlights: [
      'Streaming SSR with per-section error boundaries — one bad widget no longer blanks the page.',
      'Cache tag invalidation so a price change propagates globally in under two seconds.',
      'Bundle budget enforced in CI; the build fails if the entry chunk grows past 90kB.',
    ],
    metrics: [
      { value: '0.9s', label: 'LCP, was 4.1s' },
      { value: '+23%', label: 'conversion' },
      { value: '99.98%', label: 'uptime through peaks' },
    ],
    links: [{ label: 'Case study', href: 'https://github.com/Debuck1718' }],
  },
  {
    slug: 'synapse',
    index: '04',
    title: 'Synapse',
    tagline: 'Real-time collaborative canvas',
    year: '2023',
    role: 'Founding engineer',
    outcome: 'CRDT-backed editing with sub-30ms perceived latency across continents.',
    stack: ['TypeScript', 'WebRTC', 'CRDT', 'Canvas 2D'],
    accent: ['192', '132', '252'],
    cover: {
      src: '/work/synapse-cover.svg',
      alt: 'A collaborative canvas with three coloured cursors editing the same diagram simultaneously',
      caption: 'Three editors, one document, no conflict UI.',
      kind: 'screen',
    },
    gallery: [
      {
        src: '/work/synapse-offline.svg',
        alt: 'A network panel showing an offline period followed by a clean CRDT merge on reconnect',
        caption: 'Offline for 40 seconds, reconnected with zero lost strokes.',
        kind: 'screen',
      },
      {
        src: '/work/synapse-crdt.svg',
        alt: 'Diagram of the CRDT operation log merging two divergent document states',
        caption: 'Transport-agnostic document core, swapped WebRTC for a relay.',
        kind: 'scene',
      },
    ],
    problem:
      'Multiple people editing the same spatial canvas at once, over flaky connections, with no central authority to arbitrate conflicts.',
    approach:
      'Built a custom CRDT layer over a WebRTC mesh with a relay fallback. The renderer draws from the merged document each frame, interpolating between remote states so motion reads as continuous rather than stepped.',
    highlights: [
      'Offline-first: reconnect merges cleanly, no lost strokes, no conflict UI.',
      'Renderer reconciles 10k+ objects with dirty-rect redraws only.',
      'Transport-agnostic core — swapped WebRTC for a relay without touching document logic.',
    ],
    metrics: [
      { value: '<30ms', label: 'perceived latency' },
      { value: '10k+', label: 'objects per canvas' },
      { value: '0', label: 'lost edits offline' },
    ],
    links: [{ label: 'Repository', href: 'https://github.com/Debuck1718' }],
  },
  {
    slug: 'prism',
    index: '05',
    title: 'Prism',
    tagline: 'Documentation framework for design systems',
    year: '2023',
    role: 'Creator',
    outcome: 'Docs site now deploys in 14s and is written by designers, not engineers.',
    stack: ['Astro', 'MDX', 'TypeScript', 'CI/CD'],
    accent: ['252', '211', '77'],
    cover: {
      src: '/work/prism-cover.svg',
      alt: 'Generated documentation page with a live editable playground beside a props table',
      caption: 'Props tables and playgrounds generated from component source.',
      kind: 'screen',
    },
    gallery: [
      {
        src: '/work/prism-playground.svg',
        alt: 'An isolated iframe playground rendering a live component with editable controls',
        caption: 'Every example is executable, hydrated only where needed.',
        kind: 'screen',
      },
    ],
    problem:
      'The docs were a hand-maintained React app. Every component change meant an engineer editing markup, and they drifted within weeks.',
    approach:
      'Inverted it: components are the source of truth. Prism reads their types and stories at build time and generates props tables, usage snippets and live playgrounds automatically. Designers write prose; the framework writes the reference.',
    highlights: [
      'Props tables generated from source types — documentation cannot go stale.',
      'Every example is executable and rendered in an isolated iframe.',
      'Zero-JS by default; interactivity hydrates only where a playground exists.',
    ],
    metrics: [
      { value: '14s', label: 'full deploy' },
      { value: '0', label: 'manual prop tables' },
      { value: '0kb', label: 'default JS' },
    ],
    links: [{ label: 'Repository', href: 'https://github.com/Debuck1718' }],
  },
];


/* -------------------------------------------------------------------------- */
/*  PROCESS                                                                   */
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
    title: 'Interrogate the constraint',
    body: 'Before any abstraction, I find out what is actually slow, actually duplicated, actually painful. Usually it is not what the brief says.',
    deliverable: 'A written diagnosis with measurements attached.',
  },
  {
    step: '02',
    title: 'Design the contract',
    body: 'The API comes before the implementation. I sketch how a developer will call this thing, and I throw the sketch away until calling it feels obvious.',
    deliverable: 'Type signatures and a usage sketch, reviewed before code.',
  },
  {
    step: '03',
    title: 'Build the boring core',
    body: 'The unglamorous part: the build step, the error states, the edge cases, the tests. This is the ninety percent that determines whether a framework survives contact with a team.',
    deliverable: 'A working vertical slice with CI gates.',
  },
  {
    step: '04',
    title: 'Adopt, then remove myself',
    body: 'A framework nobody uses is a hobby. I migrate real call-sites, write the docs, and then make sure the team no longer needs me to change them.',
    deliverable: 'Migration path, docs, and a handover that sticks.',
  },
];

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { id: 'work', label: 'Work', index: '01' },
  { id: 'arsenal', label: 'Arsenal', index: '02' },
  { id: 'process', label: 'Process', index: '03' },
  { id: 'about', label: 'About', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
];
