import { test, expect } from '@playwright/test';
import { dmlocators, DMpage_Locators } from '../../utils/dmlocators';
import { getAppCredentials } from '../../utils/dbUtils';
import { AutoQLUtilityLibraries } from '../../utils/AutoQLUtilityLibraries';

test.afterEach(async ({ page }, testInfo) => {
  // Only pause if the test failed AND we are not in a CI environment (like Jenkins)
  if (testInfo.status !== testInfo.expectedStatus && !process.env.CI) {
    console.log(`Test failed: ${testInfo.title}. Pausing for inspection...`);
    
    // Disable the default timeout so the browser doesn't close while you're inspecting
    testInfo.setTimeout(0); 
    
    await page.pause();
  }
});
test('test', async ({ page }) => {
  const chat = new dmlocators(page);

const config = await getAppCredentials('test_auto');
  await page.goto(config.appUrl);
  await page.getByLabel('Application ID *').click();
  await page.getByLabel('Application ID *').fill(config.appId);
  await page.locator('button').click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.fill('#username', config.appUser); 
  await page.fill('#password', config.appPass);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await chat.clickProjDropdown();
  await page.getByText('Sports Alpha - NHL').click();
  await chat.DM_DMHandle();
  await chat.DM_quickTopicsPlayerMovingAvg();
  await chat.DM_quickTopicsSubmit();
  await chat.DM_Toolbar_ShowHide_Columns();
  await chat.DM_Toolbar_ShowHideVisibility().setChecked(true)
  await chat.DM_ShowHide_Apply();

  await page.locator('div').filter({ hasText: /^Scrolled 50 \/ 50,000\+ rows$/ }).nth(1).click();
  await chat.clickPlusIcon();
  await chat.clickCustomButton();
  await page.getByRole('textbox', { name: 'eg. "Difference"' }).fill('');
  await expect(page.locator(DMpage_Locators.DM_CCemptyCOlError)).toBeVisible();

  for (let i = 1; i <= 2; i++) {
  await page.getByRole('textbox', { name: 'eg. "Difference"' }).fill('Rank');
  await page.getByRole('button', { name: 'Rank' }).click();
  await page.locator('[data-test="react-autoql-select"]').first().click();
  await page.locator('.scrollbar-container.react-autoql-custom-scrollbars.always-visible > .ps__rail-y').click();
  await page.locator('span').filter({ hasText: /^Team$/ }).click();
  await page.locator('div').filter({ hasText: /^None$/ }).click();
  await page.locator('span').filter({ hasText: /^Goals$/ }).click();
  await page.locator('span').filter({ hasText: 'Select an item' }).first().click();
  await page.getByText('DESCENDING').click();
  await page.getByRole('button', { name: 'Add Function' }).click();
  const expectedValues = ['RANK',' Partition By Team',  'Ordered by Goals', 'DESCENDING'];
  await AutoQLUtilityLibraries.validateTextPresence(page.locator(DMpage_Locators.DM_CCFormulaContainer), expectedValues );
  await expect(page.locator(DMpage_Locators.DM_CustomcolFormula_valid)).toBeVisible();
  if(i==1)
  {
  await chat.DM_CustomcolFormula_ClearAll();
  }
  else
  {
    break;
  }
  }
  await page.getByRole('button', { name: 'Save Column' }).click();
  await page.locator('div').filter({ hasText: /^Scrolled 50 \/ 50,000\+ rows$/ }).nth(1).click();
  await chat.DM_Toolbar_ShowHide_Columns();
  await chat.DM_Toolbar_ShowHideVisibility().setChecked(false)
  await chat.checkOption('Team');
  await chat.checkOption('Goals');
  await chat.checkOption('Rank');
  await page.getByRole('button', { name: 'Apply' }).click();
  
 const RankCol = 'Goals';

  await AutoQLUtilityLibraries.clickOnSortOfColumn(RankCol, page); // Sort the column Goals
  await page.waitForTimeout(3000); // 3000ms = 3 seconds
  await page.locator('.tabulator-loader').waitFor({ state: 'hidden' });
  await chat.DM_response_Filter_table(); // Filter
  await page.waitForTimeout(3000); // 3000ms = 3 seconds
  const isTableVisible = await AutoQLUtilityLibraries.isElementVisible(page, DMpage_Locators.DM_TableFilterBox);
if (isTableVisible) {
    console.log("FirstColumn Filterbox is visible");
    // execute your steps
} else {
    console.log("FirstColumn Filterbox is not visible");
}
const firstCell = await AutoQLUtilityLibraries.getTextFromField(page, DMpage_Locators.DM_ColCellVal);
  
  console.log(`The text is: ${firstCell}`); 

  await AutoQLUtilityLibraries.filterData(
    DMpage_Locators.DM_TableFilterBox, firstCell, page); // Filter with the First element

      //await expect(page.locatorDMpage_Locators.DM_CCemptyCOlError)).toBeVisible();
// Use "xpath=" to tell Playwright exactly what engine to use
//await page.locator(`xpath=(${DMpage_Locators.DM_responseTableColumns})[//text()='Team']`).click({ button: 'right' });

await page.locator(DMpage_Locators.DM_responseTableColumns)
          .filter({ hasText: 'Team' })
          .click({ button: 'right' });
await page.locator(DMpage_Locators.DM_RemoveColumn).click();
await page.waitForTimeout(2000);

const result = await chat.validateRankingLogic(2, 9);
console.log(result);

}); 
