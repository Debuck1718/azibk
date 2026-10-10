export default async function run(page) {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.waitForTimeout(300);
  return await page.evaluate(() => {
    const inspect = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        cls: typeof el.className === "string" ? el.className.slice(0, 120) : "",
        display: s.display,
        position: s.position,
        overflowX: s.overflowX,
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        scrollWidth: el.scrollWidth,
      };
    };
    const elements = [document.documentElement, document.body, ...document.querySelectorAll("body *")];
    return {
      viewport: window.innerWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      root: inspect(document.documentElement),
      body: inspect(document.body),
      offenders: elements.map(inspect).filter((el) => el.right > window.innerWidth + 1 || el.left < -1).slice(0, 20),
    };
  });
}
