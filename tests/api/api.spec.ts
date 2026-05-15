import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {

  test('GET - should return 200 for valid endpoint', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
  });

  test('POST - should create a new resource', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: { title: 'Playwright API Test', body: 'Testing with Playwright', userId: 1 },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Playwright API Test');
  });

  test('GET all posts - should return array', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('DELETE - should return 200', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
  });

});
