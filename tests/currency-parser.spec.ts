
import { test, expect } from '@playwright/test';
import { CurrencyParser } from '../utils/CurrencyParser';

test('Parse USD transaction amount', async () => {
  const amount = CurrencyParser.parseToCents('$1,250.50');

  expect(amount).toBe(125050);
});

test('Format USD currency correctly', async () => {
  const formatted = CurrencyParser.formatUSD(125050);

  expect(formatted).toBe('$1,250.50');
});

test('Validate transaction balance', async () => {
  const result = CurrencyParser.validateBalance(
    '$1,000.00',
    '$250.50',
    '$1,250.50'
  );

  expect(result).toBe(true);
});

test('Reject invalid currency format', async () => {
  expect(() => {
    CurrencyParser.parseToCents('ABC123');
  }).toThrow();
});
