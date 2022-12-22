import UnitCountMachine from './UnitCountMachine.js';
import ProductManager from './ProductManager.js';

export class VendingMachine {
  /** @type {ProductManager} */
  #productManager;
  /**@type {UnitCountMachine} */
  #unitCountMachine;

  constructor() {
    this.reset();
  }

  reset() {
    this.#productManager = new ProductManager();
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
}

export const vendingMachine = new VendingMachine();
