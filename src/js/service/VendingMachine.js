import UnitCountMachine from './UnitCountMachine.js';
import ProductManager from './ProductManager.js';
import { loadItem } from '../util/dataSaver.js';
import { DATA_STORAGE } from '../ui/constant.js';

/**
 * @typedef {import('../service/ProductManager').ProductItem} ProductItem
 * @typedef {import('./UnitCountMachine.js').UnitCountInfo} UnitCountInfo
 */

export class VendingMachine {
  /** @type {ProductManager} */
  #productManager;
  /**@type {UnitCountMachine} */
  #unitCountMachine;

  /**
   * @param {?ProductItem[]} products
   * @param {?UnitCountInfo} unitCountInfo
   */
  constructor(products, unitCountInfo) {
    this.#productManager = new ProductManager(products);
    this.#unitCountMachine = new UnitCountMachine(unitCountInfo);
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

  /////////
  insertUserCoin() {}
}

const savedProducts = loadItem(DATA_STORAGE.PRODUCTS);
const savedUnitCounts = loadItem(DATA_STORAGE.UNIT_COUNTS);
export const vendingMachine = new VendingMachine(savedProducts, savedUnitCounts);
