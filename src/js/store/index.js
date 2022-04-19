import { STORE_KEY } from '../constants/store/index.js';

const initState = {
  [STORE_KEY.PRODUCT_MANAGEMENT]: [],
  tabMenuName: STORE_KEY.PRODUCT_MANAGEMENT,
};
class store {
  constructor() {
    this.initState = initState;
    this.init();
  }

  init() {
    const localStorageState =
      localStorage.getItem(STORE_KEY.PRIVATE) !== 'undefined' && JSON.parse(localStorage.getItem(STORE_KEY.PRIVATE));

    if (!localStorageState) {
      this.$state = { ...this.initState };
      localStorage.setItem(STORE_KEY.PRIVATE, JSON.stringify({ ...this.initState }));

      return;
    }

    this.$state = localStorageState;
  }

  setState({ key, value }) {
    this.$state[key] = value;
  }

  reset() {
    this.$state = { ...this.initState };
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
