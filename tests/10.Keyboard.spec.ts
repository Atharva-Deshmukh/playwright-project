import { test, expect } from '@playwright/test';

test('Keyboard actions playwright - Copying text using keyboard', async ({ page }) => {

  const url: string = 'https://gotranscript.com/text-compare';
  const message: string = 'I am to be copied';
  const input1 = page.getByPlaceholder('Paste one version of the text here.');
  const input2 = page.getByPlaceholder('Paste another version of the text here.');

  await page.goto(url);

  await expect(input1).toBeVisible();
  await expect(input2).toBeVisible();

  await input1.fill(message);

  await page.keyboard.press('Control+A');
  await page.keyboard.press('Control+C');

  await input2.click();
  await page.keyboard.press('Control+V');

  /* To capture the text entered in that <textarea> element using Playwright, 
  you should use the input2.inputValue() method */
  await expect(input2.inputValue()).toBe(message);
});