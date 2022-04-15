import { STORE_KEY } from '../constants.js';
import { store } from '../utils/store.js';

class TabModel {
  constructor() {
    this.currentTab = store.getItem(STORE_KEY) || '상품선택';
  }

  setCurrentTab(tab) {
    store.setItem(STORE_KEY.CURRENT_TAB, tab);
  }
}

export default TabModel;
