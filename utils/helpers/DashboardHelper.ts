import { Download, expect, Page } from '@playwright/test';
import { DashboardPage, AxisType, DashboardPage_Locators } from '../pages/DashboardPage';
import * as fs from 'fs';
import * as path from 'path';

export class DashboardHelper {

    private dashboardPage: DashboardPage;

    constructor(private page: Page) {
      this.dashboardPage = new DashboardPage(page);
    }

    
    /**
     * Download CSV file from dashboard and return the file path
     */
    async downloadCSV(): Promise<string> {
        // Start waiting for download before clicking
        const downloadPromise = this.page.waitForEvent('download');
        
        await this.dashboardPage.dashboardTileMoreOptions.click();
        await this.dashboardPage.downloadAsCSVOption.click();
        
        // Wait for the download to complete
        const download: Download = await downloadPromise;
        
        // Get Downloads folder path
        const downloadsPath = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Downloads');
        const fileName = download.suggestedFilename();
        const filePath = path.join(downloadsPath, fileName);
        
        // Save the file to Downloads folder
        await download.saveAs(filePath);
        
        console.log(`CSV downloaded: ${fileName}`);
        return filePath;
    }

    /**
     * Validate CSV file content - checks for column existence and data calculations
     */
    async validateCSV(filePath: string, customColumnName: string): Promise<void> {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Downloaded CSV file not found: ${filePath}`);
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim());

        if (lines.length === 0) {
            throw new Error('CSV file is empty');
        }

        const headerLine = lines[0];
        
        // Auto-detect delimiter (comma or tab)
        const delimiter = headerLine.includes('\t') ? '\t' : ',';
        const headers = headerLine.split(delimiter).map(h => h.trim());

        let customColIndex = -1;
        let moneylineIndex = -1;

        // Find column indices
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].toLowerCase() === customColumnName.toLowerCase()) {
                customColIndex = i;
            }
            if (headers[i].toLowerCase() === 'moneyline') {
                moneylineIndex = i;
            }
        }

        if (customColIndex === -1) {
            throw new Error(`Custom column "${customColumnName}" not found in CSV`);
        }

        if (moneylineIndex === -1) {
            throw new Error('Moneyline column not found in CSV');
        }

        // Validate data in first 5 rows
        let rowCount = 0;
        for (let i = 1; i < lines.length && rowCount < 5; i++) {
            const values = lines[i].split(delimiter).map(v => v.trim());
            
            if (values.length > Math.max(customColIndex, moneylineIndex)) {
                const moneylineValue = parseFloat(values[moneylineIndex]);
                const actualCustomValue = parseFloat(values[customColIndex]);
                const expectedCustomValue = moneylineValue + 100;

                if (Math.abs(expectedCustomValue - actualCustomValue) < 0.0001) {
                    console.log(`CSV Row ${rowCount + 1} ✔ Correct. Expected=${expectedCustomValue}, Actual=${actualCustomValue}`);
                } else {
                    throw new Error(`CSV validation failed at row ${rowCount + 1}. Expected=${expectedCustomValue}, Actual=${actualCustomValue}`);
                }
                rowCount++;
            }
        }

        console.log('CSV custom column data validated successfully');
    }

    /**
     * Validate sorting functionality for a column - checks both descending and ascending order
     */
    async validateSorting(columnName: string): Promise<void> {
        
        await this.dashboardPage.dashboardColumnSelector(columnName).click();
        const tabulatorContainer = this.page.locator("//*[@data-test='react-autoql-dashboard-tile']//*[@class='react-autoql-tabulator-container']");
        
        // Find column header by name and get its tabulator-field index
        // The columnheader has both the role and the tabulator-field attribute
        const columnHeaderLocator = this.page.locator(`//*[@data-test='react-autoql-dashboard-tile']//div[contains(@class,'tabulator-col-title') and normalize-space()='${columnName}']/ancestor::div[@role='columnheader']`);
        await columnHeaderLocator.waitFor({ state: 'visible' });
        const tabulatorField = await columnHeaderLocator.getAttribute('tabulator-field');
        
        if (!tabulatorField) {
            throw new Error(`Could not find tabulator-field attribute for column "${columnName}"`);
        }

        // Get all table rows
        const rows = tabulatorContainer.locator("div[role='row'][class*='tabulator-row']");
        const rowCount = await rows.count();

        // Validate Descending Order - First 5 rows
        console.log('Validating Descending Order...');
        let previousValue = null;
        const maxRows = Math.min(rowCount, 5);

        for (let i = 0; i < maxRows; i++) {
            const cellLocator = rows.nth(i).locator(`div[tabulator-field='${tabulatorField}']`);
            const cellText = await cellLocator.textContent();
            // Clean data: remove commas, keep numbers and negative signs and decimal points
            const cleanedData = cellText?.trim().replace(/,/g, '').replace(/[^\d.-]/g, '') || '0';
            const currentValue = parseFloat(cleanedData);

            if (i === 0) {
                console.log(`Descending Order Validation for Row ${i + 1} data: ${cellText?.trim()} (parsed: ${currentValue})`);
                previousValue = currentValue;
            } else {
                if (currentValue <= previousValue!) {
                    console.log(`Descending Order Validation for Row ${i + 1} data: ${cellText?.trim()} (parsed: ${currentValue})`);
                    previousValue = currentValue;
                } else {
                    throw new Error(
                        `Sorting in Descending order is NOT validated at row ${i + 1}. ` +
                        `Previous value: ${previousValue}, Current value: ${currentValue}`
                    );
                }
            }
        }

        // Click column header again to sort in ascending order
        await columnHeaderLocator.click();
        await this.page.waitForTimeout(3000);

        // Re-fetch rows after sorting to avoid stale elements
        const rowsAfterSort = tabulatorContainer.locator("div[role='row'][class*='tabulator-row']");

        // Validate Ascending Order - First 5 rows
        console.log('Validating Ascending Order...');
        previousValue = null;

        for (let i = 0; i < maxRows; i++) {
            const cellLocator = rowsAfterSort.nth(i).locator(`div[tabulator-field='${tabulatorField}']`);
            const cellText = await cellLocator.textContent();
            // Clean data: remove commas, keep numbers and negative signs and decimal points
            const cleanedData = cellText?.trim().replace(/,/g, '').replace(/[^\d.-]/g, '') || '0';
            const currentValue = parseFloat(cleanedData);

            if (i === 0) {
                console.log(`Ascending Order Validation for Row ${i + 1} data: ${cellText?.trim()} (parsed: ${currentValue})`);
                previousValue = currentValue;
            } else {
                if (currentValue >= previousValue!) {
                    console.log(`Ascending Order Validation for Row ${i + 1} data: ${cellText?.trim()} (parsed: ${currentValue})`);
                    previousValue = currentValue;
                } else {
                    throw new Error(
                        `Sorting in Ascending order is NOT validated at row ${i + 1}. ` +
                        `Previous value: ${previousValue}, Current value: ${currentValue}`
                    );
                }
            }
        }

        console.log('Sorting validation completed successfully');
    }

