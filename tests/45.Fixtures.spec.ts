 import { chromium, expect } from '@playwright/test';
 import { test } from '../myFixture'; /* Import the extended test */
 
 /* Test fixtures are used to establish the environment for each test, 
 giving the test everything it needs and nothing else. 
 Test fixtures are isolated between tests. With fixtures, 
 you can group tests based on their meaning, instead of their common setup.

                                        CONCEPT:
                                        -------
logArg(myObj);
LOG ->  {
        "name": "AD",
        "age": "11"
        } 



logArg({...myObj});
Spread creates another object and copies all primary keys of original object to this new one
LOG ->  {
        "name": "AD",
        "age": "11"
        } 


logArg({myObj});
this wraps obj argument inside another object
LOG -> {
        "myObj": {
                "name": "AD",
                "age": "11"
                }
        }


import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  // ...
});

The { page } argument tells Playwright Test to set up the page fixture and provide it to your test function.
Given the test above, Playwright Test will set up the page fixture before running the test, 
and tear it down after the test has finished. page fixture provides a Page object that is 
available to the test.

                                        BUILT IN FIXTURES
                                        -----------------

browserName:
- name of the browser that runs tests. Defaults to 'chromium'. 

Usage
    test('skip this test in Firefox', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Still working on it');
    // ...
    });

Type: "chromium" | "firefox" | "webkit"

browser:
- Browser instance is shared between all tests in the same worker - this makes testing efficient. 
- However, each test runs in an isolated BrowserContext and gets a fresh environment. 

Usage
    test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    // ...
    });

Type: Browser

context:
- Isolated BrowserContext instance, created for each test. 
- Since contexts are isolated between each other, every test gets a fresh environment, 
  even when multiple tests run in a single Browser for maximum efficiency.
- Default fixtures.page belongs to this context.

Usage
    test('example test', async ({ page, context }) => {
    await context.route('*external.com/*', route => route.abort());
    // ...
    });

Type: BrowserContext

page:
- Isolated Page instance, created for each test. 
- Pages are isolated between tests due to fixtures.context isolation.
- This is the most common fixture used in a test.

Usage
    test('basic test', async ({ page }) => {
    await page.goto('/signin');
    await page.getByLabel('User Name').fill('user');
    await page.getByLabel('Password').fill('password');
    await page.getByText('Sign in').click();
    // ...
    });

Type: Page

request:
- Isolated APIRequestContext instance for each test.

Usage
    test('basic test', async ({ request }) => {
    await request.post('/signin', {
        data: {
        username: 'user',
        password: 'password'
        }
    });
    // ...
    });

Type: APIRequestContext

 */
 
 test('Without Fixtures', async () => {
 
   const url: string = 'https://practice-automation.com/broken-links/';
   const expectedPageTitle: string = 'Broken Links | Practice Automation';

   /* These lines are added extra if we are not using fixtures */
   const browser = await chromium.launch({
    headless: false
   });
   const context = await browser.newContext();
   const page = await context.newPage();

   // we can directly use page fixture to avoid above 3 lines

   const pageTitleLocator = await page.locator('h1:has-text("Broken Links")');
 
   await page.goto(url);
   page.waitForLoadState('domcontentloaded'); /* Wait for the page to fully render DOM */
   await expect(page).toHaveTitle(expectedPageTitle);
   await expect(pageTitleLocator).toBeVisible();

   await browser.close(); /* Close the browser */
 });

 /* Advantages of using fixtures:
   ------------------------------
  
   - Fixtures encapsulate setup and teardown in the same place so it is easier to write. 
   - Fixtures are on-demand - you can define as many fixtures as you'd like, 
     and Playwright Test will setup only the ones needed by your test and nothing else.
   - Fixtures simplify grouping. You no longer need to wrap tests in describes that set up 
     their environment
 
 */

   test('My Own created fixture by extending test function', async ({page, mail, name}) => {
 
   const url: string = 'https://practice-automation.com/broken-links/';
   const expectedPageTitle: string = 'Broken Links | Practice Automation';

   const pageTitleLocator = await page.locator('h1:has-text("Broken Links")');
 
   /* Existing functionalities */
   await page.goto(url);
   page.waitForLoadState('domcontentloaded'); /* Wait for the page to fully render DOM */
   await expect(page).toHaveTitle(expectedPageTitle);
   await expect(pageTitleLocator).toBeVisible();

   /* Extended functionalities */
   await expect(mail).toBe('ad@example.com');
   await expect(name).toBe('AD');
 });