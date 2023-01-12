import ValidationError from './ValidationError.js';
import { isGreaterThan, isInteger, isMultipleOf } from './validator.js';
import { ERROR_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import { removeSpace } from '../util/string.js';

/**
 * @typedef {Object} Product
 * @property {?number} id
 * @property {string} name
 * @property {number} price
 * @property {number} amount
 */

const {
  MIN_PRICE: PRODUCT_MIN_PRICE,
  MULTIPLE_PRICE: PRODUCT_MULTIPLE_PRICE,
  MIN_AMOUNT: PRODUCT_MIN_AMOUNT,
} = VENDING_MACHINE_CONSTANT.PRODUCT;

export default class Product {
  static #count = 0;
  id;
  name;
  price;
  amount;

  /**
   *
   * @param {Product} product
   */
  constructor({ id, name, price, amount }) {
    const proofreadName = removeSpace(name);
    Product.validate({ name: proofreadName, price, amount });
    this.id = isInteger(id) ? Number(id) : Product.#count;
    this.name = name;
    this.price = Number(price);
    this.amount = Number(amount);

    if (!id) Product.#count += 1;
  }

  /**
   *
   * @param {Product} product
   */
  static validate({ name, price, amount }) {
    if (!Product.#isNameValid(name)) {
      throw new ValidationError(ERROR_MESSAGE.VALIDATION.PRODUCT.NAME_BLANK);
    }
    if (!Product.#isPriceValid(price)) {
      throw new ValidationError(ERROR_MESSAGE.VALIDATION.PRODUCT.PRICE);
    }
    if (!Product.#isAmountValid(amount)) {
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
