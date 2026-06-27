import {pageFixture} from '../support/pageFixture';
import {Locator} from "@playwright/test";

export class CartPage {

    public pageLogo:Locator;
	public secondaryHeader:Locator;
	public addedProductName:Locator;
	public addedProductPrice:Locator;
	public checkoutBtn:Locator;

    constructor() {
        this.pageLogo = pageFixture.page.locator(".primary_header .app_logo");
        this.secondaryHeader = pageFixture.page.locator("[data-test='title']");
        this.addedProductName = pageFixture.page.locator("[data-test='inventory-item-name']");
        this.addedProductPrice = pageFixture.page.locator("[data-test='inventory-item-price']");
        this.checkoutBtn = pageFixture.page.locator("[data-test='checkout']");
    }

}