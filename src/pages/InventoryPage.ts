import {pageFixture} from '../support/pageFixture';
import {Locator} from "@playwright/test";

export class InventoryPage {

    public pageLogo:Locator;
	public secondaryHeader:Locator;
	public priceOfProduct:String;
	public addProductToCartButton:String;
	public cartIcon:Locator;

    constructor() {
        this.pageLogo = pageFixture.page.locator(".primary_header .app_logo");
        this.secondaryHeader = pageFixture.page.locator("[data-test='title']");
        this.priceOfProduct = "//a[normalize-space()='@placeholder']/../..//div[@class='inventory_item_price']";
        this.addProductToCartButton = "//a[normalize-space()='@placeholder']/../..//button[contains(@id,'add-to-cart')]";
        this.cartIcon = pageFixture.page.locator("[data-test='shopping-cart-link']");
    }

    async getProductPrice(productName: string): Promise<string> {
        const priceLocator = pageFixture.page.locator(
            `//a[normalize-space()='${productName}']/../..//div[@class='inventory_item_price']`
        );
        return (await priceLocator.textContent()) ?? '';
    }

    async addProductToCart(productName: string): Promise<void> {
        const addToCartButton = pageFixture.page.locator(
            `//a[normalize-space()='${productName}']/../..//button[contains(@id,'add-to-cart')]`
        );
        await addToCartButton.click();
    }

}