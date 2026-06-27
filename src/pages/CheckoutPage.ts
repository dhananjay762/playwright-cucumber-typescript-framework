import {pageFixture} from '../support/pageFixture';
import {Locator} from "@playwright/test";

export class CheckoutPage {

    public pageLogo:Locator;
	public secondaryHeader:Locator;
	public firstNameTxt:Locator;
	public lastNameTxt:Locator;
	public zipCodeTxt:Locator;
	public continueBtn:Locator;
	public addedProductName:Locator;
	public addedProductPrice:Locator;
	public finishBtn:Locator;
	public thankYouMsgHdr:Locator;
	public menuBurger:Locator;
	public logoutSideBtn:Locator;

    constructor() {
        this.pageLogo = pageFixture.page.locator(".primary_header .app_logo");
        this.secondaryHeader = pageFixture.page.locator("[data-test='title']");
        this.firstNameTxt = pageFixture.page.locator("[data-test='firstName']");
        this.lastNameTxt = pageFixture.page.locator("[data-test='lastName']");
        this.zipCodeTxt = pageFixture.page.locator("#postal-code");
        this.continueBtn = pageFixture.page.locator("[data-test='continue']");
        this.addedProductName = pageFixture.page.locator("[data-test='inventory-item-name']");
        this.addedProductPrice = pageFixture.page.locator("[data-test='inventory-item-price']");
        this.finishBtn = pageFixture.page.locator("[data-test='finish']");
        this.thankYouMsgHdr = pageFixture.page.locator(".complete-header");
        this.menuBurger = pageFixture.page.locator("#react-burger-menu-btn");
        this.logoutSideBtn = pageFixture.page.getByText('Logout');
    }

    async enterCheckoutDetails(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstNameTxt.fill(firstName);
        await this.lastNameTxt.fill(lastName);
        await this.zipCodeTxt.fill(zipCode);
    }

}