# Framework Portfolio

A single-page portfolio for a framework / systems engineer. Built to be **read as
an argument**, not browsed as a gallery: work first, then the framework detail,
then the process.

Not a template. Every section, interaction and asset path below is wired so that
replacing the content never means touching a component.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically prerendered)
npm start        # serve the production build
```

Optional — set your canonical URL so metadata, `sitemap.xml` and `robots.txt`
point at the right place:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## Where your content lives

**Everything you need to change is in one file: [`src/lib/site.ts`](src/lib/site.ts).**

| Export         | Controls                                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| `profile`      | Name, initials, role, email, location, availability, rotating hero words, social links |
| `stats`        | The four big numbers in the About section                                              |
| `skillGroups`  | The Arsenal — frameworks, tiers, depth bars, per-tool notes, logo marks                |
| `projects`     | Work section — taglines, outcomes, case studies, metrics, **images**                   |
| `processSteps` | The four-step method                                                                   |
| `navLinks`     | Navigation labels and section order                                                    |

No component contains hard-coded copy. Change the data, the page follows.

---

## Adding your work (images)

Each project has a `cover` (the thumbnail) and a `gallery` (extra screenshots):

```ts
cover: {
  src: '/work/myproject-cover.png',   // file lives in public/work/
  alt: 'Describe what is IN the image', // read aloud by screen readers
  caption: 'Shown under the image in the case study',
  kind: 'screen',                      // or 'scene'
},
gallery: [
  { src: '/work/myproject-detail.png', alt: '...', kind: 'screen' },
],
```

### Drop your files in `public/`

```
public/
  work/     ← project screenshots      (16:10 recommended)
  marks/    ← framework logos          (square SVG, monochrome)
