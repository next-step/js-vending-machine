import Storage from '../storage/index.js';
import { COINS, STORAGE_KEY } from '../constants/index.js';
import { coinRandomRange } from '../utils/index.js';

class VendingMachineManageMenuService {
  constructor() {
    this.stateData = Storage.getStateData();
    this.getStateByCurrentTab = this.stateData[Storage.getCurrentTab()];
    this.coinState = this.getStateByCurrentTab[STORAGE_KEY.COINS];
  }

  setHoldingAmount(price) {
    this.getStateByCurrentTab[STORAGE_KEY.AMOUNT] += price;
  }

  setCoinsAmount(price, coins) {
    this.coinState[COINS.TEN] += coins[COINS.TEN];
    this.coinState[COINS.FIFTY] += coins[COINS.FIFTY];
    this.coinState[COINS.ONE_HUNDRED] += coins[COINS.ONE_HUNDRED];
    this.coinState[COINS.FIVE_HUNDRED] += coins[COINS.FIVE_HUNDRED];

    Storage.setStateData(this.stateData);
  }

  static getCoinsNumber(price) {
    const coins = {
      [COINS.FIVE_HUNDRED]: 0,
      [COINS.ONE_HUNDRED]: 0,
      [COINS.FIFTY]: 0,
      [COINS.TEN]: 0,
    };

    Object.keys(coins)
      .sort((a, b) => b - a)
      .forEach(coin => {
        const randomAmount = coinRandomRange(Math.floor(price / coin));
        coins[coin] += randomAmount;
        price -= randomAmount * coin;
      });

    coins[COINS.TEN] += Math.floor(price / COINS.TEN);
    return coins;
  }
}
export default VendingMachineManageMenuService;
