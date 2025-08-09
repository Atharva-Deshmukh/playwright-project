import { test, expect } from '@playwright/test';

/* Window object in playwright

In cypress -> cy.window().then((win) => {})

const someValue = await page.evaluate(() => window.someProperty); */

test('cy.document() workaround in playwright', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';
  const expectedPageTitle: string = 'Form Fields | Practice Automation';
  const selectLocator = page.locator('#automation');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(selectLocator).toBeVisible();

    // Grab all sizes in one go
  const { scrollWidth, scrollHeight, clientWidth, clientHeight } = await page.evaluate(() => {
    return {
      scrollWidth: document.body.scrollWidth,
      scrollHeight: document.body.scrollHeight,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight
    };
  });
  console.log(scrollWidth, scrollHeight, clientWidth, clientHeight);

  /* One way to get single level properties like document.prop
     evaluate() has second argument, that is itself passed as an argument in callback function
     of the the first argument
  
    async function getDocProperty(page, prop) {
        return await page.evaluate((p) => document[p], prop);
    } */
});