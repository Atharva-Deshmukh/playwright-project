import { test, expect } from '@playwright/test';

/* Just like cypress, playwright do not retry failed tests by default.

After retry is configured, playwright will retry the failed test and the tests after it

Playwright supports test retries. When enabled, failing tests will be retried multiple 
times until they pass, or until the maximum number of retries is reached. By default failing 
tests are not retried.

Without retry

    beforeAll hook runs
    first good passes
    second flaky fails
    afterAll hook runs
    Worker process #2 starts
    beforeAll hook runs again
    third good passes
    afterAll hook runs

With retry

    beforeAll hook runs
    first good passes
    second flaky fails
    afterAll hook runs
    Worker process #2 starts
    beforeAll hook runs again
    second flaky is retried and passes
    third good passes
    afterAll hook runs */

test.describe('Retries', () => {
    test('test-1', async ({ page }) => {
        await expect(true).toBeTruthy();
    });

    test('test-2', async ({ page }, testInfo) => {
        console.log(`Test retry count: ${testInfo.retry}`);
        await expect(false).toBeTruthy();
    });

    test('test-3', async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});
