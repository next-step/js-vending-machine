import { STORE_KEY, ERROR_MESSAGE, STANDARD } from '../constants.js';
import store from '../utils/store.js';

class MoneyManager {
  #holdingMoney;

  constructor() {
    this.#holdingMoney = store.getValue(STORE_KEY.HOLDING_MONEY, 0);
  }

  get holdingMoney() {
    return this.#holdingMoney;
  }

  set holdingMoney(money) {
    this.validateChargeMoney(money);

    this.#holdingMoney = money;
    store.setValue(STORE_KEY.HOLDING_MONEY, money);
  }

  validateChargeMoney(money) {
    if (!money) throw new Error(ERROR_MESSAGE.REQUIRED_CHARGE_INPUT);
    if (money < STANDARD.CHARGE_INPUT_MINIMUM) throw new Error(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_OVER_100);
    if (money % STANDARD.CHARGE_INPUT_DIVIDE_BY) throw new Error(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_DIVIDED_BY_10);
  }
}

export default MoneyManager;
