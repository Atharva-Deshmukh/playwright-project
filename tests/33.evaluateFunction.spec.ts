/*                                   What page.evaluate() does
                                     -------------------------

page.evaluate() in Playwright is closer to cy.window().then() in Cypress, not cy.wrap().


It lets you run JavaScript code inside the browser context (the same environment where your 
web page’s JavaScript runs).

You can access window, document, DOM elements, and anything else available to scripts running in that page.

It’s like Playwright is “teleporting” your code into the browser to execute there, then sending the 
result back to Node.js.

Example:

const title = await page.evaluate(() => {
  return document.title; // Runs in the browser
});
console.log(title); // Runs in Node.js

                                    How Playwright normally works
                                    -----------------------------
Most of your Playwright code — like page.goto(), page.click(), expect() — runs in Node.js 
on your computer.These commands send instructions to the browser over a WebSocket connection.

Example (Node.js side):

await page.goto('https://example.com');
await page.click('button#login');

Here, your Node.js script sends “navigate” and “click” commands to the browser — the code 
itself isn’t running inside the browser.

                                    What page.evaluate() changes
                                    ----------------------------

When you call page.evaluate(), Playwright takes the function you pass, serializes it, 
and executes it inside the browser's JavaScript engine (same as your website's scripts).

Example:

const heading = await page.evaluate(() => {
  return document.querySelector('h1').innerText; // Browser context
});
console.log(heading); // Back in Node.js

Here’s the flow:
Your Node.js script says: “Browser, please run this 
function: ( ) => document.querySelector('h1').innerText”
The browser runs it, gets the innerText, and sends the result back to Node.js.
Your script prints the result.

                                        Why this matters
                                        ----------------
Inside page.evaluate() → 
You can access window, document, any variables the page defines.
❌ You cannot use Node.js APIs like fs or path.

Outside page.evaluate() → You can use Playwright commands, Node.js libraries, filesystem, etc.
❌ You cannot directly touch DOM elements (unless you use a locator or page.evaluate).

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

                                Passing argument to pageFunction:
                                --------------------------------

const result = await page.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"

                        A string can also be passed in instead of a function:
                        -----------------------------------------------------

console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11" */