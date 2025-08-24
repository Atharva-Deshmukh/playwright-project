/*

                                            TEST TIMEOUT
                                            ------------
Playwright Test enforces a timeout for each test, 30 seconds by default.

Time spent by the test function, fixture setups, and beforeEach hooks is 
included in the test timeout. 

------------------------------------------------
Set test timeout in the config

export default defineConfig({
    timeout: 120_000,
});

------------------------------------------------

Set timeout for a single test

test('very slow test', async ({ page }) => {
  test.setTimeout(120_000);
  // ...
});

-----------------------------------------------

Change timeout from a beforeEach hook

test.beforeEach(async ({ page }, testInfo) => {
  // Extend timeout for all tests running this hook by 30 seconds.
  testInfo.setTimeout(testInfo.timeout + 30_000);
});


                                            EXPECT TIMEOUT
                                            --------------

Auto-retrying assertions like expect(locator).toHaveText() have a separate timeout, 5 seconds by default. 
Assertion timeout is unrelated to the test timeout. 

Set expect timeout in the config
--------------------------------

export default defineConfig({
    expect: {
        timeout: 10_000,
    },
});


--------------------------------
Specify expect timeout for a single assertion

test('example', async ({ page }) => {
  await expect(locator).toHaveText('hello', { timeout: 10_000 });
});

                                            GLOBAL TIMEOUT
                                            --------------

Playwright Test supports a timeout for the whole test run. This prevents excess resource 
usage when everything went wrong. There is no default global timeout, but you can set a 
reasonable one in the config, for example one hour.

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTimeout: 3_600_000,
});

                                        ACTION AND NAVIGATION TIMEOUT
                                        -----------------------------

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },
})

Set timeout for a single action
------------------------------

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev', { timeout: 30000 });
  await page.getByText('Get Started').click({ timeout: 10000 });
});


                                        FIXTURE TIMEOUT
                                        ---------------

By default, fixture shares timeout with the test. However, 
for slow fixtures, especially worker-scoped ones, it is convenient to have a separate timeout. 
This way you can keep the overall test timeout small, and give the slow fixture more time.

example.spec.ts

import { test as base, expect } from '@playwright/test';

const test = base.extend<{ slowFixture: string }>({
  slowFixture: [async ({}, use) => {
    // ... perform a slow operation ...
    await use('hello');
  }, { timeout: 60_000 }]
});

test('example test', async ({ slowFixture }) => {
  // ...
}); */