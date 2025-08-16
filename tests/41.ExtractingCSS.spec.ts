import { test, expect } from '@playwright/test';

/* In Cypress, we often use .should('have.css', 'color', 'rgb(...)') or 
.invoke('css', 'color') directly, since Cypress exposes jQuery-style APIs.
In Playwright, there isn’t a direct equivalent */

test('Get existing CSS properties', async ({ page }) => {

  const url: string = 'https://www.automationexercise.com/';
  const pageTitle: string = "Automation Exercise";
  const imageLocator = page.getByAltText('Website for automation practice');
  const buttonLocator = page.locator('.apis_list .btn-success:has-text("APIs list for practice")')
                            .first();

  await page.goto(url); 
  await expect(page).toHaveTitle(pageTitle);
  await expect(imageLocator).toBeVisible();
  await expect(buttonLocator).toBeVisible();

  const cssComputed = await buttonLocator.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
    };
  });

    await expect(cssComputed).toEqual({
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(92, 184, 92)',
    });
});

test('Way-1: Directly expect for the required CSS properties', async ({ page }) => {

  const url: string = 'https://www.automationexercise.com/';
  const pageTitle: string = "Automation Exercise";
  const imageLocator = page.getByAltText('Website for automation practice');
  const buttonLocator = page.locator('.apis_list .btn-success:has-text("APIs list for practice")')
                            .first();

  await page.goto(url); 
  await expect(page).toHaveTitle(pageTitle);
  await expect(imageLocator).toBeVisible();
  await expect(buttonLocator).toBeVisible();

  await expect(buttonLocator).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(buttonLocator).toHaveCSS('background-color', 'rgb(92, 184, 92)');
});

test('Way-2: use evaluate()', async ({ page }) => {

  const url: string = 'https://www.automationexercise.com/';
  const pageTitle: string = "Automation Exercise";
  const imageLocator = page.getByAltText('Website for automation practice');
  const buttonLocator = page.locator('.apis_list .btn-success:has-text("APIs list for practice")')
                            .first();

  await page.goto(url); 
  await expect(page).toHaveTitle(pageTitle);
  await expect(imageLocator).toBeVisible();
  await expect(buttonLocator).toBeVisible();

  await buttonLocator.hover(); /* Hover to change the color */

  const cssComputed = await buttonLocator.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor,
    };
  });

    await expect(cssComputed).toEqual({
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(254, 152, 15)',
    });
});