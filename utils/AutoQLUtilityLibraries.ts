// AutoQLUtilityLibraries.ts
//import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { Page, Locator } from '@playwright/test';


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

  static async validateTextPresence(locator: Locator, texts: string | string[]): Promise<void> {
    // Convert a single string to an array so we can use the same logic
    const textArray = Array.isArray(texts) ? texts : [texts];

    for (const text of textArray) {
        // toContainText is case-sensitive by default and retries until found
        await expect(locator).toContainText(text);
    }
}
static async checkElementPresent(page: Page, xpath: string): Promise<string> {
        // Playwright automatically waits for the element to be present
        const textFieldText = page.locator(xpath).filter({ visible: true }).first().innerText();
        // .innerText() is usually the best replacement for Selenium's .getText()
       // const textFieldText = await element.innerText();
        return textFieldText;
    }

static async getTextFromField(page: Page, xpath: string): Promise<string> {
        // Playwright automatically waits for the element to be present
        const textFieldText = page.locator(xpath).filter({ visible: true }).first().innerText();
        // .innerText() is usually the best replacement for Selenium's .getText()
       // const textFieldText = await element.innerText();
        return textFieldText;
    }

    
static async isElementVisible(page: Page, xpath: string): Promise<boolean> {
    // We use the 'visible' filter to ensure we aren't detecting 
    // hidden background elements (like your hidden columns)
    return await page.locator(xpath).filter({ visible: true }).first().isVisible();
}
static async filterData(xpath: string, value: string, page: Page): Promise<void> {
        const field = page.locator(xpath).filter({ visible: true }).first();
          await field.fill(value);
          await field.press('Enter');
        console.log(`Successfully Entered Text: ${value} into text field xpath: ${xpath}`);
    }
    
}

