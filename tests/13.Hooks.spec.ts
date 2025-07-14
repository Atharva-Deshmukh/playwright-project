import { test, expect } from '@playwright/test';

/* A global page instance is needed to be created that will be common for every test
   Hence, we are not using the 'page' parameter in the test function. */
let page;

const url: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const title: string = 'OrangeHRM';
let usernameInput;
let passwordInput;
let loginButton;
let dropDownMenu;
let dropDownMenuByName;

/* We need to pass browser instance in beforeEach, we will create our own page instance using this */
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    usernameInput = await page.getByPlaceholder('Username');
    passwordInput = await page.getByPlaceholder('Password');
    loginButton = await page.getByRole('button', { name: 'Login' });
    dropDownMenu = await page.locator('.oxd-userdropdown-name');
    dropDownMenuByName = (name) => page.locator(`.oxd-userdropdown-link:has-text("${name}")`);
});

test.beforeEach(async () => {
    await page.goto(url);
    expect(await page.title()).toBe(title);

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await usernameInput.fill('Admin');
    await passwordInput.fill('admin123');

    await loginButton.click();
});

test('Workflow', async () => {
    await dropDownMenu.click();
    await expect(dropDownMenuByName('About')).toBeVisible();
});

test.afterEach(async () => {
    await dropDownMenu.click();
    await dropDownMenuByName('Logout').click();
});

test.afterAll(async () => {
  await page.close();
});