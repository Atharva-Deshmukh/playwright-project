import { test, expect } from '@playwright/test';
import sinon from 'sinon';

// /* Glob pattern concepts:
// ----------------------------

// - *  → matches any characters except '/'
// - ** → matches any characters including '/'
// - ?  → matches only '?'
//        (use * to match any character)
// - {a,b} → matches any from a comma-separated list
// - \  → escapes special characters
//         (use \\ to escape a backslash)

// Examples:
// - https://example.com/*.js
//       matches /file.js, not /path/file.js
// - https://example.com/?page=1
//       matches only that exact URL
// - **/*.js
//       matches /file.js and /path/file.js
// - **/*.{png,jpg,jpeg}
//       matches all PNG, JPG, JPEG files
// */


test('Spying through Events', async ({ page }) => {
  const url: string = 'https://practice-automation.com/';
  const fileUploadLocator = await page.locator('a:has-text("File Upload")');
  const uploadButtonLocator = await page.locator('#upload-btn');

  await page.goto(url);
  await expect(fileUploadLocator).toBeVisible();
  await fileUploadLocator.click();
  await expect(uploadButtonLocator).toBeVisible();

  await page.reload();

  page.on('request', (req) => {
    console.log('REQUEST -> ', req.url());

    /* Other useful methods */
    const method = req.method();
    const header = req.headers();
    const response = req.response();
  });

  /* Time taken to finish the request */
  const requestFinishedPromise = page.waitForEvent('requestfinished');
  await page.goto('https://practice-automation.com/');
  const request = await requestFinishedPromise;
  console.log('TIMING -> ', request.timing().responseEnd - request.timing().responseStart);

  /* We similarly have page.on('response', (resp) => {}) object */
});

// import sinon from 'sinon';
test('Spying Native objects', async ({ page }) => {
  const myObj = {
    myFunc: (a: number, b: number) => a + b
  };

  const spy = sinon.spy(myObj, 'myFunc');

  // Expose the Node-side function to the browser
  // The method adds a function called name on the window object of every frame in the page.
  await page.exposeFunction('myFunc', myObj.myFunc);

  const resp = await page.evaluate(async () => {
    // Call the Node-side exposed function
    return await (window as any).myFunc(2, 3);
  });

  expect(resp).toBe(5);
  expect(spy.called).toBeTruthy();
  expect(spy.callCount).toBe(1);
  expect(spy.calledOnceWithExactly(2, 3)).toBeTruthy();

  spy.restore();
});

/*                  If you are navigating to another frame, then use this
--------------------------------------------------------------------------------------------
page.addInitScript() runs the injected script only when a new document is created in a frame.
If you never navigated or reloaded the page after calling addInitScript, 
so the current main frame never executed the init script — window.myObj will be 
therefore undefined when page.evaluate() runs.

test.only('stub a Function and return a response', async ({ page }) => {

  // Add script that will run at document start for newly created frames
  await page.addInitScript(() => {
    (window as any).myObj = {
      myFunc: (a, b) => {
        // browser-context code — keep it simple
        return 999;
      }
    };
  });

  // Navigate so the init script is executed in the new document
  await page.goto('https://example.com');

  const resp = await page.evaluate(() => (window as any).myObj.myFunc(2, 3));
  expect(resp).toBe(999);
}); */

test('Stub directly in current frame, no need of navigation', async ({ page }) => {
  const myObj = {
    myFunc: (a: number, b: number) => a + b
  };

  // Create sinon stub in Node context
  const stub = sinon.stub(myObj, 'myFunc').returns(999);

  // Expose stubbed function to browser
  await page.exposeFunction('myFunc', (a: number, b: number) => {
    return stub(a, b); // This is the sinon stub being called
  });

  // Inside the page, attach an object that calls the exposed function
  await page.evaluate(() => {
    (window as any).myObj = {
      myFunc: (a: number, b: number) => (window as any).myFunc(a, b)
    };
  });

  // Call inside browser
  const resp = await page.evaluate(() => (window as any).myObj.myFunc(2, 3));

  // Assertions
  expect(resp).toBe(999);
  expect(stub.calledOnceWithExactly(2, 3)).toBeTruthy();

  stub.restore();
});

test('wait for XHR workaround', async ({ page }) => {
  const url: string = 'https://practice-automation.com/';
  const expectedPageTitle: string = 'Learn and Practice Automation | automateNow';
  const spinnerButtonLocator = page.locator('a:has-text("Spinners")');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(spinnerButtonLocator).toBeVisible();
  await spinnerButtonLocator.click();

  // wait for XHR request
  const responsePromise = page.waitForResponse(/sodar/);
  const response = await responsePromise;
  await expect(await response.ok()).toBeTruthy();
});

test('Aborting selective requests', async ({ page }) => {
  /*
  test.beforeEach(async ({ context }) => {

    // Block any css requests for each test in this file.
    await context.route(/.css$/, route => route.abort());

  });

  test('loads page without css', async ({ page }) => {
    await page.goto('https://playwright.dev');
    // ... test goes here
  }); */

  // Block png and jpeg images.
  await page.route(/(png|jpeg)$/, route => route.abort());

  // Abort based on the request type
  await page.route('**/*', route => {
    return route.request().resourceType() === 'image' ? route.abort() : route.continue();
  });
});

test('Modifying requests', async ({ page }) => {
  // Delete header
  await page.route('**/*', async route => {
    const headers = route.request().headers();
    delete headers['X-Secret'];
    await route.continue({ headers });
  });

  // Continue requests as POST. This request will go to actual server
  await page.route('**/*', route => route.continue({ method: 'POST' }));
});

test("Mock API request, don't make actual request to server", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });
  });

  /* purpose of fulfill() is:
  To short-circuit the request and respond immediately with custom data. */

  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});

test('Modifying responses - Actual API calls are made by playwright', async ({ page }) => {
  ///////////////////////////////////////////////////////////
  await page.route('**/title.html', async route => {
    // Fetch original response.
    const response = await route.fetch();
    // Add a prefix to the title.
    let body = await response.text();
    body = body.replace('<title>', '<title>My prefix:');
    await route.fulfill({
      // Pass all fields from the response.
      response,
      // Override response body.
      body,
      // Force content type to be html.
      headers: {
        ...response.headers(),
        'content-type': 'text/html'
      }
    });
  });
  ///////////////////////////////////////////////////////////
  // Get the response and add to it
  await page.route('*/**/api/v1/fruits', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: 'Loquat', id: 100 });
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });

  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the new fruit is visible
  await expect(page.getByText('Loquat', { exact: true })).toBeVisible();

});

test('should capture ping request', async ({ page }) => {
  // Listen for ping request
  const [request] = await Promise.all([
    page.waitForRequest(req =>
      req.method() === 'POST' && req.url().includes('your-ping-endpoint')
    ),
    page.goto('http://localhost:3000') // or the page triggering the ping
  ]);

  // Get request headers
  const headers = request.headers();

  // Assert ping headers
  expect(headers['ping-from']).toBe('URL to get from inspect');
  expect(headers['ping-to']).toBe('URL to get from inspect');
});

