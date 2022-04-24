import { VALIDATE } from '../../util/consts.js';
import Validator from '../Validator.js';

class Product {
  #name;
  #price;
  #quantity;
  #productList;

  constructor({ name, price, quantity }) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  /**
   * @param {string} newName
   */
  set setName(newName) {
    this.#name = newName;
  }

  /**
   * @param {number} newPrice
   */
  set setPrice(newPrice) {
    this.#price = newPrice;
  }

  /**
   * @param {number} newQuantity
   */
  set setQuantity(newQuantity) {
    this.#quantity = newQuantity;
  }

  get getName() {
    return this.#name;
  }

  get getPrice() {
    return this.#price;
  }

  get getQuantity() {
    return this.#quantity;
  }

  get getProductInfo() {
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

    // COMPLETE
    if (product.isEmpty(this.#name, this.#price, this.#quantity)) {
      return new Error(VALIDATE.ENTER_ALL_PRODUCT_INFO);
    }

    if (
      product.isNotPriceTenUnit(parseInt(this.#price, 10)) ||
      product.isNotOverTen(parseInt(this.#price, 10))
    ) {
      return new Error(VALIDATE.TEN_UNIT_PRICE);
    }
  }

  setProduct() {
    const { product } = Validator;
    const newProduct = {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };

    if (!this.#productList) {
      this.#productList = [newProduct];
      return;
    }

    if (product.includesProduct(this.#productList, newProduct)) {
      this.#productList = this.replaceProduct(this.#productList, newProduct);
      return;
    }

    this.#productList.push(newProduct);
  }

  replaceProduct(prevProduct, newProduct) {
    let index = 0;
    prevProduct.forEach((product, i) => {
      if (product.name === newProduct.name) {
        index = i;
      }
    });

    prevProduct[index] = newProduct;
    return prevProduct;
  }

  init() {
    this.#name = undefined;
    this.#price = undefined;
    this.#quantity = undefined;
  }
}

export default Product;
