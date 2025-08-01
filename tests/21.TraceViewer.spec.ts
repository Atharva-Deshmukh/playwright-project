import { test, expect } from '@playwright/test';

/* - Allows us to record all the test executions
   - Allows us to time travel in both foreward and backward directions 
   - Shows call logs
   - Shows network logs
   - Shows screenshots (before and after for each step)

   - Trace zip is stored in playwright-report/data/<traceFileName>.zip

   How to configure?

    - In playwright.config.ts
     use: {
      trace: 'on',
     },

     Options available:
     
     Available options to record a trace:
    - 'on-first-retry' - Record a trace only when retrying a test for the first time.
    - 'on-all-retries' - Record traces for all test retries.
    - 'off' - Do not record a trace.
    - 'on' - Record a trace for each test. (not recommended as it's performance heavy)
    - 'retain-on-failure' - Record a trace for each test, but remove it from successful test runs.

    Its stored in traces.zip file in the test results directory.

    How to open the trace file?
    - Use the command: yarn run playwright show-trace <path-to-trace-file>
    - OR simply run the test and then run yarn run playwright show-report
      in the HTML report, we already have trace file attached */

test('Verify Select', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';
  const expectedPageTitle: string = 'Form Fields | Practice Automation';
  const selectLocator = page.locator('#automation');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(selectLocator).toBeVisible();

  // Single selection matching the value or label
  await selectLocator.scrollIntoViewIfNeeded();    /* For scrolling */
  await selectLocator.selectOption('Yes');

  // Single selection matching the label
  await selectLocator.scrollIntoViewIfNeeded();
  await selectLocator.selectOption({ label: 'No' });

  // Multiple selected items
  await selectLocator.scrollIntoViewIfNeeded();
  await selectLocator.selectOption(['Undecided']);
});
