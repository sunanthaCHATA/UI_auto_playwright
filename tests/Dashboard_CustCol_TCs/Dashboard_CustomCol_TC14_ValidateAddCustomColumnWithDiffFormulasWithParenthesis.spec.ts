
import { test, expect, Page } from '@playwright/test';
import { DashboardPage } from '../../utils/pages/DashboardPage';
import { LoginHelper } from '../../utils/helpers/LoginHelper';
import { DashboardHelper } from '../../utils/helpers/DashboardHelper';


const testCases = [
  { name: "Single Parenthesis Block", formula: "(Goals+Points)", invalid: false },
  { name: "Nested Parentheses", formula: "((Goals-99)*Points)" , invalid: false}, 
  { name: "Multiple Independent Blocks", formula: "(Goals+Points)/(Goals-Assists)" , invalid: false}, 
  { name: "Custom Number within Parens", formula: "(Goals-1.5)" , invalid: false},
  { name: "Unmatched Parenthesis Opening", formula: "(Goals+ Points", invalid: true },
  { name: "Unmatched Parenthesis Closing", formula: "(Goals+Points)", finalFormula: "Goals+Points)",validationcondition: "RemoveStartingParen", invalid: true }, 
  { name: "Empty Parentheses", formula: "Goals+(Points)", finalFormula: "Goals+()",validationcondition: "RemoveColumnwithinParens", invalid: true } 
];


test.beforeEach(async ({ page }) => {
  const loginHelper = new LoginHelper(page);
  await loginHelper.appLogin('autoae', 'Sports Alpha - NHL', 'test_auto');
});


testCases.forEach(({ name, formula, finalFormula, validationcondition, invalid }) => {

  test(`Dashboard Formula Test - ${name}`, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    const dashboardHelper = new DashboardHelper(page);

    const shortTs = Date.now();
    const dashboardName = `Test Dashboard ${shortTs}`;
    const columnName = `CM_${shortTs}`;

    // -----------------------------
    // Create Dashboard
    // -----------------------------

    // check "Create your first Dashboard" text is visible, if not click on create new dashboard button
    const createFirstDashboardText = page.locator('text=Create your first Dashboard');
    if (await createFirstDashboardText.isVisible()) {
      await page.locator("//button[.//span[text()='Dashboard']]").click();
    } else {
      console.log("Existing dashboards found - clicking 'Create New Dashboard' button");
      await dashboardPage.createNewDashboardBtn.click();
    }

    // await dashboardPage.createNewDashboardBtn.click();
    await dashboardPage.dashboardNameInput.fill(dashboardName);
    await dashboardPage.createDashboardBtn.click();
    await page.waitForTimeout(5000);

    await dashboardPage.dashboardRunQueryBtn.fill('all team game stats');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(10000);

    await dashboardPage.dashboardTile.waitFor({ state: 'visible', timeout: 10000 });

    // -----------------------------
    // Add Custom Column
    // -----------------------------
    await dashboardPage.addColumnBtn.click();
    await dashboardPage.addcustomColumnOption.click();

    await dashboardPage.configureCustomColumnTitle.waitFor({ state: 'visible', timeout: 10000 });

    await dashboardPage.customColumnNameInput.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await dashboardPage.customColumnNameInput.fill(columnName);

    // -----------------------------
    // ✅ Apply Formula (Dynamic)
    // -----------------------------
    await dashboardHelper.executeFormula(page,dashboardPage, formula, finalFormula , validationcondition);

    // -----------------------------
    // ✅ Validation
    // -----------------------------
    if (invalid) {
      console.log(`Validating negative scenario for formula: ${formula}`);

      // Example: Save button should be disabled OR error visible
      await expect(dashboardPage.invalidFormulaError).toBeVisible({ timeout: 5000 });
      await expect(dashboardPage.customColumnSaveBtn).toHaveClass(/disabled/, { timeout: 5000 });

      console.log("Invalid formula correctly prevented column creation");
      await dashboardPage.customColumnCancelBtn.click();

    } else {
      await dashboardPage.customColumnSaveBtn.click();

      console.log(`Custom Column created for formula: ${formula}`);
      await page.waitForTimeout(10000);
      await dashboardPage.dashboardColumnSelector(columnName).waitFor({ state: 'visible', timeout: 20000 });

      // -----------------------------
      // ✅ Optional Value Validation
      // -----------------------------
      const rows = page.locator(".dashboard-tile-response-container .tabulator-row");
      const count = Math.min(3, await rows.count());

      for (let i = 0; i < count; i++) {
        const customValueText = await rows
          .nth(i)
          .locator(`.tabulator-cell[tabulator-field]`)
          .last()
          .textContent() || "0";

        const customValue = parseFloat(customValueText);
        expect(customValue).not.toBeNaN();
      }
    }

    // -----------------------------
    // Save Dashboard
    // -----------------------------
    await dashboardPage.dashbaordSaveBtn.click();
    await page.waitForTimeout(5000);

    console.log("Dashboard saved successfully");
  });

});

// -----------------------------
// ✅ Cleanup
// -----------------------------
test.afterEach(async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.dashboardOptionsBtn.click();
  await dashboardPage.dashboardDeleteOption.click();
  await dashboardPage.deleteDashboardConfirmBtn.click();
  await page.waitForTimeout(5000);

  console.log("Dashboard deleted after test");
});

