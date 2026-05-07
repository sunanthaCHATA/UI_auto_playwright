import { test, expect } from '@playwright/test';
import {BrowserUtils} from '../../utils/generic/BrowserUtils';

import { DMPage } from '../../utils/pages/DMPage';
import { DashboardPage } from '../../utils/pages/DashboardPage';
import { LoginHelper } from '../../utils/helpers/LoginHelper';
import { DMHelper } from '../../utils/helpers/DMHelper';


test.afterEach(async ({ page }, testInfo) => {
  // Only pause if the test failed AND we are not in a CI environment (like Jenkins)
  if (testInfo.status !== testInfo.expectedStatus && !process.env.CI) {
    console.log(`Test failed: ${testInfo.title}. Pausing for inspection...`);
    
    // Disable the default timeout so the browser doesn't close while you're inspecting
    testInfo.setTimeout(0); 
    await page.pause();
  }
});

test('Dashboard - Validate Custom Column Fields', async ({ page }) => {

  // Code to initialize the required utils and helper classes
  const browserUtils = new BrowserUtils();
  const loginHelper = new LoginHelper(page);
  const dmHelper = new DMHelper(page);
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

  await dashboardPage.dashboardRunQueryBtn.fill('total sales by region by day worse two worse odd change');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(10000);


  // Assertion to verify the column is added on Dashboard
  await dashboardPage.dashboardTile.waitFor({ state: 'visible', timeout: 10000 });
 
  //code to click on Add Column button and add custom Column
  await dashboardPage.addColumnBtn.click();
  await dashboardPage.addcustomColumnOption.click();

  // wait 10sec for the custom column modal to appear
  await dashboardPage.configureCustomColumnTitle.waitFor({ state: 'visible', timeout: 10000 });

  // Code to validate configure custom column window appeared or not with all required fields
  await expect(dashboardPage.configureCustomColumnTitle).toContainText('Configure Custom Column');
  await expect(dashboardPage.configureCustomColumnTitle).toBeVisible();
  await expect(dashboardPage.customColumnNameInput).toBeVisible();

  // Code to validate Column Formula text area, Variables and operators
  await expect(dashboardPage.columnFormulaTextArea).toBeVisible();
  await expect(dashboardPage.variablesSection).toBeVisible();
  await expect(dashboardPage.operatorsSection).toBeVisible();

  // Code to validate preview section
  await expect(dashboardPage.previewSection).toBeVisible();

  // Code to validate Close, Cancel and Save Column button
  await expect(dashboardPage.closeIcon).toBeVisible();
  await expect(dashboardPage.customColumnCancelBtn).toBeVisible();
  await expect(dashboardPage.customColumnSaveBtn).toBeVisible();

  console.log('Configure Custom Column window is displayed successfully with all required fields.');

  // Code to close Configure Custom Column window
  await dashboardPage.closeIcon.click();


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