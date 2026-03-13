import { expect, Page, Locator } from '@playwright/test';
import { DMPage } from '../pages/DMPage';

export class DMHelper {

    private dmPage: DMPage;

    constructor(private page: Page) {
      this.dmPage = new DMPage(page);
    }

    async runQuery(querytext: string){
        await this.dmPage.dmIcon.click();
        await this.dmPage.dmTitle.waitFor({ state: 'visible', timeout: 10000 });
        await this.dmPage.dmQueryInput.fill(querytext);
        await this.dmPage.dmQuerySendBtn.click();
    }

    async selectPartitionByOption(optionName: string) {
    await this.dmPage.partitionByDropdown.scrollIntoViewIfNeeded();
    await this.dmPage.partitionByDropdown.click();
    const option = this.page.getByRole('listitem').filter({ hasText: optionName });
    await option.scrollIntoViewIfNeeded();
    await option.click();
}

async selectOrderByOption(optionName: string) {
    await this.dmPage.OrderbyDropdown.scrollIntoViewIfNeeded();
    await this.dmPage.OrderbyDropdown.click();

    const option = this.page.getByRole('listitem').filter({ 
        has: this.page.getByText(optionName, { exact: true }) 
    });
    await option.waitFor({ state: 'visible', timeout: 5000 });
    
    await option.scrollIntoViewIfNeeded();
    await option.click();
}
async selectOrderByDirection(optionName: string) {
    await this.dmPage.OrderbyDirection.scrollIntoViewIfNeeded();
    await this.dmPage.OrderbyDirection.click();
    const option = this.page.getByRole('listitem').filter({ hasText: optionName });
    await option.scrollIntoViewIfNeeded();
    await option.click();
}

async waitForTableToLoadAndVerifyColumn(columnName: string) {
    // 1. Wait for the loader to vanish
    await expect(this.page.locator('.tabulator-loader')).toBeHidden({ timeout: 60000 });
    
    // 2. Locate the header
   // const header = this.getColumnHeader(columnName);
    const header = this.page.locator('.tabulator-col', { hasText: columnName });
    // 3. Ensure it's rendered
    await expect(header).toBeVisible({ timeout: 15000 });
}


// NEW: Expecting a Locator object
async setCheckboxValue(checkboxLocator: Locator, isChecked: boolean) {
    // Since 'checkboxLocator' is already a Locator, we don't need .locator() here!
    await checkboxLocator.setChecked(isChecked);
}

async setFieldCheckbox(fieldName: string, isChecked: boolean) {
    // 1. Create a Regex: '^' means start, '$' means end.
    // This ensures "Goals" matches but "5 Game Average Goals" does not.
    const exactMatchRegex = new RegExp(`^${fieldName.trim()}$`);

    // 2. Locate the list item that has a content container matching that exact text
    const listItem = this.page.locator('.react-autoql-list-item').filter({
        has: this.page.locator('.react-autoql-selectable-list-item-content-container', { 
            hasText: exactMatchRegex 
        })
    });

    // 3. Perform the action
    await listItem.scrollIntoViewIfNeeded();
    await listItem.locator('input[type="checkbox"]').setChecked(isChecked);
}

async clickTableColumnSorter(columnName: string) {

/*    await this.page
    .locator('.tabulator-col.QUANTITY:visible', { 
      has: this.page.locator('.tabulator-col-title', { hasText: new RegExp(`^${columnName}$`) }) 
    })
    .locator('.tabulator-col-sorter')
    .click();
    */
   const column = this.page.locator('.tabulator-col.QUANTITY:visible', { 
    has: this.page.locator('.tabulator-col-title', { hasText: new RegExp(`^${columnName}$`) })
  });
  
  // Target the specific sorter child
  const sorter = column.locator('.tabulator-col-sorter');
  await sorter.evaluate(el => el.style.border = '3px solid red');
  // Force click skips actionability checks (like visibility or pointer-events: none)
  // Use this only if a regular .click() fails
  //await sorter.click({ force: true });
await column.locator('.tabulator-col-title').click();
// 3. WAIT for the Table to actually sort. 
  // Tabulator updates the 'aria-sort' attribute on the column header 
  // once the internal sorting process completes.
  await expect(column).toHaveAttribute('aria-sort', /ascending|descending/, { timeout: 10000 });
  
  // Optional: Wait for a specific "loading" indicator to disappear if your table is large
  await this.page.locator('.tabulator-loader').waitFor({ state: 'hidden' }).catch(() => {});

}


async filterByFirstTeamValue() {
  // 1. Locate the first visible cell in the 'Team' column (field="1")
  const firstTeamCell = this.page.locator('.tabulator-row[role="row"]').first()
    .locator('.tabulator-cell[tabulator-field="1"]');
  
  // 2. Get the text content
  const teamName = await firstTeamCell.textContent();
  if (!teamName) throw new Error('Could not find text in the first Team cell');

  // 3. Locate the specific input box for the 'Team' column header
  // Note: The header filter is inside the column div where tabulator-field="1"
  const teamHeaderFilter = this.page
    .locator('.tabulator-col[tabulator-field="1"]')
    .locator('input');

  // 4. Fill the filter and trigger the filter action
  await teamHeaderFilter.fill(teamName.trim());
  await teamHeaderFilter.press('Enter'); 
}

async filterByColumnName(columnName: string) {
  // 1. Find the header with the specific text
  const header = this.page.locator('.tabulator-col', { hasText: columnName }).first();
  
  // 2. Get the field ID from the attribute at runtime
  const fieldId = await header.getAttribute('tabulator-field');
  
  if (!fieldId) {
    throw new Error(`Could not find field ID for column: ${columnName}`);
  }

  // 3. Locate the first cell in the body using that dynamic fieldId
  const firstCell = this.page.locator('.tabulator-row[role="row"]').first()
    .locator(`.tabulator-cell[tabulator-field="${fieldId}"]`);
  
  // 4. Get the value
  const value = await firstCell.textContent();
  if (!value) throw new Error(`Could not find value in column: ${columnName}`);

  // 5. Locate the header filter input
  const headerFilter = header.locator('input');

  // 6. Perform the filter
  await headerFilter.fill(value.trim());
  await headerFilter.press('Enter');
}

async validateRankingLogic(startRow: number, endRow: number, goalCol: string, rankCol: string) {
    // 1. Dynamic lookup: Find the field ID based on the visible header text
    const getFieldId = async (title: string) => {
        const header = this.page.locator('.tabulator-col', { 
            has: this.page.locator('.tabulator-col-title', { hasText: title }) 
        }).first();
        
        const id = await header.getAttribute('tabulator-field');
        if (!id) throw new Error(`Could not find column header: ${title}`);
        return id;
    };

    const goalFieldId = await getFieldId(goalCol);
    const rankFieldId = await getFieldId(rankCol);

    const data: { goal: number, rank: number, rowText: string }[] = [];

    // 2. Extract data row by row
    for (let i = startRow; i <= endRow; i++) {
        const row = this.page.locator('.tabulator-row[role="row"]').nth(i - 1);
        
        const goalRaw = await row.locator(`[tabulator-field="${goalFieldId}"]`).textContent();
        const rankRaw = await row.locator(`[tabulator-field="${rankFieldId}"]`).textContent();

        // Debug: Log what we found so we don't accidentally capture the wrong column
        console.log(`Row ${i} | Found: Goal=${goalRaw}, Rank=${rankRaw}`);

        data.push({ 
            goal: Number(goalRaw?.trim().replace(/[^0-9.]/g, '')), 
            rank: Number(rankRaw?.trim()),
            rowText: `Row ${i}`
        });
    }

    // 3. Validation Logic (Standard Competition Ranking)
    // Sort goals descending. 
    // index + 1 gives the correct rank even for tied values.
    const sortedGoals = [...data].map(d => d.goal).sort((a, b) => b - a);

    for (const item of data) {
        const expectedRank = sortedGoals.indexOf(item.goal) + 1;
        
        if (item.rank !== expectedRank) {
            throw new Error(
                `${item.rowText} Mismatch! Goal: ${item.goal}, Expected Rank: ${expectedRank}, Actual: ${item.rank}`
            );
        }
    }

    return 'Rank calculation is correct and validated successfully';
}

}
