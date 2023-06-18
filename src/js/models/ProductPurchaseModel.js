import { getStorageInsertCoin, setStorageInsertCoin } from '../utils/storage.js';

class ProductPurchaseModel {
  #coin;

  constructor(coin) {
    this.#coin = Number(coin);
    this.insertedCoin = Number(getStorageInsertCoin());
  }

  setCoinInsertion() {
    if (!!this.insertedCoin) {
      this.#updateCoin();
    } else {
      this.#setCoin();
    }
  }

  get coin() {
    return this.#coin;
  }

  #updateCoin() {
    const coin = this.#sumCoins();
    setStorageInsertCoin(coin);
  }

  #setCoin() {
    setStorageInsertCoin(this.#coin);
  }

  #sumCoins() {
    return this.#coin + this.insertedCoin;
  }
}

export default ProductPurchaseModel;
