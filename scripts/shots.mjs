// Captures the page section by section. Screenshots are full-viewport captures
// taken after an explicit scroll — `scrollIntoView` proved unreliable here.
export default async function run(page) {
  const sections = ["#gallery", "#materials", "#process", "#about", "#parent", "#order", "#contact"];
  const shots = [];

  for (const selector of sections) {
    const y = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top);
      return Math.round(top);
    }, selector);

    if (y === null) {
      shots.push({ selector, error: "not found" });
      continue;
    }

    // Let reveal animations settle and the marquee advance.
    await page.waitForTimeout(1400);

    const name = selector.replace("#", "");
    const path = `c:\\Users\\ASUS\\azibk\\qa-${name}.png`;
    await page.screenshot({ path });
    shots.push({ selector, scrolledTo: y, path });
  }

  return { shots };
}
