// QA script: drives the real interactions this site is built around and
// asserts on the DOM state afterwards. Run with the browser-automation skill.
export default async function run(page, ui) {
  const results = {};

  // ---- 1. Hero rotating word actually rotates -------------------------------
  const readHeadline = () =>
    page.evaluate(() => {
      const h1 = document.querySelector("h1");
      return h1 ? h1.innerText.replace(/\s+/g, " ").trim() : null;
    });

  const first = await readHeadline();
  await page.waitForTimeout(3200);
  const second = await readHeadline();
  results.heroRotates = { first, second, changed: first !== second };

  // ---- 2. Project row expands its case study ---------------------------------
  const before = await ui.snapshot();
  const rowRef = before.match(/@(e\d+) button "01 Atlas UI/)?.[1];
  if (!rowRef)
    return { error: "no Atlas UI row", snapshot: before.slice(0, 2000) };

  await ui.click(rowRef);
  await page.waitForTimeout(900);

  results.projectExpand = await page.evaluate(() => {
    const panel = document.getElementById("project-atlas");
    const btn = document.querySelector('[aria-controls="project-atlas"]');
    return {
      ariaExpanded: btn?.getAttribute("aria-expanded") ?? null,
      panelHeight: panel ? Math.round(panel.getBoundingClientRect().height) : 0,
      hasHighlightText:
        panel?.textContent?.includes("Codemod migrated") ?? false,
    };
  });

  // ---- 3. Accent re-tint on project hover -----------------------------------
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const accentBefore = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim(),
  );

  // Hover the third project (Halo, green) by dispatching real pointer events.
  await page.evaluate(() => {
    const articles = document.querySelectorAll("article");
    const halo = articles[2];
    halo?.dispatchEvent(new PointerEvent("pointerenter", { bubbles: false }));
    halo?.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
  });
  await page.waitForTimeout(500);

  const accentDuring = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim(),
  );

  await page.evaluate(() => {
    const articles = document.querySelectorAll("article");
    articles[2]?.dispatchEvent(
      new PointerEvent("pointerleave", { bubbles: false }),
    );
  });
  await page.waitForTimeout(600);

  const accentAfter = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim(),
  );

  results.accentTint = {
    before: accentBefore,
    during: accentDuring,
    after: accentAfter,
    tinted: accentBefore !== accentDuring,
    restored: accentAfter === accentBefore,
  };

  // ---- 4. Arsenal filter ----------------------------------------------------
  const arsenalSnap = await ui.snapshot();
  const graphicsFilter = arsenalSnap.match(
    /@(e\d+) button "Graphics & Real-time"/,
  )?.[1];
  if (graphicsFilter) {
    await ui.click(graphicsFilter);
    await page.waitForTimeout(500);
    results.arsenalFilter = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll("#arsenal h3")).map(
        (h) => h.textContent?.trim(),
      );
      return { headings, count: headings.length };
    });
  }

  // ---- 5. Skill row disclosure ----------------------------------------------
  const skillSnap = await ui.snapshot();
  const reactRow = skillSnap.match(/@(e\d+) button "React Core"/)?.[1];
  if (reactRow) {
    await ui.click(reactRow);
    await page.waitForTimeout(400);
    results.skillDisclosure = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("#arsenal button")).find(
        (b) => b.textContent?.includes("React"),
      );
      return { ariaExpanded: btn?.getAttribute("aria-expanded") ?? null };
    });
  }

  return results;
}
