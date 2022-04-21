import { HASH, STORE_KEY } from './constants.js';
import store from './utils/store.js';

class Router {
  #currentTab;

  constructor() {
    this.#currentTab = store.getValue(STORE_KEY.CURRENT_TAB, HASH.PRODUCT_MANAGE_TAB);
  }

  get currentTab() {
    return this.#currentTab;
  }

  set currentTab(tab) {
    this.#currentTab = tab;
    store.setValue(STORE_KEY.CURRENT_TAB, tab);
  }
}

export default Router;
