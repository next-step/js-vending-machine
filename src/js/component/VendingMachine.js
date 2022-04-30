import Charge from "../domain/Charge.js";
import Machine from "../domain/Machine.js";
import Products from "../domain/Products.js";
import Cashbox from "../domain/Cashbox.js";
import { CHANGE_ID, CHARGE_ID, COINS_ID, getProducts, PRODUCT_ID, setLocalStorage } from "../service/index.js";
import Menus from "./Menus.js";
import ProductManage from "./ProductManage.js";
import ProductPurchase from "./ProductPurchase.js";
import CashboxManage from "./CashboxManage.js";

export default class VendingMachine {
    products;
    cashbox;
    charge;

    constructor() {
        this.products = new Products(getProducts());
        this.cashbox = new Cashbox();
        this.charge = new Charge();
        new Menus({
            onProductManage: () => this.onProductManage(),
            onVendingMachineManage: () => this.#onVendingMachineManage(),
            onProductPurchase: () => this.#onProductPurchase(),
        });
        this.productManage = new ProductManage(this.products, {
            onAddProduct: (name, price, quantity) => this.onAddProduct(name, price, quantity),
        });
        this.cashboxManage = new CashboxManage(this.cashbox, {
            onVendingMachine: (charge) => this.#onVendingMachineCharge(charge),
        });
        this.productPurchase = new ProductPurchase(this.products, this.cashbox, this.charge, {
            onChargeChange: (charge) => this.onChargeChange(charge),
            onPurchase: (product) => this.#onPurchase(product),
        });
        this.machine = new Machine(this.products, this.charge);

        this.onProductManage();
    }

    onProductManage() {
        this.productManage.initialize();
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

    #onPurchase(product) {
        try {
            this.machine.onPurcharse(product);
            this.productPurchase.setVendingMachineState();
            setLocalStorage(CHANGE_ID, this.charge.value);
        } catch (error) {
            alert(error.message);
        }
    }

    #onVendingMachineCharge(charge) {
        try {
            Cashbox.validate(Number(charge));
            this.cashbox.computeCharge(Number(charge));
            this.cashboxManage.onSetVendingMachine();
            setLocalStorage(CHARGE_ID, this.cashbox.charge);
            setLocalStorage(COINS_ID, this.cashbox.coins);
        } catch (error) {
            alert(error.message);
        }
    }

    #onVendingMachineManage() {
        this.cashboxManage.initialize();
    }

    #onProductPurchase() {
        this.productPurchase.initialize();
    }
}
