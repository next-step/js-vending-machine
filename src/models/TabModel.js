import { store } from '../utils/store.js';
import { STORE_KEY, TAB } from '../constants.js';

class TabModel {
  constructor() {
    this.currentTab = store.getItem(STORE_KEY.CURRENT_TAB) || TAB.PRODUCT_MANAGE_TAB;
  }

  setCurrentTab(tab) {
    store.setItem(STORE_KEY.CURRENT_TAB, tab);
    this.currentTab = tab;
  }
}

export default TabModel;
