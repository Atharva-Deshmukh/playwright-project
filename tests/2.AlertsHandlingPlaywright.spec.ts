import { test, expect } from '@playwright/test';

test.skip('Verify alert', async ({ page }) => {

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
      await page.waitForTimeout(5000); // Hard Wait for 5 seconds to observe the alert
  });

});

test('Verify Confirmation with OK', async ({ page }) => {

  /* Handle alert as below */
  page.on('dialog', async (dialog) => {
    expect(await dialog.type()).toBe('confirm');             /* Type of dialog */
    expect(await dialog.message()).toBe('Press a button!');  /* Message of dialog */
    await dialog.accept();   /* Closes confirmation with OK */
    // await dialog.dismiss();   /* Closes confirmation with Cancel */
  });

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';
  const confirmButton = await page.locator('#confirmBtn');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(confirmButton).toBeVisible().then(async () => {
      await confirmButton.click();
  });

});