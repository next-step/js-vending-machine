import { MACHINE_MODE, DOM } from '../constants/index.js';

export const setCurrentTabByClicked = ({ id }) => {
  switch (id) {
    case DOM.VIEW_STATE_TABS_CONTAINER.slice(1):
      break;

    case DOM.MANAGE_PRODUCT_BUTTON.slice(1):
      this.model.setCurrentTab(MACHINE_MODE.MANAGE_PRODUCT);
      break;

    case DOM.CHARGE_CHANGE_BUTTON.slice(1):
      this.model.setCurrentTab(MACHINE_MODE.CHARGE_CHANGE);
      break;

    case DOM.PURCHASE_PRODUCT_BUTTON.slice(1):
      this.model.setCurrentTab(MACHINE_MODE.PURCHASE_PRODUCT);
      break;
  }
};
