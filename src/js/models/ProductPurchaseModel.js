class ProductPurchaseModel {
  #storage;

  /**
   * @param {{getCoin: () => number, insertCoin: (coin: number) => void}} storage
   */
  constructor(storage) {
    this.#storage = storage;
  }

  setCoin(value) {
    this.#handleCoinInsertion(Number(value));
  }

  getCoin() {
    return this.#storage.getCoin();
  }

  #handleCoinInsertion(value) {
    if (!!this.#storage.getCoin()) {
      this.#updateCoin(value);
    } else {
      this.#saveCoin(value);
    }
  }

  #saveCoin(value) {
    this.#storage.insertCoin(value);
  }

  #updateCoin(value) {
    const coin = this.#sumCoins(value, this.#storage.getCoin());
    this.#storage.insertCoin(coin);
  }

  #sumCoins(value, storageValue) {
    return value + storageValue;
  }
}

export default ProductPurchaseModel;
