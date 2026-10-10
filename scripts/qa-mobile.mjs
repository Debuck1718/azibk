export default async function run(page) {
  const results = {};

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);

  results.mobile = await page.evaluate(() => ({
    viewport: { width: window.innerWidth, height: window.innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    horizontalOverflow:
      document.documentElement.scrollWidth > window.innerWidth,
    title: document.title,
    mainHeading: document
      .querySelector("h1")
      ?.innerText.replace(/\s+/g, " ")
      .trim(),
    galleryItems: document.querySelectorAll("#gallery article").length,
    image: (() => {
      const img = document.querySelector('img[src*="upsa.png"]');
      if (!img) return null;
      const r = img.getBoundingClientRect();
      return {
        src: img.getAttribute("src"),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: Math.round(r.width),
        renderedHeight: Math.round(r.height),
      };
    })(),
  }));

  // Bring the Gallery cover into view, then click the standalone image button.
  await page.evaluate(() => {
    const img = document.querySelector('img[src*="upsa.png"]');
    img?.closest("button")?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(300);
  const cover = page.locator('#gallery article').first().locator(
    'button[aria-label*="Four UPSA SRC representatives"]',
  );
  results.imageButtonCount = await cover.count();
  if ((await cover.count()) > 0) {
    await cover.first().click();
    await page.waitForTimeout(350);
    results.lightbox = await page.evaluate(() => ({
      open: Boolean(
        document.querySelector('[role="dialog"][aria-modal="true"]'),
      ),
      image: document.querySelector('[role="dialog"] img')?.getAttribute("src"),
      dialogName: document
        .querySelector('[role="dialog"]')
        ?.getAttribute("aria-label"),
      bodyPosition: getComputedStyle(document.body).position,
    }));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
  }

  // Expand the first gallery card and ensure there is no nested interactive control.
  await page.evaluate(() => window.scrollTo(0, 0));
  const expand = page.locator(
    '[aria-controls="project-upsa-src-annual-dinner"]',
  );
  results.expandButtonCount = await expand.count();
  if ((await expand.count()) > 0) {
    await expand.click();
    await page.waitForTimeout(400);
    results.expanded = await page.evaluate(() => ({
      isExpanded: document
        .querySelector('[aria-controls="project-upsa-src-annual-dinner"]')
        ?.getAttribute("aria-expanded"),
      frameImages: document.querySelectorAll(
        "#project-upsa-src-annual-dinner img",
      ).length,
    }));
  }

  // Test a smaller phone and the mobile navigation.
  await page.setViewportSize({ width: 320, height: 740 });
  await page.waitForTimeout(250);
  results.smallPhone = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    horizontalOverflow:
      document.documentElement.scrollWidth > window.innerWidth,
  }));

  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", { name: "Open menu" });
  results.mobileMenuButtonCount = await menu.count();
  if ((await menu.count()) > 0) {
    await menu.click();
    await page.waitForTimeout(250);
    results.mobileMenu = await page.evaluate(() => ({
      visible: !document.getElementById("mobile-menu")?.hidden,
      bodyOverflowLocked: getComputedStyle(document.body).overflow === "hidden",
      orderLinkVisible: Array.from(
        document.querySelectorAll("#mobile-menu a"),
      ).some((a) => a.textContent?.includes("Order")),
    }));
  }

  await page.screenshot({
    path: "c:\\Users\\ASUS\\azibk\\qa-mobile.png",
    fullPage: false,
  });
  return results;
}
