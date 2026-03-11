import { Page } from '@playwright/test';

export const DashboardPage_Locators = {

    // Create a mew dashboard
    createNewDashboardRadioBtn: "//*[text()='Create New Dashboard']",
    dashboardNameInput: "//label[text()='Dashboard Name']/following-sibling::div//input",
    addToDashboardBtn: "//span[text()='Add to Dashboard']",  

    // Dashboard Tile locators
    dashboardTile: "//*[@data-test='react-autoql-dashboard-tile']",
    
    // Save and Close button
    dashbaordSaveBtn: "//button[@data-tooltip-html='Save and close']",
    dashboardCancelBtn: "//button[@data-tooltip-html='Close without saving']",

    // Add Custom Column locators
    addColumnBtn: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-test='react-autoql-table-add-column-btn']",
    addcustomColumnOption: "//*[@class='context-menu-list']/li[text()='Custom...']",

    // Custom  Column Pop-up locators
    configureCustomColumnTitle: "//*[@class='react-autoql-modal-header-title' and text()='Configure Custom Column']",
    customColumnNameInput: "//input[@label='Column Name']",
    variableColumnOption: "//*[@class='react-autoql-formula-builder-calculator-buttons-container']//*[text()='ColumnName']",
    variableCustomNumberOption: "//*[@class='custom-column-modal']//*[text()='Custom Number...']",
    clearAllBtn: "//div[contains(@class , 'react-autoql-input-label-clickable')][text()='Clear All']",

    // Custom Column Operators
    plusOperator: "//*[@class='react-autoql-formula-builder-column-container']//span[contains(@class, 'react-autoql-icon-plus')]",
    minusOperator: "//*[@class='react-autoql-formula-builder-column-container']//span[contains(@class, 'react-autoql-icon-minus')]",
    multiplyOperator: "//*[@class='react-autoql-formula-builder-column-container']//*[contains(@class, 'react-autoql-icon-close')]",
    divideOperator: "//*[@class='react-autoql-formula-builder-column-container']//span[contains(@class, 'react-autoql-icon-divide')]",

    // formula builder locators
    customColumnFomulaTextArea: "//span[contains(@class,'react-autoql-operator-select-wrapper')]",
    customnumberInput: "//*[@class='react-autoql-formula-builder-container']//input[@type='number']",

    // Custom Column Save Column & Cancel Buttons
    customColumnSaveBtn: "//*[@class='react-autoql-modal-footer']//*[text()='Save Column']",
    customColumnCancelBtn: "//*[@class='react-autoql-modal-footer']//*[text()='Cancel']",

    // Custom Column - Response Table Locators
    responseTableColTitle :"//*[@class='react-autoql-modal-body ']//*[@class='tabulator-col-title']",
    responseTableRows: "//*[@class='react-autoql-modal-body ']//*[contains(@class,'tabulator-row')]",

    // Dashboard Tile - Column Selector
    dashboardColumnSelector: "//*[@data-test='react-autoql-dashboard-tile']//*[text()='ColumnName']",

}

export class DashboardPage {

    constructor(private page: Page) {}

    get createNewDashboardRadioBtn() {
        return this.page.locator(DashboardPage_Locators.createNewDashboardRadioBtn);
    }

    get dashboardNameInput() {
        return this.page.locator(DashboardPage_Locators.dashboardNameInput);
    }

    get addToDashboardBtn() {
        return this.page.locator(DashboardPage_Locators.addToDashboardBtn);
    }

    get dashboardTile() {
        return this.page.locator(DashboardPage_Locators.dashboardTile);
    }

    get dashbaordSaveBtn() {
        return this.page.locator(DashboardPage_Locators.dashbaordSaveBtn);
    }

    get dashboardCancelBtn() {
        return this.page.locator(DashboardPage_Locators.dashboardCancelBtn);
    }

    get addColumnBtn() {
        return this.page.locator(DashboardPage_Locators.addColumnBtn);
    }

    get addcustomColumnOption() {
        return this.page.locator(DashboardPage_Locators.addcustomColumnOption);
    }

    get configureCustomColumnTitle() {
        return this.page.locator(DashboardPage_Locators.configureCustomColumnTitle);
    }

    get customColumnNameInput() {
        return this.page.locator(DashboardPage_Locators.customColumnNameInput);
    }

    variableColumnOption(columnName: string) {
        return this.page.locator(DashboardPage_Locators.variableColumnOption.replace('ColumnName', columnName));
    }

    get clearAllBtn() {
        return this.page.locator(DashboardPage_Locators.clearAllBtn);
    }   

    get plusOperator() {
        return this.page.locator(DashboardPage_Locators.plusOperator);
    }

    get minusOperator() {
        return this.page.locator(DashboardPage_Locators.minusOperator);
    }

    get multiplyOperator() {
        return this.page.locator(DashboardPage_Locators.multiplyOperator);
    }

    get divideOperator() {
        return this.page.locator(DashboardPage_Locators.divideOperator);
    }

    get variableCustomNumberOption() {
        return this.page.locator(DashboardPage_Locators.variableCustomNumberOption);
    }

    get customColumnFomulaTextArea() {
        return this.page.locator(DashboardPage_Locators.customColumnFomulaTextArea);
    }

    customnumberInput(index: number) {
        return this.page.locator(`(${DashboardPage_Locators.customnumberInput})[${index}]`);
    }

    get customColumnSaveBtn(){
        return this.page.locator(DashboardPage_Locators.customColumnSaveBtn);
    }

    get customColumnCancelBtn(){
        return this.page.locator(DashboardPage_Locators.customColumnCancelBtn);
    }

    get responseTableColTitle() {
        return this.page.locator(DashboardPage_Locators.responseTableColTitle);
    }

    get responseTableRows() {
        return this.page.locator(DashboardPage_Locators.responseTableRows);
    }

    dashboardColumnSelector(columnName: string){
        return this.page.locator(DashboardPage_Locators.dashboardColumnSelector.replace('ColumnName', columnName));
    }

}
