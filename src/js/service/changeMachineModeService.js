import { DOM, MACHINE_MODE } from '../constants/index.js';
import { hide, show } from '../utils/utils.js';
import { chargeFormView, newProductFormView, model } from '../index.js';

export const renderViewByMachineMode = (machineMode) => {
  switch (machineMode) {
    case MACHINE_MODE.MANAGE_PRODUCT:
      show(newProductFormView.$container);
      hide(chargeFormView.$container);
      break;

    case MACHINE_MODE.CHARGE_CHANGE:
      show(chargeFormView.$container);
      hide(newProductFormView.$container);
      break;

    case MACHINE_MODE.PURCHASE_PRODUCT:
      hide(newProductFormView.$container);
      hide(chargeFormView.$container);
      break;
  }
};

export const setMachineMode = (clickedElementId) => {
  switch (clickedElementId) {
    case DOM.VIEW_STATE_TABS_CONTAINER.slice(1):
      break;

    case DOM.MANAGE_PRODUCT_BUTTON.slice(1):
      model.setCurrentTab(MACHINE_MODE.MANAGE_PRODUCT);
      break;

    case DOM.CHARGE_CHANGE_BUTTON.slice(1):
      model.setCurrentTab(MACHINE_MODE.CHARGE_CHANGE);
      break;

    case DOM.PURCHASE_PRODUCT_BUTTON.slice(1):
      model.setCurrentTab(MACHINE_MODE.PURCHASE_PRODUCT);
      break;
  }
};
