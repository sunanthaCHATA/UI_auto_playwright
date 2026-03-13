import { test, expect } from '@playwright/test';
import {BrowserUtils} from '../../utils/generic/BrowserUtils';

import { DMPage, DMpage_Locators } from '../../utils/pages/DMPage';
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

test('Validate CustomCOl - Rank Calculation', async ({ page }) => {
  
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
  const dmPage = new DMPage(page);

  //Code to initialize variables
  const columnName =  "CustomRANK";
  const partitionByOption = "Team";
  const orderByOption =  "Goals ";
  const orderByDirection = "DESCENDING";

  // Code to launch app , login and select the project
  await loginHelper.appLogin('autoae','Sports Alpha - NHL','test_auto');

  // Navigating to the DataMessenger and run the query
  await dmHelper.runQuery('Player moving average');
  await dmChat.dmResponseTable.waitFor({ state: 'visible', timeout: 45000 });
  
  //Click on Show/Hide Column option and set the visibility of all except the used columns to false
await dmChat.dmResponseTable.hover();
await dmChat.ShowHide_Columns.click();
await dmHelper.setCheckboxValue(dmChat.ShowHide_Visibility, true);
await dmChat.ShowHideWindow_Apply.click();

  // Code to hover on Response table and click Add Custom Column
  await dmChat.dmResponseTable.hover();
  await dmChat.DM_response_table_Add_Column.click();
  await dmChat.Table_CustomButton.click();

  //Configure Custom Column Page options
await expect(dmChat.customColWindowTitle).toBeVisible();
await expect(dmChat.customColWindowTitle).toHaveText('Configure Custom Column');

await dmChat.CustomCol_RankButton.click();
await dmChat.customColumnNameInput.click();
await page.keyboard.press('Control+A');
await page.keyboard.press('Delete');
await dmChat.customColumnNameInput.fill(columnName);
await dmHelper.selectPartitionByOption(partitionByOption);
await dmHelper.selectOrderByOption(orderByOption);
await dmHelper.selectOrderByDirection(orderByDirection);
await dmChat.CustomCol_AddFunction.click();

//Validate if the Custom Column Formula Container has the selected Values
const pattern = `=RANK\\(\\s*Partition By\\s*${partitionByOption.trim()}\\s*,\\s*Ordered by\\s*${orderByOption.trim()}\\s*${orderByDirection}\\s*\\)`;
const formulaRegex = new RegExp(pattern);
await expect(dmChat.CustomColFormula_Container).toHaveText(formulaRegex);
await dmChat.CustomCol_SaveColumn.click();

//Validate the Response Table for the new Column
await page.waitForTimeout(15000);
await dmHelper.waitForTableToLoadAndVerifyColumn(columnName);

//Click on Show/Hide Column option and set the visibility of all except the used columns to false
await dmChat.dmResponseTable.hover();
await dmChat.ShowHide_Columns.click();
await dmHelper.setCheckboxValue(dmChat.ShowHide_Visibility, false);
await dmHelper.setFieldCheckbox(partitionByOption, true);
await dmHelper.setFieldCheckbox(orderByOption, true);
await dmHelper.setFieldCheckbox(columnName, true);
await dmChat.ShowHideWindow_Apply.click();
//Click on Sort of Goals and Filter the Team with the first grid value
//await dmChat.clickTableColumnSorter(orderByOption);
await dmChat.dmResponseTable.hover();
await dmChat.filterResponseTable.click();
await dmHelper.filterByColumnName(partitionByOption);
await dmChat.dmResponseTable.hover();
await dmHelper.clickTableColumnSorter('Goals');

//Validate Rank Calculation
const result = await dmHelper.validateRankingLogic(2, 6, 'Goals', 'CustomRANK');
console.log(result);
expect(result).toBe('Rank calculation is correct and validated successfully');
}); 

