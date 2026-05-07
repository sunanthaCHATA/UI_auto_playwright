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

test('Dashboard - Validate Duplicate Column Error and Clear All Functionality', async ({ page }) => {

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
  
  // code to validate duplicate column name "A column with this name already exists."
  const ExistingColumnName = await dashboardPage.dashboardFirstColumnHeader.innerText();
  await dashboardPage.customColumnNameInput.fill(ExistingColumnName);
  const duplicateErrorMessage = page.locator('text=A column with this name already exists.');
  await expect(duplicateErrorMessage).toBeVisible();



  // code to validate Clear All functionality on custom column formula builder
  await dashboardPage.customColumnNameInput.fill(columnName);
  await dashboardPage.variableColumnOption('Moneyline').click();
  await dashboardPage.plusOperator.click();  
  await dashboardPage.variableColumnOption('Spread').click();
  await dashboardPage.clearAllBtn.click();

  // Validate column name text field is cleared
  await expect(dashboardPage.customColumnFomulaTextArea).toHaveText('=');



  // Code to validate infinity value error when custom number is divided by zero
  // Set formula: select column, division operator, custom number (0)
  await dashboardPage.variableColumnOption('Moneyline').click();
  await dashboardPage.divideOperator.click(); 
  await dashboardPage.variableCustomNumberOption.click();
  await dashboardPage.customnumberInput(1).fill("0");
  await page.waitForTimeout(5000);

  // Get tabulator-field for the custom column using column name
  const columnField = await page.locator('.tabulator-col', { has: page.locator('.tabulator-col-title', { hasText: columnName }) }).getAttribute('tabulator-field');

  // Get rows inside preview table
  const rows = page.locator(".react-autoql-table-preview-container .tabulator-row");
  const rowsToValidate = Math.min(5, await rows.count());

  for (let i = 0; i < rowsToValidate; i++) {
    const cell = rows.nth(i).locator(`.tabulator-cell[tabulator-field="${columnField}"]`);
    await expect(cell).toHaveText(/∞|-∞/);
    console.log(`Row ${i + 1}: Cell value is ${await cell.innerText()}`);
  }

  // Click Cancel to close Add Custom Column window
  await dashboardPage.customColumnCancelBtn.click();
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