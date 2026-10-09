// Repairs UTF-8 text that was double-encoded (mojibake).
//
// Cause: `Get-Content -Raw | Set-Content -Encoding UTF8` in PowerShell re-encoded
// already-UTF-8 bytes as Latin-1, turning "—" into "—". This script reverses
// that mapping and is safe to run repeatedly (it is a no-op once clean).
//
// Run: node scripts/fix-encoding.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

// Node writes these as literal characters; we rebuild the mojibake sequences
// from code points so this file itself stays pure ASCII-safe.
const REPLACEMENTS = [
  ["\u00e2\u20ac\u009d", "\u201d"],
  ["\u00e2\u20ac\u0153", "\u201c"],
  ["\u00e2\u20ac\u2122", "\u2019"],
  ["\u00e2\u20ac\u2018", "\u2018"],
  ["\u00e2\u20ac\u201d", "\u2014"],
  ["\u00e2\u20ac\u201c", "\u2013"],
  ["\u00e2\u20ac\u00a6", "\u2026"],
  ["\u00e2\u2020\u2019", "\u2192"],
  ["\u00e2\u2020\u0090", "\u2190"],
  ["\u00e2\u2013\u00b2", "\u25b2"],
  ["\u00c2\u00b7", "\u00b7"],
  ["\u00c2\u00a9", "\u00a9"],
  ["\u00c2\u00a0", "\u00a0"],
  ["\u00c2\u00ab", "\u00ab"],
  ["\u00c2\u00bb", "\u00bb"],
  ["\u00c3\u2014", "\u00d7"],
  ["\u00c3\u00b7", "\u00f7"],
  ["\u00e2\u2030\u00a4", "\u2264"],
  ["\u00e2\u2030\u00a5", "\u2265"],
  ["\u00e2\u02dc\u2026", "\u2713"],
  ["\u00e2\u0153\u2022", "\u2715"],
  ["\u00e2\u2020\u2014", "\u2197"],
  ["\u00e2\u2020\u2018", "\u2196"],
  ["\u00e2\u02c6\u2019", "\u2212"],
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git")
      continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".ts", ".tsx", ".mjs", ".css", ".md"].includes(extname(full)))
      out.push(full);
  }
  return out;
}

let touched = 0;
for (const file of walk(process.cwd())) {
  const before = readFileSync(file, "utf8");
  let after = before;
  for (const [bad, good] of REPLACEMENTS) after = after.split(bad).join(good);

  if (after !== before) {
    writeFileSync(file, after, "utf8");
    touched++;
    console.log(`fixed  ${file}`);
  }
}

console.log(
  touched === 0 ? "OK - all files clean" : `\nrepaired ${touched} file(s)`,
);
