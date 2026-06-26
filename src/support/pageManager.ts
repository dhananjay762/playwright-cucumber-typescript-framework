import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';

export class PageManager {

    private loginPage!:LoginPage;
    private inventoryPage!:InventoryPage;

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

}
