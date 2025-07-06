import { test, expect } from '@playwright/test';

test('Radio buttons and checkboxes', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    expect(await page.title()).toBe('Automation Testing Practice');

    const maleRadioButton = await page.locator('[value="male"]');
    const femaleRadioButton = await page.locator('[value="female"]');

    expect(await maleRadioButton).toBeVisible();
    expect(await maleRadioButton).not.toBeChecked();

    expect(await femaleRadioButton).toBeVisible();
    expect(await femaleRadioButton).not.toBeChecked();

    /* Check and verify checked state */
    await maleRadioButton.click();
    // await maleRadioButton.check();  // This can also be used
    expect(await maleRadioButton).toBeChecked();
});