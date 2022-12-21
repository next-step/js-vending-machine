import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import { removeSpace } from '../util/string.js';
import ValidationError from './ValidationError.js';
import UnitCountMachine from './UnitCountMachine.js';
import { isGreaterThan, isInteger, isMultipleOf } from './validator.js';
import { cloneDeep } from '../util/object.js';

const {
  MIN_PRICE: PRODUCT_MIN_PRICE,
  MULTIPLE_PRICE: PRODUCT_MULTIPLE_PRICE,
  MIN_AMOUNT: PRODUCT_MIN_AMOUNT,
} = VENDING_MACHINE_CONSTANT.PRODUCT;

export class VendingMachine {
  #products;
  /**@type {UnitCountMachine} */
  #unitCountMachine;

  constructor() {
    this.reset();
  }

  reset() {
    this.#products = [];
    this.#unitCountMachine = new UnitCountMachine();
  }

  /**
   *
   * @returns {VendingMachineItem[]}
   */
  get products() {
    return cloneDeep(this.#products);
  }

  get unitCountMachine() {
    return this.#unitCountMachine;
  }

  /**
   *
   * @param {VendingMachineItem} vendingMachineItem
   */
  addItem({ name, price, amount }) {
    this.#validateProduct({ name, price, amount });
    this.#products = [
      ...this.#products.filter((item) => item.name !== name),
      {
        index: this.#products,
        name: removeSpace(name),
        price,
        amount,
      },
    ].sort((a, b) => a.index - b.index);
  }

  /**
   *
   * @param {VendingMachineItem} vendingMachineItem
   */
  #validateProduct({ name, price, amount }) {
    if (!VendingMachine.#isNameValid(name)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.PRODUCT.NAME_BLANK);
    }
    if (!VendingMachine.#isPriceValid(price)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.PRODUCT.PRICE);
    }
    if (!VendingMachine.#isAmountValid(amount)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.PRODUCT.AMOUNT);
    }
  }

  /**
   *
   * @param {string} name
   */
  static #isNameValid(name) {
    return (name || '').length > 0;
  }

  /**
   *
   * @param {number|string} price
   */
  static #isPriceValid(price) {
    return isInteger(price) && isGreaterThan(price, PRODUCT_MIN_PRICE) && isMultipleOf(price, PRODUCT_MULTIPLE_PRICE);
  }
  /**
   *
   * @param {number|string} amount
   * @returns
   */
  static #isAmountValid = (amount) => isInteger(amount) && isGreaterThan(amount, PRODUCT_MIN_AMOUNT);
}

export const vendingMachine = new VendingMachine();
