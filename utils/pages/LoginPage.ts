import { Page } from '@playwright/test';

export const LoginPage_Locators = {

  // Launch Page - application id input and confirm button
  appIdInput: "//input[@name='idp_id']",
  appConfirmBtn: "//button/span[text()='Confirm']",

  // Login Page - username, password and continue button
  usernameInput: "#username",
  passwordInput: "#password",
  continueBtn: "//button[@type='submit' and text()='Continue']",

  // Project dropdown and project name
  projDropdown: "//button[@title='Change the selected Project']",
  projName: `//*[@role='menu']//span[text()='ProjectName']`


};

export class LoginPage {

 constructor(private page: Page) {}

 get appIdInput() {
   return this.page.locator(LoginPage_Locators.appIdInput);
 }

 get confirmBtn() {
   return this.page.locator(LoginPage_Locators.appConfirmBtn);
 }

  get usernameInput() {
    return this.page.locator(LoginPage_Locators.usernameInput);
  }

  get passwordInput() {
    return this.page.locator(LoginPage_Locators.passwordInput);
  }

  get continueBtn() {
    return this.page.locator(LoginPage_Locators.continueBtn);
  }

  get projDropdown() {
    return this.page.locator(LoginPage_Locators.projDropdown);
  }

  projName(projectName: string) {
    return this.page.locator(LoginPage_Locators.projName.replace('ProjectName', projectName));
  }

}
