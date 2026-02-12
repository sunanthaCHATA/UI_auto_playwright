// AutoQLUtilityLibraries.ts
import { Page } from '@playwright/test';

export class AutoQLUtilityLibraries {
  /**
   * Clicks the sorter icon for a specific column in a Tabulator-style table.
   * @param columnName The visible text of the column header
   * @param page The Playwright Page object
   */
  static async clickOnSortOfColumn(columnName: string, page: Page): Promise<void> {
    // Playwright automatically detects XPath if it starts with //
    const sortColumn = page.locator(`//div[text()='${columnName}']/parent::div//div[contains(@class, 'sorter')]`);
    
    // Playwright auto-waits for the element to be visible and stable before clicking
    await sortColumn.click();
  }
}