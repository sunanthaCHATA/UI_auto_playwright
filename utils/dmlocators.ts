import { test, expect } from '@playwright/test';
export const DMpage_Locators = {
    
    DM_FullScreen: "xpath=//*[@data-tooltip-content='Full Screen']",
    DM_AddColumn: "xpath=//span[contains(@class, 'react-autoql-icon-plus')]",
    DM_Project_Dropdown: "xpath=//*[@title='Change the selected Project']",
	DM_CustomButton: "xpath=//*[@class='more-options-menu react-autoql-add-column-menu']/ul/li[contains(text(), 'Custom')]",

    // ... rest of your XPaths
};

export class dmlocators {
    constructor(private page: Page) {}

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
}