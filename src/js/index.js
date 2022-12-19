import { SELECTOR_MAP, querySelector } from './ui/selector.js';
import {
  addProduct,
  clearChargeAmountInput,
  clearProductInputs,
  insertCoins,
  renderChargeAmount,
  renderProduct,
  renderTotalChargeAmount,
  showTab,
} from './ui/function.js';
import {
  setChangeRemovingSpaceListener,
  setClickEventListenerWithVendingMachine,
  setEnterEventListener,
} from './ui/setListener.js';

/**
 * @typedef {import('../service/vendingmachine.js').VendingMachine} VendingMachine
 */

Object.keys(SELECTOR_MAP.TAB_BUTTON).forEach((key) => {
  const tabButtonSelector = SELECTOR_MAP.TAB_BUTTON[key];
  const tabSelector = SELECTOR_MAP.TABS[key];
  querySelector(tabButtonSelector).addEventListener('click', () => showTab(tabSelector));
});

setClickEventListenerWithVendingMachine(
  SELECTOR_MAP.BUTTON.PRODUCT_ADD,
  /**
   * @param {VendingMachine} vendingMachine
   */
  (vendingMachine) => {
    addProduct(vendingMachine);
    clearProductInputs();
    renderProduct(vendingMachine);
    querySelector(SELECTOR_MAP.INPUT.PRODUCT_NAME).focus();
  }
);

setClickEventListenerWithVendingMachine(
  SELECTOR_MAP.BUTTON.CHARGE_AMOUNT,
  /**
   * @param {VendingMachine} vendingMachine
   */
  (vendingMachine) => {
    insertCoins(vendingMachine);
    clearChargeAmountInput();
    renderChargeAmount(vendingMachine);
    renderTotalChargeAmount(vendingMachine);
  }
);
setChangeRemovingSpaceListener(SELECTOR_MAP.INPUT.PRODUCT_NAME);

setEnterEventListener(SELECTOR_MAP.INPUT.PRODUCT_NAME, () => querySelector(SELECTOR_MAP.INPUT.PRODUCT_PRICE).focus());
setEnterEventListener(SELECTOR_MAP.INPUT.PRODUCT_PRICE, () => querySelector(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT).focus());
setEnterEventListener(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT, () => querySelector(SELECTOR_MAP.BUTTON.PRODUCT_ADD).click());
setEnterEventListener(SELECTOR_MAP.INPUT.CHARGE_AMOUNT, () => querySelector(SELECTOR_MAP.BUTTON.CHARGE_AMOUNT).click());
