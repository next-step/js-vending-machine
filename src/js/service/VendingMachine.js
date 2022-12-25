import UnitCountMachine from './UnitCountMachine.js';
import ProductManager from './ProductManager.js';
import { loadItem } from '../util/dataSaver.js';
import { DATA_STORAGE } from '../ui/constant.js';
import { isGreaterThan, isInteger, isMultipleOf } from './validator.js';
import ValidationError from './ValidationError.js';
import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';

/**
 * @typedef {import('../service/ProductManager').ProductItem} ProductItem
 * @typedef {import('./UnitCountMachine.js').UnitCountInfo} UnitCountInfo
 */

//prettier-ignore
const {
  MIN_AMOUNT,
  MULTIPLE,
} = VENDING_MACHINE_CONSTANT.PURCHASABLE_MONEY;

export class VendingMachine {
  /** @type {ProductManager} */
  #productManager;
  /**@type {UnitCountMachine} */
  #unitCountMachine;
  /**@type {number} */
  #insertedMoney;

  /**
   * @param {?ProductItem[]} products
   * @param {?UnitCountInfo} unitCountInfo
   */
  constructor(products, unitCountInfo) {
    this.#productManager = new ProductManager(products);
    this.#unitCountMachine = new UnitCountMachine(unitCountInfo);
    this.#insertedMoney = 0;
  }

  /**
   *
   * @returns {ProductManager}
   */
  get productManager() {
    return this.#productManager;
  }

  /**
   * @returns {UnitCountMachine}
   */
  get unitCountMachine() {
    return this.#unitCountMachine;
  }

  /**
   * @param {number} index
   * @returns {ProductItem}
   */
  purchase(index) {
    const product = this.#productManager.products[index];
    if (!(product && this.#insertedMoney - product.price >= 0)) {
      throw new ValidationError(ALERT_MESSAGE.NOT_ENOUGH_SPENDING_MONEY);
    }
    if (product.amount === 0) {
      throw new ValidationError(ALERT_MESSAGE.SOLD_OUT);
    }

    this.#insertedMoney -= product.price;
    this.#productManager.redraw(index);
    return product;
  }

  /**
   * @param {number} amount
   */
  insertMoney(amount) {
    if (!VendingMachine.#isInsertedMoneyValid(amount)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.SPENDING_MONEY_INPUT);
    }
    this.#insertedMoney += amount;
  }

  get insertedMoney() {
    return this.#insertedMoney;
  }

  static #isInsertedMoneyValid = (amount) =>
    isInteger(amount) && isGreaterThan(amount, MIN_AMOUNT) && isMultipleOf(amount, MULTIPLE);
}

const savedProducts = loadItem(DATA_STORAGE.PRODUCTS);
const savedUnitCounts = loadItem(DATA_STORAGE.UNIT_COUNTS);
export const vendingMachine = new VendingMachine(savedProducts, savedUnitCounts);
