import { SELECTOR } from './constants/constant.js';
import { $ } from './utils/selector.js';

import { VendingMachine } from './models/VendingMachine.js';
import { handleChangeTab } from './controllers/tab.js';
import { handleFormProductSubmit } from './controllers/product.js';
import { handleFormChargeSubmit } from './controllers/charge.js';

export const vendingMachine = new VendingMachine();

export const setProductEvent = () => {
  $(SELECTOR.PRODUCT_FORM).addEventListener('submit', (event) => {
    handleFormProductSubmit(event);
  });
};

export const setChargeEvent = () => {
  $(SELECTOR.CHARGE_FORM).addEventListener('submit', (event) => {
    handleFormChargeSubmit(event);
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
