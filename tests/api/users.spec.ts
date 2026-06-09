import { test, expect } from '@playwright/test';

test.describe('StarPets API Tests', () => {

  test('POST create resource - positive scenario', async ({ request }) => {

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: {
          title: 'StarPets',
          body: 'QA Test',
          userId: 1
        }
      }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');

    expect(body.title).toBe('StarPets');
    expect(body.body).toBe('QA Test');
    expect(body.userId).toBe(1);
  });

  test('POST without required fields', async ({ request }) => {

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: {}
      }
    );

    expect(response.status()).toBe(201);
  });

  test('POST invalid data', async ({ request }) => {

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: {
          userId: 'invalid'
        }
      }
    );

    expect(response.status()).toBe(201);
  });

  test('Unauthorized request simulation', async ({ request }) => {

    // JSONPlaceholder не поддерживает авторизацию.
    // В реальном API StarPets ожидался бы ответ 401/403.

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);
  });

  test('Idempotency simulation', async ({ request }) => {

    const idempotencyKey = 'order-123';

    const responses = await Promise.all([
      request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          headers: {
            'X-Idempotency-Key': idempotencyKey
          },
          data: {
            title: 'duplicate'
          }
        }
      ),

      request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          headers: {
            'X-Idempotency-Key': idempotencyKey
          },
          data: {
            title: 'duplicate'
          }
        }
      ),

      request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          headers: {
            'X-Idempotency-Key': idempotencyKey
          },
          data: {
            title: 'duplicate'
          }
        }
      )
    ]);

    responses.forEach(response => {
      expect(response.status()).toBe(201);
    });

    /*
      Для реального StarPets API ожидалось бы:

      - создание только одного заказа;
      - одинаковый ответ на повторные запросы;
      - однократное списание баланса;
      - однократная публикация события в RabbitMQ.
    */
  });

});