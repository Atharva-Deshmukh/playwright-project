import { test, expect, chromium } from '@playwright/test';

/* We can directly use page fixture when we don't need to create a new page instance, 
   No login or proxy settings is required
   
   But when we do require to setup authentication, proxies...
   We use browserContext and then create a page from it

   In single browser tests, like cypress, we cannot simultaneously login with multiple users and test
   we need to logout first and then sign in with the next user.

   But in playwright, we can create multiple browser contexts and simulate multiple users without logging out. */

test('Browser context for logging in with muliple users simultaneoulsy', async ({ page }) => {

  const url: string = 'https://practice-automation.com/form-fields/';

  /* Browser, of which separate browser instances will be created */
  const browser = await chromium.launch({
    headless: false,
  });

  const browser_context_1 = await browser.newContext();
  const page_1 = await browser_context_1.newPage();

  const browser_context_2 = await browser.newContext();
  const page_2 = await browser_context_2.newPage();

  await page_1.goto(url);
  /* Assertions here */

  await page_2.goto(url);
  /* Assertions here */

  await browser_context_1.close(); /* Close the first context */
  await browser_context_2.close(); /* Close the second context */

  await browser.close(); /* Close the browser */

  // pause the page indefinitely
  await new Promise(() => {})
});