import { test, expect } from '@playwright/test';

// Skip or Focus Entire Tests Conditionally
test('only run in Chrome', async ({ browserName }) => {
  test.skip(browserName !== 'chromium', 'Only supported in Chrome');

    /* Similar conditions
  
    - test.skip(condition, reason) → skips if condition is true.
    - test.fixme(condition, reason) → marks as known failing.
    - test.fail(condition, reason) → marks as expected to fail. */

  // Your test code
  await expect(true).toBe(true);
});

test('run different steps based on browser', async ({ browserName, page }) => {
  await page.goto('https://example.com');

  if (browserName === 'firefox') {
    await page.click('#firefox-only-button');
  } else {
    await page.click('#default-button');
  }
});

test('Conditional Expectations', async ({ page }) => {

  await page.goto('https://example.com');

  if (process.env.ENV === 'staging') {
    await expect(page.locator('h1')).toHaveText('Welcome to Staging');
  } else {
    await expect(page.locator('h1')).toHaveText('Welcome');
  }

});

test('Conditional Locator Existence', async ({ page }) => {

    const specialButton = page.locator('#special');

    if (await specialButton.isVisible()) {
        await specialButton.click();
    }
});