```

### `kind` — which one do I use?

| `kind`   | Rendering                            | Use for                                           |
| -------- | ------------------------------------ | ------------------------------------------------- |
| `screen` | `object-contain` — **never cropped** | UI screenshots, dashboards, code, terminal output |
| `scene`  | `object-cover` — fills the frame     | Renders, photography, visuals, diagrams           |

Getting this wrong is the single most common way portfolio images look bad: a
cropped screenshot hides the very detail you wanted to show.

### Recommended sizes

| Purpose        | Size                    | Format                            |
| -------------- | ----------------------- | --------------------------------- |
| Project cover  | 1600 × 1000 (16:10)     | PNG for UI, WebP/AVIF for renders |
| Gallery image  | 1600 × 1000             | same                              |
| Framework mark | 48 × 48 viewBox, square | SVG                               |

Next.js converts and resizes these automatically — you do **not** need to
pre-optimise. Just don't upload a 6000px screenshot.

### Placeholders are already in place

`public/work/*.svg` ships with 14 labelled placeholder covers so the layout looks
correct immediately. **They are watermarked "PLACEHOLDER — REPLACE ME"** so they
can't ship by accident.

**To go live:** add your real file, then update the `src` path in `site.ts`.
If a file is missing entirely, the UI renders a labelled placeholder naming the
expected path rather than a broken-image icon.

To regenerate the placeholders (only writes files that don't exist):

```bash
node scripts/generate-placeholders.mjs
```

### Framework logos

Add an `icon` to any skill; omit it and the row falls back to a tier dot:

```ts
{ name: 'Svelte', tier: 'fluent', depth: 74, icon: '/marks/svelte.svg', note: '...' }
```

Marks render monochrome at 55% opacity and go full colour on hover. A logo wall
at full colour competes with the content; greyscale-on-rest keeps the
recognition without the noise.

The 24 marks in `public/marks/` are **generic stand-ins, not official brand
assets**. Replace them with the real logos if you have the rights to use them —
or delete them and let the tier dots carry the load.

---

## The design decisions worth knowing

**One accent colour, rewritten.** The entire page reads its accent from a single
CSS variable (`--accent`). Hovering a project row rewrites it, so the nav
underline, focus rings, hero glow, grid and footer all re-tint to that project's
colour. This is what makes five projects feel like one system. See
`src/lib/useThemeAccent.ts`.

**Honest skill tiers.** `core` / `fluent` / `working`. Three "working" entries are
what make the six "core" entries mean anything. A grid where everything is
"expert" communicates nothing — recruiters read it as a template.

**Evidence before claims.** Every project shows its cover image _before_ you
click. Most visitors never expand anything, so the collapsed row has to do the
selling on its own.

**Canvas 2D, not WebGL, in the hero.** At ~100 particles, WebGL costs a three.js
bundle, context-loss handling, a fallback path and a shader compile to do what
Canvas 2D does free. WebGL earns its keep past ~10k elements — which is exactly
what the Flux Engine case study claims.

**Reveals are owned, not imported.** `useReveal` is 30 lines of
IntersectionObserver. If it ever fails, elements are shown rather than stuck
invisible — the failure mode of a dependency is usually a blank page.

---

## Accessibility

Verified, not assumed:

- Semantic landmarks, one `h1`, ordered headings
- Skip link, visible focus rings, focus-visible only (no ring on mouse click)
- Rows are real `<button>`s with `aria-expanded` / `aria-controls`
- Lightbox is `role="dialog" aria-modal="true"` with a focus trap, Escape to
  close, ←/→ to navigate, and focus returned to the opener on close
- Scroll lock preserves and restores exact scroll position
- Every decorative element is `aria-hidden`; the canvas has an `sr-only` note
- Touch and `prefers-reduced-motion` disable the custom cursor, magnetic buttons
  and particle animation (a single static frame is drawn instead)

---

## Performance

|                 |                     |
| --------------- | ------------------- |
| First Load JS   | ~110 kB             |
| Route `/`       | Static, prerendered |
| Console errors  | 0                   |
| Failed requests | 0                   |

- Fonts via `next/font` with `display: swap` and no layout shift
- Below-fold images are lazy; only the first gallery image is eager
- Scroll reveals use CSS transitions, not JS-driven frame updates
- The particle field pauses when the tab is hidden or the hero leaves the viewport
- `will-change` is scoped to animating elements only

---

## Project structure

```
src/
  app/
    layout.tsx        fonts, metadata, skip link, JSON-LD
    page.tsx          section order (the argument)
    globals.css       design tokens, grain, grid, reveal classes
    sitemap.ts robots.ts not-found.tsx
  components/
    Hero.tsx          rotating headline + particle field
    HeroCanvas.tsx    hand-written Canvas 2D particle mesh
    Work.tsx          project list + case studies + lightbox wiring
    Arsenal.tsx       filterable framework matrix
    Process.tsx About.tsx Contact.tsx Footer.tsx
    ui/
      Nav.tsx Cursor.tsx Marquee.tsx Section.tsx
      MagneticButton.tsx
      ProjectMedia.tsx  ← images: ratio box, hybrid loading, placeholders
      Lightbox.tsx      ← full-screen viewer with focus trap
  lib/
    site.ts           ← ALL YOUR CONTENT
    useReveal.ts useMagnetic.ts useThemeAccent.ts
public/
  work/   marks/
scripts/
  generate-placeholders.mjs   fix-encoding.mjs
  qa*.mjs shots.mjs           (browser QA, not part of the build)
```

---

## Verification

The QA scripts in `scripts/` drive a real headless browser and assert on the DOM
— they were used to verify every claim above rather than eyeballing it.

```bash
node scripts/generate-placeholders.mjs   # assets
node scripts/fix-encoding.mjs            # repair mojibake, safe to re-run
```

`scripts/qa4.mjs` confirms the accent re-tint across three projects (3 distinct
colours, restores to default). `scripts/qa-media.mjs` confirms every image
decodes (0 broken), and that the lightbox opens, counts `1 / 3`, navigates both
ways, and closes on Escape restoring scroll.

---

## Deploying

Static. Any host works — Vercel, Netlify, Cloudflare Pages, or plain nginx on a
VPS (`npm run build && npm start`).

Set `NEXT_PUBLIC_SITE_URL` before building so canonical URLs and the sitemap are
correct.

---

## Before you ship

- [ ] Replace the 14 placeholder covers in `public/work/`
- [ ] Update `profile` — email, location, social URLs
- [ ] Replace `stats` with _your_ real, defensible numbers
- [ ] Review every `skillGroups` tier — underclaim, don't overclaim
- [ ] Give all images real `alt` text
- [ ] Replace or delete the brand marks in `public/marks/`
- [ ] Set `NEXT_PUBLIC_SITE_URL`
