import { pickRandomInRange } from '../utils/number.js';
import store from '../utils/store.js';
import { STORE_KEY, ERROR_MESSAGE, STANDARD } from '../constants.js';

class MoneyManager {
  #holdingMoney;

  #coin500Amount;

  #coin100Amount;

  #coin50Amount;

  #coin10Amount;

  constructor() {
    this.#holdingMoney = store.getValue(STORE_KEY.HOLDING_MONEY, 0);
    this.#coin500Amount = store.getValue(STORE_KEY.COIN_500_AMOUNT, 0);
    this.#coin100Amount = store.getValue(STORE_KEY.COIN_100_AMOUNT, 0);
    this.#coin50Amount = store.getValue(STORE_KEY.COIN_50_AMOUNT, 0);
    this.#coin10Amount = store.getValue(STORE_KEY.COIN_10_AMOUNT, 0);
  }

  get holdingMoney() {
    return this.#holdingMoney;
  }

  set holdingMoney(money) {
    this.#validateChargeMoney(money);

    this.#holdingMoney += +money;
    store.setValue(STORE_KEY.HOLDING_MONEY, this.#holdingMoney);
  }

  getCoinsAmount() {
    return {
      [STANDARD.COIN_500]: this.#coin500Amount,
      [STANDARD.COIN_100]: this.#coin100Amount,
      [STANDARD.COIN_50]: this.#coin50Amount,
      [STANDARD.COIN_10]: this.#coin10Amount,
    };
  }

  setCoinsAmount(coins) {
    this.#coin500Amount += coins[STANDARD.COIN_500];
    this.#coin100Amount += coins[STANDARD.COIN_100];
    this.#coin50Amount += coins[STANDARD.COIN_50];
    this.#coin10Amount += coins[STANDARD.COIN_10];

    store.setValue(STORE_KEY.COIN_500_AMOUNT, this.#coin500Amount);
    store.setValue(STORE_KEY.COIN_100_AMOUNT, this.#coin100Amount);
    store.setValue(STORE_KEY.COIN_50_AMOUNT, this.#coin50Amount);
    store.setValue(STORE_KEY.COIN_10_AMOUNT, this.#coin10Amount);
  }

  pickRandomAmountOfCoins(money) {
    const coins = {
      [STANDARD.COIN_500]: 0,
      [STANDARD.COIN_100]: 0,
      [STANDARD.COIN_50]: 0,
      [STANDARD.COIN_10]: 0,
    };

    Object.keys(coins)
      .reverse()
      .forEach(coin => {
        const randomAmount = pickRandomInRange(Math.floor(money / coin));
        coins[coin] += randomAmount;
        money -= randomAmount * coin;
      });

    coins[STANDARD.COIN_10] += Math.floor(money / STANDARD.COIN_10);
    return coins;
  }

  #validateChargeMoney(money) {
    if (!money) throw new Error(ERROR_MESSAGE.REQUIRED_CHARGE_INPUT);
    if (money < STANDARD.CHARGE_INPUT_MINIMUM) throw new Error(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_OVER_100);
    if (money % STANDARD.CHARGE_INPUT_DIVIDE_BY) throw new Error(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_DIVIDED_BY_10);
  }
}

export default MoneyManager;
