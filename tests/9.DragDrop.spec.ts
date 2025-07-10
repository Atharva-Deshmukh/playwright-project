import { test, expect } from '@playwright/test';

test('Way-1: Using built in method', async ({ page }) => {

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';

  const itemToBeDragged = page.locator('div#draggable');
  const targetItem = page.locator('div#droppable');
  const dragDropSuccess = page.locator('div#droppable p:has-text("Dropped!")');

  await page.goto(url);
  await expect(page).toHaveTitle(expectedPageTitle);

  await expect(itemToBeDragged).toBeVisible();
  await expect(targetItem).toBeVisible();

  await itemToBeDragged.dragTo(targetItem, { /* other options */
    sourcePosition: {x: 10, y: 10}, 
    targetPosition: {x: 10, y: 10},
    timeout: 2000
  }); 

  await itemToBeDragged.dragTo(targetItem);   /* By default, drags to center of target */

  await expect(dragDropSuccess).toBeVisible();
});

/* Here, we need to keep track of many events ourselves */
test('Way-2: Manually', async ({ page }) => {

  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';

  const itemToBeDragged = page.locator('div#draggable');
  const targetItem = page.locator('div#droppable');
  const dragDropSuccess = page.locator('div#droppable p:has-text("Dropped!")');

  await page.goto(url);
  await expect(page).toHaveTitle(expectedPageTitle);

  await expect(itemToBeDragged).toBeVisible();
  await expect(targetItem).toBeVisible();

  await itemToBeDragged.hover();
  await page.mouse.down();
  await targetItem.hover();
  await page.mouse.up();

  await expect(dragDropSuccess).toBeVisible();
});
