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
test.only('Spying Native objects', async ({ page }) => {
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
