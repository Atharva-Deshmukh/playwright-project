import { test, expect } from '@playwright/test';
import clipboard from 'clipboardy';

const url: string = 'https://clipboardjs.com/';
const expectedPageTitle: string = 'clipboard.js — Copy to clipboard without Flash';

test('WAY-1: Using keyboard actions - Just to compare texts in page', async ({ page }) => {
  const url: string = 'https://text-compare.com/';
  const text: string = 'I AM COPIED ON CLIPBOARD';
  const textBox1Locator = await page.locator('#inputText1');
  const textBox2Locator = await page.locator('#inputText2');

  await page.goto(url);

  await expect(textBox1Locator).toBeVisible();
  await expect(textBox2Locator).toBeVisible();

  await textBox1Locator.fill(text);

  await textBox1Locator.focus();

  await page.keyboard.press('Control+A');
  await page.keyboard.press('Control+C');

  // Paste into another input
  await textBox2Locator.click();
  await page.keyboard.press('Control+V');

  /* inputValue() reads the value attribute from an <input> or <textarea> 
  (what the browser sends in a form submission). */

  await expect(await textBox2Locator.inputValue()).toBe(text);
  // OR
  // await expect(textBox2Locator).toHaveValue(text);
});

test('WAY-2 Directly using browsers clipboard', async ({ page }) => {
  const installHeaderLocator = await page.locator('#install');
  const copyToClipboardButton = await page
  .locator('code', { hasText: 'npm install clipboard --save' }) // match <code> text
  .locator('..')                                                 // go to parent <pre>
  .locator('button:has(img.clippy[alt="Copy to clipboard"])');    // find the button with that <img>


  await page.goto(url);

  await expect(await page).toHaveTitle(expectedPageTitle);
  await expect(installHeaderLocator).toBeVisible();
  await copyToClipboardButton.click({force: true});

  // Read from system clipboard
  /* use: {
    browserName: "chromium",
    headless: true,
    permissions: ["clipboard-read"],  --> MUST!
    userAgent: "some custom ua",
  }, */
  const clipboardText = await page.evaluate(() => window.navigator.clipboard.readText());
  await expect(clipboardText).toBe('npm install clipboard --save');
});

/* There can be sometimes issues of windows compatibility with this package */
test('WAY-3 Using cliboardy package - NOT THAT RELIABLE due to less OS compatibility', async ({ page }) => {
  const installHeaderLocator = await page.locator('#install');
  const copyToClipboardButton = await page
  .locator('code', { hasText: 'npm install clipboard --save' }) // match <code> text
  .locator('..')                                                 // go to parent <pre>
  .locator('button:has(img.clippy[alt="Copy to clipboard"])');    // find the button with that <img>


  await page.goto(url);

  await expect(await page).toHaveTitle(expectedPageTitle);
  await expect(installHeaderLocator).toBeVisible();
  await copyToClipboardButton.click({force: true});

  // Read from system clipboard
  const text = await clipboard.read();
  await expect(text).toBe('npm install clipboard --save');
});