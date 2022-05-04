import { cashboxException } from "../exception/CashboxException.js";

export default class Machine {
    products;
    charge;

    constructor(products, charge) {
        this.products = products;
        this.charge = charge;
    }

    onPurcharse(product) {
        const purchaseProduct = this.products.value.filter((data) => {
            return data.name === product;
        })[0];
        this.#validate(purchaseProduct, this.charge.value);
        purchaseProduct.quantity = purchaseProduct.quantity - 1;
        this.charge.value = this.charge.value - purchaseProduct.price;
    }

    #validate(product, charge) {
        if (product.price > charge) {
            throw cashboxException.insufficlentCharge();
        }

        if (product.quantity < 1) {
            throw cashboxException.notExistProductQuantity();
        }
    }
}
