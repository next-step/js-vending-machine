import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import { removeSpace } from '../util/string.js';
import { isAmountValid, isInsertedCoinsValid, isNameValid, isPriceValid } from './validator.js';
import ValidationError from './ValidationError.js';

/**
 * @typedef {Object} VendingMachine
 * @property {function} getProducts
 * @property {function} getChanges
 * @property {function} getTotalChanges
 * @property {function} addItem
 * @property {function} insertCoins
 */

/**
 * @typedef {Object} VendingMachineItem
 * @property {number} index
 * @property {string} name
 * @property {number} price
 * @property {number} amount
 */

class VendingMachine {
  #products;
  #changes;

  reset() {
    this.#products = [];
    this.#changes = VENDING_MACHINE_CONSTANT.CHANGES.UNITS.reduce(
      (result, unit) => ({
        ...result,
        [unit]: 0,
      }),
      {}
    );
  }

  constructor() {
    this.reset();
  }

  /**
   *
   * @returns {VendingMachineItem[]}
   */
  getProducts() {
    return this.#products;
  }

  /**
   *
   * @returns {Object}
   */
  getChanges() {
    return this.#changes;
  }

  /**
   *
   * @param {VendingMachineItem} vendingMachineItem
   */
  addItem({ name, price, amount }) {
    this.#validateProduct({ name, price, amount });
    const item = this.#products.find((item) => item.name === name) || {
      index: this.#products.length,
      name: removeSpace(name),
    };
    const newItem = {
      ...item,
      price,
      amount,
    };
    this.#products = [...this.#products.filter((item) => item.name !== name), newItem].sort(
      (a, b) => a.index - b.index
    );
  }

  /**
   *
   * @param {VendingMachineItem} vendingMachineItem
   */
  #validateProduct({ name, price, amount }) {
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

  /**
   *
   * @param {number} amount
   * @returns {Object}
   */
  #getCoins(amount) {
    const changes = Object.keys(this.#changes).sort((a, b) => Number(b) - Number(a));
    return changes.reduce((result, unit) => {
      let count = 0;
      while (amount) {
        if (unit == 0) continue;
        if (amount - unit >= 0) {
          amount -= unit;
          count += 1;
          continue;
        }
        break;
      }
      return { ...result, [unit]: count };
    }, {});
  }

  getTotalChanges() {
    return Object.keys(this.#changes).reduce((total, unit) => total + Number(unit) * this.#changes[unit], 0);
  }

  #validateCoins(amount) {
    if (!isInsertedCoinsValid(amount)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.CHARGE_AMOUNT);
    }
  }

  /**
   *
   * @param {number} amount
   */
  insertCoins(amount) {
    this.#validateCoins(amount);
    const insertedCoins = this.#getCoins(amount);
    this.#changes = Object.keys(insertedCoins).reduce(
      (result, unit) => {
        return { ...result, [unit]: insertedCoins[unit] + this.#changes[unit] };
      },
      { ...this.#changes }
    );
  }
}

export const vendingMachine = new VendingMachine();
