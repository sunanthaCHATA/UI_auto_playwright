import { Page, Locator } from '@playwright/test';

export const DMpage_Locators = {

    // Data Messenger Icon and title
    dmIcon: "//*[@data-test='data-messenger-handle']/span[@data-test='react-autoql-icon']",
    dmTitle: "//*[@class='header-title' and text()='Data Messenger']",

    // Data Messenger drawer
    dmQueryInput: "//*[@class='react-autoql-chatbar-input-container']//input",
    dmQuerySendBtn: "//*[@class='react-autoql-input-send-button']",

    // Data messenger response table
    dmResponseTable: "//*[@class='drawer-content-wrapper']//*[@data-test='react-autoql-table']",

    // Response Table - Charts & Other options
    dmResponseTableMoreOptions: "//*[@class='drawer-content-wrapper']//button[@data-tooltip-html='More options']",
    dmResponseTableAddToDashboardOption: "//*[text()='Add to Dashboard...']",
    
};

export class DMPage {
    constructor(private page: Page) {}

    get dmIcon() {
        return this.page.locator(DMpage_Locators.dmIcon);
    }

    get dmTitle() {
        return this.page.locator(DMpage_Locators.dmTitle);
    }

    get dmQueryInput() {
        return this.page.locator(DMpage_Locators.dmQueryInput);
    }

    get dmQuerySendBtn() {
        return this.page.locator(DMpage_Locators.dmQuerySendBtn);
    }

    get dmResponseTable() {
        return this.page.locator(DMpage_Locators.dmResponseTable);
    }

    get dmResponseTableMoreOptions() {
        return this.page.locator(DMpage_Locators.dmResponseTableMoreOptions);
    }

    get dmResponseTableAddToDashboardOption() {
        return this.page.locator(DMpage_Locators.dmResponseTableAddToDashboardOption);
    }
}