/*                                            Concept before
                                              --------------

    The process.env property is a global object in Node.js that stores environment variables. 
    These variables can be accessed by any application running in that environment, 
    not just Node.js applications. 
    When a Node.js application runs, it inherits the environment 
    variables from the operating system and can use them to dynamically configure the application, 
    such as database connections, API keys, or application modes (development or production).

    process.env variables are reset for each new Node.js process.

    When you run Playwright tests, each test run (or worker) starts a new Node.js process.
    Any changes you make to process.env during a test run do not persist to the next run.
    If you set environment variables in your terminal or via a .env file, 
    they are loaded fresh each time a new process starts.

                                    Ways to set environment variables
                                    ---------------------------------
    
                                    WAY-1: Passing through Command Line
    
    git bash
    USERNAME=Admin PASSWORD=admin123 yarn run playwright test --headed tests/28.EnvironmentVariables.spec.ts

    await usernameInput.fill(process.env.USERNAME!);            
    await page.fill('[name="password"]', process.env.PASSWORD!);


    Similarly, configuration file can also read environment variables passed through the command line.

    import { defineConfig } from '@playwright/test';

    export default defineConfig({
    use: {
        baseURL: process.env.STAGING === '1' ? 'http://staging.example.test/' : 'http://example.test/',
    }
    });

    in config file, we come across initialisations like = retries: process.env.CI ? 2 : 0,
    Tis an environment variable that is commonly set by Continuous Integration (CI) 
    systems (such as GitHub Actions, GitLab CI, Azure Pipelines, etc.) to indicate 
    that the code is running in a CI environment.
    In Node.js, you access it as process.env.CI.
    If you run your tests locally, process.env.CI is usually undefined (unless you set it yourself).
    In CI pipelines, it is typically set to 'true' or another truthy value. 

                                            WAY-2: .env file
    
    Create a **.env file and add variables in key-value format there
    Now, we need a dotenv package to access the variables stored in .env file

    dotenv package: Dotenv is a zero-dependency module that loads environment variables 
    from a .env file into process.env. */

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

test('Way-1: Command line', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    expect(await page.title()).toBe('OrangeHRM');

    const loginHeader = await page.getByText('Login').first();
    const usernameInput = await page.locator('[name="username"]');
    const passwordInput = await page.locator('[name="password"]');
    const loginButton = await page.locator('button[type="submit"]');

    expect(await loginHeader).toBeVisible();
    expect(await usernameInput).toBeVisible();
    expect(await passwordInput).toBeVisible();

    /* git bash
    USERNAME=Admin PASSWORD=admin123 yarn run playwright test --headed tests/28.EnvironmentVariables.spec.ts */
    await usernameInput.fill(process.env.USERNAME!);            
    await page.fill('[name="password"]', process.env.PASSWORD!);

    await page.waitForTimeout(3000);

    await loginButton.click();
});

test.only('Way-2: .env file', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    expect(await page.title()).toBe('OrangeHRM');

    const loginHeader = await page.getByText('Login').first();
    const usernameInput = await page.locator('[name="username"]');
    const passwordInput = await page.locator('[name="password"]');
    const loginButton = await page.locator('button[type="submit"]');

    expect(await loginHeader).toBeVisible();
    expect(await usernameInput).toBeVisible();
    expect(await passwordInput).toBeVisible();

    // Read from ".env" file.
    dotenv.config({ path: './ENV_VARS.env' });

    await usernameInput.fill(process.env.user_name!);            
    await page.fill('[name="password"]', process.env.pwd!);

    await page.waitForTimeout(3000);

    await loginButton.click();
});