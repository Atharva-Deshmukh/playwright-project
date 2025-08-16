import { test, expect } from '@playwright/test';

/* In Cypress, we do something like this
  
   cy.get('img').each(($img) => {
    const imgUrl = $img.prop('src');

    // Check HTTP response
    cy.request(imgUrl).its('status').should('eq', 200);

    // Check if it actually rendered in DOM
    cy.wrap($img).should(($el) => {
        expect($el[0].naturalWidth).to.be.greaterThan(0);
    });
   }); 
   
   In cypress, for soft assertions, we need to use plugin: cypress-soft-assertions */

/* Steps to find broken images
- Locate all images
- Iterate over each image
- Verify the HTTP status and DOM rendering */
test('Find broken images', async ({ page }) => {

  const url: string = 'https://practice-automation.com/broken-images/';
  const pageTitle: string = "Broken Images | Practice Automation";
  const headerLocator = page.locator('h1:has-text("Broken Images")');
  const imageLocator = page.locator('img');

  await page.goto(url); 
  page.waitForLoadState('domcontentloaded'); /* Wait for the page to fully render DOM */
  
  await expect(page).toHaveTitle(pageTitle);
  await expect(headerLocator).toBeVisible();
  await expect(imageLocator.count()).toBeGreaterThan(0);

  /* .all() yeilds an iterator, hence we can loop */
  const allImages = await imageLocator.all();

  /* Iterate each image using for-await loop, its just like Cypress._.times() */
  for await (const image of allImages) {
    const imgUrl = await image.getAttribute('src');
    
    console.log(`IMAGE URL ->  ${imgUrl}`);

    // Check HTTP response
    if (imgUrl) {
      const response = await page.request.get(imgUrl);
      expect(response.status()).toBe(200);
    }

    // Check if it actually rendered in DOM
    const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  }
});
