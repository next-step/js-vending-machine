import { COINS } from '../constants/index.js';
import { STORE_KEY } from '../constants/store/index.js';

const initState = {
  [STORE_KEY.PRODUCT_MANAGEMENT]: [],
  [STORE_KEY.CHARGE_CHANGE]: {
    amount: 0,
    coins: [
      {
        value: COINS[500],
        count: 0,
      },
      {
        value: COINS[100],
        count: 0,
      },
      {
        value: COINS[50],
        count: 0,
      },
      {
        value: COINS[10],
        count: 0,
      },
    ],
  },
  tabMenuName: STORE_KEY.PRODUCT_MANAGEMENT,
};
class store {
  constructor() {
    this.$state;
    this.init();
  }

  init() {
    const localStorageState =
      localStorage.getItem(STORE_KEY.PRIVATE) !== 'undefined' && JSON.parse(localStorage.getItem(STORE_KEY.PRIVATE));

    if (!localStorageState) {
      this.$state = { ...initState };
      localStorage.setItem(STORE_KEY.PRIVATE, JSON.stringify({ ...initState }));

      return;
    }

    this.$state = localStorageState;
  }

  setState({ key, value }) {
    this.$state[key] = value;
  }

  reset() {
    this.$state = { ...initState };
    localStorage.setItem(STORE_KEY.PRIVATE, JSON.stringify(this.$state));
  }

  setLocalStorage() {
    localStorage.setItem(STORE_KEY.PRIVATE, JSON.stringify(this.$state));
  }

  get state() {
    return this.$state;
  }
}

export default store;
