# Installation

- yarn create playwright (choose between TypeScript or JavaScript (default is TypeScript))
![screenshot](imagesForReadme/Install-1.png)

- Command to run in UI mode:
  yarn run playwright test --ui

- To get full UI feel of open mode like cypress, use below command 
   **yarn run playwright test --headed tests/3.HandlingMultiWindows.spec.ts --project "chromium"**
   This will open real browser like open mode

- Specpattern
  Tests are picked from this option in config: testDir: './tests'
  Spec pattern can be specified by testMatch: '**/*.spec.ts'

- Just like cypress's option watchForFileChanges: false,
  playwright has eye icon in UI mode runner, which reruns the test once changes are made to it
