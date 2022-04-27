import { productException } from "../exception/ProductException.js";

export default class Product {
    static NAME_MIN_LENGTH = 1;
    static QUANTITY_MIN = 1;
    static PRICE_MIN = 100;
    static PRICE_UNIT = 10;

    #data;

    constructor(name, price, quantity) {
        this.validate(name, price, quantity);
        this.data = {
            name,
            price,
            quantity,
        };
    }

    validate(name, price, quantity) {
        if (!name || name.trim().length < Product.NAME_MIN_LENGTH) {
            throw productException.notExistProductName();
        }

        if (price < Product.PRICE_MIN) {
            throw productException.outOfRangePrice();
        }

        if (price % Product.PRICE_UNIT !== 0) {
            throw productException.notMatchPriceUnit();
        }

        if (!quantity || quantity < Product.QUANTITY_MIN) {
            throw productException.outOfRangeQuantity();
        }
    }

    set data(data) {
        this.#data = data;
    }

    get data() {
        return this.#data;
    }
}
