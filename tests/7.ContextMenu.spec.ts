import { test, expect } from '@playwright/test';

test('Verify Context menu click', async ({ page }) => {

  const url: string = 'https://swisnl.github.io/jQuery-contextMenu/demo.html';
  const expectedPageTitle: string = 'jQuery contextMenu (2.x)';
  const contextMenuLocator = page.locator('.context-menu-one');
  const contextMenuItemLocator = (menu: string) =>  page.locator(`.context-menu-item span:has-text("${menu}")`);

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(contextMenuLocator).toBeVisible();

  await contextMenuLocator.click({button: 'right'});
  await contextMenuItemLocator('Edit').click();
});
