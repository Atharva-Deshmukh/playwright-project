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

/* // Shift + click
await page.getByText('Item').click({ modifiers: ['Shift'] });

// Ctrl + click on Windows and Linux
// Meta + click on macOS
await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] });

// Hover over element
await page.getByText('Item').hover();

// Click the top left corner
await page.getByText('Item').click({ position: { x: 0, y: 0 } }); */

test('How to hold a key', async ({ page }) => {

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';

  const holdButtonIntitial = page.locator('button.start');
  const holdButtonFinal = page.locator('button.stop');

  await page.goto(url);
  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(holdButtonIntitial).toBeVisible();

  /* To target a specific locator with a mouse operation, you should first move the mouse to the 
  locator’s position using locator.hover() or page.mouse.move(), then perform the mouse actions. */

    await holdButtonIntitial.hover();
    await page.mouse.down();           // Hold mouse button down
    await page.waitForTimeout(2000);   // Wait for 2 seconds
    await page.mouse.up();          // Release the mouse button
    await expect(await holdButtonFinal).toBeVisible();
});