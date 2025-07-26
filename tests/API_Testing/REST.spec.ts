import { test, expect } from '@playwright/test';

/* API tests (like your REST API test) do not open a browser window, even in headed mode, 
because they do not use the browser context or UI.
--headed only makes sense for tests that interact with a browser. */

test('GET', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    await expect(response.status()).toBe(200);
    const data = await response.json();
    // await console.warn('data -> ', data);
    await expect(data.length).toBeGreaterThan(5);
});

test('POST', async ({request}) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            name: 'Atharva Deshmukh',
            job: 'SDET-1'
        },
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    });
    await expect(await response.status()).toBe(201);
    const data = await response.json();
    await expect(data.name).toBe('Atharva Deshmukh');
    await expect(data.job).toBe('SDET-1');
});

test('PUT', async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            name: 'USER_UPDATED',
            job: 'SDET-1'
        },
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    });
    await expect(await response.status()).toBe(200);
    const data = await response.json();
    await expect(data.name).toBe('USER_UPDATED');
    await expect(data.job).toBe('SDET-1');
});

test('DELETE', async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2', {
                headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        }
    });
    await expect(await response.status()).toBe(204);
});