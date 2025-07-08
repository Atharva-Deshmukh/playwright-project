import { test, expect } from '@playwright/test';


test('Verify Hovering', async ({ page }) => {

  const url: string = 'https://practice-automation.com/hover/';
  const expectedPageTitle: string = 'Hover | Practice Automation';
  const hoverLocator = await page.locator('#mouse_over');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(hoverLocator).toBeVisible();

  await hoverLocator.hover();
  await expect(hoverLocator).toHaveText("You did it!");
});
