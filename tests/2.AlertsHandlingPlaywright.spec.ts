import { test, expect } from '@playwright/test';

test('Verify alert', async ({ page }) => {

  /* Handle alert as below */
  page.on('dialog', async (dialog) => {
    expect(await dialog.type()).toBe('alert');                 /* Type of dialog */
    expect(await dialog.message()).toBe('I am an alert box!'); /* Message of dialog */
    await dialog.accept();                                     /* Accept the alert */
  });

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';
  const alertButton = await page.locator('#alertBtn');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(alertButton).toBeVisible().then(async () => {
      await alertButton.click();
  });

});