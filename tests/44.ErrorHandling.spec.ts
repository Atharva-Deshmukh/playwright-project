import { test, expect } from '@playwright/test';

/* For API errors in cypress, we handle

    cy.request({
    url: '/api/data',
    failOnStatusCode: false   // prevents Cypress from failing on 4xx/5xx
    });

    By default, Playwright does not fail on non-2xx status codes — it always returns a response object.
    So you don’t even need failOnStatusCode: false.


    test('request without failing on status', async ({ request }) => {
    const response = await request.get('/api/data');   // no auto-fail on 404/500
    console.log('Status:', response.status());

    // You decide how to handle
    expect([200, 400, 404]).toContain(response.status());
    });

*/

test('Catching Console errors', async ({ page }) => {

  const url: string = 'https://practice-automation.com/';
  const expectedPageTitle: string = 'Learn and Practice Automation | automateNow';
  const pageTitleLocator = await page.locator('h1:has-text("Welcome to your software automation practice website!")');

  /* Catching console errors */
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('CONSOLE_ERROR -> ', msg.text());
    }
  });

  await page.goto(url);
  page.waitForLoadState('domcontentloaded'); /* Wait for the page to fully render DOM */
  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(pageTitleLocator).toBeVisible();
});

/*
Use try/catch for navigation/network errors.
Use page.on('pageerror') for page JavaScript errors.
*/

test('Normal Try Catch', async ({ page }) => {

  try {
    await page.goto('http://localhos');
  } catch (err) {
    console.error('NAVIGATION_ERROR -> ', err.message);
  }
});

/* page.on('pageerror') will not catch Playwright locator errors like “locator not found”.
   pageerror is only for uncaught JavaScript errors inside the browser/page context 
   (e.g., ReferenceError, TypeError in the app code).

It listens for uncaught JavaScript exceptions thrown in the browser page context.
That means runtime errors in the app code, not Playwright test code and not console.error. */
test('pageerror demo', async ({ page }) => {
  page.on('pageerror', err => {
    console.log('PAGE ERROR ->', err.message);
  });

  await page.setContent(`
    <script>
      setTimeout(() => { throw new Error("App crashed!"); }, 100);
    </script>
  `);
  await page.waitForTimeout(500); 
});

test('Catching request errors', async ({ page }) => {

  page.on('requestfailed', request => {
    console.log(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
  });

    // This will trigger a requestfailed event
  await page.goto('https://nonexistent.example.com', { timeout: 5000 }).catch(() => {});

  /* page.request is a Playwright APIRequestContext (for direct API testing).

It is not tied to the browser page and therefore does not emit requestfailed, 
requestfinished, or request events.
Those events (page.on('requestfailed')) only work when the page itself is making 
requests (like await page.goto() or resources loaded by the page).
  
await page.request.get(url); */
});

/*
| Feature                   | `pageerror`                                | `weberror`                                        |
| ------------------------- | ------------------------------------------ | ------------------------------------------------- |
| **Scope**                 | One `page` only                            | Entire `browserContext` (all tabs/pages)          |
| **Use case**              | Attach if you only care about that page    | Attach once to catch errors across multiple pages |
| **Event payload**         | `Error` object                             | `WebError` object (wrapping the `Error`)          |
| **Equivalent in Cypress** | `cy.on('uncaught:exception')` but per page | More like a **global uncaught exception hook**    |

*/

test('weberror demo', async ({ context, page }) => {
  context.on('weberror', webError => {
    console.log('WEB ERROR ->', webError.error());
  });

  await page.setContent(`
    <script>
      throw new Error("Boom from CONTEXT!");
    </script>
  `);
});
