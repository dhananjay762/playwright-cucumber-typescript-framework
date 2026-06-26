import { Given, When, Then } from '@cucumber/cucumber';
import {Browser, Page} from 'playwright';

let browser: Browser;
let context: any;
let page: Page;

When('I select the product {string} and add to cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on the cart icon', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I should be able to verify the added product', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on checkout button', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I enter the firstname, lastname and zipcode as {string}, {string} and {string} respectively', function (string, string2, string3) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on continue button', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Verify the checkout product details', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on finish button', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('Order should be successfully placed', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});