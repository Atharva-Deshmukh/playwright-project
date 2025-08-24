import { test, expect } from '@playwright/test';

test('TestInfo Object', async ({ page }, testInfo) => {
  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';
  const alertButton = await page.locator('#alertBtn');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(alertButton).toBeVisible();

  /* Expected status for the currently running test. 
  
     This is usually 'passed', except for a few cases:
     'skipped' for skipped tests, e.g. with test.skip();
     'failed' for tests marked as failed with test.fail() */

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`${testInfo.title} did not run as expected!`);

  else
    console.log(`${testInfo.title} ran as expected!`);

});