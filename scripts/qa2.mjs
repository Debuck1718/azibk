// QA script 2: re-verifies the hero headline and tests the accent tint with
// REAL mouse movement (page.mouse.move), which is what a user actually does.
// The previous run used synthetic PointerEvent dispatch, which does not trigger
// React's delegated onPointerEnter — so that result was inconclusive, not a bug.
export default async function run(page, ui) {
  const results = {};

  // ---- Hero: exactly one word must be readable ------------------------------
  const headlineText = () =>
    page.evaluate(
      () =>
        document.querySelector("h1")?.innerText.replace(/\s+/g, " ").trim() ??
        null,
    );

  const t0 = await headlineText();
  await page.waitForTimeout(3000);
  const t1 = await headlineText();

  results.heroWord = {
    sampleA: t0,
    sampleB: t1,
    rotates: t0 !== t1,
    // A single word is correct; every word concatenated is the bug we fixed.
    singleWordEachTime: t0 === "I engineer frameworks." && t1.length < 40,
  };

  // ---- Accent tint via real pointer movement --------------------------------
  const readAccent = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
    );

  // Start clean in the hero.
  await page.mouse.move(20, 20);
  await page.waitForTimeout(400);
  const base = await readAccent();

  // Scroll the third project row (Halo, green 126 231 163) into view.
  const haloBox = await page.evaluate(() => {
    const articles = document.querySelectorAll("article");
    const halo = articles[2];
    if (!halo) return null;
    halo.scrollIntoView({ block: "center" });
    const r = halo.getBoundingClientRect();
    return { x: Math.round(r.left + r.width * 0.4), y: Math.round(r.top + 60) };
  });

  if (!haloBox) return { ...results, error: "Halo row not found" };

  await page.waitForTimeout(600);
  await page.mouse.move(haloBox.x, haloBox.y);
  await page.waitForTimeout(500);
  const hovered = await readAccent();

  // Move the pointer away, off any article.
  await page.mouse.move(10, 10);
  await page.waitForTimeout(700);
  const restored = await readAccent();

  results.accentTint = {
    base,
    hovered,
    restored,
    tintedOnHover: base !== hovered,
    restoredAfterLeave: restored === base,
  };

  // ---- Reduced-motion / no-observer safety net ------------------------------
  results.revealSafety = await page.evaluate(() => {
    const reveals = document.querySelectorAll(".will-reveal");
    const hidden = Array.from(reveals).filter(
      (el) => !el.classList.contains("is-revealed"),
    ).length;
    return { total: reveals.length, stillHidden: hidden };
  });

  return results;
}
