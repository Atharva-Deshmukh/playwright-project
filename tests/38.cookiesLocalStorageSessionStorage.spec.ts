import { test, expect } from '@playwright/test';

test('Cookies', async ({ page }) => {

    const url: string = 'https://rahulshettyacademy.com/AutomationPractice/';
    const expectedPageTitle: string = 'Practice Page';
    const headerLocator = page.locator('h1:has-text("Practice Page")');

    await page.goto(url);

    /* If no URLs are specified, this method returns all cookies. 
    If URLs are specified, only cookies that affect those URLs are returned. */
    const cookies = await page.context().cookies(url);
    console.log('COOKIES -> ', cookies);

    /*
    COOKIES ->  [
        {
            name: 'XSRF-TOKEN',
            value: 'eyJpdiI6IkgyaG4vMncyWmFyVXozQ2MzTDdkalE9PSIsInZhbHVlIjoiaVZPOWlIM3ZOZEtjRkNMR2g2clBURFBrYmpCaFBpb0VEUDRrWVV2T0JEaGpaV2VjNVRCQVdmaDkzRjUweWhDelV4cmFndHdMcGlwckVWbytxekJaN0lPOUF5am8xcDNkcUYyMUx5TGFxcVE1aUtMdEhLczBCbkd2UWgxMENQamUiLCJtYWMiOiI3OWIzZmY4ODMyYmViOTEzZjhjOTU4YjZlMTkxNTNhMzJmMjc5Y2JmNzI3ZGRhODIwOWU5NDZmM2MzOWQ0NmQ4IiwidGFnIjoiIn0%3D', 
            domain: 'rahulshettyacademy.com',
            path: '/',
            expires: 1755271793.304532,
            httpOnly: false,
            secure: false,
            sameSite: 'Lax'
        },
        {
            name: 'rahulshettyacademy_session',
            value: 'eyJpdiI6InpNdWRlaGNoSE9ucEhRVjc1MW5leFE9PSIsInZhbHVlIjoia1B2QXBkSWpyY0ZlQjVYNkl3aTZPVEc2M1Y5UVREZGFPQTdwdXpWM2l6U3QxcUxDaXo5NklJak9GMHhyQzFERVFzOFBHWEZvbUQxU0RaWDlFaXp0b1ZyS2JyRVBZVnloWG9wc01MRlUwRkFSUlF1T2hDRERob1JvbkNwMldOcSsiLCJtYWMiOiI1M2YxM2RiMjhiOTQ4ZTI4ZDNjZDkwNWNiNTgyZTMyMDIxM2NhYjQ0OWE2NmQ2NjU2YjNjNzdjZmJjMzM5ZTU4IiwidGFnIjoiIn0%3D', 
            domain: 'rahulshettyacademy.com',
            path: '/',
            expires: 1755271793.305035,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        }
        ]
    */

    // You can add assertions for specific cookies if needed
    expect(cookies.length).toBeGreaterThan(0);

    await expect(page).toHaveTitle(expectedPageTitle);
    await expect(headerLocator).toBeVisible();


    /* Get specific cookie */
    const xsrfCookie = cookies.find(cookie => cookie.name === 'XSRF-TOKEN');

    if (xsrfCookie) {
        console.log('XSRF-TOKEN value:', xsrfCookie.value);
        expect(xsrfCookie.value).toBeDefined();
    } else {
        throw new Error('XSRF-TOKEN cookie not found');
    }

    /* Add a new cookie and verify */
    await page.context().addCookies([{
        name: 'AD_COOKIE',
        value: 'AD_COOKIE_VALUE',
        domain: 'rahulshettyacademy.com',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
        expires: Math.floor(Date.now() / 1000) + 3600 // expires in 1 hour
    }]);

    // Verify the new cookie was added
    const updatedCookies = await page.context().cookies(url);
    const testCookie = updatedCookies.find(cookie => cookie.name === 'AD_COOKIE');
    expect(testCookie).toBeDefined();
    expect(testCookie?.value).toBe('AD_COOKIE_VALUE');

    /* Delete the added cookie */
    await page.context().clearCookies();
    const cookiesAfterDelete = await page.context().cookies(url);
    const deletedCookie = cookiesAfterDelete.find(cookie => cookie.name === 'AD_COOKIE');
    expect(deletedCookie).toBeUndefined();
});