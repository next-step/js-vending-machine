import { getStorageInsertCoin, setStorageInsertCoin } from '../utils/storage.js';

class ProductPurchaseModel {
  #coin = 0;
  #storageData;

  constructor() {
    this.#storageData = Number(getStorageInsertCoin());
  }

  setCoin(value) {
    this.#coin = Number(value);
    this.#handleCoinInsertion(Number(value));
  }

  getCoin() {
    return getStorageInsertCoin();
  }
  
  #handleCoinInsertion(value) {
    if (!!this.#storageData) {
      this.#updateCoin();
    } else {
      this.#saveCoin(value);
    }
  }

  #saveCoin(value) {
    setStorageInsertCoin(value);
  }

  #updateCoin() {
    const coin = this.#sumCoins();
    setStorageInsertCoin(coin);
  }

  #sumCoins() {
    return this.#coin + this.#storageData;
  }
}

export default ProductPurchaseModel;
