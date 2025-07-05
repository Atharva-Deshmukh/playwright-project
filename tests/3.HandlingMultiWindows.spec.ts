import { test, expect, chromium } from '@playwright/test';

/* In Playwright, page and window are the same thing.
   To handle multiple pages/windows, you need to create new page instances.
   We can create new page using browserContext

   Create a new browser >> Create a new browser context >> Create multiple pages in that context.

   playwright by default gives us page fixture which we normally use in our tests.
   But, we won't use use this default page sincee we are creating our own new page.
*/

test('Handle multiple windows/pages', async () => {

    /* We can create different browser instances by importing different browser modules */
    const browserInstance = await chromium.launch();

    /* Create a new browser context */
    const browserContext = await browserInstance.newContext();

    /* Create new pages with this browserContext 
       Both these pages are independent although same browserContext is used to create them. */
    const page1 = await browserContext.newPage();
    const page2 = await browserContext.newPage();

    const allPages = await browserContext.pages();
    expect(allPages.length).toBe(2); // Verify that we have 2 pages

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    expect(await page1.title()).toBe('OrangeHRM');

    await page2.goto('https://www.orangehrm.com/');
    expect(await page2.title()).toBe('Human Resources Management Software | OrangeHRM HR Software');
});

