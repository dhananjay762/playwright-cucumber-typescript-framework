import {pageFixture} from '../support/pageFixture';
import {Locator} from "@playwright/test";

export class InventoryPage {

    public pageHeader:Locator;

    constructor() {
        this.pageHeader = pageFixture.page.locator(".header_secondary_container .title");

    }

}