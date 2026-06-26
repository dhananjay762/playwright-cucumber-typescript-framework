import {pageFixture} from '../support/pageFixture';
import {Locator} from "@playwright/test";

export class LoginPage {

    public userNameInput:Locator;
    public passwordInput:Locator;
    public loginButton:Locator;
    public errorMessage:Locator;

    constructor() {
        this.userNameInput = pageFixture.page.getByPlaceholder("Username");
        this.passwordInput = pageFixture.page.getByPlaceholder("Password");
        this.loginButton = pageFixture.page.getByRole("button", { name: "Login" });
        this.errorMessage = pageFixture.page.locator(".error-message-container > h3");

    }

}