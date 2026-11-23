
import { Page, expect } from '@playwright/test';
import { testData } from '../utils/testData';

export class RegisterPage {
  constructor(private page: Page) {}

  async registerUser() {
    await this.page.goto(
      'https://parabank.parasoft.com/parabank/register.htm'
    );

    await this.page.locator('[name="customer.firstName"]').fill(testData.firstName);
    await this.page.locator('[name="customer.lastName"]').fill(testData.lastName);
    await this.page.locator('[name="customer.address.street"]').fill(testData.address);
    await this.page.locator('[name="customer.address.city"]').fill(testData.city);
    await this.page.locator('[name="customer.address.state"]').fill(testData.state);
    await this.page.locator('[name="customer.address.zipCode"]').fill(testData.zipCode);
    await this.page.locator('[name="customer.phoneNumber"]').fill(testData.phone);
    await this.page.locator('[name="customer.ssn"]').fill(testData.ssn);
    await this.page.locator('[name="customer.username"]').fill(testData.username);
    await this.page.locator('[name="customer.password"]').fill(testData.password);
    await this.page.locator('[name="repeatedPassword"]').fill(testData.password);

    await this.page.locator('input[value="Register"]').click();

    await expect(
  this.page.getByRole('heading', {
    name: `Welcome ${testData.username}`
  })
).toBeVisible();
  }
}
