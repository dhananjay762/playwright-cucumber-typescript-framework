import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';


export class PageManager {

    private loginPage!:LoginPage;
    private inventoryPage!:InventoryPage;
    private cartPage!:CartPage;
    private checkoutPage!:CheckoutPage;

    public getLoginPage():LoginPage {
        if(!this.loginPage){
            this.loginPage = new LoginPage();
        }
        return this.loginPage;
    }

    public getInventoryPage():InventoryPage {
        if(!this.inventoryPage){
            this.inventoryPage = new InventoryPage();
        }
        return this.inventoryPage;
    }

    public getCartPage():CartPage {
        if(!this.cartPage){
            this.cartPage = new CartPage();
        }
        return this.cartPage;
    }

    public getCheckoutPage():CheckoutPage {
        if(!this.checkoutPage){
            this.checkoutPage = new CheckoutPage();
        }
        return this.checkoutPage;
    }
}
