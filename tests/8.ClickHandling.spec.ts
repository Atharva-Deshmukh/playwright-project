import { test, expect } from '@playwright/test';

test('Double click', async ({ page }) => {

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';

  const doubleClickButton = page.locator('button:has-text("Copy Text")');
  const inputLocator = page.locator('input#field2');

  await page.goto(url);
  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(doubleClickButton).toBeVisible();

  await doubleClickButton.dblclick();
  await expect(await inputLocator).toHaveText("Hello World!");

  await page.waitForTimeout(5000);
});