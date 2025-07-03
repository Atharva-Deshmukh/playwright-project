# Installation

- yarn create playwright (choose between TypeScript or JavaScript (default is TypeScript))
![screenshot](imagesForReadme/Install-1.png)

- Command to run in UI mode:
  yarn run playwright test --ui

- Specpattern
  Tests are picked from this option in config: testDir: './tests'
  Spec pattern can be specified by testMatch: '**/*.spec.ts'

- Just like cypress's option watchForFileChanges: false,
  playwright has eye icon in UI mode runner, which reruns the test once changes are made to it
