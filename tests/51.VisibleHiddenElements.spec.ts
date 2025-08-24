import { test, expect } from '@playwright/test';

test('Visible and Hidden elements', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';
  const pageTitle: string = "Form Fields | Practice Automation";
  const dropdownLocator = page.locator('select#automation:visible');
  const noOptionHidden = page.getByTestId('automation-undecided:hidden');

  await page.goto(url); 
  await expect(page).toHaveTitle(pageTitle);
  await expect(dropdownLocator).toBeVisible();
  await expect(noOptionHidden).not.toBeVisible();
  await expect(noOptionHidden).toBeHidden();
});