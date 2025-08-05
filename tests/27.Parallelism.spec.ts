/* In cypress, by default, spec files serially (one after another) when you use cypress run.
Parallelization is not built-in for local runs with the open source version.
Parallelization is available in Cypress Cloud, which is a paid service. 

Playwright Test runs tests in parallel. In order to achieve that, 
it runs several worker processes that run at the same time. 

By default, test files are run in parallel. 
Tests in a single file are run in order, in the same worker process.

                                            Worker processes
                                            ----------------

All tests run in worker processes. These processes are OS processes, 
running independently, orchestrated by the test runner. 
All workers have identical environments and each starts its own browser.

You can't communicate between the workers. 
Playwright Test reuses a single worker as much as it can to make testing faster, 
so multiple test files are usually run in a single worker one after another.

Workers are always shutdown after a test failure to guarantee pristine 
environment for following tests.

                                        How to limit workers?
                                        ---------------------

Way-1: CLI --> npx playwright test --workers 4

Way-2: config file
    export default defineConfig({
    // Limit the number of workers on CI, use default locally
    workers: process.env.CI ? 2 : undefined,
    });

                                    How to Disable parallelism?
                                    --------------------------

Way-1: CLI --> npx playwright test --workers=1
Way-2: config file -->   workers: 1,

                                How to Parallelize tests in a single file
                                -----------------------------------------

By default, tests in a single file are run in order.

Way-1: set the individual mode
import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('runs in parallel 1', async ({ page }) => { ... });
test('runs in parallel 2', async ({ page }) => { ... });

Way-2: 
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
});

*/