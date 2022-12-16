import { ELEMENT, querySelector } from './ui/element.js';
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

Object.keys(ELEMENT.TAB_BUTTON).forEach((key) => {
  const tabButtonSelector = ELEMENT.TAB_BUTTON[key];
  const tabSelector = ELEMENT.TABS[key];
  querySelector(tabButtonSelector).addEventListener('click', () => showTab(tabSelector));
});

setClickEventListenerWithVendingMachine(
  ELEMENT.BUTTON.PRODUCT_ADD,
  /**
   * @param {import('./service/vendingmachine.js').VendingMachine} vendingMachine
   */
  (vendingMachine) => {
    addProduct(vendingMachine);
    clearProductInputs();
    renderProduct(vendingMachine);
    querySelector(ELEMENT.INPUT.PRODUCT_NAME).focus();
  }
);

setClickEventListenerWithVendingMachine(
  ELEMENT.BUTTON.CHARGE_AMOUNT,
  /**
   * @param {import('./service/vendingmachine.js').VendingMachine} vendingMachine
   */
  (vendingMachine) => {
    insertCoins(vendingMachine);
    clearChargeAmountInput();
    renderChargeAmount(vendingMachine);
    renderTotalChargeAmount(vendingMachine);
  }
);
setChangeRemovingSpaceListener(ELEMENT.INPUT.PRODUCT_NAME);

setEnterEventListener(ELEMENT.INPUT.PRODUCT_NAME, () => querySelector(ELEMENT.INPUT.PRODUCT_PRICE).focus());
setEnterEventListener(ELEMENT.INPUT.PRODUCT_PRICE, () => querySelector(ELEMENT.INPUT.PRODUCT_AMOUNT).focus());
setEnterEventListener(ELEMENT.INPUT.PRODUCT_AMOUNT, () => querySelector(ELEMENT.BUTTON.PRODUCT_ADD).click());
setEnterEventListener(ELEMENT.INPUT.CHARGE_AMOUNT, () => querySelector(ELEMENT.BUTTON.CHARGE_AMOUNT).click());
