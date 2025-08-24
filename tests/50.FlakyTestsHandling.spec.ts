/*

---------------------------------------------
export default defineConfig({
  retries: 2,   // retry failed tests twice
});

OR at test level
test('flaky test', async ({ page }) => {
  // test steps
}).retry(2);

---------------------------------------------
Auto-Waiting (Use Locators Correctly)

Playwright automatically waits for elements to be visible, enabled, and stable before interacting.

Always use locators instead of page.$/page.evaluate unless you need raw handles.

await page.getByRole('button', { name: 'Submit' }).click();

---------------------------------------------
Wait for XHRs

await page.waitForResponse(/api\/login/);
await expect(page.getByText('Welcome')).toBeVisible();

*/