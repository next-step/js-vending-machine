import { SELECTOR } from './constants/constant.js';
import { $ } from './utils/selector.js';
import {
  handFormChargeSubmit,
  handleChangeTab,
  handleFormProductSubmit,
} from './handler.js';

export const setProductEvent = () => {
  $(SELECTOR.PRODUCT_FORM).addEventListener('submit', (event) => {
    handleFormProductSubmit(event);
  });
};

export const setChargeEvent = () => {
  $(SELECTOR.CHARGE_FORM).addEventListener('submit', (event) => {
    handFormChargeSubmit(event);
  });
};

const setEvent = () => {
  $(SELECTOR.PRODUCT_MANAGE_MENU).addEventListener('click', (event) => {
    handleChangeTab(event);
  });
  $(SELECTOR.VENDING_MACHINE_MANAGE_MENU).addEventListener('click', (event) => {
    handleChangeTab(event);
  });
};

setEvent();
