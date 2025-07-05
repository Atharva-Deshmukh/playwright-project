import { test, expect, chromium } from '@playwright/test';

/* In Playwright, page and window are the same thing.
   To handle multiple pages/windows, you need to create new page instances.
   We can create new page using browserContext

   Create a new browser >> Create a new browser context >> Create multiple pages in that context.

   playwright by default gives us page fixture which we normally use in our tests.
   But, we won't use use this default page sincee we are creating our own new page.
*/

test('Page and browser context concepts', async () => {

    /* We can create different browser instances by importing different browser modules */
    const browserInstance = await chromium.launch();

    /* Create a new browser context */
    const browserContext = await browserInstance.newContext();

    const page1 = await browserContext.newPage();
    const page2 = await browserContext.newPage();

    const allPages = await browserContext.pages();
    expect(allPages.length).toBe(2); // Verify that we have 2 pages

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    expect(await page1.title()).toBe('OrangeHRM');

    await page2.goto('https://www.orangehrm.com/');
    expect(await page2.title()).toBe('Human Resources Management Software | OrangeHRM HR Software');
});

test.only('Handling new page/tab', async () => {

    /* We can create different browser instances by importing different browser modules */
    const browserInstance = await chromium.launch();

    /* Create a new browser context */
    const browserContext = await browserInstance.newContext();

    const page1 = await browserContext.newPage();

    const newTabLink = await page1.getByText('OrangeHRM, Inc');

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    expect(await page1.title()).toBe('OrangeHRM');
    
    expect(newTabLink).toBeVisible();

    /* The 'page' event can be used to handle new pages opened by target="_blank" links. 
       Setting up listener for page event before clicking the new tab link. */
    const pagePromise = browserContext.waitForEvent('page');

    expect(await page1.locator('.orangehrm-login-logo')).toBeVisible();

    await newTabLink.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();   /* Wait for the new page to fully load */

    expect(await newPage).toHaveTitle('Human Resources Management Software | OrangeHRM HR Software');
    expect(await newPage.getByPlaceholder('Enter your email address here')).toBeVisible();
});

 