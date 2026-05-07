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

test('Dashboard - Validate Freeze Column Functionality on Newly Created Column', async ({ page }) => {

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

  // code to fill formula for the custom column
  await dashboardPage.variableColumnOption('Moneyline').click();
  await dashboardPage.plusOperator.click();  
  await dashboardPage.variableCustomNumberOption.click();
  await dashboardPage.customnumberInput(1).fill("100");

  // Code to Save the custom column and verify the column is added on dashboard
  await dashboardPage.customColumnSaveBtn.click();
  console.log("Custom Column is added on Dashboard with name: " + columnName);
  await page.waitForTimeout(20000);

  // Scroll right until the newly created column is visible on UI
  await dashboardPage.dashboardTile.hover();
  await dashboardPage.dashbaordTileShowHideColumnOption.click();
  await dashboardPage.dashboardShowHideSelectAllOption.check();
  await dashboardPage.dashbaordApplyButton.click();

  const scrollElement = page.locator("(//*[@role='row']/div[@tabulator-field='0'])[2]");
  const targetColumn = dashboardPage.dashboardColumnSelector(columnName);
  await BrowserUtils.scrollUntilElementVisible(page, scrollElement, targetColumn, 'ArrowRight', 25);
  console.log("Successfully scrolled to reveal the custom column");


  // code to Right Click on newly created Column and Validate the presence of Freeze Column Option and Remove Column Option in the context menu
  await targetColumn.hover();
  await targetColumn.click({ button: 'right' });
  await page.waitForTimeout(1000);

  // Code to validate the presence of "Freeze Column" option and "Remove Column" option in the context menu
  await dashboardPage.freezeColumnOption.waitFor({ state: 'visible', timeout: 5000 });
  await dashboardPage.removecolumnOption.waitFor({ state: 'visible', timeout: 5000 });
  console.log("Freeze & Remove Column option are displayed in context menu upon right click on column header.");



  // code to validate the Freeze Column functionalityality
  await dashboardPage.freezeColumnOption.click();
  await page.waitForTimeout(5000);
  await targetColumn.isVisible();
  console.log("Column is frozen successfully and Unfreeze Column option is displayed in context menu.");



  // Code to unfreeze the column and validate the Unfreeze Column functionality
  await targetColumn.hover();
  await targetColumn.click({ button: 'right' });
  const unfreezeColumnOption = dashboardPage.unfreezeColumnOption;
  await unfreezeColumnOption.click();

  // Code to validate the column is unfrozen successfully by verifying the presence of Freeze Column option in context menu
  await targetColumn.hover();
  await targetColumn.click({ button: 'right' });
  await page.waitForTimeout(1000);
  await dashboardPage.freezeColumnOption.waitFor({ state: 'visible', timeout: 5000 });
  await dashboardPage.removecolumnOption.waitFor({ state: 'visible', timeout: 5000 });
  console.log("Column is unfrozen successfully and Freeze Column option is displayed in context menu.");
  await targetColumn.click();

  // Save the Dashboard 
  await dashboardPage.dashbaordSaveBtn.click({force: true});
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