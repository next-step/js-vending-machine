import { getStorageInsertCoin, setStorageInsertCoin } from '../utils/storage.js';

class ProductPurchaseModel {
  setCoin(value) {
    this.#handleCoinInsertion(Number(value));
  }

  getCoin() {
    return getStorageInsertCoin();
  }

  #handleCoinInsertion(value) {
    if (!!this.getCoin()) {
      this.#updateCoin(value);
    } else {
      this.#saveCoin(value);
    }
  }

  #saveCoin(value) {
    setStorageInsertCoin(value);
  }

  #updateCoin(value) {
    const coin = this.#sumCoins(value);
    setStorageInsertCoin(coin);
  }

  #sumCoins(value) {
    return value + this.getCoin();
  }
}

export default ProductPurchaseModel;
