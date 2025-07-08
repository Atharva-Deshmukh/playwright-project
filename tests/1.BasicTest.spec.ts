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

test('Locator with multiple matches', async ({ page }) => {

  const url: string = 'https://practice-automation.com/tables/';
  const expectedPageTitle: string = 'Tables | Practice Automation';
  const tableCellLocator = await page.locator('.wp-block-table td');

  await page.goto(url);
  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(tableCellLocator.first()).toBeVisible();

  console.log('LOCATOR ARRAY -> ', await tableCellLocator.all());

  /* Outputs   LOCATOR ARRAY ->  [
  locator('.wp-block-table td').first(),
  locator('.wp-block-table td').nth(1),
  locator('.wp-block-table td').nth(2),
  locator('.wp-block-table td').nth(3),
  locator('.wp-block-table td').nth(4),
  locator('.wp-block-table td').nth(5),
  locator('.wp-block-table td').nth(6),
  locator('.wp-block-table td').nth(7)
]*/
});

test('Extract text from locator', async ({ page }) => {

  const url: string = 'https://practice-automation.com/tables/';
  const expectedPageTitle: string = 'Tables | Practice Automation';
  const tableCellLocator = await page.locator('.wp-block-table td');

  await page.goto(url);
  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(tableCellLocator.first()).toBeVisible();

  expect(await tableCellLocator.first().innerText()).toBe('Item');
});

