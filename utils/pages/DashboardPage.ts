import { Page, Download } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export enum AxisType {
    X_AXIS = 'X_AXIS',
    Y_AXIS = 'Y_AXIS',
    BOTH = 'BOTH'
}

export const DashboardPage_Locators = {

    // Create a new dashboard
    createNewDashboardBtn : "//button//*[text()='NEW DASHBOARD']",
    createFirstDashboardBtn: "//button[@type='button']//*[text()='Dashboard']",
    dashboardRunQueryBtn: "//input[@class='dashboard-tile-autocomplete-input']",
    createDashboardBtn : "//span[text()='Create Dashboard']",
    createNewDashboardRadioBtn: "//*[text()='Create New Dashboard']",
    dashboardNameInput: "//label[text()='Dashboard Name']/following-sibling::div//input",
    addToDashboardBtn: "//span[text()='Add to Dashboard']",  
    dashboardOptionsBtn: "//*[@data-tooltip-html='Options']",
    dashboardDeleteOption: "//*[@class='popover-container-content ']//*[text()='Delete Dashboard']",
    deleteDashboardConfirmBtn: "//*[@class='react-autoql-modal-footer']//button/*[text()='Delete Dashboard']",


    // Dashboard Tile locators
    dashboardTile: "//*[@data-test='react-autoql-dashboard-tile']",
    dashboardTileResponseContainer: "//*[@data-test='react-autoql-dashboard-tile']//*[@class='dashboard-tile-response-container']",
    dashboardFirstColumnHeader : "(//*[@class='tabulator-header']//*[@class='tabulator-col-title'])[1]",

    // Dashboard Tile Hover - Options locators
    dashboardTileFilterOption: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Filter table']",
    dashbaordTileShowHideColumnOption: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Show/hide columns']",
    dashbaordApplyButton : "//button/*[text()='Apply']",


    // Show/Hide Column Locators
    dashboardShowHideSelectAllOption: "(//input[@data-test='react-autoql-checkbox'])[1]",
    dashboardShowHideColumnCheckbox: "//div[contains(text(),'ColumnName')]/ancestor::div[contains(@class,'react-autoql-list-item')]//input[@type='checkbox']",


    // Save and Close button
    dashbaordSaveBtn: "//button[@data-tooltip-html='Save and close']",
    dashboardCancelBtn: "//button[@data-tooltip-html='Close without saving']",

    // Add Custom Column locators
    addColumnBtn: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-test='react-autoql-table-add-column-btn']",
    addcustomColumnOption: "//*[@class='context-menu-list']/li[text()='Custom...']",
    removecolumnOption: "//*[@class='context-menu-list']//li[text()='Remove Column']",
    freezeColumnOption: "//*[@class='context-menu-list']//li[text()='Freeze Column']",
    editColumnOption: "//*[@class='context-menu-list']//li[text()='Edit Column']",
    unfreezeColumnOption: "//*[@class='context-menu-list']//li[text()='Unfreeze Column']",

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
    openParenthesisOperator: "//*[@class='react-autoql-formula-builder-column-container']//button[normalize-space()='(']",
    closeParenthesisOperator: "//*[@class='react-autoql-formula-builder-column-container']//button[normalize-space()=')']",
    removeStartingParenOperator: "//span[text()=' ( ']/following-sibling::button//span[contains(@class,'react-autoql-icon-close')]",
    removeColumnwithinParensOperator: "//span[text()=' ( ']/parent::span/following-sibling::span[1]//button//span[contains(@class,'react-autoql-icon-close')]",


    // formula builder locators
    customColumnFomulaTextArea: "//span[contains(@class,'react-autoql-operator-select-wrapper')]",
    customnumberInput: "//*[@class='react-autoql-formula-builder-container']//input[@type='number']",
    invalidFormulaError: "//*[@class='react-autoql-formula-builder-validation-message-warning']",

    // Custom Column Save Column & Cancel Buttons
    customColumnSaveBtn: "//*[@class='react-autoql-modal-footer']//button[.//text()='Save Column']",
    customColumnCancelBtn: "//*[@class='react-autoql-modal-footer']//button[.//text()='Cancel']",
    customColumnUpdateBtn: "//*[@class='react-autoql-modal-footer']//button[.//text()='Update Column']",

    // Custom Column - Response Table Locators
    responseTableColTitle :"//*[@class='react-autoql-modal-body ']//*[@class='tabulator-col-title']",
    responseTableRows: "//*[@class='react-autoql-modal-body ']//*[contains(@class,'tabulator-row')]",

    // Dashboard Tile - Column Selector
    dashboardColumnSelector: "//*[@data-test='react-autoql-dashboard-tile']//*[@class='tabulator-col-title' and text()='ColumnName']",

    // Custom Column Modal - Validation Locators
    columnFormulaTextArea: "//*[@class='react-autoql-formula-builder-container']",
    variablesSection: "//*[@class='react-autoql-formula-builder-column-selection-container']",
    operatorsSection: "//*[@class='react-autoql-formula-builder-calculator-container']",
    previewSection: "//*[@class='react-autoql-table-preview-container']",
    closeIcon: "//span[contains(@class, 'react-autoql-modal-close-btn')]",

    // Download CSV Locators
    dashboardTileMoreOptions: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='More options']",
    downloadAsCSVOption: "//*[text()='Download as CSV']",

    // Chart icons on Dashboard
    dashboardShowHiddenChartsIcon: "//*[@data-test='react-autoql-dashboard-tile']//*[@title='Change Visualization']",
    dashboardColumnChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Column Chart']",
    dashboardBarChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Bar Chart']",
    dashboardLineChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Line Chart']",
    dashboardPieChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Pie Chart']",
    dashboardStackedBarChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Stacked Bar Chart']",
    dashboardStackedColumnChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Stacked Column Chart']",
    dashboardColumnLineComboChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Column Line Combo Chart']",
    dashboardHistogram: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Histogram']",
    dashboardScatterplot: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Scatterplot']",
    dashboardHeatmap: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Heatmap']",
    dashboardBubbleChart: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Bubble Chart']",
    dashboardNetworkGraph: "//*[@data-test='react-autoql-dashboard-tile']//*[@data-tooltip-html='Network Graph']",
    dashboardPivotView: "//button[@data-test='react-autoql-dashboard-tile'][@data-tooltip-html='Pivot View']",

    // Show/Hide column window on Dashboard
    dashboardShowHideColumnIcon: "//*[@data-tooltip-html='Show/Hide columns']",
    dashboardShowHideWindow: "//*[@class='modal-body']",
    dashboardShowHideApplyBtn: "//*[@class='modal-footer']//button[contains(text(), 'Apply')]",

    // Chart axis labels and column selectors
    dashboardChartsXaxisLabel: "//*[@data-test='react-autoql-dashboard-tile']//*[@class='x-axis-label']//*[@data-test='axis-label']",
    dashboardChartsYaxisLabel: "//*[@data-test='react-autoql-dashboard-tile']//*[@class='left-axis-title']//*[@data-test='axis-label']",
    dashboardChartsXaxisColumnSelector: "//*[@data-test='selectable-list']//span[contains(text(), 'ColumnName')]",
    dashboardChartsYaxisColumnSelector: "//*[@data-test='selectable-list']//span[contains(text(), 'ColumnName')]",
    dashboardChartsHistogramScatterplotColumnSelector: "//*[@class='axis-selector-content']//*[contains(text(), 'ColumnName')]",
    dashboardChartSelectAllColumns: "(//*[@data-test='react-autoql-checkbox'])[1]",
    dashboardChartsFirstBar : "(//*[@class='bar'])[1]",
    dashboardColumnFirstBar : "(//*[@class='column'])[1]",
    dashboardChartApplyButton: "//*[@data-test='react-autoql-btn']/*[text()='Apply']",
    
    // Chart legend column selector
    dashboardChartsLegendColumnSelector: "//*[@data-test='react-autoql-legend']//*[text()='ColumnName']",
    
    // Chart select all and apply buttons
    dashboardChartsSelectAllColumns: "//*[contains(text(), 'Select All')]",
    dashboardChartsApplyButton: "//*[contains(text(), 'Apply')]",
}

