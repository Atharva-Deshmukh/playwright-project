import { test, expect } from '@playwright/test';

// <select> tag scenario

test('Verify Select', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';
  const expectedPageTitle: string = 'Form Fields | Practice Automation';
  const selectLocator = page.locator('#automation');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(selectLocator).toBeVisible();

  // Single selection matching the value or label
  await selectLocator.scrollIntoViewIfNeeded();    /* For scrolling */
  await selectLocator.selectOption('Yes');

  // Single selection matching the label
  await selectLocator.scrollIntoViewIfNeeded();
  await selectLocator.selectOption({ label: 'No' });

  // Multiple selected items
  await selectLocator.scrollIntoViewIfNeeded();
  await selectLocator.selectOption(['Undecided']);
});
