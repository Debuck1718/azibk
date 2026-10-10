export default async function run(page) {
  const report = [];
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 820 });
    await page.waitForTimeout(120);
    report.push(await page.evaluate(() => ({
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      hasHorizontalPageScroll: document.documentElement.scrollWidth > innerWidth,
    })));
  }

  await page.setViewportSize({ width: 390, height: 844 });
  const photo = page.locator('#gallery article').first().locator('img[src*="upsa.png"]').first();
  const imageInfo = await photo.evaluate((img) => ({
    loaded: img.complete && img.naturalWidth > 0,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    renderedWidth: Math.round(img.getBoundingClientRect().width),
    renderedHeight: Math.round(img.getBoundingClientRect().height),
  }));

  await photo.evaluate((img) => img.closest('button')?.click());
  await page.waitForTimeout(160);
  const lightboxOpen = await page.locator('[role="dialog"][aria-modal="true"]').count();
  await page.keyboard.press('Escape');

  return { viewportChecks: report, imageInfo, lightboxOpensOnTap: lightboxOpen === 1 };
}
