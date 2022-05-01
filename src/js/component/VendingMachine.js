import Change from "../domain/Change.js";
import Products from "../domain/Products.js";
import VendingMachineCharge from "../domain/VendingMachineCharge.js";
import {
    CHANGE_ID,
    CHARGE_ID,
    COINS_ID,
    getCharge,
    getProducts,
    PRODUCT_ID,
    setLocalStorage,
} from "../service/index.js";
import Menus from "./Menus.js";
import ProductManage from "./ProductManage.js";
import ProductPurchase from "./ProductPurchase.js";
import VendingMachineManage from "./VendingMachineManage.js";

export default class VendingMachine {
    products;
    change;

    constructor() {
        this.products = new Products(getProducts());
        this.vendingMachineCharge = new VendingMachineCharge(getCharge());
        this.change = new Change();
        new Menus({
            onProductManage: () => this.onProductManage(),
            onVendingMachineManage: () => this.#onVendingMachineManage(),
            onProductPurchase: () => this.#onProductPurchase(),
        });
        this.productManage = new ProductManage(this.products, {
            onAddProduct: this.onAddProduct.bind(this),
        });
        this.vendingMachineManage = new VendingMachineManage(this.vendingMachineCharge, {
            onVendingMachine: this.#onVendingMachineCharge.bind(this),
        });
        this.productPurchase = new ProductPurchase(this.products, this.vendingMachineCharge, this.change, {
            onChargeChange: this.onChargeChange.bind(this),
        });
        this.onProductManage();
    }

    onProductManage() {
        this.productManage.setProductManage();
    }

    onAddProduct(name, price, quantity) {
        try {
            this.products.addProduct(name, price, quantity);
            this.productManage.onAddProduct();
            setLocalStorage(PRODUCT_ID, this.products.value);
        } catch (error) {
            alert(error.message);
        }
    }

    onChargeChange(charge) {
        try {
            this.change.validate(charge);
            this.change.value = charge;
            this.productPurchase.setCharge();
            setLocalStorage(CHANGE_ID, this.change.value);
        } catch (error) {
            alert(error.message);
        }
    }

    #onVendingMachineCharge(charge) {
        try {
            VendingMachineCharge.validate(Number(charge));
            this.vendingMachineCharge.computeCharge(Number(charge));
            this.vendingMachineManage.onSetVendingMachine();
            setLocalStorage(CHARGE_ID, this.vendingMachineCharge.charge);
            setLocalStorage(COINS_ID, this.vendingMachineCharge.coins);
        } catch (error) {
            alert(error.message);
        }
    }
  
    #onVendingMachineManage() {
        this.vendingMachineManage.setVendingMachineManage();
    }

    #onProductPurchase() {
        this.productPurchase.render();
        this.productPurchase.mounted();
    }
}