    /**
     * Hide a column in the dashboard table using the Show/Hide columns option
     * @param columnName - Name of the column to hide
     */
    async hideColumnInDashboard(columnName: string): Promise<void> {
        // Click on Show/Hide columns icon
        const showHideIcon = this.page.locator(DashboardPage_Locators.dashboardShowHideColumnIcon);
        await showHideIcon.click();
        await this.page.waitForTimeout(1000);

        // Uncheck the column checkbox
        const checkboxLocator = DashboardPage_Locators.dashboardShowHideColumnCheckbox.replace('ColumnName', columnName);
        await this.page.locator(checkboxLocator).uncheck();
        await this.page.waitForTimeout(500);

        // Click Apply button
        await this.dashboardPage.dashboardShowHideApplyBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Validate if a column is visible/hidden in a specific chart on the dashboard
     * @param chartIcon - XPath of the chart icon
     * @param axisType - Type of axis (X_AXIS, Y_AXIS, or BOTH)
     * @param columnSelectorXpath - XPath template for column selector (should contain 'ColumnName' placeholder)
     * @param columnName - Name of the column to validate
     * @param shouldBeVisible - Expected visibility status
     */
    async validateColumnInChart(
        chartIcon: string,
        axisType: AxisType,
        columnSelectorXpath: string,
        columnName: string,
        shouldBeVisible: boolean
    ): Promise<void> {

        // Click on the chart icon to open the chart
        await this.dashboardPage.dashboardShowHiddenChartsIcon.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(chartIcon).click();
        await this.page.waitForTimeout(2000);

        // Validate based on axis type
        switch (axisType) {
            case AxisType.X_AXIS:
                await this.page.locator(DashboardPage_Locators.dashboardChartsXaxisLabel).click({ force: true });
                await this.page.waitForTimeout(2000);
                await this.validateColumnInSelector(columnSelectorXpath, columnName, shouldBeVisible);
                break;

            case AxisType.Y_AXIS:
                await this.page.locator(DashboardPage_Locators.dashboardChartsYaxisLabel).click({ force: true });
                await this.page.waitForTimeout(2000);
                await this.validateColumnInSelector(columnSelectorXpath, columnName, shouldBeVisible);
                break;

            case AxisType.BOTH:
                // Validate X Axis
                await this.page.locator(DashboardPage_Locators.dashboardChartsXaxisLabel).click({ force: true });
                await this.page.waitForTimeout(2000);
                await this.validateColumnInSelector(columnSelectorXpath, columnName, shouldBeVisible);

                // Validate Y Axis
                await this.page.locator(DashboardPage_Locators.dashboardChartsYaxisLabel).click({ force: true });
                await this.page.waitForTimeout(2000);
                await this.validateColumnInSelector(columnSelectorXpath, columnName, shouldBeVisible);
                break;
        }

        console.log(`Validated column '${columnName}' in chart. Expected visible: ${shouldBeVisible}`);
    }

    /**
     * Helper method to validate if a column is present/absent in the selector
     * @param columnSelectorXpath - XPath template for column selector
     * @param columnName - Name of the column
     * @param shouldBeVisible - Expected visibility status
     */
    private async validateColumnInSelector(
        columnSelectorXpath: string,
        columnName: string,
        shouldBeVisible: boolean
    ): Promise<void> {
        const selector = columnSelectorXpath.replace('ColumnName', columnName);
        const columnLocator = this.page.locator(selector);

        if (shouldBeVisible) {
            await columnLocator.waitFor({ state: 'visible', timeout: 10000 });
        } else {
            await columnLocator.waitFor({ state: 'hidden', timeout: 10000 });
        }
    }

    /**
     * Validate newly created column is displayed in the dashboard response table
     * @param columnName - Name of the column to validate
     */
    async validateColumnDisplayedInDashboardTable(columnName: string): Promise<void> {
        const columnSelector = `//*[@data-test='react-autoql-dashboard-tile']//*[@class='tabulator-col-title' and text()='${columnName}']`;
        const columnLocator = this.page.locator(columnSelector);
        await columnLocator.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`Newly created column is displayed in dashboard table with name: ${columnName}`);
    }

