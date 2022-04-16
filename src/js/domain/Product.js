import ProductException from "../exception/ProductException.js";

export default class Product {
    name;
    price;
    amount;

    static NAME_MIN_LENGTH = 1
    static AMOUNT_MIN = 1;
    static PRICE_MIN = 100;
    static PRICE_UNIT = 10;

    constructor(name, price, amount) {
        this.validate(name, price, amount);
    }

    validate(name, price, amount) {
        if(!name || name.trim().length < Product.NAME_MIN_LENGTH) {
            throw ProductException.notExistProductName();
        }

        if(price < Product.PRICE_MIN) {
            throw ProductException.outOfRangePrice();
        }
        
        if(price % Product.PRICE_UNIT !== 0) {
            throw ProductException.notMatchPriceUnit();
        }

        if(amount < Product.AMOUNT_MIN) {
            throw ProductException.outOfRangeAmount();
        }
    }
}