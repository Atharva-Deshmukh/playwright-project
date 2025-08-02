import { test, expect } from '@playwright/test';

test('Upload Single file', async ({ page }) => {
  const url: string = 'https://practice-automation.com/file-upload/';
  const expectedPageTitle: string = 'File Upload | Practice Automation';
  const pageTitleLocator = await page.locator('h1:has-text("File Upload")');
  const fileUploadButton = await page.locator('input[type="file"]#file-upload');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(pageTitleLocator).toBeVisible();
  await expect(fileUploadButton).toBeVisible();

  await fileUploadButton.setInputFiles('Files/File-1.pdf');

  await page.waitForTimeout(3000);
});

test('Upload Multiple files', async ({ page }) => {
  const url: string = 'https://davidwalsh.name/demo/multiple-file-upload.php';
  const expectedPageTitle: string = 'Multiple File Upload Input Example';
  const pageTitleLocator = await page.locator('h1:has-text("Demo:  Multiple File Upload Input")');
  const fileUploadButton = await page.locator('input[type="file"]#filesToUpload');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(pageTitleLocator).toBeVisible();
  await expect(fileUploadButton).toBeVisible();

  await fileUploadButton.setInputFiles([
    'Files/File-1.pdf',
    'Files/File-2.pdf'
  ]);

  await page.waitForTimeout(3000);
});

/* This is not possible in cypress, there we have limitation for <input type="file">  */
test('Upload Files on elements other than <input type="file">', async ({ page }) => {

  const url: string = 'https://the-internet.herokuapp.com/upload';
  const expectedPageTitle: string = 'The Internet';
  const pageTitleLocator = await page.locator('h3:has-text("File Uploader")');
  const fileUploadButton = await page.locator('#drag-drop-upload');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(pageTitleLocator).toBeVisible();
  await expect(fileUploadButton).toBeVisible();
  
  // Start waiting for file chooser before clicking. Note no await.
  const fileChooserPromise = page.waitForEvent('filechooser');
  await fileUploadButton.click(); /* Element that triggers the choose file dialog box */
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('Files/File-1.pdf');
  await fileChooser.setFiles(['Files/File-1.pdf', 'Files/File-2.pdf']); /* For multiple files */
  await page.waitForTimeout(3000);
});

test.only('Download files', async ({ page }) => {
  const url: string = 'https://demo.automationtesting.in/FileDownload.html';
  const expectedPageTitle: string = 'File input - Multi select';
  const pageTitleLocator = await page.locator('h2:has-text("File Download Demo for Automation")');
  const fileDownloadButton = await page.locator('a[type="button"]:has-text("Download")');

  await page.goto(url);

  await expect(page).toHaveTitle(expectedPageTitle);
  await expect(pageTitleLocator).toBeVisible();
  await expect(fileDownloadButton).toBeVisible();

  // Way of writing - 1

  // Start waiting for download before clicking. Note no await.
  const downloadPromise = page.waitForEvent('download');
  await fileDownloadButton.click();
  const download = await downloadPromise;

  // Wait for the download process to complete and save the downloaded file somewhere.
  // By default, downloads are saved as per OS settings, we can target into specific path.
  await download.saveAs('Files/' + download.suggestedFilename());
  // suggestedFilename() -> Returns suggested filename for the download. Its typically computed by the browser

  // Way of writing - 2

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    fileDownloadButton.click()
  ]);

  await download.saveAs('Files/' + download.suggestedFilename());

  await page.waitForTimeout(3000);
});