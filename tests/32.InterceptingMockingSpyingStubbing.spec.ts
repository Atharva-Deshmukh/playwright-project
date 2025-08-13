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
