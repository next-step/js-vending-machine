import Products from "../domain/Products.js";
import { getProducts, setProducts } from "../service/index.js";
import Menus from "./Menus.js";
import ProductManage from "./ProductManage.js";
import ProductPurchase from "./ProductPurchase.js";
import VendingMachineManage from "./VendingMachineManage.js";

export default class VendingMachine {
    products;

    constructor() {
        this.products = new Products(getProducts());
        this.menu = new Menus({
            onProductManage: () => this.onProductManage(),
            onVendingMachineManage: () => this.onVendingMachineManage(),
            onProductPurchase: () => this.onProductPurchase(),
        });
        this.productManage = new ProductManage(this.products, {
            onAddProduct: (name, price, quantity) => this.onAddProduct(name, price, quantity),
        });
        this.vendingMachineManage = new VendingMachineManage();
        this.productPurchase = new ProductPurchase();
        this.onProductManage();
    }

    onProductManage() {
        this.productManage.setProductManage();
    }

    onAddProduct(name, price, quantity) {
        try {
            this.products.addProduct(name, price, quantity);
            this.productManage.onAddProduct();
            setProducts(this.products.value);
        } catch (error) {
            alert(error.message);
        }
    }

    onVendingMachineManage() {
        this.vendingMachineManage.render();
    }

    onProductPurchase() {
        this.productPurchase.render();
    }
}
