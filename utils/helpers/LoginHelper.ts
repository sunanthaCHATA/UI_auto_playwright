import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DataBaseUtils } from '../../utils/generic/DataBaseUtils';

export class LoginHelper {

  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async appLogin(appId: string, projectName: string , serviceName: string ) {

    // Fetching credentials and logging into the application
    const config = await DataBaseUtils.getAppCredentials(serviceName);

    // Code to login and enter appId
    await this.page.goto(config.appUrl);
    await this.loginPage.appIdInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginPage.appIdInput.fill(appId);
    await this.loginPage.confirmBtn.click();

    // Code to enter username, password and click on continue button
    await this.loginPage.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginPage.usernameInput.fill(config.appUser);
    await this.loginPage.passwordInput.fill(config.appPass);
    await this.loginPage.continueBtn.click();

    // Code to select the project from dropdown
    await this.loginPage.projDropdown.waitFor({ state: 'attached', timeout: 30000 });
    await this.loginPage.projDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginPage.projDropdown.click();
    await this.loginPage.projName(projectName).waitFor({ state: 'visible', timeout: 10000 });
    await this.loginPage.projName(projectName).click();
  
  }

}