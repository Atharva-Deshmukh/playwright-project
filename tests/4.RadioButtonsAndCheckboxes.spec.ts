import { test, expect } from '@playwright/test';

test('Radio buttons', async ({page}) => {
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

test('Checkboxes', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    expect(await page.title()).toBe('Automation Testing Practice');

    const sundayCheckbox = await page.locator('[value="sunday"]');
    const valueArray: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const genericCheckBoxByValue = (value: string) => page.locator(`[value="${value}"]`);

    expect(await sundayCheckbox).toBeVisible();
    expect(await sundayCheckbox).not.toBeChecked();

    /* Check single checkbox */
    await sundayCheckbox.check();
    expect(await sundayCheckbox).toBeChecked();

    /* Check multiple checkboxes 
       use for..of loop for async/await inside for loop */
    for(let value of valueArray) {
        await genericCheckBoxByValue(value).check();
        expect(await genericCheckBoxByValue(value)).toBeChecked();
        await genericCheckBoxByValue(value).uncheck();
        expect(await genericCheckBoxByValue(value)).not.toBeChecked();
    }
});