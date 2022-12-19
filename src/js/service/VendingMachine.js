import { ALERT_MESSAGE } from './constant.js';
import { removeSpace } from '../util/string.js';
import { isAmountValid, isNameValid, isPriceValid } from './validator.js';
import ValidationError from './ValidationError.js';
import UnitCountMachine from './UnitCountMachine.js';

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
    return this.#products;
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
