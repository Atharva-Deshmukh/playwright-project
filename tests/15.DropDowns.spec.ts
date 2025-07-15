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

  /* Count number of options - Approach 2 
     page.$$ returns an array of elements */
  await expect((await page.$$('[data-testid="automation"] option')).length).toBe(4);

  /* Verify if particular option is present */
  /* Way-1: Extracting whole text of <select> locator */
  const allTextExtracted: string = await dropDownLocator.textContent() as string;
  await expect(allTextExtracted).toContain('Yes');
  await expect(allTextExtracted.includes('No')).toBeTruthy();

   /* Way-2: Iterating every option */
   const options = await page.$$('[data-testid="automation"] option');
   for (const option of options) {
     const optionText = await option.textContent();
     console.log('OPTION TEXT -> ', optionText);
   }

   /* Way to select particular option */
      const optionsExtracted = await page.$$('[data-testid="automation"] option');
   for (const option of optionsExtracted) {
     const optionText = await option.textContent();
     if(optionText === 'Yes') {
       await page.selectOption('[data-testid="automation"]', 'Yes');
     }
   }

});

test('Type-2: Multiple Dropdowns <select .. multiple>', async ({ page }) => {

   await page.selectOption('[data-testid="automation"]', ['Yes', 'No']);

}); 

test('Type-3: Bootstrap Dropdowns => without <select>', async ({ page }) => {

    /* Simply get options locator and click in loop and if condition as above test 1 */

}); 

test('Type-4: Autosuggest Dropdowns', async ({ page }) => {

    /* Type something in search box, wait for autosuggestions locator. And then click on the suggestion */

}); 

test('Type-5: Hidden Dropdowns', async ({ page }) => {

    /* Freeze the UI and get locators*/

}); 