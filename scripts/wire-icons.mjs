// One-off migration: attaches the generated mark icons to each material entry
// in src/lib/site.ts. Kept in the repo because it documents which icon belongs
// to which material; safe to re-run (it skips entries that already have one).
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve(process.cwd(), "src/lib/site.ts");

const ICONS = {
  "Hand-finished Hardwood": "hardwood",
  "Gesso & Gilded": "gilded",
  "Metal Section": "metal",
  "Deep Shadow Box": "shadowbox",
  "Floating Mount": "floating",
  "Restoration Moulding": "restoration",

  "Museum Glass": "museumglass",
  "UV-Filtered Clear": "uvclear",
  "Standard Clear": "clear",
  "Acrylic Glazing": "acrylic",
  "Anti-Reflective Etched": "antireflective",
  "No Glazing": "noglazing",

  "Conservation Board": "conservation",
  "Alpha-Cellulose Mount": "alphacellulose",
  "Acid-Free Standard Board": "acidfree",
  "Moisture Barrier": "moisture",
  "Stainless Hanging Method": "stainless",
  "Fluted & Foam Board": "fluted",

  "Mitred & Cross-Nailed": "mitred",
  "Dust Sealing": "dustsealed",
  "Anti-Slip Felt Pads": "feltpads",
  "D-Rings & Hanging Kit": "hangingkit",
  "Hand-Painted Accent Line": "accentline",
  "Printed Plaque": "plaque",
};

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let source = readFileSync(file, "utf8");
let wired = 0;
let skipped = 0;

for (const [name, icon] of Object.entries(ICONS)) {
  // Match: { name: 'X', tier: 'house', depth: 96, ... }
  const pattern = new RegExp(
    `(\\{ name: '${escape(name)}', tier: '(?:house|premium|select)', depth: \\d+)(,?)`,
  );

  const match = source.match(pattern);
  if (!match) {
    console.log(`MISS   ${name}`);
    continue;
  }

  if (match[0].includes("icon:")) {
    skipped++;
    continue;
  }

  source = source.replace(pattern, `$1, icon: '/marks/${icon}.svg'`);
  wired++;
}

writeFileSync(file, source, "utf8");

console.log(`\nicons wired: ${wired}`);
console.log(skipped ? `already had icons: ${skipped}` : "");
console.log(`total mapped: ${Object.keys(ICONS).length}`);
