import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  /**
   * Retry strategy – "retry until error"
   *  - Local : retries 3 times before marking the test as failed
   *  - CI    : retries 5 times
   * Once all retries are exhausted Playwright surfaces the final error.
   */
  retries: process.env.CI ? 5 : 3,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.google.co.in',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    headless: true,
    // Mimic a real Chrome browser to avoid Google bot-detection
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',  use: { ...devices['Desktop Safari']  } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5']   } },
  ],

  outputDir: 'test-results/',
});
