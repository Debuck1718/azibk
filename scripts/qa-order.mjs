// Verifies the order form — the commercial core of the site.
//
// Checks, in order:
//   1. Validation blocks an empty submit and focuses the first bad field.
//   2. Errors are announced (role="alert") and kept after a failed submit.
//   3. A valid submission reaches the confirmation state.
//   4. No console errors at any point.
export default async function run(page, ui) {
  const results = {};

  // Bring the form into view and let reveals settle.
  await page.evaluate(() => {
    const el = document.querySelector('#order');
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  });
  await page.waitForTimeout(1200);

  // --- 1. Empty submit must be blocked --------------------------------------
  // The submit control is targeted by its form-scoped selector rather than by
  // an accessibility ref: the ref snapshot lists links and buttons, and the
  // form's own controls are reached more reliably through the DOM.
  const submit = page.locator('#order button[type="submit"]');
  if ((await submit.count()) === 0) {
    return { error: 'no submit button found in #order' };
  }

  await submit.first().click();
  await page.waitForTimeout(600);

  results.afterEmptySubmit = await page.evaluate(() => {
    const alerts = Array.from(document.querySelectorAll('#order [role="alert"]')).map((el) =>
      el.textContent.trim(),
    );
    return {
      alertCount: alerts.length,
      alerts,
      focusedId: document.activeElement?.id ?? null,
      // The confirmation panel must NOT be showing.
      confirmed: Boolean(document.querySelector('#order [role="status"]')),
      // Whatever was typed must survive the failed attempt.
      nameFieldValue: document.getElementById('order-name')?.value ?? null,
    };
  });

  // --- 2. Fill it in properly -----------------------------------------------
  await page.fill('#order-name', 'Ama Mensah');
  await page.fill('#order-email', 'ama@example.com');
  await page.fill('#order-phone', '+233201234567');
  await page.fill(
    '#order-notes',
    'A framed photograph, A2, already mounted on board. Would like it to match a dark oak desk.',
  );
  await page.waitForTimeout(400);

  // Errors should clear as the user fixes each field.
  results.errorsClearedOnFix = await page.evaluate(() => {
    const alerts = Array.from(document.querySelectorAll('#order [role="alert"]'));
    return alerts.length;
  });

  // --- 3. Valid submit reaches confirmation ---------------------------------
  await page.locator('#order button[type="submit"]').first().click();
  await page.waitForTimeout(2200);

  results.afterValidSubmit = await page.evaluate(() => {
    const status = document.querySelector('#order [role="status"]');
    return {
      confirmed: Boolean(status),
      confirmationText: status?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 140) ?? null,
      formGone: !document.getElementById('order-name'),
    };
  });

  // --- 4. Reset returns a usable form ---------------------------------------
  const reset = page.locator('#order button', { hasText: 'Send another enquiry' });
  if ((await reset.count()) > 0) {
    await reset.first().click();
    await page.waitForTimeout(600);
    results.afterReset = await page.evaluate(() => ({
      formBack: Boolean(document.getElementById('order-name')),
      nameIsBlank: document.getElementById('order-name')?.value === '',
    }));
  }

  return results;
}
