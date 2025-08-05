/* This can be achieved using projects

A project is logical group of tests running with the same configuration. We use projects so we can run 
tests on different browsers and devices. Projects are configured in the playwright.config.ts file

Sample configuration for running on different browsers and mobile devices emulations

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test against mobile viewports. 
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Test against branded browsers.
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },
  ],
});

*/

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