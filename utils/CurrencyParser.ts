
export class CurrencyParser {

  // Convert currency into cents to avoid decimal precision issues
  static parseToCents(amount: string): number {

    const cleaned = amount
      .trim()
      .replace(/^USD\s*/i, '')
      .replace(/[$,\s]/g, '');

    if (!/^-?\d+(\.\d{1,2})?$/.test(cleaned)) {
      throw new Error(`Invalid currency amount: ${amount}`);
    }

    const negative = cleaned.startsWith('-');
    const value = negative ? cleaned.slice(1) : cleaned;

    const [whole, decimal = ''] = value.split('.');

    const cents =
      Number(whole) * 100 +
      Number(decimal.padEnd(2, '0'));

    return negative ? -cents : cents;
  }

  // Convert cents into USD format
  static formatUSD(cents: number): string {

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }

  // Validate balance after transaction
  static validateBalance(
    initialBalance: string,
    transactionAmount: string,
    expectedBalance: string
  ): boolean {

    const initial = this.parseToCents(initialBalance);
    const transaction = this.parseToCents(transactionAmount);
    const expected = this.parseToCents(expectedBalance);

    return initial + transaction === expected;
  }
}
