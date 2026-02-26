import { test, expect } from '@playwright/test';
import { Page, Locator } from '@playwright/test';

export const DMpage_Locators = {
    
    DM_DMHandle: "xpath=//*[@data-test='data-messenger-handle']",
    DM_FullScreen: "xpath=//*[@data-tooltip-content='Full Screen']",
    DM_AddColumn: "xpath=//span[contains(@class, 'react-autoql-icon-plus')]",
    DM_Project_Dropdown: "xpath=//*[@title='Change the selected Project']",
	DM_CustomButton: "xpath=//*[@class='more-options-menu react-autoql-add-column-menu']/ul/li[contains(text(), 'Custom')]",
    DM_quickTopicsPlayerMovingAvg: "xpath=//button[(text()='Player moving average')]",
    DM_quickTopicsSubmit: "xpath=//*[@data-tooltip-content='Submit Query']",
    DM_responseTableColumns: "xpath=//*[@class='tabulator-col-title-holder']" ,
    DM_RemoveColumn: "xpath=//*[@class='context-menu-list']/li[contains(text(), 'Remove Column')]",
    DM_Toolbar_ShowHide_Columns: "xpath=//*[@data-tooltip-html='Show/hide columns']",
  //  DM_Toolbar_ShowHideVisibility: "xpath=(//div[contains(text(),'Visibility')]//parent::div/div//input[@type='checkbox'])[1]",
    DM_ShowHide_Apply: "xpath=//div[text()='Apply']",
    DM_CCemptyCOlError: "xpath=//*[contains(text(), 'Column name cannot be empty')]",
    DM_CCFormulaContainer: "xpath=//div[contains(@class, 'react-autoql-formula-builder-section')]",
   //DM_Customcol_partitionby: "xpath=//div[text()='Partition By Column']/following-sibling::div[@data-test='react-autoql-select']",
	DM_CustomcolFormula_valid: "xpath=//*[contains(@class, 'formula-builder-validation-message-success')][contains(text(), 'Valid')]",
	DM_CustomcolFormula_ClearAll: "xpath=//*[text()='Clear All']",

    DM_response_Filter_table: "xpath=//*[@data-tooltip-html='Filter table']",

    DM_ColCellVal: `xpath=(//div[@role='row']/div[@role='gridcell'])`,

    DM_TableFilterBox: "xpath=(//input[@placeholder='Filter'])[1]",

    // ... rest of your XPaths
};

export class dmlocators {
    constructor(private page: Page) {}

    async DM_DMHandle() {
        await this.page.locator(DMpage_Locators.DM_DMHandle).click();
    }
    async openFullScreen() {
        await this.page.locator(DMpage_Locators.DM_FullScreen).click();
    }

    // ACTION: Another skill
  
    async clickPlusIcon() {
        await this.page.locator(DMpage_Locators.DM_AddColumn).click();
    }
     async clickProjDropdown() {
        await this.page.locator(DMpage_Locators.DM_Project_Dropdown).click();
    }
    async clickCustomButton() {
        await this.page.locator(DMpage_Locators.DM_CustomButton).click();
    }
     async DM_quickTopicsPlayerMovingAvg() {
        await this.page.locator(DMpage_Locators.DM_quickTopicsPlayerMovingAvg).click();
    }
    async DM_quickTopicsSubmit() {
        await this.page.locator(DMpage_Locators.DM_quickTopicsSubmit).click();
    }
     async DM_Toolbar_ShowHide_Columns() {
        await this.page.locator(DMpage_Locators.DM_Toolbar_ShowHide_Columns).click();
    }

     async DM_CustomcolFormula_ClearAll() {
        await this.page.locator(DMpage_Locators.DM_CustomcolFormula_ClearAll).click();
    }

    DM_response_Filter_table() {
           return this.page.locator(DMpage_Locators.DM_response_Filter_table).click(); 
    }

    DM_Toolbar_ShowHideVisibility() {
    return this.page.locator("xpath=(//div[contains(text(),'Visibility')]//parent::div/div//input[@type='checkbox'])[1]");
  }
    async DM_ShowHide_Apply() {
        await this.page.locator(DMpage_Locators.DM_ShowHide_Apply).click();
    }

  
    /*
    DM_Customcol_partitionbyDropdown(optionText: string) {
    return this.page.locator("xpath=//div[text()='Partition By Column']/following-sibling::div[@data-test='react-autoql-select']");
}
    */

