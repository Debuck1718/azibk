// Generates placeholder assets so the site looks correct before real artwork is
// dropped in. Run: node scripts/generate-placeholders.mjs
//
// Both generators write only if the file is absent, so real assets are never
// overwritten by a later run.
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(process.cwd());
const marksDir = resolve(root, "public/marks");
const workDir = resolve(root, "public/work");

mkdirSync(marksDir, { recursive: true });
mkdirSync(workDir, { recursive: true });

function write(file, content) {
  if (existsSync(file)) {
    console.log(`skip   ${file.replace(root + "\\", "")} (exists)`);
    return false;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, "utf8");
  console.log(`write  ${file.replace(root + "\\", "")}`);
  return true;
}

/* -------------------------------------------------------------------------- */
/*  Tech marks — simple 24x24 monochrome glyphs in the brand-ish shape.       */
/*  These are deliberately generic stand-ins, not the real trademarks.        */
/* -------------------------------------------------------------------------- */

const mark = (body, colour = "#EDEAE4") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${colour}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>\n`;

const MARKS = {
  react: mark(
    '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    "#61DAFB",
  ),
  nextjs: mark(
    '<circle cx="12" cy="12" r="9"/><path d="M8.5 15.5V9l7 8"/><path d="M15.5 9v5"/>',
  ),
  typescript: mark(
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11h5"/><path d="M10.5 11v6"/><path d="M14 17v-4a2 2 0 0 1 4 0v4"/><path d="M14 15h4"/>',
    "#3178C6",
  ),
  vue: mark('<path d="M2 5h4l6 10 6-10h4l-10 16z"/>', "#41B883"),
  svelte: mark(
    '<path d="M15 3a5 5 0 0 0-4 1l-5 3.5a5 5 0 0 0-1 7 5 5 0 0 0 4 1.6"/><path d="M9 21a5 5 0 0 0 4-1l5-3.5a5 5 0 0 0 1-7 5 5 0 0 0-4-1.6"/>',
    "#FF3E00",
  ),
  astro: mark('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>', "#FF5D01"),
  tailwind: mark(
    '<path d="M3 12c2-5 4-7 7-6s3 4 5 5 4 0 6-4"/><path d="M3 19c2-4 4-5 7-4s3 3 5 4 4 0 6-3"/>',
    "#38BDF8",
  ),
  css: mark(
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 8h10l-1 8-4 2-4-2z"/>',
    "#663399",
  ),
  framer: mark(
    '<path d="M5 3h14v6H12z"/><path d="M5 9h14v6H5z"/><path d="M5 15h7v6z"/>',
    "#BB4BFF",
  ),
  radix: mark('<circle cx="12" cy="12" r="9"/><path d="M12 3v9l7 4"/>'),
  storybook: mark(
    '<path d="M5 4l12-1v18l-12-1z"/><path d="M10 10a2 2 0 1 1 3 1.7c-.6.4-1 .9-1 1.6"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
    "#FF4785",
  ),
  three: mark(
    '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 2v20M3 7l18 10M21 7L3 17"/>',
  ),
  webgl: mark(
    '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
    "#990000",
  ),
  canvas: mark(
    '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 20h10"/><path d="M8 13l3-4 3 3 2-2 2 3z"/>',
    "#E34F26",
  ),
  node: mark(
    '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M9 9h3v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1"/><path d="M15 9v5a2 2 0 0 0 4 0V9"/>',
    "#339933",
  ),
  postgres: mark(
    '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    "#4169E1",
  ),
  drizzle: mark(
    '<path d="M12 2v9"/><path d="M12 22v-9"/><path d="M6 7l6 4 6-4"/><path d="M6 17l6-4 6 4"/>',
    "#C5F74F",
  ),
  graphql: mark(
    '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 2v20M3 7l18 10M21 7L3 17"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
    "#E10098",
  ),
  redis: mark(
    '<path d="M3 7l9-3 9 3-9 3z"/><path d="M3 12l9 3 9-3"/><path d="M3 17l9 3 9-3"/>',
    "#DC382D",
  ),
  vite: mark(
    '<path d="M12 2l9 4-9 16-9-16z"/><path d="M8 8l4 9 4-9z"/>',
    "#646CFF",
  ),
  docker: mark(
    '<rect x="3" y="10" width="3" height="3"/><rect x="7" y="10" width="3" height="3"/><rect x="11" y="10" width="3" height="3"/><rect x="7" y="6" width="3" height="3"/><path d="M2 16h18a4 4 0 0 0 1-3h-4"/>',
    "#2496ED",
  ),
  github: mark(
    '<circle cx="12" cy="12" r="9"/><path d="M9 20v-3a3 3 0 0 1 0-5c-.5-1.5 0-3 0-3s2 0 3 1a8 8 0 0 1 4 0c1-1 3-1 3-1s.5 1.5 0 3a3 3 0 0 1 0 5v3"/>',
  ),
  playwright: mark(
    '<path d="M3 8l5-2v10L3 18z"/><path d="M3 8v10"/><path d="M16 8l5-2v14l-5-2z"/><path d="M12 4v16"/>',
  ),
  lighthouse: mark(
    '<path d="M12 3v3"/><path d="M8 20l1-9h6l1 9z"/><path d="M6 12h3M15 12h3"/><circle cx="12" cy="8" r="2"/>',
    "#F44B21",
  ),
};

let marksWritten = 0;
for (const [name, svg] of Object.entries(MARKS)) {
  if (write(resolve(marksDir, `${name}.svg`), svg)) marksWritten++;
}

/* -------------------------------------------------------------------------- */
/*  Project covers — labelled abstract art in each project's accent colour.   */
/*  Replace these with real screenshots; the paths are already wired up.       */
/* -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    slug: "atlas",
    label: "ATLAS UI",
    sub: "component gallery",
    c1: "#5B8CFF",
    c2: "#8FB0FF",
    count: 3,
  },
  {
    slug: "flux",
    label: "FLUX ENGINE",
    sub: "particle runtime",
    c1: "#FF7A59",
    c2: "#FFB59E",
    count: 3,
  },
  {
    slug: "halo",
    label: "HALO",
    sub: "edge storefront",
    c1: "#7EE7A3",
    c2: "#B6F5CC",
    count: 3,
  },
  {
    slug: "synapse",
    label: "SYNAPSE",
    sub: "collaborative canvas",
    c1: "#C084FC",
    c2: "#E0C3FE",
    count: 3,
  },
  {
    slug: "prism",
    label: "PRISM",
    sub: "docs framework",
    c1: "#FCD34D",
    c2: "#FDE68A",
    count: 2,
  },
];

const shotNames = {
  atlas: ["cover", "codemod", "tokens"],
  flux: ["cover", "shader", "profiler"],
  halo: ["cover", "lighthouse", "architecture"],
  synapse: ["cover", "offline", "crdt"],
  prism: ["cover", "playground"],
};

function cover({ label, sub, c1, c2, variant, total }) {
  // A deterministic abstract composition — dots, ribbons and a vignette — so the
  // placeholder reads as intentional design rather than a grey box.
  const seed = label.length + variant * 7;
  const dots = Array.from({ length: 26 }, (_, i) => {
    const x = ((seed * (i + 3) * 37) % 1000) / 10;
    const y = ((seed * (i + 5) * 53) % 560) / 10;
    const r = 1 + (((seed + i) * 17) % 30) / 10;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#EDEAE4" opacity="${(0.1 + (i % 5) * 0.07).toFixed(2)}"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 625" width="1000" height="625" role="img" aria-label="${label} placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101012"/>
      <stop offset="100%" stop-color="#0A0A0B"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="18%" r="80%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.60"/>
      <stop offset="55%" stop-color="${c2}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="82%" cy="88%" r="65%">
      <stop offset="0%" stop-color="${c2}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#EDEAE4" stroke-opacity="0.055"/>
    </pattern>
    <filter id="soft"><feGaussianBlur stdDeviation="26"/></filter>
  </defs>

  <rect width="1000" height="625" fill="url(#bg)"/>
  <rect width="1000" height="625" fill="url(#grid)"/>
  <rect width="1000" height="625" fill="url(#glow)"/>
  <rect width="1000" height="625" fill="url(#glow2)"/>

  <g filter="url(#soft)" opacity="0.55">
    <rect x="${-80 + variant * 60}" y="${140 + variant * 30}" width="420" height="420" rx="80" fill="${c1}" opacity="0.32"/>
  </g>

  <g>${dots}</g>

  <!-- A ribbon suggesting motion / data -->
  <path d="M-40 ${430 - variant * 40} C 220 ${300 + variant * 40}, 520 ${560 - variant * 50}, 1040 ${330 + variant * 30}"
        fill="none" stroke="${c1}" stroke-opacity="0.75" stroke-width="2"/>
  <path d="M-40 ${470 - variant * 40} C 240 ${350 + variant * 40}, 540 ${600 - variant * 50}, 1040 ${380 + variant * 30}"
        fill="none" stroke="${c2}" stroke-opacity="0.35" stroke-width="1.2"/>

  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
    <text x="56" y="86" fill="${c2}" font-size="15" letter-spacing="5">${String(variant + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</text>
    <text x="56" y="527" fill="#EDEAE4" font-size="60" font-weight="600" letter-spacing="-1.5">${label}</text>
    <text x="56" y="565" fill="#EDEAE4" fill-opacity="0.55" font-size="17" letter-spacing="3">${sub.toUpperCase()}</text>
  </g>

  <rect x="0.5" y="0.5" width="999" height="624" fill="none" stroke="${c1}" stroke-opacity="0.25"/>

  <!-- Watermark so nobody mistakes a placeholder for finished work -->
  <text x="986" y="600" text-anchor="end" fill="#EDEAE4" fill-opacity="0.28" font-size="13" font-family="ui-monospace, monospace" letter-spacing="2">PLACEHOLDER — REPLACE ME</text>
</svg>
`;
}

let coversWritten = 0;
for (const project of PROJECTS) {
  const names = shotNames[project.slug];
  names.forEach((name, i) => {
    const svg = cover({ ...project, variant: i, total: names.length });
    if (write(resolve(workDir, `${project.slug}-${name}.svg`), svg))
      coversWritten++;
  });
}

console.log(
  `\nmarks written: ${marksWritten}, covers written: ${coversWritten}`,
);
