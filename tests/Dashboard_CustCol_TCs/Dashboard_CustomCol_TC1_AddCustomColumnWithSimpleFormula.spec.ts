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
  
    console.log('DB Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});
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

  // code to validate the newly added column Data
  // Get column field indexes
  const moneylineField = await page.getByRole('columnheader', { name: 'Moneyline', exact: true }).getAttribute('tabulator-field');
  const customColumnField = await page.getByRole('columnheader', { name: columnName, exact: true }).getAttribute('tabulator-field');

  // Get table rows
  const rows = page.locator(".dashboard-tile-response-container .tabulator-row");
  const rowsToValidate = Math.min(5, await rows.count());

  for (let i = 0; i < rowsToValidate; i++) {
    const moneylineValue = parseFloat(await rows.nth(i).locator(`.tabulator-cell[tabulator-field="${moneylineField}"]`).textContent() || "0" );
    const customValue = parseFloat(await rows.nth(i).locator(`.tabulator-cell[tabulator-field="${customColumnField}"]`).textContent() || "0");
    const expectedValue = moneylineValue + 100;

    expect(customValue).toBeCloseTo(expectedValue, 2);
    console.log(`Row ${i + 1}: Moneyline = ${moneylineValue}, Custom Column = ${customValue}, Expected Custom Column = ${expectedValue}`);
  }

  // Save the dashboard after adding the column
  await dashboardPage.dashbaordSaveBtn.click();

}); 
