import { getStorageCoins, setStorageCoins } from '../utils/storage.js';

class ChangeMangeModel {
  #coins = {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  };

  constructor(amount) {
    this.#seperateCoins(amount);
  }

  setConins() {
    if (this.#hasStorageCoins()) {
      const newData = this.#sumUpTheNumberOfCoins(getStorageCoins(), this.#coins);
      setStorageCoins(newData);
    } else {
      setStorageCoins(this.#coins);
    }
  }

  #seperateCoins(amount) {
    const coinValues = Object.keys(this.#coins).sort(function (a, b) {
      return b - a;
    });

    coinValues.forEach((coinValue) => {
      let count = Math.floor(amount / coinValue);

      if (count > 0) {
        this.#coins[coinValue] += count;
        amount -= coinValue * count;
      }
    });
  }

  #hasStorageCoins() {
    return !!Object.keys(getStorageCoins()).length;
  }

  #sumUpTheNumberOfCoins(storageData, inputData) {
    const result = {};

    for (const key in storageData) {
      result[key] = storageData[key];
    }

    for (const key in inputData) {
      if (result.hasOwnProperty(key)) {
        result[key] += inputData[key];
      } else {
        result[key] = inputData[key];
      }
    }

    return result;
  }
}

export default ChangeMangeModel;
