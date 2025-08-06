/* cy.visit()	    --> await page.goto(url)

    Query params in page.goto() -> include them directly in the url
    await page.goto(https://www.google.com/search?q=moon);

cy.url()        --> await page.url()

cy.location()	--> await page.evaluate(() => window.location)
cy.hash()	    --> await page.evaluate(() => window.location.hash)

cy.reload()	await page.reload()

cy.go('back')    -->	await page.goBack()
cy.go('forward') -->	await page.goForward() */

import { test, expect } from '@playwright/test';

test('Web navigations', async ({page}) => {
    const url1: string = 'https://reqres.in/api/users/2';
    const url2: string = 'https://reqres.in/api/users/3';
    const hashUrl: string = 'https://playwright.dev/docs/api/class-page#page-go-back';

    await page.goto(url1);
    await expect(await page.url()).toEqual(url1);

    /* Hard refresh (Ctrl+F5) is not directly supported by Playwright’s API.
    If you need a hard refresh (clear cache), you must:
    Create a new browser context, or Manually clear cache/storage before reloading. */
    await page.reload();
    await expect(await page.url()).toEqual(url1);

    await page.goto(url2);
    await page.goBack();
    await expect(await page.url()).toEqual(url1);

    await expect(await page.evaluate(() => window.location.href)).toEqual(url1);

    await page.goto(hashUrl);
    await expect(await page.evaluate(() => window.location.hash)).toEqual('#page-go-back');
})
