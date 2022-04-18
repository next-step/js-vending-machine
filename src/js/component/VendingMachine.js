import Products from "../domain/Products.js";
import VendingMachineCharge from "../domain/VendingMachineCharge.js";
import { getProducts, setProducts } from "../service/index.js";
import Menus from "./Menus.js";
import ProductManage from "./ProductManage.js";
import ProductPurchase from "./ProductPurchase.js";
import VendingMachineManage from "./VendingMachineManage.js";

export default class VendingMachine {
    products;

    constructor() {
        this.products = new Products(getProducts());
        this.vendingMachineCharge = new VendingMachineCharge();
        this.menu = new Menus({
            onProductManage: () => this.onProductManage(),
            onVendingMachineManage: () => this.onVendingMachineManage(),
            onProductPurchase: () => this.onProductPurchase(),
        });
        this.productManage = new ProductManage(this.products, {
            onAddProduct: this.onAddProduct.bind(this),
        });
        this.vendingMachineManage = new VendingMachineManage({
            onVendingMachine: this.onVendingMachineCharge.bind(this),
        });
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

    onVendingMachineCharge(charge) {
        try {
            VendingMachineCharge.validate(Number(charge));
            this.vendingMachineCharge.computeCharge(Number(charge));
        } catch (error) {
            alert(error.message);
        }
    }

    onVendingMachineManage() {
        this.vendingMachineManage.setVendingMachineManage();
    }

    onProductPurchase() {
        this.productPurchase.render();
    }
}