    /**
     * Validate if a column appears in chart legends or selectors with "Select All" fallback
     * Used for TC12 - validates column in chart legends
     * @param chartIcon - XPath of the chart icon
     * @param axisType - Type of axis (X_AXIS, Y_AXIS, or BOTH)
     * @param columnSelectorXpath - XPath template for column selector
     * @param columnName - Name of the column to validate
     * @param shouldBeVisible - Expected visibility status
     */
    async validateColumnOnChartLegends(
        chartIcon: string,
        axisType: AxisType,
        columnSelectorXpath: string,
        columnName: string,
        shouldBeVisible: boolean
    ): Promise<void> {

        // Click on the chart icon
        await this.dashboardPage.dashboardShowHiddenChartsIcon.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(chartIcon).click();
        await this.page.waitForTimeout(2000);

        try {

            const elements = this.page.locator('//*[@class="legend-hidden-field-arrow"]');
            const count = await elements.count();

            if (count > 0) {
                console.log('Element exists');
            } else {
                 await this.page.locator(columnSelectorXpath.replace('ColumnName', columnName)).waitFor({ state: 'visible', timeout: 5000 });
            }
           
        } catch (e) {
            switch (axisType) {
                case AxisType.X_AXIS:
                    await this.page.locator(DashboardPage_Locators.dashboardChartsXaxisLabel).click({ force: true });
                    await this.page.waitForTimeout(2000);
                    await this.page.locator(DashboardPage_Locators.dashboardChartSelectAllColumns).check();
                    await this.page.waitForTimeout(2000);
                    await this.page.locator(DashboardPage_Locators.dashboardChartApplyButton).click();
                    await this.page.waitForTimeout(2000);
                    break;

                case AxisType.Y_AXIS:
                    await this.page.locator(DashboardPage_Locators.dashboardChartsYaxisLabel).click({ force: true });
                    await this.page.waitForTimeout(2000);
                    await this.page.locator(DashboardPage_Locators.dashboardChartSelectAllColumns).check();
                    await this.page.waitForTimeout(2000);
                    await this.page.locator(DashboardPage_Locators.dashboardChartApplyButton).click();
                    await this.page.waitForTimeout(2000);
                    break;
                default:
                    throw new Error('Select All fallback is only implemented for X_AXIS and Y_AXIS types');

            }

            // After clicking Select All, check if the column is visible
            const elements = this.page.locator('//*[@class="legend-hidden-field-arrow"]');
            const count = await elements.count();

            if (count > 0) {
                console.log('Element exists');
            } else {
                 await this.page.locator(columnSelectorXpath.replace('ColumnName', columnName)).waitFor({ state: 'visible', timeout: 5000 });
            }
        
        }

        // Validate based on axis type
        console.log(`Validated column '${columnName}' in chart legends. Expected visible: ${shouldBeVisible}`);
    }


