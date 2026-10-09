// Dev-only helper: flags lines that contain escaped double quotes, which is the
// signature of the corrupted writes we keep catching. Not part of the build.
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const files = process.argv.slice(2);
let flagged = 0;

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes('\\"')) {
      flagged++;
      console.log(`${file}:${i + 1}: ${line.trim()}`);
    }
  });
}

console.log(
  flagged === 0 ? "OK - no escaped-quote lines" : `FLAGGED ${flagged} line(s)`,
);
