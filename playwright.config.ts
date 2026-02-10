import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// ONLY load dotenv if we are NOT in Jenkins (CI)
if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  /* 1. INCREASE TIMEOUT: Your logs showed 2.0m (120s) failures. 
     The 60s timeout might be too short for Jenkins agents. */
  timeout: 120000, 

  /* 2. REDUCE RETRIES: Set to 1 for CI to save time. */
  // retries: process.env.CI ? 1 : 0,
  retries: 0,
  workers: 1,
  reporter: [ ['html'],
  ['allure-playwright', {
    detail: true,                               // Shows steps in the report
      outputFolder: 'allure-results',             // Where raw data is saved
      suiteTitle: false,
  }],
  ['list'],                                     // Optional: nice console output for Jenkins
  ],

  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* 3. SHUT THESE OFF: Unless you specifically need to test 
       Safari and Firefox every single time, comment them out. */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});