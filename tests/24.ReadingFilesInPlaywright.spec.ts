/* In Playwright, you can read files (like PDF or text files) 
using Node.js built-in modules such as fs (File System), 
since Playwright tests run in a Node.js environment. 
There is no built-in readFile() command in Playwright like Cypress, 
but you can use fs.promises.readFile or fs.readFileSync. */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import pdfParse from 'pdf-parse'; // Ensure you have pdf-parse installed

// Helper function to check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

test('Extract and verify text from PDF file', async () => {
  const filePath = path.resolve('Files/File_Download.pdf');

  // Check if the file exists
  await expect(await fileExists(filePath)).toBe(true);

  // Read and parse PDF if it exists
  const pdfBuffer = await fs.readFileSync(filePath);
  const pdfData = await pdfParse(pdfBuffer); /* Need to install this */
  const text = pdfData.text;

  // Verify the extracted text
  expect(text).toContain('Lorem ipsum');
});