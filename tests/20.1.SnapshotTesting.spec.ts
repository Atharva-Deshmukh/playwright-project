import { test, expect } from '@playwright/test';

test.describe('toHaveScreenshot() expectation', () => {
        /* 
        This creates a screenshot first if there is no SS and then matches pixel by pixel
        Add this in config file
          expect: {
            toHaveScreenshot: {
            pathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}.png'
            }

        Since, playwright is now set env-wise, so run commands in git bash now
        yarn run playwright test tests/20.1.SnapshotTesting.spec.ts

        On running this command, the baseline SS gets added since initially, test fails
        due to no SS available to compare
        */

    test('SS_PAGE_FIXTURE', async ({ page }) => {
        const url: string = 'https://practice-automation.com/tables/';
        const expectedPageTitle: string = 'Tables | Practice Automation';
        const headerLocator = await page.locator('.wp-block-heading:has-text("Simple Table")');
    
        await page.goto(url);
        await expect(page).toHaveTitle(expectedPageTitle);
        await expect(headerLocator).toBeVisible();

        /* SS will be saved with this name */
        await expect(page).toHaveScreenshot('SS_PAGE_FIXTURE');
    });

    test('SS_LOCATOR', async ({ page }) => {
        const url: string = 'https://practice-automation.com/tables/';
        const expectedPageTitle: string = 'Tables | Practice Automation';
        const headerLocator = await page.locator('.wp-block-heading:has-text("Simple Table")');
    
        await page.goto(url);
        await expect(page).toHaveTitle(expectedPageTitle);
        await expect(headerLocator).toBeVisible();

        /* SS will be saved with this name */
        await expect(await page.locator('td:has-text("Oranges")')).toHaveScreenshot('SS_PAGE_FIXTURE');
    });

    test('SS_FULLPAGE', async ({ page }) => {
        const url: string = 'https://practice-automation.com/tables/';
        const expectedPageTitle: string = 'Tables | Practice Automation';
        const headerLocator = await page.locator('.wp-block-heading:has-text("Simple Table")');
    
        await page.goto(url);
        await expect(page).toHaveTitle(expectedPageTitle);
        await expect(headerLocator).toBeVisible();

        /* SS will be saved with this name */
        await expect(page).toHaveScreenshot('SS_FULL_PAGE', {
            fullPage: true
        });
    });

    /* Mask the particular element(s) in the page, means, even if values change there
       Comparision ignores that particular element
       Its usefull when we are more concerned about look-n-feel of the page rather than exact matches    
    */
    test('SS_MASKED', async ({ page }) => {
        const url: string = 'https://practice-automation.com/tables/';
        const expectedPageTitle: string = 'Tables | Practice Automation';
        const headerLocator = await page.locator('.wp-block-heading:has-text("Simple Table")');
    
        await page.goto(url);
        await expect(page).toHaveTitle(expectedPageTitle);
        await expect(headerLocator).toBeVisible();

        /* SS will be saved with this name */
        await expect(page).toHaveScreenshot('SS_FULL_PAGE', {
            mask: [
                await page.locator('td:has-text("Oranges")'), 
                await page.locator('td:has-text("Marbles")')
            ]
        });
    });
});

test.describe('toMatchSnapshot() expectation', () => {
        /* 
        This is also like toHaveScreenshot(), but not preferred
        */
});

test.describe('toMatchAriaSnapshot() expectation', () => {
        /* 
        ARIA -> Accessible Rich Internet Applications 
        define ways to make web content and web applications (especially those developed with JavaScript) 
        more accessible to people with disabilities.

        Basically, they improve accessibility

        Ways to improve accessibility:
        - ARIA
        - Keyboard actions, like pressing tab should navigate to other cards in site, 
          reducing dependency on mouse
        - Color contrast should be followed to make each and every element fairly visible to everyone
        - In many countries, there are regulations that make the accessibility mandatory

        Where can we find Aria
        - go to say, chrome >> inspect search bar >> see Accessibility tab 
          We will get ARIA tree there, this 
          Looks something like this => - heading "title"

            await expect(page.locator('body')).toMatchAriaSnapshot(`- heading "title"`);

            toMatchAriaSnapshot() Matches this ARIA tree and in this way, we can test accessibility
        */
});
