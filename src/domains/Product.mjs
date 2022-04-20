import { ERROR_MESSAGE, STANDARD } from '../constants.js';

class Product {
  #name;

  #price;

  #quantity;

  constructor({ name, price, quantity }) {
    this.#validateProductDatas({ name, price, quantity });
    this.#name = name.trim();
    this.#price = price;
    this.#quantity = quantity;
  }

  getProduct() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };
  }

  #validateProductDatas({ name, price, quantity }) {
    this.#validateProductName(name);
    this.#validateProductPrice(price);
    this.#validateProductQuantity(quantity);
  }

  #validateProductName(productName) {
    if (!productName) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_NAME);
  }

  #validateProductPrice(productPrice) {
    if (!productPrice) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_PRICE);
    if (productPrice < STANDARD.PRODUCT_PRICE_MINIMUM)
      throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_OVER_100);
    if (productPrice % STANDARD.PRODUCT_PRICE_DIVIDE_BY !== 0)
      throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10);
  }

  #validateProductQuantity(productQuantity) {
    if (!productQuantity) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_QUANTITY);
    if (productQuantity < STANDARD.PRODUCT_QUANTITY_MINIMUM)
      throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_HAVE_TO_OVER_1);
  }
}

export default Product;
