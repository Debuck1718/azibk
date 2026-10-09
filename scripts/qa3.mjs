// Diagnostic: where is the pointer landing, and why are reveals still hidden?
export default async function run(page) {
  const out = {};

  // Geometry of the first three project rows.
  out.rows = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll("article"));
    return articles.slice(0, 3).map((a, i) => {
      const r = a.getBoundingClientRect();
      return {
        i,
        text: a.querySelector("h3")?.textContent?.trim() ?? null,
        top: Math.round(r.top),
        left: Math.round(r.left),
        width: Math.round(r.width),
        height: Math.round(r.height),
        viewportH: window.innerHeight,
        inViewport: r.top < window.innerHeight && r.bottom > 0,
      };
    });
  });

  // Scroll the first row to the middle and report where it ends up.
  out.afterScroll = await page.evaluate(() => {
    const a = document.querySelectorAll("article")[0];
    a?.scrollIntoView({ block: "center" });
    const r = a?.getBoundingClientRect();
    return {
      top: r ? Math.round(r.top) : null,
      height: r ? Math.round(r.height) : null,
      centerY: r ? Math.round(r.top + r.height / 2) : null,
      centerX: r ? Math.round(r.left + r.width / 2) : null,
      scrollY: Math.round(window.scrollY),
    };
  });

  // What element is actually at a point inside the first row?
  const probe = out.afterScroll;
  if (probe.centerX != null && probe.centerY != null) {
    out.elementAtPoint = await page.evaluate(
      ([x, y]) => {
        const el = document.elementFromPoint(x, y);
        return {
          tag: el?.tagName ?? null,
          cls: (el?.className ?? "").toString().slice(0, 80),
          closestArticle: Boolean(el?.closest("article")),
          closestButton: Boolean(el?.closest("button")),
        };
      },
      [probe.centerX, probe.centerY],
    );
  }
  // Reveal state before/after scrolling through the page.
  const revealState = () =>
    page.evaluate(() => {
      const all = Array.from(document.querySelectorAll(".will-reveal"));
      return {
        total: all.length,
        revealed: all.filter((el) => el.classList.contains("is-revealed"))
          .length,
      };
    });

  out.revealBefore = await revealState();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  out.revealAfterFullScroll = await revealState();

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  out.revealBackAtTop = await revealState();

  return out;
}
