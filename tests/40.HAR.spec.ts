import { test, expect } from '@playwright/test';

/* HAR concept
   -----------

   WAY-1: Analysing HAR manually
   - Load the target page in any browser >> inpsect >> network tab >> export HAR button is there
   - Open google HAR analyser >> upload HAR and we can now see the analysis

   WAY-2: Using playwright

   - We have page.routeFromHAR()  
   
   SECURITY CONCERN:
   - Make sure to keep HAR file in safe hands and in gitignore, it contains all cookies
     hence can be misused if leaked.

   USE CASE:
   - Speed up testing by recording and replaying network traffic
   - In case network is gone, we can load the page and work on the already 
     loaded functionalities in Offline mode
   - to load the existing HAR, make update: false */

test('HAR in playwright', async ({ page }) => {

  const url: string = 'https://www.pexels.com/';
  const searchBoxLocator = page.locator('input#search');

  page.routeFromHAR('HAR/pexels.har', {
    update: true /* true means new HAR will be generated/updated, false means existing HAR will be used */
  });

  await page.goto(url); 

  await expect(searchBoxLocator).toBeVisible();
});