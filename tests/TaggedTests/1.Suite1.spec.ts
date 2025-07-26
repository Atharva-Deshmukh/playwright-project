import { test, expect } from '@playwright/test';

test.describe('SUITE-1', () => {
    test('SUITE-1 Test-1 Desc-1', {tag: '@smoke'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });

    test('SUITE-1 Test-2 Desc-1', {tag: '@prod'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });

    /* Also we can tag like this */
    test('SUITE-1 Test-3 Desc-1 @ui-1', async ({ page }) => {
        await expect(true).toBeTruthy();
    });

    test('SUITE-1 Test-3 Desc-1 @ui-2', async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});

test.describe('SUITE-1', () => {
    test('SUITE-1 Test-1 Desc-2', {tag: '@int'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });

    test('SUITE-1 Test-2 Desc-2', {tag: ['@int', '@smoke']}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});

test.describe('SUITE-1', () => {
    test('SUITE-1 Test-1 Desc-3', {tag: '@smoke'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});
