import { test, expect } from '@playwright/test';

test.describe('Group-1', async() => {
    console.log('----------GROUP-1---------');

    test.beforeAll('BeforeAll', async() => {
        console.log('GROUP-1: Before All');
        console.log('');
    });

    test.beforeEach('BeforeEach', async() => {
        console.log('GROUP-1: Before Each');
        console.log('');
    });

    test('Test-1', async() => {
        console.log('GROUP-1: Test-1');
        expect(true).toBeTruthy();
    });
});

test.describe('Group-2', async() => {
    console.log('----------GROUP-2---------');

    test.beforeAll('BeforeAll', async() => {
        console.log('GROUP-2: Before All');
        console.log('');
    });

    test.beforeEach('BeforeEach', async() => {
        console.log('GROUP-2: Before Each');
        console.log('');
    });

    test('Test-1', async() => {
        console.log('GROUP-2: Test-1');
        expect(true).toBeTruthy();
    });
});
