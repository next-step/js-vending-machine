import { VALIDATE } from '../../util/consts.js';
import Validator from '../Validator.js';

class Product {
  #name;
  #price;
  #quantity;

  constructor({ name, price, quantity }) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  get info() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };
  }

  static of(product) {
    return new Product(product);
  }

  validate() {
    const { product } = Validator;

    if (product.isEmpty(this.#name, this.#price, this.#quantity)) {
      return new Error(VALIDATE.ENTER_ALL_PRODUCT_INFO);
    }

    const price = parseInt(this.#price, 10);
    if (product.isNotPriceTenUnit(price) || product.isNotOverTen(price)) {
      return new Error(VALIDATE.TEN_UNIT_PRICE);
    }
  }

  replaceDuplicatedProduct(storageProduct, info) {
    let order;
    const replacedProducts = [...storageProduct].map((prevProduct, index) => {
      if (prevProduct.name === info.name) {
        order = index;
        return info;
      }
      return prevProduct;
    });

    return {
      replacedProducts,
      order,
    };
  }
}

export default Product;
