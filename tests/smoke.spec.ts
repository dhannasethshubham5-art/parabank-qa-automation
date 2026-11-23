
import { test, expect } from '@playwright/test';

test('Verify ParaBank homepage', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await expect(page).toHaveTitle(/ParaBank/);

  await expect(
    page.getByRole('link', { name: 'Register' })
  ).toBeVisible();

});
