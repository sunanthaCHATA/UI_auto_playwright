import { Page, Locator, expect } from '@playwright/test';

export class BrowserUtils {

  /**
   * Get current URL
   */
  static async getCurrentUrl(page: Page): Promise<string> {
    console.log('[BrowserUtils] Getting current URL');
    return page.url();
  }

  /**
   * Get page title
   */
  static async getPageTitle(page: Page): Promise<string> {
    console.log('[BrowserUtils] Getting page title');
    return await page.title();
  }


  /**
   * Refresh the page
   */
  static async refreshPage(page: Page): Promise<void> {
    console.log('[BrowserUtils] Refreshing page');
    await page.reload();
  }

  /**
   * Clicks the sorter icon for a specific column in a Tabulator-style table.
   * @param columnName The visible text of the column header
   * @param page The Playwright Page object
   */
  static async clickOnSortOfColumn(columnName: string, page: Page): Promise<void> {
    const sortColumn = page.locator(`//div[text()='${columnName}']/parent::div//div[contains(@class, 'sorter')]`);
    await sortColumn.click();
  }

  static async validateTextPresence(locator: Locator, texts: string | string[]): Promise<void> {
    const textArray = Array.isArray(texts) ? texts : [texts];
    for (const text of textArray) {
      await expect(locator).toContainText(text);
    }
  }

  static async checkElementPresent(page: Page, xpath: string): Promise<string> {
    const textFieldText = page.locator(xpath).filter({ visible: true }).first().innerText();
    return textFieldText;
  }

  static async getTextFromField(page: Page, xpath: string): Promise<string> {
    const textFieldText = page.locator(xpath).filter({ visible: true }).first().innerText();
    return textFieldText;
  }

  static async isElementVisible(page: Page, xpath: string): Promise<boolean> {
    return await page.locator(xpath).filter({ visible: true }).first().isVisible();
  }

  static async filterData(xpath: string, value: string, page: Page): Promise<void> {
    const field = page.locator(xpath).filter({ visible: true }).first();
    await field.fill(value);
    await field.press('Enter');
    console.log(`Successfully Entered Text: ${value} into text field xpath: ${xpath}`);
  }
}

