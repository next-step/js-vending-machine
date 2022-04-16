import Products from "../domain/Products.js";
import { getProducts } from "../service/index.js";
import Menus from "./Menus.js";
import ProductManage from "./ProductManage.js";

export default class VendingMachine {
    products;
    constructor() {
        this.products = new Products(getProducts());
        this.menu = new Menus({
            onProductManage: () =>  this.onProductManage(),
            onVendingMachineManage: () =>  this.onVendingMachineManage(),
            onProductPurchase: () =>  this.onProductPurchase(),
        });
        this.productManage = new ProductManage(this.products);
        this.onProductManage();
    } 

    onProductManage() {
        this.productManage.setProductManage();
    }

    onVendingMachineManage() {

    }

    onProductPurchase() {

    }
}