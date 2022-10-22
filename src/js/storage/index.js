import { COINS, MENU } from '../constants/index.js';

const initState = {
  [MENU.PRODUCT_MANAGE]: {},
  [MENU.VENDING_MACHINE_MANAGE]: {
    amount: 0,
    coins: {
      [COINS.FIVE_HUNDRED]: 0,
      [COINS.ONE_HUNDRED]: 0,
      [COINS.FIFTY]: 0,
      [COINS.TEN]: 0,
    },
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
  static setCurrentTab(tab) {
    localStorage.setItem('tab', tab);
  }

  static getCurrentTab() {
    return localStorage.getItem('tab');
  }

  static setStateData(state) {
    localStorage.setItem('vendingMachineState', JSON.stringify(state));
  }

  static getStateData() {
    return JSON.parse(localStorage.getItem('vendingMachineState')) || initState;
  }
}

export default Storage;
