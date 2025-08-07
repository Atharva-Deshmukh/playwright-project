import { test, expect } from '@playwright/test';

/*
    Custom variables are defined as per the environment passed in the projects[]

    we can access the current choosen project and its variables by:
    (test.info().project.use as any)

    Command to be passed in gitbash:
        dev -> ENV=DEV yarn run playwright test tests/spec_name
       prod -> ENV=PROD yarn run playwright test tests/spec_name
    default -> yarn run playwright test tests/spec_name
*/

test('Validate environment variables dynamically like Cypress.env()', async () => {
  if (process.env.ENV! === 'DEV') {
    expect((test.info().project.use as any).baseUrl).toBe('dev_url');
    expect((test.info().project.use as any).user_name).toBe('dev_user');
    expect((test.info().project.use as any).user_pwd).toBe('dev_pwd');
    expect((test.info().project.use as any).cust_var).toBe('dev_var');
  } else if (process.env.ENV! === 'PROD') {
    expect((test.info().project.use as any).baseUrl).toBe('prod_url');
    expect((test.info().project.use as any).user_name).toBe('prod_user');
    expect((test.info().project.use as any).user_pwd).toBe('prod_pwd');
    expect((test.info().project.use as any).cust_var).toBe('prod_var');
  } else if(!process.env.ENV) {
    expect((test.info().project.use as any).baseUrl).toBe('DEFAULT_URL');
    expect((test.info().project.use as any).user_name).toBe('DEFAULT_USERNAME');
    expect((test.info().project.use as any).user_pwd).toBe('DEFAULT_PASSWORD');
    expect((test.info().project.use as any).cust_var).toBe('DEFAULT_CUST_VAR');
  }
});
 