import { test, expect } from '@playwright/test';

/* We can use codegen to create authenticated session
   Else we can code it ourselves

   Steps to create preserving session:
   - Write async function loginWithSession() and use storageState() there
   - Add this in playwright.config.ts file under use {}
       // To store sessions created - This file is referred for new login with existing session 
       storageState: './preservedSession.json',
   - Run the .ts file first to generate the sessionJSON using command:
     yarn ts-node loginWithSession.ts
   - Now, in tests, automatically, this session file is referred

  The command I used to create session file and run the spec file simultaneously is:
  yarn ts-node loginWithSession.ts && yarn run playwright test tests/37.preservingSession.spec.ts

Calling loginWithSession() in a before hook does not help in Playwright because:
------------------------------------------------------------------------------

Playwright loads the storageState (session file) before any test hooks (beforeAll, beforeEach) 
or test code runs.
If the session file does not exist at startup, Playwright throws an error and does not run your hooks.
In Cypress, you can set cookies or local storage in a before hook because the browser 
is already running and the test context is available.

Best practice in Playwright:

Generate the session file before running your tests (using a separate setup script).
Then run your tests with the storageState option set in the config.
*/

// Apply storageState to all tests in this file
// test.use({ storageState: './preservedSession.json' });

test('Login-1', async ({ page }) => {

  const url: string = 'https://demoblaze.com/index.html';
  const logoutButtonLocator = page.locator('#logout2');

  await page.goto(url);
  await expect(logoutButtonLocator).toBeVisible();
});

test('Login-2', async ({ page }) => {

  const url: string = 'https://demoblaze.com/index.html';
  const logoutButtonLocator = page.locator('#logout2');

  await page.goto(url);
  await expect(logoutButtonLocator).toBeVisible();
});