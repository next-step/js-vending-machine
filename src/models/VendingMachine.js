import { setVendingMachineStateInLocalStorage } from "../states/vendingMachineState.js";

const COINS = [500, 100, 50, 10];

export class VendingMachine {
  amount = 0;
  coin500 = 0;
  coin100 = 0;
  coin50 = 0;
  coin10 = 0;

  constructor({ amount, coin500, coin100, coin50, coin10 }) {
    this.amount = amount;
    this.coin500 = coin500;
    this.coin100 = coin100;
    this.coin50 = coin50;
    this.coin10 = coin10;
  }

  #setVendingMachineInLocalStorage() {
    setVendingMachineStateInLocalStorage(this);
  }

  addAmount = (amount) => {
    this.amount += amount;
    const [
      coin500Count,
      coin100Count,
      coin50Count,
      coin10Count,
    ] = this.#divideNumberInDivideLevelsRandomly(amount, COINS);
    this.coin500 += coin500Count;
    this.coin100 += coin100Count;
    this.coin50 += coin50Count;
    this.coin10 += coin10Count;
    this.#setVendingMachineInLocalStorage();
  }

  #validateDivideLevels(divideLevels) {
    if (divideLevels.some((divideLevel) => typeof divideLevel !== 'number')) {
      throw new Error('divideLevels should be consisted in numbers');
    }

    if (divideLevels.some((divideLevel, i) => {
      if (i > 0) {
        const prevDivideLevel = divideLevels[i - 1];
        return prevDivideLevel <= divideLevel;
      }
      return false;
    })) {
      throw new Error('divideLevels should be sorted in descending order');
    }
  }

  #divideNumberInDivideLevelsRandomly(totalAmount, divideLevels) {
    if (this.#validateDivideLevels(divideLevels)) return;

    let currentTotalAmount = totalAmount;
    return divideLevels.map((divideLevel, i) => {
      const maxCount = Math.floor(currentTotalAmount / divideLevel);
      let coinCount = maxCount;
      if (i !== divideLevels.length - 1) {
        const randomCoinCount = Math.floor(Math.random() * maxCount);
        coinCount = randomCoinCount;
      }

      currentTotalAmount -= coinCount * divideLevel;

      return coinCount;
    });
  }

  returnTheRestAmountsByCoins(coinInputControllerState) {
    const restAmount = coinInputControllerState.flushTotalAmount();

    const res = this.#divideNumberInDivideLevels(restAmount, COINS);
    this.#setVendingMachineInLocalStorage();

    return res;
  }

  #divideNumberInDivideLevels(totalAmount, divideLevels) {
    if (this.#validateDivideLevels(divideLevels)) return;

    let currentAmount = totalAmount;
    return divideLevels.map((divideLevel) => {
      const neededCoinCount = Math.floor(currentAmount / divideLevel);
      const currentCoinCount = this[`coin${divideLevel}`];
      if (currentCoinCount < neededCoinCount) {
        const amountDx = divideLevel * currentCoinCount;
        this.amount -= amountDx;
        currentAmount -= amountDx;
        this[`coin${divideLevel}`] = 0;
        return currentCoinCount;
      }

      const amountDx = divideLevel * neededCoinCount;
      this.amount -= amountDx;
      currentAmount -= amountDx;
      this[`coin${divideLevel}`] -= neededCoinCount;
      return neededCoinCount;
    });
  }
};
