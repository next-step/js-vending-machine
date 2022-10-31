import { COINS, MENU } from '../constants/index.js';

const initCoins = {
  [COINS.FIVE_HUNDRED]: 0,
  [COINS.ONE_HUNDRED]: 0,
  [COINS.FIFTY]: 0,
  [COINS.TEN]: 0,
};

export const initState = {
  [MENU.PRODUCT_MANAGE]: {},
  [MENU.VENDING_MACHINE_MANAGE]: {
    amount: 0,
    coins: initCoins,
  },
  [MENU.PRODUCT_PURCHASE]: {
    purchasePrice: 0,
    returnRemains: {
      [COINS.FIVE_HUNDRED]: 0,
      [COINS.ONE_HUNDRED]: 0,
      [COINS.FIFTY]: 0,
      [COINS.TEN]: 0,
    },
  },
};

class Storage {
  // GET
  static getCurrentTab() {
    return localStorage.getItem('tab');
  }

  static getStateData() {
    return JSON.parse(localStorage.getItem('vendingMachineState')) || initState;
  }

  // SET
  static setCurrentTab(tab) {
    localStorage.setItem('tab', tab);
  }

  static setStateData(state) {
    localStorage.setItem('vendingMachineState', JSON.stringify(state));
  }
}

export default Storage;
