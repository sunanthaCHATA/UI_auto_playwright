import { test, expect } from '@playwright/test';
import { dmlocators, DMpage_Locators } from '../../utils/dmlocators';
import { getAppCredentials } from '../../utils/dbUtils';
import { AutoQLUtilityLibraries } from '../../utils/AutoQLUtilityLibraries';

test.afterEach(async ({ page }, testInfo) => {
  // Only pause if the test failed AND we are not in a CI environment (like Jenkins)
  if (testInfo.status !== testInfo.expectedStatus && !process.env.CI) {
    console.log(`❌ Test failed: ${testInfo.title}. Pausing for inspection...`);
    
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
  await page.getByRole('button', { name: 'Save Column' }).click();
  await page.locator('div').filter({ hasText: /^Scrolled 50 \/ 50,000\+ rows$/ }).nth(1).click();
  await chat.DM_Toolbar_ShowHide_Columns();
  await chat.DM_Toolbar_ShowHideVisibility().setChecked(false)
  await chat.checkOption('Team');
 await chat.checkOption('Goals');
 await chat.checkOption('Rank');
  await page.getByRole('button', { name: 'Apply' }).click();

 //await page.getByText('Goals', { exact: true }).click();
 // await page.locator('[data-test="react-autoql-table"]').getByText('Goals', { exact: true }).click();
// Call the versatile function
const PofTColumn = 'Goals';
  
  // Usage: Pass the 'page' fixture provided by Playwright
  await AutoQLUtilityLibraries.clickOnSortOfColumn(PofTColumn, page);

//const stats = await chat.getTooltipStats('Goals');
// Print the values
//console.log(stats.total);   // Output: Total: 9,239
//console.log(stats.average); // Output: Average: 0.185

// Assertions
//expect(stats.total).toContain('9,239');
//expect(stats.average).toContain('0.185');

});