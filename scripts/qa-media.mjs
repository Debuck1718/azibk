// Verifies the new media layer: every image loads (no 404s), then the lightbox
// opens, navigates and closes with the keyboard.
export default async function run(page) {
  const results = {};

  // 1. Every rendered <img> must have real natural dimensions, i.e. it decoded.
  //    A 404 in Next's image optimizer still renders an <img>, so we check the
  //    intrinsic size rather than trusting that the tag exists.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  // Reveal the work section so the lazy images start loading.
  await page.evaluate(() => {
    const work = document.querySelector('#work');
    if (work) window.scrollTo(0, work.getBoundingClientRect().top + window.scrollY);
  });
  await page.waitForTimeout(2500);

  results.imagesAtRest = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const broken = imgs
      .filter((img) => img.naturalWidth === 0 && img.complete)
      .map((img) => img.getAttribute('src'));
    return {
      total: imgs.length,
      loaded: imgs.filter((img) => img.naturalWidth > 0).length,
      broken,
    };
  });

  // 2. Expand the first project and confirm its gallery images decode too.
  const headerRef = await page.evaluate(() => {
    const btn = document.querySelector('[aria-controls="project-atlas"]');
    if (!btn) return null;
    btn.scrollIntoView();
    return true;
  });

  if (headerRef) {
    await page.click('[aria-controls="project-atlas"]');
    await page.waitForTimeout(2200);
  }

  results.afterExpand = await page.evaluate(() => {
    const panel = document.getElementById('project-atlas');
    const imgs = Array.from(panel?.querySelectorAll('img') ?? []);
    return {
      panelImages: imgs.length,
      decoded: imgs.filter((i) => i.naturalWidth > 0).length,
      broken: imgs
        .filter((i) => i.naturalWidth === 0 && i.complete)
        .map((i) => i.getAttribute('src')),
    };
  });

  // 3. Open the lightbox from the cover image (index 0).
  const coverOpened = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label^="Enlarge image: Atlas"]');
    if (!btn) return false;
    btn.click();
    return true;
  });
  await page.waitForTimeout(900);

  results.lightboxOpen = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-modal="true"]');
    return {
      present: Boolean(dialog),
      counter: dialog?.querySelector('span')?.textContent?.trim() ?? null,
      // Focus must have moved into the dialog.
      focusInsideDialog: dialog ? dialog.contains(document.activeElement) : false,
      bodyScrollLocked: getComputedStyle(document.body).position === 'fixed',
    };
  });

  // 4. Arrow key navigation.
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600);
  results.afterArrowRight = await page.evaluate(
    () => document.querySelector('[role="dialog"] span')?.textContent?.trim() ?? null,
  );

  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(600);
  results.afterArrowLeft = await page.evaluate(
    () => document.querySelector('[role="dialog"] span')?.textContent?.trim() ?? null,
  );

  // 5. Escape closes and scroll is restored.
  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  results.afterEscape = await page.evaluate(() => ({
    dialogGone: !document.querySelector('[role="dialog"][aria-modal="true"]'),
    bodyUnlocked: getComputedStyle(document.body).position !== 'fixed',
  }));

  return results;
}
