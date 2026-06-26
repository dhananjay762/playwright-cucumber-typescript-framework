import { Given, When, Then } from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import { pageFixture } from '../support/pageFixture';
import { pageManager } from '../support/hooks';


Given('User is on Login page', async() => {
    await expect(pageFixture.page).toHaveTitle("Swag Labs");
});

When('I enter username as {string}', async (username: string) => {
    await pageManager.getLoginPage().userNameInput.fill(username);
});

When('I enter password as {string}', async (password: string) => {
    await pageManager.getLoginPage().passwordInput.fill(password);
});

When('I click on Login button', async function () {
    await pageManager.getLoginPage().loginButton.click();
});

Then('I should be navigated to the Inventory page', async function () {
    await expect(pageFixture.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(pageManager.getInventoryPage().pageHeader).toHaveText("Products");
});

Then('Application should throw validation message for incorrect credentials', async function () {
    await expect(pageManager.getLoginPage().errorMessage)
                    .toHaveText("Epic sadface: Username and password do not match any user in this service123", {timeout: 2000});
});

When('I click on logout button', function () {
    
});

Then('I should be able to logged out from the application', function () {
    
});