import { DOM, MACHINE_MODE } from '../constants/index.js';
import { $, hide, show } from '../utils/utils.js';
import {
  chargeFormView,
  chargeMoneyFormView,
  model,
  newProductFormView,
  purchasableTableView,
  returnCoinTableView,
} from '../index.js';

export class ViewStateTabs {
  constructor() {
    this.$container = $(DOM.VIEW_STATE_TABS_CONTAINER);
  }

  bindOnClickMachineModeTab(handler) {
    this.$container.addEventListener('click', ({ target: value }) => {
      handler(value);
    });
  }

  renderViewByMachineMode() {
    switch (model.machineMode) {
      case MACHINE_MODE.MANAGE_PRODUCT:
        show(newProductFormView.$container);
        hide(chargeFormView.$container);
        hide(chargeMoneyFormView.$container);
        hide(returnCoinTableView.$container);
        hide(purchasableTableView.$container);
        break;

      case MACHINE_MODE.CHARGE_CHANGE:
        show(chargeFormView.$container);
        hide(newProductFormView.$container);
        hide(chargeMoneyFormView.$container);
        hide(returnCoinTableView.$container);
        hide(purchasableTableView.$container);
        break;

      case MACHINE_MODE.PURCHASE_PRODUCT:
        hide(newProductFormView.$container);
        hide(chargeFormView.$container);
        show(chargeMoneyFormView.$container);
        show(returnCoinTableView.$container);
        show(purchasableTableView.$container);
        break;
    }
  }
}