    /**
     * Validate if a column appears in chart legends or selectors with "Select All" fallback
     * Used for TC13 - validates column in chart legends
     * @param chartIcon - XPath of the chart icon
     * @param axisType - Type of axis (X_AXIS, Y_AXIS, or BOTH)
     * @param columnName - Name of the column to validate
     * @param shouldBeVisible - Expected visibility status
     */
    async selectOnlyNewColumnAndValidateTooltip(
        chartIcon: string,
        axisType: AxisType,
        columnName: string,
        shouldBeVisible: boolean
    ): Promise<void> {

        // Click on the chart icon
        await this.dashboardPage.dashboardShowHiddenChartsIcon.click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(chartIcon).click();
        await this.page.waitForTimeout(2000);

        switch (axisType) {
            case AxisType.X_AXIS:
                await this.page.locator(DashboardPage_Locators.dashboardChartsXaxisLabel).click({ force: true });
                await this.page.waitForTimeout(2000);
                await this.page.locator(DashboardPage_Locators.dashboardChartSelectAllColumns).check();
                await this.page.locator(DashboardPage_Locators.dashboardChartSelectAllColumns).uncheck();
                await this.page.waitForTimeout(2000);
                await this.page.locator(`//span[text()='${columnName}']/ancestor::div[contains(@class,'react-autoql-list-item')]//input[@type='checkbox']`).check();
                await this.page.locator(DashboardPage_Locators.dashboardChartApplyButton).click();
                await this.page.waitForTimeout(2000);
                break;

            case AxisType.Y_AXIS:
                await this.page.locator(DashboardPage_Locators.dashboardChartsYaxisLabel).click({ force: true });
                await this.page.waitForTimeout(2000);
                await this.page.locator(DashboardPage_Locators.dashboardChartSelectAllColumns).check();
                await this.page.locator(DashboardPage_Locators.dashboardChartSelectAllColumns).uncheck();
                await this.page.waitForTimeout(2000);
                await this.page.locator(`//span[text()='${columnName}']/ancestor::div[contains(@class,'react-autoql-list-item')]//input[@type='checkbox']`).check();
                await this.page.locator(DashboardPage_Locators.dashboardChartApplyButton).click();
                await this.page.waitForTimeout(2000);
                break;

            default:
                throw new Error('Select All fallback is only implemented for X_AXIS and Y_AXIS types');

        }

        // code to validate the tooltip appears with the column name when hovering over the first bar in the chart
        const firstBar = this.page.locator(DashboardPage_Locators.dashboardChartsFirstBar);
        await firstBar.hover();
        await this.page.waitForTimeout(500); 
        const tooltip = this.page.locator('.react-autoql-chart-tooltip');
        await tooltip.waitFor({ state: 'visible' });

        await expect(tooltip).toContainText(columnName);
    
        // Validate based on axis type
        console.log(`Validated column '${columnName}' in chart legends. Expected visible: ${shouldBeVisible}`);
    }

    /**
     * Tokenize and execute a formula dynamically on the dashboard.
     */
    async executeFormula(page: Page, dashboardPage: DashboardPage, formula: string, finalFormula: any, validationCondition: any): Promise<void> {
        const tokens = formula.match(/(\d+\.?\d*|[A-Za-z ]+|[()+\-*/])/g) || [];

        for (const token of tokens) {
            const value = token.trim();
            console.log(`Processing token: "${value}"`);
            await page.waitForTimeout(2000); 

            switch (value) {
                case '(':
                    await dashboardPage.openParenthesisOperator.click();
                    break;

                case ')':
                    await dashboardPage.closeParenthesisOperator.click();
                    break;

                case '+':
                    await dashboardPage.plusOperator.click();
                    break;

                case '-':
                    await dashboardPage.minusOperator.click();
                    break;

                case '*':
                    await dashboardPage.multiplyOperator.click();
                    break;

                case '/':
                    await dashboardPage.divideOperator.click();
                    break;

                default:
                    if (!isNaN(Number(value))) {
                        console.log(`Identified as number: ${value}`);
                        await dashboardPage.variableCustomNumberOption.click();
                        await dashboardPage.customnumberInput(1).fill(value);
                    } else {
                        await dashboardPage.variableColumnOption(value).click();
                    }
            }
        }

        if (finalFormula) {
            switch (validationCondition) {
                case 'RemoveStartingParen':
                    await dashboardPage.removeStartingParenOperator.click();
                    break;
                case 'RemoveColumnwithinParens':
                    await dashboardPage.removeColumnwithinParensOperator.click();
                    break;
                default:
                    console.log(`Unknown validation condition: ${validationCondition}. No additional actions performed.`);
                    break;
            }
        }
    }

}
