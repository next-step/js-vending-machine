import { TAB } from './constants.js';
import {
  ProductManageTemplate,
  VendingMachineManageTemplate,
  ProductPurchaseTemplate,
} from './templates/index.js';

class VendingMachineView {
  constructor(target) {
    this.target = target;
    this.changeTab = {
      [TAB.PRODUCT_MANAGE_TAB]: state => ProductManageTemplate(state),
      [TAB.PRODUCT_PURCHASE_TAB]: state => VendingMachineManageTemplate(state),
      [TAB.VENDING_MACHINE_MANAGE_TAB]: state => ProductPurchaseTemplate(state),
    };
  }

  render(state) {
    this.target.innerHTML = this.changeTab[state.currentTab](state);
  }
}

export default VendingMachineView;
