import { test, expect } from '@playwright/test';

test.describe('SUITE-2', () => {
    test('SUITE-2 Test-1 Desc-1', {tag: '@smoke'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });

    test('SUITE-2 Test-2 Desc-1', {tag: '@prod'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});

test.describe('SUITE-2', () => {
    test('SUITE-2 Test-1 Desc-2', {tag: '@int'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});

test.describe('SUITE-2', () => {
    test('SUITE-2 Test-1 Desc-3', {tag: '@smoke'}, async ({ page }) => {
        await expect(true).toBeTruthy();
    });
});
