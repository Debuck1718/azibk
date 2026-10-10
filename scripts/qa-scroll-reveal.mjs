export default async function run(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForSelector("#gallery article");
  const report = [];

  for (const id of [
    "gallery",
    "materials",
    "process",
    "about",
    "parent",
    "order",
    "contact",
  ]) {
    await page.evaluate((sectionId) => {
      const node = document.getElementById(sectionId);
      if (node)
        window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY);
    }, id);
    await page.waitForTimeout(1100);

    report.push(
      await page.evaluate((sectionId) => {
        const node = document.getElementById(sectionId);
        const reveals = Array.from(
          node?.querySelectorAll(".will-reveal") ?? [],
        );
        const articles = Array.from(
          node?.querySelectorAll("article.will-reveal") ?? [],
        );
        return {
          id: sectionId,
          inViewport: Boolean(
            node && node.getBoundingClientRect().top < innerHeight,
          ),
          revealTotal: reveals.length,
          revealed: reveals.filter((item) =>
            item.classList.contains("is-revealed"),
          ).length,
          projectCards: articles.length,
          revealedProjectCards: articles.filter((item) =>
            item.classList.contains("is-revealed"),
          ).length,
          heading: node?.querySelector("h2")?.textContent?.trim() ?? null,
        };
      }, id),
    );

    if (id === "gallery") {
      await page.screenshot({
        path: "c:\\Users\\ASUS\\azibk\\qa-gallery-mobile-viewport.png",
      });
    }
  }

  return { report };
}