    DM_Customcol_OrderbyColDropdown(optionText: string) {
    return this.page.locator("xpath=//div[text()='Order By Column *']/following-sibling::div[@data-test='react-autoql-select']");
    }
     DM_Customcol_OrderbyDirectionDropdown(optionText: string) {
    return this.page.locator("xpath=//div[text()='Order By Direction']/following-sibling::div[@data-test='react-autoql-select']");
    }

   async selectPartitionByOption(optionText: string) {
    // 1. Open the dropdown
    const container = this.page.locator('div').filter({ hasText: 'Partition By Column' });
    const dropdown = container.locator('[data-test="react-autoql-select"]').first();
    await dropdown.click();

    // 2. Target the option
    // We search globally because React menus often "jump" to the bottom of the HTML
    const option = this.page.getByText(optionText, { exact: false }).last();

    // 3. THE FIX: Scroll the option into view INSIDE the menu
    // This ensures that if the menu has a scrollbar, it moves to 'Team'
    await option.scrollIntoViewIfNeeded();

    // 4. Click it
    await option.click();
}

async checkOption(labelName: string) {
    const row = this.page.locator('div').filter({ hasText: new RegExp(`^${labelName}$`) });
    const checkbox = row.locator('[data-test="react-autoql-checkbox"]');
    
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
}

async getTooltipStats(columnName: string) {
    // 1. Find the header - using a broader locator to ensure we hit the hit-box
    const columnHeader = this.page.getByRole('columnheader').filter({ hasText: columnName }).first();
    
    // 2. Perform the hover and wait a beat for the animation
    await columnHeader.scrollIntoViewIfNeeded();
    await columnHeader.hover();
    await this.page.waitForTimeout(500); // Wait for the React animation to finish

    // 3. Find the tooltip content wrapper globally
    // We target the wrapper directly without the 'has' filter first to see if it even exists
    const tooltip = this.page.locator('.react-tooltip-content-wrapper').last();

    // 4. Wait for visibility
    await tooltip.waitFor({ state: 'visible', timeout: 5000 });

    // 5. Verification: Check if this is the RIGHT tooltip
    const title = await tooltip.locator('.selectable-table-tooltip-title').innerText();
    if (!title.includes(columnName)) {
        throw new Error(`Found a tooltip, but it's for '${title}' instead of '${columnName}'`);
    }

    // 6. Extract the values using a more direct locator
    const totalText = await tooltip.innerText(); // Grab all text and parse
    
    // We use a helper to extract the lines to be extra versatile
    const lines = totalText.split('\n');
    const totalLine = lines.find(l => l.includes('Total:')) || '';
    const averageLine = lines.find(l => l.includes('Average:')) || '';

    return {
        total: totalLine.trim(),
        average: averageLine.trim()
    };
    
}

async validateRankingLogic(startRow: number, endRow: number) {
    const goalsArray: number[] = [];
    const ranksArray: number[] = [];

    for (let i = startRow; i <= endRow; i++) {
        // dynamic XPaths
        const xpathGoals = `((//div[@role='row'])[${i}]//div[@role='gridcell' and not(contains(@style, 'display: none'))])[1]`;
        const xpathRanks = `((//div[@role='row'])[${i}]//div[@role='gridcell' and not(contains(@style, 'display: none'))])[2]`;

        // Extract values
        const goalVal = await this.page.locator(`xpath=${xpathGoals}`).textContent();
        const rankVal = await this.page.locator(`xpath=${xpathRanks}`).textContent();

        // Push to arrays (converting strings to numbers)
        goalsArray.push(Number(goalVal?.trim()));
        ranksArray.push(Number(rankVal?.trim()));
    }

    // --- Validation Logic (1224 Ranking) ---
    const sortedGoals = [...goalsArray].sort((a, b) => b - a);

    for (let i = 0; i < goalsArray.length; i++) {
        const currentGoal = goalsArray[i];
        const actualRank = ranksArray[i];

        const expectedRank = sortedGoals.indexOf(currentGoal) + 1;

        if (actualRank !== expectedRank) {
            throw new Error(
                `Row ${i + startRow} Mismatch! Goal: ${currentGoal}, Expected Rank: ${expectedRank}, Actual: ${actualRank}`
            );
        }
    }

    return 'rank calculation is correct and validated successfully';
}

}