
import { test, expect } from '@playwright/test';
import {
  Customer,
  Account,
  Transaction,
  RegistrationData
} from '../utils/apiTypes';

const BASE_URL =
  'https://parabank.parasoft.com/parabank';

const API_URL = `${BASE_URL}/services/bank`;

test('Scenario C - Headless API User Creation, Deposit and Transaction History',
  async ({ request }) => {

    // Generate unique user data
    const user: RegistrationData = {
      firstName: 'API',
      lastName: 'Tester',
      address: '123 Test Street',
      city: 'Nagpur',
      state: 'Maharashtra',
      zipCode: '440001',
      phone: '9876543210',
      ssn: '987654321',
      username: `apiuser_${Date.now()}`,
      password: 'Test@12345'
    };

    // Step 1: Establish registration session
    const registrationPage = await request.get(
      `${BASE_URL}/register.htm`
    );

    expect(registrationPage.ok()).toBeTruthy();

    // Step 2: Register user through HTTP request
    const registrationResponse = await request.post(
      `${BASE_URL}/register.htm`,
      {
        form: {
          'customer.firstName': user.firstName,
          'customer.lastName': user.lastName,
          'customer.address.street': user.address,
          'customer.address.city': user.city,
          'customer.address.state': user.state,
          'customer.address.zipCode': user.zipCode,
          'customer.phoneNumber': user.phone,
          'customer.ssn': user.ssn,
          'customer.username': user.username,
          'customer.password': user.password,
          repeatedPassword: user.password
        }
      }
    );

    expect(registrationResponse.ok()).toBeTruthy();

    console.log('Registration response received');

    // Step 3: Login using REST API
    const loginResponse = await request.get(
      `${API_URL}/login/${encodeURIComponent(user.username)}/${encodeURIComponent(user.password)}`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const customer =
      await loginResponse.json() as Customer;

    expect(customer.id).toBeTruthy();

    console.log('Customer ID:', customer.id);

    // Step 4: Get customer accounts
    const accountResponse = await request.get(
      `${API_URL}/customers/${customer.id}/accounts`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    expect(accountResponse.ok()).toBeTruthy();

    const accounts =
      await accountResponse.json() as Account[];

    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;

    console.log('Account ID:', accountId);

    // Step 5: Deposit funds
    const depositAmount = 125.75;

    const depositResponse = await request.post(
      `${API_URL}/deposit?accountId=${accountId}&amount=${depositAmount}`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    expect(depositResponse.ok()).toBeTruthy();

    console.log('Deposit completed:', depositAmount);

    // Step 6: Retrieve transaction history
    const historyResponse = await request.get(
      `${API_URL}/accounts/${accountId}/transactions`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    expect(historyResponse.ok()).toBeTruthy();

    const transactions =
      await historyResponse.json() as Transaction[];

    expect(Array.isArray(transactions)).toBeTruthy();

    expect(
      transactions.some(
        transaction =>
          Number(transaction.amount) === depositAmount
      )
    ).toBeTruthy();

    console.log('Transaction history validated');

  });
