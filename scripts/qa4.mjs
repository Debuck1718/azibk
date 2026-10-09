// Final interaction test.
//
// Note for whoever reads this next: `scrollIntoView()` did NOT move the page in
// this headless build (it reported scrollY 0 and left the rows below the fold),
// which made an earlier hover probe report a false negative. Using an explicit
// window.scrollTo with a computed offset is reliable here.
export default async function run(page) {
  const readAccent = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim(),
    );

  const results = {};

  // 1. Baseline accent.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.move(30, 30);
  await page.waitForTimeout(400);
  results.base = await readAccent();
  results.defaultIsBlue = results.base === "91 140 255";

  // 2. Hover each project row in turn. Each should re-tint the page, then the
  //    tint should move (not reset) as we cross into the next row.
  const targets = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll("article"));
    return articles.slice(0, 3).map((a, i) => {
      const r = a.getBoundingClientRect();
      return {
        i,
        name: a.querySelector("h3")?.textContent?.trim() ?? null,
        x: 640,
        // Offset into the page; the scroll below brings it under the pointer.
        docY: Math.round(r.top + window.scrollY + 40),
      };
    });
  });

  results.hoverSequence = [];

  for (const target of targets) {
    // Put the row's top area at ~300px from the viewport top.
    await page.evaluate(
      (y) => window.scrollTo(0, Math.max(0, y)),
      target.docY - 300,
    );
    await page.waitForTimeout(450);

    await page.mouse.move(target.x, 300);
    await page.waitForTimeout(450);

    const accent = await readAccent();
    const tintedBackground = await page.evaluate(() => {
      const el = document.elementFromPoint(640, 300);
      return {
        underPointer: el?.tagName ?? null,
        insideArticle: Boolean(el?.closest("article")),
      };
    });

    results.hoverSequence.push({
      row: target.name,
      accent,
      ...tintedBackground,
    });
  }

  // 3. Leave the page area entirely: the tint must return to the default.
  await page.mouse.move(5, 5);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  results.afterLeaving = await readAccent();
  results.restoredToDefault = results.afterLeaving === "91 140 255";

  // 4. Colour values must actually differ between projects, otherwise the
  //    "re-tint" is cosmetic only.
  const accents = results.hoverSequence.map((h) => h.accent);
  results.distinctColours = new Set(accents).size;

  return results;
}
