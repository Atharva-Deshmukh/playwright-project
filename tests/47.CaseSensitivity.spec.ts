/*

In cypress:
-----------
    cy.contains('text', { matchCase: false })

In playwright:
-----------
    
Way-1:
    await expect(page.getByText(/hello world/i)).toBeVisible();

Way-2:
    const item = page.locator('div').filter({ hasText: /welcome user/i });
    await expect(item).toBeVisible();


Way-3:
    page.getByText('Hello World', { exact: true })

*/