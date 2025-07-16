import { test, expect } from '@playwright/test';

/* Approach:
- Here we don't have something like invoke('val', 10).trigger('change') in Playwright.
- We will use await mouse.move(x, y); to perform real user like sliding action.
- But we don't know the exact coordinates of the slider
- We will use boundingBox() to get x, y coordinates of the slider element + width and height.
- These x and y are wrt top left of the viewport and that too, these are top-left coordinates of slider.
- (x + width/2, y + height/2)  => center of slider */

test('Handling sliders', async ({ page }) => {

  const url: string = 'https://practice-automation.com/slider/';
  const logoHeader = page.getByAltText('automateNow Logo');
  const sliderLocator = page.locator('input#slideMe');
  const sliderParentLocator = page.locator('.coolslider');
  const valueLocator = page.locator('span#value');

  await page.goto(url);
  await expect(logoHeader).toBeVisible();
  await expect(sliderLocator).toBeVisible();

  /* Initially, slider is at 25 */
  await expect(valueLocator).toHaveText('25');

  /* Bring the mouse to the center of the slider element */
  const cords = await sliderLocator.boundingBox();
  await page.mouse.move(cords!.x + cords!.width / 2, cords!.y + cords!.height / 2);

  /* Getting slider's width and height through its parent */
  const sliderParentBox = await sliderParentLocator.boundingBox();
  const sliderWidth = sliderParentBox!.width;

  /* Move the slider to 60%  of its width */
  await page.mouse.down();
  await page.mouse.move(cords!.x + sliderWidth * 0.6, cords!.y + cords!.height / 2);
  await page.mouse.up();

  await expect(valueLocator).toHaveText('60');
});