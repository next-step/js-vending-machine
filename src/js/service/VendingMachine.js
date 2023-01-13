import Product from './Product.js';
import UnitCountMachine from './UnitCountMachine.js';
import ValidationError from './ValidationError.js';
import { isGreaterThan, isInteger, isMultipleOf } from './validator.js';
import { ERROR_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import { productStorage, unitCountsStorage } from '../ui/dataSaver.js';
import { cloneDeep, deepFreeze } from '../util/object.js';

/**
 * @typedef {import('../service/Product').Product} Product
 * @typedef {import('./UnitCountMachine.js').UnitCountInfo} UnitCountInfo
 */

//prettier-ignore
const {
  MIN_AMOUNT,
  MULTIPLE,
} = VENDING_MACHINE_CONSTANT.PURCHASABLE_MONEY;

export class VendingMachine {
  /**@type {Product[]} */
  #products;
  /**@type {UnitCountMachine} */
  #unitCountMachine;
  /**@type {number} */
  #insertedMoney;

  /**
   * @param {?Product[]} products
   * @param {?UnitCountInfo} unitCountInfo
   */
  constructor(products, unitCountInfo) {
    this.#products = products || [];
    this.#unitCountMachine = new UnitCountMachine(unitCountInfo);
    this.#insertedMoney = 0;
  }

  /**
   *
   * @returns {Product[]}
   */
  get products() {
    return deepFreeze(cloneDeep(this.#products));
  }

  /**
   *
   * @param {Product} product
   */
  add({ name, price, amount }) {
    const addedProduct = this.#find({ name });
    const product = new Product({ id: addedProduct?.id, name, price, amount });
    this.#products = [...this.#products.filter((product) => product.name !== name), product].sort(
      (a, b) => a.id - b.id
    );
  }

  /**
   *
   * @param {number} id
   * @returns {Product|null}
   */
  #find({ id, name }) {
    const find = (key, value) => this.#products.find((product) => product[key] === value);
    return id ? find('id', id) : find('name', name);
  }

  /**
   * @param {number} id
   * @returns {Product|null}
   */
  withdraw(id) {
    const product = this.#find({ id });
    if (!product || product.amount === 0) return null;
    product.amount -= 1;
    return { ...product };
  }

  /**
   * @returns {UnitCountMachine}
   */
  get unitCountMachine() {
    return this.#unitCountMachine;
  }

  get insertedMoney() {
    return this.#insertedMoney;
  }

  /**
   * @param {number} id
   * @returns {Product}
   */
  purchase(id) {
    const product = this.#find({ id });
    if (!product || this.#insertedMoney < product.price) {
      throw new ValidationError(ERROR_MESSAGE.NOT_ENOUGH_SPENDING_MONEY);
    }
    if (product.amount === 0) {
      throw new ValidationError(ERROR_MESSAGE.SOLD_OUT);
    }

    this.#insertedMoney -= product.price;
    this.withdraw(id);
    return product;
  }

  /**
   * @param {number} amount
   */
  insertMoney(amount) {
    if (!VendingMachine.#isInsertedMoneyValid(amount)) {
      throw new ValidationError(ERROR_MESSAGE.VALIDATION.SPENDING_MONEY_INPUT);
    }
    this.#insertedMoney += amount;
  }

  returnChanges() {
    const { amount, unitInfo } = this.#unitCountMachine.withdraw(this.#insertedMoney);
    this.#insertedMoney -= amount;
    return { amount, unitInfo };
  }

  static #isInsertedMoneyValid = (amount) =>
    isInteger(amount) && isGreaterThan(amount, MIN_AMOUNT) && isMultipleOf(amount, MULTIPLE);
}

const savedProducts = productStorage.loadItem();
const savedUnitCounts = unitCountsStorage.loadItem();
export const vendingMachine = new VendingMachine(savedProducts, savedUnitCounts);
