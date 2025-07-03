import { test, expect } from '@playwright/test';

/* Every test starts with goto()

 We have {page} fixture passed in every test's callback function.*/

test('Verify page title', async ({ page }) => {

  const url: string = 'https://playwright.dev/';
  const expectedPageTitle: string = 'Fast and reliable end-to-end testing for modern web apps | Playwright';

  await page.goto(url);

  const pageTitle: string = await page.title();

  await expect(page).toHaveTitle(expectedPageTitle);

  await page.close();
  console.log(`Test passed: Page title is "${pageTitle}" as expected.`);
});

