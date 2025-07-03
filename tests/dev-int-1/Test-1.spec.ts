import { test, expect } from '@playwright/test';

test('T1', async ({ page }) => {
  await expect(true).toBeTruthy();
});

test('T2', async ({ page }) => {
  await expect(false).toBeFalsy();
});