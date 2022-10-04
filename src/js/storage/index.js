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
  [MENU.PRODUCT_PURCHASE]: {},
};

class Storage {
  static setCurrentTab(tab) {
    localStorage.setItem('tab', tab);
  }

  static getCurrentTab() {
    return localStorage.getItem('tab');
  }

  static setStateData(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }

  static getStateData() {
    return JSON.parse(localStorage.getItem('state')) || initState;
  }
}

export default Storage;
