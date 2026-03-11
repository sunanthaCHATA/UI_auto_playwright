import { Page } from '@playwright/test';
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

}
