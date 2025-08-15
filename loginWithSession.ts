import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { expect } from '@playwright/test';


async function loginWithSession() {

    /* We could directly use page fixture, since it already has newPage()
       But, sometimes, before creating new page, we need to set cookies... */

    const browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    /* page.context() returns the same context object you stored in the variable context. */

    /* Login part */
    await page.goto('https://demoblaze.com/index.html');
    await expect(await page.locator('#nava')).toBeVisible({timeout: 5000});
    await expect(await page.locator('#login2')).toBeVisible({timeout: 5000});
    await page.locator('#login2').click();
    await page.fill('#loginusername', 'test');
    await page.fill('#loginpassword', 'test');
    await page.click('.btn-primary:has-text("Log in")');

    // Wait for logout button to be visible (login successful)
    await expect(page.locator('#logout2')).toBeVisible({ timeout: 10000 });

    /* Save the state of the web page */
    await page.context().storageState({ path: './preservedSession.json' });

    /* This line too does the same thing as above line */
    // await context.storageState({ path: './preservedSession.json' });

    await browser.close();
}

/* Immediately invoke this function here itself */
(async () => {
  await loginWithSession();
})();

export { loginWithSession };