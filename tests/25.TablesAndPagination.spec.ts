import { test, expect } from '@playwright/test';

test('Handling tables in playwright', async ({ page }) => {
  const url: string = 'https://testautomationpractice.blogspot.com/';
  const expectedPageTitle: string = 'Automation Testing Practice';
  const tableTitleLocator = await page.locator('h2:has-text("Pagination Web Table")');
  const tableLocator = await page.locator('table#productTable');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(tableTitleLocator).toBeVisible();
  await expect(tableLocator).toBeVisible();

  // Capure the table locator first
  // Check the number of cols in the table
  const columnHeaders = await tableLocator.locator('thead th');
  await expect(await columnHeaders.count()).toBe(4); 

  // Check the number of rows in the table
  const rowLocator = await tableLocator.locator('tbody tr');
  await expect(await rowLocator).toHaveCount(5);

  // List all column headers
    const columnHeadersText = await columnHeaders.allTextContents(); // It returns an array of strings,
    expect(columnHeadersText).toEqual([                              // Its just like deep equal chai assertion
        'ID',
        'Name',
        'Price',
        'Select',
    ]);

  /* Find the index of the "Price" column
   there is no each($ele, index) in playwright
   so we can use findIndex(), a pure JS method to find the index of the "Price" */
  const priceIndex = columnHeadersText.findIndex(header => header === 'Price');
  await expect(priceIndex).toBe(2);

  /* List a specific column data only
  
     Playwright does not support jQuery-style selectors like td:eq(1).
     However, you can achieve the same result using the nth-child CSS selector or 
     Playwright’s .nth() method.
     index is 1-based for nth-child */
  const rowByColumnIndexLocator = await rowLocator.locator(`td:nth-child(${priceIndex + 1})`);
  expect(await rowByColumnIndexLocator.allTextContents()).toEqual([  
        '$10.99',
        '$19.99',
        '$5.99',
        '$7.99',
        '$8.99',
    ]);

 /* Way to print 3 columns of first 3 rows */
 for(let i = 0; i < await rowLocator.count() - 2; i++) {
    const currentRow = await rowLocator.nth(i); // this is 0-based
    for(let j = 0; j < 3; j++) {
        const currentData = await currentRow.locator(`td:nth-child(${j + 1})`);
        console.log(await currentData.textContent());
    }
 }

 /* Check columnwise checkbox */

    // Find the row containing the product name "Tablet"
    const tabletRow = await tableLocator.locator('tbody tr', { hasText: 'Tablet' });

    // Find the checkbox in that row and tick it
    const checkbox = tabletRow.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Another way is to use filter
    const targetCheckboxRow = await rowLocator.filter({
        has: await page.locator('td'),  // has td element
        hasText: 'Smartwatch',          // that td has this text
    });

    await targetCheckboxRow.locator('input[type="checkbox"]').check();
    await expect(targetCheckboxRow.locator('input[type="checkbox"]')).toBeChecked();

    // Another way is to create a reusable function
    async function checkCheckboxInRow(rowLocator, page, productName) {
        const targetCheckboxRow = await rowLocator.filter({
            has: await page.locator('td'),
            hasText: productName,
        });

         await targetCheckboxRow.locator('input[type="checkbox"]').check();
         await expect(targetCheckboxRow.locator('input[type="checkbox"]')).toBeChecked();
    }

    await checkCheckboxInRow(rowLocator, page, 'Laptop');


    // Pagination: simply get the locator of the next page button
    // Keep printing first 2 rows of each page
    const paginationLocator = await page.locator('#pagination');
    const pageLocator = await paginationLocator.locator('li a');
    expect(await pageLocator.count()).toBeGreaterThan(0);

    for (let page = 0; page < await pageLocator.count(); page++) {
        await pageLocator.nth(page).click();
        for (let i = 0; i < await rowLocator.count() - 2; i++) {
            const currentRow = await rowLocator.nth(i); // this is 0-based
            for (let j = 0; j < 3; j++) {
                const currentData = await currentRow.locator(`td:nth-child(${j + 1})`);
                console.log(await currentData.textContent());
            }
        }
    }

});