import UnitCountMachine from './UnitCountMachine.js';
import ProductManager from './ProductManager.js';
import { loadItem } from '../util/dataSaver.js';
import { DATA_STORAGE } from '../ui/constant.js';

/**
 * @typedef {import('../service/ProductManager').ProductItem} ProductItem
 */

export class VendingMachine {
  /** @type {ProductManager} */
  #productManager;
  /**@type {UnitCountMachine} */
  #unitCountMachine;

  /**
   * @param {?ProductItem[]} products
   */
  constructor(products) {
    this.#productManager = new ProductManager(products);
    this.#unitCountMachine = new UnitCountMachine();
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
export const vendingMachine = new VendingMachine(savedProducts);
