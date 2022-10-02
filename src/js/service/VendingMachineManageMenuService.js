import Storage from '../storage/index.js';

class VendingMachineManageMenuService {
  static setChargePriceState(price) {
    const state = Storage.getStateData();
    const tab = Storage.getCurrentTab();

    state[tab].amount = String(parseInt(state[tab].amount, 10) + parseInt(price, 10));
    Storage.setStateData(state);
  }

  static getChargePriceState() {
    return Storage.getStateData()[Storage.getCurrentTab()];
  }
}
export default VendingMachineManageMenuService;
