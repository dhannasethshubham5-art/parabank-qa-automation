
import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL =
  'https://parabank.parasoft.com/parabank/services/bank';

export async function resetDatabase(
  request: APIRequestContext
): Promise<void> {

  console.log('Starting database cleanup...');

  const cleanResponse = await request.post(
    `${BASE_URL}/cleanDB`
  );

  if (!cleanResponse.ok()) {
    throw new Error(
      `Database cleanup failed: ${cleanResponse.status()} ${await cleanResponse.text()}`
    );
  }

  console.log('Database cleaned successfully');

  const initializeResponse = await request.post(
    `${BASE_URL}/initializeDB`
  );

  if (!initializeResponse.ok()) {
    throw new Error(
      `Database initialization failed: ${initializeResponse.status()} ${await initializeResponse.text()}`
    );
  }

  console.log('Database initialized successfully');

  expect(cleanResponse.ok()).toBeTruthy();
  expect(initializeResponse.ok()).toBeTruthy();
}
