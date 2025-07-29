import { test, expect } from '@playwright/test';

let page;

test.beforeAll(async ({browser}) => {
  page = await browser.newPage();
  const url: string = 'https://practice-automation.com/form-fields/';
  const expectedPageTitle: string = 'Form Fields | Practice Automation';

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(page.locator('h1')).toHaveText('Form Fields');
});

test('viewport screenshot', async () => {
    await page.screenshot({path: 'tests/screenshots/viewport.png', fullPage: false});
    /* Same name screenshots overwrite each other */
});

test('Full page screenshot screenshot', async () => {
    await page.screenshot({path: 'tests/screenshots/fullpage.png', fullPage: true});
});

test('Element screenshot', async () => {
    await page.locator('h1:has-text("Form Fields")').screenshot({path: 'tests/screenshots/element.png'});
});