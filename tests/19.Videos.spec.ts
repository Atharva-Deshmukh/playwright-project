/*
playwright.config.ts
--------------------

import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    video: 'on-first-retry',
  },
});

Options:
-------

'off' - Do not record video.
'on' - Record video for each test.
'retain-on-failure' - Record video for each test, but remove all videos from successful test runs.
'on-first-retry' - Record video only when retrying a test for the first time.

You can also specify video size. The video size defaults to the viewport size scaled down to fit 800x800. 
The video of the viewport is placed in the top-left corner of the output video, scaled down to fit if 
necessary. 

import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 }
    }
  },
}); */