import { test, expect } from '@playwright/test';

test('Verify Broken links', async ({ page }) => {

  const url: string = 'https://practice-automation.com/broken-links/';
  const expectedPageTitle: string = 'Broken Links | Practice Automation';
  const pageTitleLocator = await page.locator('h1:has-text("Broken Links")');

  await page.goto(url);
  page.waitForLoadState('domcontentloaded'); /* Wait for the page to fully render DOM */
  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(pageTitleLocator).toBeVisible();

  const genericLinkLocator = await page.locator('a[href^="http"]').all();
for (const link of genericLinkLocator) {
  const extractedLink = await link.getAttribute('href');
  if (extractedLink?.length) {
    try {
      const response = await page.request.get(extractedLink, { timeout: 5000 });
      const status = response.status();
      if (status === 404) {
        console.log(`Broken link --> : ${extractedLink}`);
      }
      // expect.soft(status).not.toBe(404);
    } catch (error) {
      console.log(`Error accessing link: ${extractedLink} - ${error.message}`);
      // Optionally, treat timeouts as broken links
    }
  }
}
});