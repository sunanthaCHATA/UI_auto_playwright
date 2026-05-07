import { test, expect } from '@playwright/test';
import {BrowserUtils} from '../../utils/generic/BrowserUtils';

import { DMPage } from '../../utils/pages/DMPage';
import { DashboardPage } from '../../utils/pages/DashboardPage';
import { LoginHelper } from '../../utils/helpers/LoginHelper';
import { DMHelper } from '../../utils/helpers/DMHelper';
import { DashboardHelper } from '../../utils/helpers/DashboardHelper';

test.afterEach(async ({ page }, testInfo) => {
  // Only pause if the test failed AND we are not in a CI environment (like Jenkins)
  if (testInfo.status !== testInfo.expectedStatus && !process.env.CI) {
    console.log(`Test failed: ${testInfo.title}. Pausing for inspection...`);
    
    // Disable the default timeout so the browser doesn't close while you're inspecting
    testInfo.setTimeout(0); 
    await page.pause();
  }
});

test('Dashboard - Validate Sorting Functionality on Newly Created Column', async ({ page }) => {

  // Code to initialize the required utils and helper classes
  const browserUtils = new BrowserUtils();
  const loginHelper = new LoginHelper(page);
  const dmHelper = new DMHelper(page);
  const dashboardHelper = new DashboardHelper(page);
  const dmChat = new DMPage(page);
  const dashboardPage = new DashboardPage(page);

  // Code to delcare and initialize required variables
  const shortTs = Date.now();
  const dashboardName = `Test Dashboard ${shortTs}`;
  const columnName = `CM_${shortTs}`;

  // Code to launch app , login and select the project
  await loginHelper.appLogin('autoae','Sports Alpha - NHL','test_auto');

  // Create a new Dashboard and Run Query
  await dashboardPage.createNewDashboardBtn.click();
  await dashboardPage.dashboardNameInput.fill(dashboardName);
  await dashboardPage.createDashboardBtn.click();
  await page.waitForTimeout(5000);

  await dashboardPage.dashboardRunQueryBtn.fill('multi book live odds');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(10000);

  // Assertion to verify the column is added on Dashboard
  await dashboardPage.dashboardTile.waitFor({ state: 'visible', timeout: 10000 });
 
  //code to click on Add Column button and add custom Column
  await dashboardPage.addColumnBtn.click();
  await dashboardPage.addcustomColumnOption.click();

  // wait 10sec for the custom column modal to appear
  await dashboardPage.configureCustomColumnTitle.waitFor({ state: 'visible', timeout: 10000 });
  
  // code to select text using crl + A and delete the existing text on text field
  await dashboardPage.customColumnNameInput.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await dashboardPage.customColumnNameInput.fill(columnName);

  // code to fill formula for the custom column
  await dashboardPage.variableColumnOption('Moneyline').click();
  await dashboardPage.plusOperator.click();  
  await dashboardPage.variableCustomNumberOption.click();
  await dashboardPage.customnumberInput(1).fill("100");

  // Code to Save the custom column and verify the column is added on dashboard
  await dashboardPage.customColumnSaveBtn.click();
  console.log("Custom Column is added on Dashboard with name: " + columnName);

  // wait for 10 sec before ending the test to visually verify the added column on dashboard
  await page.waitForTimeout(15000);
  await dashboardPage.dashboardColumnSelector(columnName).waitFor({ state: 'visible' , timeout: 10000});

  // Code to validate sorting functionality for the added custom column on dashboard
  await dashboardHelper.validateSorting(columnName);

  // Save the Dashboard 
  await dashboardPage.dashbaordSaveBtn.click();
  await page.waitForTimeout(10000);
  console.log("Dashboard is saved successfully after validating the Configure Custom Column window fields.");
  
}); 

// Delete the Dashboard after test execution
test.afterEach(async ({ page }) => {

  const dashboardPage = new DashboardPage(page);

  await dashboardPage.dashboardOptionsBtn.click();
  await dashboardPage.dashboardDeleteOption.click();
  await dashboardPage.deleteDashboardConfirmBtn.click();
  await page.waitForTimeout(5000);

  console.log("Dashboard is deleted successfully after test execution.");

})