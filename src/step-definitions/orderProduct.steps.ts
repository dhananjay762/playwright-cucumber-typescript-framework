import { Given, When, Then } from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import { pageFixture } from '../support/pageFixture';
import { pageManager } from '../support/hooks';

let selectedProductName: string;
let selectedProductPrice: string;

When('I select the product {string} and add to cart', async (productName: string) => {
    selectedProductName = productName;
    selectedProductPrice = await pageManager.getInventoryPage().getProductPrice(selectedProductName);
    await pageManager.getInventoryPage().addProductToCart(selectedProductName);
});

When('I click on the cart icon', async () => {
    await pageManager.getInventoryPage().cartIcon.click();
});

Then('I should be able to verify the added product', async () => {
    await expect(pageManager.getCartPage().secondaryHeader).toHaveText("Your Cart");
    await expect(pageManager.getCartPage().addedProductName).toHaveText(selectedProductName);
    await expect(pageManager.getCartPage().addedProductPrice).toHaveText(selectedProductPrice);
});

When('I click on checkout button', async () => {
    await pageManager.getCartPage().checkoutBtn.click();
});

When('I enter the firstname, lastname and zipcode as {string}, {string} and {string} respectively', async (firstName: string, lastName: string, zipCode: string) => {
    await expect(pageManager.getCheckoutPage().secondaryHeader).toHaveText("Checkout: Your Information");
    await pageManager.getCheckoutPage().enterCheckoutDetails(firstName, lastName, zipCode);
});

When('I click on continue button', async () => {
    await pageManager.getCheckoutPage().continueBtn.click();
});

Then('Verify the checkout product details', async () => {
    await expect(pageManager.getCheckoutPage().secondaryHeader).toHaveText("Checkout: Overview");
    await expect(pageManager.getCheckoutPage().addedProductName).toHaveText(selectedProductName);
    await expect(pageManager.getCheckoutPage().addedProductPrice).toHaveText(selectedProductPrice);
});

When('I click on finish button', async () => {
    await pageManager.getCheckoutPage().finishBtn.click();
});

Then('Order should be successfully placed', async () => {
    await expect(pageManager.getCheckoutPage().secondaryHeader).toHaveText("Checkout: Complete!");
    await expect(pageManager.getCheckoutPage().thankYouMsgHdr).toHaveText("Thank you for your order!");
});