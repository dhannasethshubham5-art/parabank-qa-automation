
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountsPage } from '../pages/AccountsPage';
import { resetDatabase } from '../utils/apiHelpers';

test('Scenario A - Registration and Checking Account', async ({ page, request }) => {

  // Step 1: Reset and initialize database using API
  await resetDatabase(request);

  // Step 2: Register a dynamic user
  const registerPage = new RegisterPage(page);
  await registerPage.registerUser();

  // Step 3: Open checking account
  const accountsPage = new AccountsPage(page);

  const accountNumber =
    await accountsPage.openCheckingAccount();

  // Step 4: Validate account number
  expect(accountNumber).not.toBe('');

  console.log('Checking Account:', accountNumber);

});
