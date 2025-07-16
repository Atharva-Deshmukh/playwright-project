import { test, expect } from '@playwright/test';

// Use a regular (non-async) function for test.describe callback
test.describe('test.skip() marks the test as irrelevant. Playwright does not run such a test.', () => {

  /* Way-1: Conditionally skip all tests in this describe block if not Chromium */
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  /* Way-2 */
  test('test', async ({ page, browserName }) => {
    if(browserName !== 'chromium') {
        test.skip();
    }
  });

});

test.describe('test.fail() marks the test as failing. Playwright rus this test and ensure it does indeed fail.', () => {
/* If the test does not fail, Playwright will complain. */

    test.fail('This test is expected to fail', async ({ page }) => {
        await expect(true).toBeFalsy();
    });

});

test.describe('test.fixme() marks the test as failing. Playwright wont run this test, unlike test.fail()', () => {
/* Use fixme when running the test is slow or crashes. */

    test.fixme('This test is expected to fail', async ({ page }) => {
        await expect(true).toBeFalsy();
    });

});

test.describe('test.slow() marks the test as slow and triples the test timeout.', () => {

    /* You should call test.slow() inside the test callback, not as a wrapper, 
    and not pass a string as the first argument. */
    test('This test is expected to be slow', async ({ page }) => {
        test.slow();
        await expect(true).toBeFalsy();
    });

});