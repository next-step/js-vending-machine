import { pickRandomInRange } from '../utils/number.js';
import store from '../utils/store.js';
import { STORE_KEY, ERROR_MESSAGE, STANDARD } from '../constants.js';

const INITIAL_COINS = {
  [STANDARD.COIN_500]: 0,
  [STANDARD.COIN_100]: 0,
  [STANDARD.COIN_50]: 0,
  [STANDARD.COIN_10]: 0,
};

class MoneyManager {
  #holdingMoney;

  #holdingCoins;

  constructor() {
    this.#holdingMoney = Number(store.getValue(STORE_KEY.HOLDING_MONEY, 0));
    this.#holdingCoins = store.getValue(STORE_KEY.HOLDING_COINS, INITIAL_COINS);
  }

  get holdingMoney() {
    return Number(this.#holdingMoney);
  }

  set holdingMoney(money) {
    this.#validateChargeMoney(money);

    this.#holdingMoney += Number(money);
    store.setValue(STORE_KEY.HOLDING_MONEY, this.#holdingMoney);
  }

  get holdingCoins() {
    return this.#holdingCoins;
  }

  set holdingCoins(coins) {
    this.#holdingCoins = coins;

    store.setValue(STORE_KEY.HOLDING_COINS, coins);
  }

  pickRandomAmountOfCoins(money) {
    const coins = INITIAL_COINS;

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
