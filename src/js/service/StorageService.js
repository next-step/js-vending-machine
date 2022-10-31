import Storage from '../storage/index.js';
import { MENU } from '../constants/index.js';

class StorageService {
  getStateData() {
    return Storage.getStateData();
  }

  // GET
  getProductManageMenu() {
    return this.getStateData()[MENU.PRODUCT_MANAGE];
  }

  getAmountState(storageState) {
    return storageState[MENU.VENDING_MACHINE_MANAGE];
  }

  getVendingMachineManageMenu(storageState, storageKey) {
    return storageState[MENU.VENDING_MACHINE_MANAGE][storageKey];
  }

  getProductPurchase(storageState, storeKey) {
    return storageState[MENU.PRODUCT_PURCHASE][storeKey];
  }

  // SET

  setProductManageMenu({ noBlankName, price, count }) {
    const state = Storage.getStateData();
    state[Storage.getCurrentTab()][noBlankName] = {
      price,
      count,
    };
    Storage.setStateData(state);
  }
}

export default new StorageService();
