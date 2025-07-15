import { test, expect } from '@playwright/test';

test('Type-1: Dropdowns with <select>', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';
  const logoHeader = page.getByAltText('automateNow Logo');
  const dropDownLocator = page.getByTestId('automation');

  await page.goto(url);
  await expect(logoHeader).toBeVisible();
  await expect(dropDownLocator).toBeVisible();

  /* Directly by text */
  await dropDownLocator.selectOption('Yes'); 

  /* Directly by Value */
  await dropDownLocator.selectOption({ value: 'no' }); 

  /* Directly by Label */
  await dropDownLocator.selectOption({ label: 'Yes' }); 

  /* Directly by Index */
  await dropDownLocator.selectOption({ index: 1 }); 

  /* Count number of options - Approach 1 */
  await expect(dropDownLocator.locator('option')).toHaveCount(4);

  /* Count number of options - Approach 2 */
  await expect((await page.$$('[data-testid="automation"] option')).length).toBe(4);
});