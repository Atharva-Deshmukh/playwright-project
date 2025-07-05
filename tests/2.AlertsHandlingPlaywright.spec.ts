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
      await page.waitForTimeout(5000); // Hard Wait for 5 seconds to observe the alert
  });

});

test('Verify Confirmation with OK', async ({ page }) => {

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

test('Verify Prompt dialogue with OK and some message', async ({ page }) => {

  page.on('dialog', async (dialog) => {
    expect(await dialog.type()).toBe('prompt');             /* Type of dialog */
    expect(await dialog.message()).toBe('Please enter your name:');  /* Message of dialog */
    expect(await dialog.defaultValue()).toBe('Harry Potter'); /* Default value in the prompt */

    await dialog.accept('INPUT MESSAGE');   /* Closing prompt with some input message */
    // await dialog.dismiss();   /* Closes prompt with Cancel */
  });

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';
  const promptButton = await page.locator('#promptBtn');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(promptButton).toBeVisible().then(async () => {
      await promptButton.click();
      expect(await page.locator('p#demo')).toHaveText('Hello INPUT MESSAGE! How are you today?');
  });
});