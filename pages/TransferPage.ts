
import { Page, expect } from '@playwright/test';
import { CurrencyParser } from '../utils/CurrencyParser';

export class TransferPage {
  constructor(private page: Page) {}

  async getAccountOptions(): Promise<string[]> {
    await this.page.goto('/transfer.htm');

    const fromDropdown = this.page.locator('#fromAccountId');
    const toDropdown = this.page.locator('#toAccountId');

    await expect(fromDropdown.locator('option').first())
      .toBeAttached({ timeout: 15000 });

    await expect(toDropdown.locator('option').first())
      .toBeAttached({ timeout: 15000 });

    return await fromDropdown.locator('option').evaluateAll(
      options => options.map(option => (option as HTMLOptionElement).value)
    );
  }

  async transferFunds(
    fromAccount: string,
    toAccount: string,
    amount: string
  ): Promise<void> {

    await this.page.goto('/transfer.htm');

    const fromDropdown = this.page.locator('#fromAccountId');
    const toDropdown = this.page.locator('#toAccountId');

    await expect(fromDropdown.locator('option').first())
      .toBeAttached({ timeout: 15000 });

    await expect(toDropdown.locator('option').first())
      .toBeAttached({ timeout: 15000 });

    const availableAccounts = await fromDropdown.locator('option').evaluateAll(
      options => options.map(option => (option as HTMLOptionElement).value)
    );

    expect(availableAccounts).toContain(fromAccount);
    expect(availableAccounts).toContain(toAccount);

    expect(fromAccount).not.toBe(toAccount);

    const amountInCents = CurrencyParser.parseToCents(amount);
    expect(amountInCents).toBeGreaterThan(0);

    await fromDropdown.selectOption(fromAccount);
    await toDropdown.selectOption(toAccount);

    await this.page.locator('#amount').fill(amount);

    await this.page.locator(
      '#transferForm input[type="submit"]'
    ).click();

    await expect(this.page.locator('#showResult')).toBeVisible();

    await expect(this.page.locator('#amountResult'))
      .toContainText(CurrencyParser.formatUSD(amountInCents));

    console.log(`Transfer successful: ${amount}`);
  }
}
