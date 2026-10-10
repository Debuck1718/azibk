// Generates placeholder artwork so the site looks intentional before real
// photography is shot. Run: node scripts/generate-placeholders.mjs
//
// Two families of asset:
//   1. public/marks  — small square icons used by the Materials section.
//   2. public/work   — a labelled "frame on a wall" mock for each gallery piece.
//
// Only writes files that do not exist, so real photography is never overwritten.
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(process.cwd());
const marksDir = resolve(root, 'public/marks');
const workDir = resolve(root, 'public/work');

function write(file, content) {
  if (existsSync(file)) {
    console.log(`skip   ${file.replace(root, '')}`);
    return false;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, 'utf8');
  console.log(`write  ${file.replace(root, '')}`);
  return true;
}

/* -------------------------------------------------------------------------- */
/*  1. MATERIAL MARK ICONS                                                    */
/*  Simple line glyphs — a frame profile, a pane of glass, a mount corner.    */
/*  Deliberately not brand logos: this is a workshop, not a software stack.   */
/* -------------------------------------------------------------------------- */

const glyph = (body, colour = '#EDEAE4') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${colour}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>\n`;

/** A nested frame outline. */
const frame = (inset = 3) =>
  glyph(
    `<rect x="${inset}" y="${inset}" width="${24 - inset * 2}" height="${24 - inset * 2}" rx="1.5"/>` +
      `<rect x="${inset + 4}" y="${inset + 4}" width="${24 - (inset + 4) * 2}" height="${24 - (inset + 4) * 2}" rx="0.5" opacity="0.5"/>`,
  );

const MARKS = {
  // Mouldings
  hardwood: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M7 3v18M17 3v18" opacity="0.45"/><path d="M10 8c1.5 1 2.5 3 2.5 4s-1 2-2.5 2" opacity="0.65"/>'),
  gilded: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M7 7h4M7 11h4M7 15h4" opacity="0.6"/><circle cx="16.5" cy="12" r="2.5"/>', '#D4AF37'),
  metal: glyph('<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M6 6h12v12H6z" opacity="0.4"/>', '#B8BCC4'),
  shadowbox: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="7" y="7" width="10" height="10" rx="1" opacity="0.55"/><path d="M3 3l4 4M21 3l-4 4M3 21l4-4M21 21l-4-4" opacity="0.4"/>'),
  floating: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="0.5"/><path d="M6 6h12v12H6z" opacity="0.3"/>'),
  restoration: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5" opacity="0.5"/><path d="M12 2v20" stroke-dasharray="2 2"/><path d="M8 9l4-4 4 4" opacity="0.7"/>'),

  // Glazing
  museumglass: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M6 16l10-10" opacity="0.7"/><path d="M9 18l9-9" opacity="0.35"/>', '#9FC8E8'),
  uvclear: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><circle cx="12" cy="12" r="3.5" opacity="0.8"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" opacity="0.5"/>', '#C8B6E8'),
  clear: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M7 15l8-8" opacity="0.55"/>'),
  acrylic: glyph('<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M8 14l6-6" opacity="0.55"/><path d="M11 16l5-5" opacity="0.35"/>', '#A8D8E8'),
  antireflective: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M4 12h16" opacity="0.45"/><path d="M9 8l-3 3 3 3M15 8l3 3-3 3" opacity="0.75"/>', '#8FB8A8'),
  noglazing: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5" stroke-dasharray="3 3"/><path d="M6 15c3-4 6-4 9 0" opacity="0.7"/>', '#A8A5A0'),

  // Mounts
  conservation: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="7.5" y="7.5" width="9" height="9" opacity="0.7"/><path d="M12 9.5v5M9.5 12h5" opacity="0.9"/>', '#E8D8A8'),
  alphacellulose: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="7.5" y="7.5" width="9" height="9" opacity="0.5"/>', '#D8CBA8'),
  acidfree: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M8 12h8" opacity="0.7"/>', '#C8C4B8'),
  moisture: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M12 7c2 2.5 3 4 3 5.5a3 3 0 0 1-6 0C9 11 10 9.5 12 7z" opacity="0.75"/>', '#88B8D8'),
  stainless: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><circle cx="12" cy="10" r="2" opacity="0.8"/><path d="M12 12v5" opacity="0.7"/>', '#C0C4CC'),
  fluted: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M8 5v14M12 5v14M16 5v14" opacity="0.45"/>'),

  // Finishing
  mitred: glyph('<path d="M3 3h18v18H3z" opacity="0.35"/><path d="M3 12l9-9M12 21l9-9" opacity="0.85"/>'),
  dustsealed: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 12h18" opacity="0.9"/><path d="M3 15h18" opacity="0.5"/>'),
  feltpads: glyph('<rect x="3" y="4" width="18" height="15" rx="1.5"/><path d="M7 20h3M14 20h3" stroke-width="2.5" opacity="0.8"/>'),
  hangingkit: glyph('<path d="M12 3v8"/><path d="M8 21h8"/><path d="M12 11c-3 1-5 4-5 7h10c0-3-2-6-5-7z" opacity="0.7"/>'),
  accentline: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="8" y="8" width="8" height="8" stroke-dasharray="2 1.5" opacity="0.9"/>', '#FCD34D'),
  plaque: glyph('<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="6" y="10" width="12" height="5" rx="1" opacity="0.85"/><path d="M8.5 12.5h7" opacity="0.6"/>', '#C8A860'),
};

let marksWritten = 0;
for (const [name, svg] of Object.entries(MARKS)) {
  if (write(resolve(marksDir, `${name}.svg`), svg)) marksWritten++;
}

/* -------------------------------------------------------------------------- */
/*  2. GALLERY PLACEHOLDERS                                                   */
/*  Each placeholder is a stylised "framed piece on a wall": a wall tone, a    */
/*  frame profile, a mount reveal and a suggestion of the artwork. Enough to   */
/*  judge composition and colour balance before real photography exists.       */
/* -------------------------------------------------------------------------- */

const PIECES = [
  { slug: 'comm-photograph', label: 'WEDDING PHOTOGRAPH', sub: 'A1 · museum glass', accent: '#5B8CFF', shots: ['cover', 'detail', 'mount'] },
  { slug: 'comm-abstract', label: 'ABSTRACT CANVAS', sub: '1.6m · floating frame', accent: '#FF7A59', shots: ['cover', 'detail', 'elevation'] },
  { slug: 'comm-certificate', label: 'HONOURS CERTIFICATE', sub: 'A3 · double mount', accent: '#7EE7A3', shots: ['cover', 'detail'] },
  { slug: 'comm-memorabilia', label: 'MEDALS & MEMORABILIA', sub: 'shadow box · 60mm', accent: '#C084FC', shots: ['cover', 'detail', 'plan'] },
  { slug: 'comm-fabric', label: 'KENTE CLOTH', sub: '2.4m · tension mount', accent: '#FCD34D', shots: ['cover', 'detail', 'section'] },
];

/**
 * `detail` shots zoom into a corner joint rather than showing a whole wall —
 * which is the point of a detail shot, and makes the placeholder read correctly
 * at thumbnail size.
 */
function placeholder({ label, sub, accent, shot, index, total }) {
  const isDetail = shot === 'detail';
  const isPlan = shot === 'plan' || shot === 'elevation' || shot === 'section';

  // Wall tone shifts slightly per shot so a row of placeholders does not look
  // like the same image repeated.
  const wall = isDetail ? '#0E0E10' : isPlan ? '#0C0C0E' : '#111114';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 625" width="1000" height="625" role="img" aria-label="${label} placeholder">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${wall}"/>
      <stop offset="100%" stop-color="#0A0A0B"/>
    </linearGradient>
    <radialGradient id="lamp" cx="34%" cy="14%" r="72%">
      <stop offset="0%" stop-color="#EDEAE4" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#EDEAE4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.30"/>
      <stop offset="48%" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="52%" stop-color="#EDEAE4" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.16"/>
    </linearGradient>
    <linearGradient id="art" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0A0A0B" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000" flood-opacity="0.55"/></filter>
  </defs>

  <rect width="1000" height="625" fill="url(#wall)"/>
  <rect width="1000" height="625" fill="url(#lamp)"/>

  ${
    isDetail
      ? // Corner joint macro: two moulding faces meeting at a mitre.
        `<g filter="url(#shadow)">
    <path d="M120 640 L120 210 L360 60 L860 60 L860 640 Z" fill="#17171A"/>
    <path d="M120 210 L360 60 L860 60" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="3"/>
    <path d="M150 640 L150 224 L372 90 L830 90 L830 640 Z" fill="none" stroke="#EDEAE4" stroke-opacity="0.16" stroke-width="2"/>
    <path d="M360 60 L360 640" stroke="#EDEAE4" stroke-opacity="0.10" stroke-width="1.5" stroke-dasharray="7 7"/>
  </g>
  <g stroke="#EDEAE4" stroke-opacity="0.14" stroke-width="1.4" fill="none">
    <path d="M158 300 L200 300M158 340 L182 340M158 380 L168 380"/>
  </g>`
      : isPlan
        ? // Scale drawing: a frame elevation with dimensions.
          `<g filter="url(#shadow)">
    <rect x="230" y="120" width="540" height="386" fill="none" stroke="#EDEAE4" stroke-opacity="0.45" stroke-width="2"/>
    <rect x="258" y="148" width="484" height="330" fill="none" stroke="#EDEAE4" stroke-opacity="0.20" stroke-width="1.5"/>
    <rect x="286" y="176" width="428" height="274" fill="url(#art)" opacity="0.35"/>
  </g>
  <g stroke="${accent}" stroke-opacity="0.75" stroke-width="1.2" fill="none">
    <path d="M230 536 L770 536M230 528v16M770 528v16"/>
    <path d="M222 120 L222 506M214 120h16M214 506h16"/>
  </g>
  <g font-family="ui-monospace, monospace" font-size="13" fill="${accent}" fill-opacity="0.85" letter-spacing="1.5">
    <text x="500" y="562" text-anchor="middle">OVERALL WIDTH</text>
    <text x="200" y="316" text-anchor="middle" transform="rotate(-90 200 316)">HEIGHT</text>
  </g>`
        : // Hero shot: a framed piece, hung off-centre on a wall, casting a shadow.
          `<g filter="url(#shadow)">
    <rect x="${252 + index * 14}" y="${96 + index * 8}" width="${468 - index * 28}" height="${372 - index * 16}" fill="#15151A"/>
    <rect x="${274 + index * 14}" y="${118 + index * 8}" width="${424 - index * 28}" height="${328 - index * 16}" fill="#F4F2EC"/>
    <rect x="${304 + index * 14}" y="${148 + index * 8}" width="${364 - index * 28}" height="${268 - index * 16}" fill="url(#art)"/>
    <rect x="${274 + index * 14}" y="${118 + index * 8}" width="${424 - index * 28}" height="${328 - index * 16}" fill="url(#glass)"/>
    <rect x="${252 + index * 14}" y="${96 + index * 8}" width="${468 - index * 28}" height="${372 - index * 16}" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
  </g>
  <g stroke="#EDEAE4" stroke-opacity="0.08" stroke-width="1">
    <path d="M0 96h1000M0 468h1000"/>
  </g>`
  }

  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
    <text x="52" y="70" fill="${accent}" font-size="14" letter-spacing="4">${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</text>
    <text x="52" y="556" fill="#EDEAE4" font-size="42" font-weight="600" letter-spacing="-1">${label}</text>
    <text x="52" y="586" fill="#EDEAE4" fill-opacity="0.5" font-size="15" letter-spacing="2.5">${sub.toUpperCase()}</text>
  </g>

  <rect x="0.5" y="0.5" width="999" height="624" fill="none" stroke="${accent}" stroke-opacity="0.18"/>
  <text x="948" y="600" text-anchor="end" fill="#EDEAE4" fill-opacity="0.3" font-size="12" font-family="ui-monospace, monospace" letter-spacing="1.5">PLACEHOLDER</text>
</svg>
`;
}

let coversWritten = 0;
for (const piece of PIECES) {
  piece.shots.forEach((shot, i) => {
    const svg = placeholder({
      ...piece,
      shot,
      index: i,
      total: piece.shots.length,
    });
    if (write(resolve(workDir, `${piece.slug}-${shot}.svg`), svg)) coversWritten++;
  });
}

console.log(`\nmarks: ${marksWritten} written · gallery: ${coversWritten} written`);
console.log(marksWritten + coversWritten === 0 ? 'Everything already exists.' : 'Done — replace these with real photography before launch.');
