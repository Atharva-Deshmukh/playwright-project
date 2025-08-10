/*

| Feature                                 | Cypress 13+                                      | Playwright                                 |
| --------------------------------------- | ------------------------------------------------ | ------------------------------------------ |
| Cross-origin page navigation            | ✅ Allowed with `cy.origin()` API                 | ✅ Allowed directly                         |
| Accessing variables from another origin | ⚠ Allowed only inside `cy.origin()` callback     | ✅ Allowed directly (per page)              |
| Multi-domain auth flows                 | Easier with `cy.origin()` but still more verbose | Simple — just open multiple pages/contexts |
| API calls to different origins          | Same                                             | Same                                       |
| Frame/iframe cross-origin access        | ✅ via `cy.origin()` block                        | ✅ via `frameLocator` if allowed by browser |
*/

import { test, expect } from '@playwright/test';

test('Cross origin in Playwright', async ({ page, context }) => {
  // Visit first origin
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);

  // Navigate directly to another origin
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);

  // Or open another origin in a new tab
  const otherPage = await context.newPage();
  await otherPage.goto('https://github.com');
  await expect(otherPage).toHaveTitle(/GitHub/);
});
