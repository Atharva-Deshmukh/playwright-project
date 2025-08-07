import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Read from ".env" file.
dotenv.config({ path: `./ENV_FILES/${process.env.ENV}.env` });

const env_choosen: string = process.env.ENV!;
let projectObj: any;

switch (env_choosen) {
  case 'DEV':
    projectObj = {
      name: 'dev_project',
      use: {
        baseUrl: process.env.baseUrl,
        user_name: process.env.user_name,
        user_pwd: process.env.user_pwd,
        cust_var: process.env.cust_var,
        ...devices['Desktop Chrome']
      },

    }
    break;

  case 'PROD':
    projectObj = {
      name: 'prod_project',
      use: {
        baseUrl: process.env.baseUrl,
        user_name: process.env.user_name,
        user_pwd: process.env.user_pwd,
        cust_var: process.env.cust_var,
        ...devices['Desktop Chrome']
      },

    }
    break;

  default:
    projectObj = {
      name: 'chromium',
      use: { 
        baseUrl: 'DEFAULT_URL',
        user_name: 'DEFAULT_USERNAME',
        user_pwd: 'DEFAULT_PASSWORD',
        cust_var: 'DEFAULT_CUST_VAR',
        ...devices['Desktop Chrome'] 
      },
    }
    break;
}

export default defineConfig({

  /* Spec pattern in playwright */
  testDir: './tests', //specify the directory where your test files are located
  testMatch: '**/*.spec.ts', // Only files ending with .spec.ts will be considered as test files

  /* Run tests in files in parallel - Default*/
  // fullyParallel: true,
  fullyParallel: false, // Serially execute tests
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 1, 
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'on-failure' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    // Collect trace for every test (enables time travel in UI)
    trace: 'on',
    colorScheme: 'dark', /* Dark mode */
    video: 'off',
  },

  /* Env-wise project {} */

  /* Configure projects for major browsers */
  projects: [projectObj]
});
