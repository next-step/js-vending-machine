import { ALERT_MESSAGE } from './constant.js';
import { removeSpace } from '../util/string.js';
import { isAmountValid, isNameValid, isPriceValid } from './validator.js';
import ValidationError from './ValidationError.js';

/**
 * @typedef {Object} VendingMachine
 * @property {function} getItems
 * @property {function} addItem
 */

/**
 * @typedef {Object} VendingMachineItem
 * @property {number} index
 * @property {string} name
 * @property {number} price
 * @property {number} amount
 */

class VendingMachine {
  #items = [];

  reset() {
    this.#items = [];
  }

  constructor() {
    this.reset();
  }

  /**
   *
   * @returns {VendingMachineItem[]}
   */
  getItems() {
    return this.#items;
  }

  /**
   *
   * @param {VendingMachineItem} vendingMachineItem
   */
  addItem({ name, price, amount }) {
    this.#validateItem({ name, price, amount });
    const item = this.#items.find((item) => item.name === name) || {
      index: this.#items.length,
      name: removeSpace(name),
    };
    const newItem = {
      ...item,
      price,
      amount,
    };
    this.#items = [...this.#items.filter((item) => item.name !== name), newItem].sort((a, b) => a.index - b.index);
  }

  /**
   *
   * @param {VendingMachineItem} vendingMachineItem
   */
  #validateItem({ name, price, amount }) {
    if (!isNameValid(name)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.PRODUCT.NAME_BLANK);
    }
    if (!isPriceValid(price)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.PRODUCT.PRICE);
    }
    if (!isAmountValid(amount)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.PRODUCT.AMOUNT);
    }
  }
}

export const vendingMachine = new VendingMachine();
