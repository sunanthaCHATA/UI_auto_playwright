import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  
  timeout: 240000, 


  retries: 0,
  workers: 1,
  reporter: [ ['html' , { open: 'never' }],
  ['allure-playwright', {
    detail: true,                              
      outputFolder: 'allure-results',            
      suiteTitle: false,
  }],
  ['list'],                                    
  ],

  
  use: {
    viewport: { width: 1280, height: 720 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] ,
      launchOptions: {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-dev-shm-usage', 
            '--disable-setuid-sandbox'
          ],
      },
    },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});