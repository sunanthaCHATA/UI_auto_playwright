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

test('Validate Add Column functionality on Dashboard', async ({ page }) => {

  // Code to initialize the required utils and helper classes
  const browserUtils = new BrowserUtils();
  const loginHelper = new LoginHelper(page);
  const dmHelper = new DMHelper(page);
  const dmChat = new DMPage(page);
  const dashboardPage = new DashboardPage(page);

  // Code to delcare and initialize required variables
  const datetimestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dashboardName = `Test Dashboard ${datetimestamp}`;
  const columnName = "Custom Moneyline " + datetimestamp;

  // Code to launch app , login and select the project
  await loginHelper.appLogin('autoae','Sports Alpha - NHL','test_auto');

  // Navigating to the DataMessenger and run the query
  await dmHelper.runQuery('multi book live odds');
  await dmChat.dmResponseTable.waitFor({ state: 'visible', timeout: 45000 });
  
  // Code to hover on Response table and click More options
  await dmChat.dmResponseTable.hover();
  await dmChat.dmResponseTableMoreOptions.click();
  await dmChat.dmResponseTableAddToDashboardOption.click();

  // Code to add a new column on Dashboard
  await dashboardPage.createNewDashboardRadioBtn.waitFor({ state: 'visible', timeout: 10000 });
  await dashboardPage.createNewDashboardRadioBtn.click();
  await dashboardPage.dashboardNameInput.fill(dashboardName);
  await dashboardPage.addToDashboardBtn.click();

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
  const ExistingColumnName = await page.locator("(//*[@class='tabulator-header']//*[@class='tabulator-col-title'])[1]").innerText();
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

}); 