export class DashboardPage {

    constructor(private page: Page) {}

    get createNewDashboardBtn(){
        return this.page.locator(DashboardPage_Locators.createNewDashboardBtn);
    }

    get createFirstDashboardBtn(){
        return this.page.locator(DashboardPage_Locators.createFirstDashboardBtn);
    }

    get dashboardRunQueryBtn(){
        return this.page.locator(DashboardPage_Locators.dashboardRunQueryBtn);
    }

    get createDashboardBtn(){
        return this.page.locator(DashboardPage_Locators.createDashboardBtn);
    }

    get createNewDashboardRadioBtn() {
        return this.page.locator(DashboardPage_Locators.createNewDashboardRadioBtn);
    }

    get dashboardNameInput() {
        return this.page.locator(DashboardPage_Locators.dashboardNameInput);
    }

    get addToDashboardBtn() {
        return this.page.locator(DashboardPage_Locators.addToDashboardBtn);
    }

    get dashboardOptionsBtn() {
        return this.page.locator(DashboardPage_Locators.dashboardOptionsBtn);
    }

    get dashboardDeleteOption() {
        return this.page.locator(DashboardPage_Locators.dashboardDeleteOption);
    }

    get deleteDashboardConfirmBtn() {
        return this.page.locator(DashboardPage_Locators.deleteDashboardConfirmBtn);
    }

