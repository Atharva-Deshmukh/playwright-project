import { test, expect } from '@playwright/test';

test('goto() options', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';
  const expectedPageTitle: string = 'Form Fields | Practice Automation';
  const selectLocator = page.locator('#automation');

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(selectLocator).toBeVisible();
});