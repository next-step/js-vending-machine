import ValidationError from './ValidationError.js';
import { removeSpace } from '../util/string.js';
import { ERROR_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import { isGreaterThan, isInteger, isMultipleOf } from './validator.js';
import { cloneDeep, deepFreeze } from '../util/object.js';

/**
 * @typedef {Object} ProductItem
 * @property {string} name
 * @property {number} price
 * @property {number} amount
 */

const {
  MIN_PRICE: PRODUCT_MIN_PRICE,
  MULTIPLE_PRICE: PRODUCT_MULTIPLE_PRICE,
  MIN_AMOUNT: PRODUCT_MIN_AMOUNT,
} = VENDING_MACHINE_CONSTANT.PRODUCT;

export default class ProductManager {
  #products = [];

  constructor(products) {
    if (Array.isArray(products)) {
      this.#products = [...products];
    }
  }

  get products() {
    return deepFreeze(cloneDeep(this.#products));
  }

  /**
   *
   * @param {ProductItem} productItem
   */
  add({ name, price, amount }) {
    this.#validateProduct({ name, price, amount });
    this.#products = [
      ...this.#products.filter((item) => item.name !== name),
      {
        index: this.#products.find(({ name: n }) => n === name)?.index || this.#products.length,
        name: removeSpace(name),
        price,
        amount,
      },
    ].sort((a, b) => a.index - b.index);
  }

  /**
   * @param {number} index
   * @returns {ProductItem|null}
   */
  withdraw(index) {
    const product = this.#products[index];
    const { name, price, amount } = product;
    if (!product || amount === 0) return null;

    product.amount -= 1;
    return { name, price, amount };
  }

  /**
   *
   * @param {ProductItem} productItem
   */
  #validateProduct({ name, price, amount }) {
    if (!ProductManager.#isNameValid(name)) {
      throw new ValidationError(ERROR_MESSAGE.VALIDATION.PRODUCT.NAME_BLANK);
    }
    if (!ProductManager.#isPriceValid(price)) {
      throw new ValidationError(ERROR_MESSAGE.VALIDATION.PRODUCT.PRICE);
    }
    if (!ProductManager.#isAmountValid(amount)) {
      throw new ValidationError(ERROR_MESSAGE.VALIDATION.PRODUCT.AMOUNT);
    }
  }

  /**
   *
   * @param {string} name
   */
  static #isNameValid = (name) => (name || '').length > 0;

  /**
   *
   * @param {number|string} price
   */
  static #isPriceValid = (price) =>
    isInteger(price) && isGreaterThan(price, PRODUCT_MIN_PRICE) && isMultipleOf(price, PRODUCT_MULTIPLE_PRICE);

  /**
   *
   * @param {number|string} amount
   * @returns
   */
  static #isAmountValid = (amount) => isInteger(amount) && isGreaterThan(amount, PRODUCT_MIN_AMOUNT);
}
