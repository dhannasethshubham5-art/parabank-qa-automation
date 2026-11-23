
import { Page, expect } from '@playwright/test';

export class AccountsPage {
  constructor(private page: Page) {}

  async openCheckingAccount(): Promise<string> {

    await this.page.goto(
      'https://parabank.parasoft.com/parabank/openaccount.htm'
    );

    await this.page.locator('#type').selectOption({ label: 'CHECKING' });

    const accountDropdown = this.page.locator('#fromAccountId');
    console.log('Current URL:', this.page.url());

console.log(
  'Page Heading:',
  await this.page.locator('h1').allTextContents()
);

console.log(
  'Page Content:',
  (await this.page.locator('body').innerText()).substring(0, 1500)
);

console.log(
  'Dropdown Count:',
  await accountDropdown.count()
);

console.log(
  'Account Options:',
  await accountDropdown.locator('option').allTextContents()
);
    const options = await accountDropdown.locator('option').allTextContents();

    console.log(
  'Open Account Error:',
  await this.page.locator('#openAccountError').innerText().catch(() => 'No error message found')
);

console.log(
  'Account Result:',
  await this.page.locator('#openAccountResult').innerText().catch(() => 'No result found')
);

console.log('Available Account Options:', options);

    // Wait for account options to load dynamically
    //await expect.poll(
    //  async () => await accountDropdown.locator('option').count(),
    //  { timeout: 15000 }
   // ).toBeGreaterThan(1);

    // Select existing account
    await accountDropdown.selectOption({ index: 1 });

    // Click Open New Account
    await this.page.locator(
      'input[value="Open New Account"]'
    ).click();

    // Verify new account creation
    const accountLink = this.page.locator('#openAccountResult a');

    await expect(accountLink).toBeVisible();

    const accountNumber = (await accountLink.innerText()).trim();

    console.log('New Checking Account:', accountNumber);

    return accountNumber;
  }
}
