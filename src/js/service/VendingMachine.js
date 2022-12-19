import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import { removeSpace } from '../util/string.js';
import { isAmountValid, isInsertedCoinsValid, isNameValid, isPriceValid } from './validator.js';
import ValidationError from './ValidationError.js';

/**
 * @typedef {Object} UnitCountInfo
 * @property {number} amount
 * @property {Object.<string, number>} unitInfo
 */

export class VendingMachine {
  #products;
  /**@type {UnitCountInfo} */
  #unitCountInfo;

  constructor() {
    this.reset();
  }

  reset() {
    this.#products = [];
    this.#unitCountInfo = {
      amount: 0,
      unitInfo: VENDING_MACHINE_CONSTANT.CHANGES.UNITS.reduce(
        (result, unit) => ({
          ...result,
          [unit]: 0,
        }),
        {}
      ),
    };
    console.log(this.#unitCountInfo);
  }

  /**
   *
   * @returns {VendingMachineItem[]}
   */
  getProducts() {
    return [...this.#products];
  }

  /**
   *
   * @returns {UnitCountInfo}
   */
  get unitCountInfo() {
    return this.#unitCountInfo;
  }

  getUnits() {
    return Object.keys(this.#unitCountInfo.unitInfo).sort((a, b) => Number(b) - Number(a));
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

  get #units() {
    return Object.keys(this.#unitCountInfo.unitInfo).sort((a, b) => Number(b) - Number(a));
  }

  /**
   *
   * @param {number} amount
   * @returns {UnitCountInfo}
   */
  #getUnitCountInfo(chargeAmount) {
    const { unitInfo } = this.#units.reduce(
      ({ amount, unitInfo }, unit) => {
        const count = Math.floor(amount / unit);
        return {
          amount: amount - count * unit,
          unitInfo: { ...unitInfo, [unit]: count },
        };
      },
      { amount: chargeAmount, unitInfo: {} }
    );
    return { amount: chargeAmount, unitInfo };
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
    const insertedUnitCountInfo = this.#getUnitCountInfo(amount);
    this.#unitCountInfo = {
      amount: this.#unitCountInfo.amount + insertedUnitCountInfo.amount,
      unitInfo: Object.keys(insertedUnitCountInfo.unitInfo).reduce(
        (result, unit) => {
          return { ...result, [unit]: insertedUnitCountInfo.unitInfo[unit] + this.#unitCountInfo.unitInfo[unit] };
        },
        { ...this.#unitCountInfo.unitInfo }
      ),
    };
  }
}

export const vendingMachine = new VendingMachine();
