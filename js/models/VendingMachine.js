import { COINS, STORAGE_ITEM } from '../constants/constant.js';
import { getItem, setItem } from '../utils/storage.js';

class VendingMachine {
  #state = {
    product: new Map(),
    charge: {
      amount: 0,
      coins: {
        [COINS.COIN_500]: 0,
        [COINS.COIN_100]: 0,
        [COINS.COIN_50]: 0,
        [COINS.COIN_10]: 0,
      },
    },
  };

  constructor() {
    this.#state.product = new Map(getItem(STORAGE_ITEM.PRODUCT));

    if (getItem(STORAGE_ITEM.CHARGE)) {
      this.#state.charge = getItem(STORAGE_ITEM.CHARGE);
    }
  }

  getState() {
    return this.#state;
  }

  setProduct(key, item) {
    const product = this.#state.product;
    product.set(key, item);
    setItem(STORAGE_ITEM.PRODUCT, Array.from(product.entries()));
  }

  getProduct() {
    return this.#state.product;
  }

  setCharge(item) {
    this.#state.charge = item;
    setItem(STORAGE_ITEM.CHARGE, item);
  }

  getCharge() {
    return this.#state.charge;
  }
}

export const vendingMachine = new VendingMachine();
