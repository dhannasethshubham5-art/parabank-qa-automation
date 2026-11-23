
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  timeout: 30000,

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'reports/playwright-report',
      open: 'never'
    }]
  ],

  use: {
    baseURL: 'https://parabank.parasoft.com/parabank',
    browserName: 'chromium',
    headless: true
  }
});