    get dashboardTile() {
        return this.page.locator(DashboardPage_Locators.dashboardTile);
    }

    get dashboardTileResponseContainer() {
        return this.page.locator(DashboardPage_Locators.dashboardTileResponseContainer);
    }

    get dashboardFirstColumnHeader() {
        return this.page.locator(DashboardPage_Locators.dashboardFirstColumnHeader);
    }

    get dashboardTileFilterOption() {
        return this.page.locator(DashboardPage_Locators.dashboardTileFilterOption);
    }

    get dashbaordTileShowHideColumnOption() {
        return this.page.locator(DashboardPage_Locators.dashbaordTileShowHideColumnOption);
    }

    get dashbaordApplyButton() {
        return this.page.locator(DashboardPage_Locators.dashbaordApplyButton);
    }

    get dashboardShowHideSelectAllOption() {
        return this.page.locator(DashboardPage_Locators.dashboardShowHideSelectAllOption);
    }

    DashboardShowHideColumnCheckbox(ColumnName: string) {
        return this.page.locator(DashboardPage_Locators.dashboardShowHideColumnCheckbox.replace('ColumnName', ColumnName));
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

    get removecolumnOption() {
        return this.page.locator(DashboardPage_Locators.removecolumnOption);
    }

    get freezeColumnOption() {
        return this.page.locator(DashboardPage_Locators.freezeColumnOption);
    }

    get editColumnOption() {
        return this.page.locator(DashboardPage_Locators.editColumnOption);
    }

    get unfreezeColumnOption() {
        return this.page.locator(DashboardPage_Locators.unfreezeColumnOption);
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

    get openParenthesisOperator() {
        return this.page.locator(DashboardPage_Locators.openParenthesisOperator);
    }

    get closeParenthesisOperator() {
        return this.page.locator(DashboardPage_Locators.closeParenthesisOperator);
    }

    get removeStartingParenOperator() {
        return this.page.locator(DashboardPage_Locators.removeStartingParenOperator);
    }

    get removeColumnwithinParensOperator() {
        return this.page.locator(DashboardPage_Locators.removeColumnwithinParensOperator);
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

    get invalidFormulaError() {
        return this.page.locator(DashboardPage_Locators.invalidFormulaError);
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

    get customColumnUpdateBtn() {
        return this.page.locator(DashboardPage_Locators.customColumnUpdateBtn);
    }

    get responseTableRows() {
        return this.page.locator(DashboardPage_Locators.responseTableRows);
    }

    dashboardColumnSelector(columnName: string){
        return this.page.locator(DashboardPage_Locators.dashboardColumnSelector.replace('ColumnName', columnName));
    }

    get columnFormulaTextArea() {
        return this.page.locator(DashboardPage_Locators.columnFormulaTextArea);
    }

    get variablesSection() {
        return this.page.locator(DashboardPage_Locators.variablesSection);
    }

    get operatorsSection() {
        return this.page.locator(DashboardPage_Locators.operatorsSection);
    }

    get previewSection() {
        return this.page.locator(DashboardPage_Locators.previewSection);
    }

    get closeIcon() {
        return this.page.locator(DashboardPage_Locators.closeIcon);
    }

    get dashboardTileMoreOptions() {
        return this.page.locator(DashboardPage_Locators.dashboardTileMoreOptions);
    }

    get downloadAsCSVOption() {
        return this.page.locator(DashboardPage_Locators.downloadAsCSVOption);
    }

    get dashboardShowHiddenChartsIcon() {
        return this.page.locator(DashboardPage_Locators.dashboardShowHiddenChartsIcon);
    }

    get dashboardColumnChart() {
        return this.page.locator(DashboardPage_Locators.dashboardColumnChart);
    }

    get dashboardBarChart() {
        return this.page.locator(DashboardPage_Locators.dashboardBarChart);
    }

    get dashboardLineChart() {
        return this.page.locator(DashboardPage_Locators.dashboardLineChart);
    }

    get dashboardPieChart() {
        return this.page.locator(DashboardPage_Locators.dashboardPieChart);
    }

    get dashboardStackedBarChart() {
        return this.page.locator(DashboardPage_Locators.dashboardStackedBarChart);
    }

    get dashboardStackedColumnChart() {
        return this.page.locator(DashboardPage_Locators.dashboardStackedColumnChart);
    }

    get dashboardColumnLineComboChart() {
        return this.page.locator(DashboardPage_Locators.dashboardColumnLineComboChart);
    }

    get dashboardHistogram() {
        return this.page.locator(DashboardPage_Locators.dashboardHistogram);
    }

    get dashboardScatterplot() {
        return this.page.locator(DashboardPage_Locators.dashboardScatterplot);
    }

    get dashboardHeatmap() {
        return this.page.locator(DashboardPage_Locators.dashboardHeatmap);
    }

    get dashboardBubbleChart() {
        return this.page.locator(DashboardPage_Locators.dashboardBubbleChart);
    }

    get dashboardNetworkGraph() {
        return this.page.locator(DashboardPage_Locators.dashboardNetworkGraph);
    }

    get dashboardPivotView() {
        return this.page.locator(DashboardPage_Locators.dashboardPivotView);
    }

    get dashboardShowHideColumnIcon() {
        return this.page.locator(DashboardPage_Locators.dashboardShowHideColumnIcon);
    }

    get dashboardShowHideWindow() {
        return this.page.locator(DashboardPage_Locators.dashboardShowHideWindow);
    }

    get dashboardShowHideApplyBtn() {
        return this.page.locator(DashboardPage_Locators.dashboardShowHideApplyBtn);
    }

    get dashboardChartsXaxisLabel() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsXaxisLabel);
    }

    get dashboardChartsYaxisLabel() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsYaxisLabel);
    }

    get dashboardChartsFirstBar() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsFirstBar);
    }

    get dashboardChartsXaxisColumnSelector() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsXaxisColumnSelector);
    }

    get dashboardChartsYaxisColumnSelector() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsYaxisColumnSelector);
    }

    get dashboardChartsHistogramScatterplotColumnSelector() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsHistogramScatterplotColumnSelector);
    }

    get dashboardChartsLegendColumnSelector() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsLegendColumnSelector);
    }

    get dashboardChartsSelectAllColumns() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsSelectAllColumns);
    }

    get dashboardChartsApplyButton() {
        return this.page.locator(DashboardPage_Locators.dashboardChartsApplyButton);
    }

    get dashboardChartApplyButton() {
        return this.page.locator(DashboardPage_Locators.dashboardChartApplyButton);
    }

}
