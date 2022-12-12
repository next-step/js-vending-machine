import ValidationError from './service/ValidationError.js';
import { ELEMENT, querySelector } from './ui/element.js';
import { addProduct, clearInputs, renderProduct, showTab } from './ui/function.js';
import { setChangeRemovingSpaceListener, setClickEventListenerWithVendingMachine } from './util/setListener.js';

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
    try {
      addProduct(vendingMachine);
      clearInputs();
      renderProduct(vendingMachine);
    } catch (error) {
      if (error instanceof ValidationError) {
        alert(error.message);
      }
    }
  }
);
setChangeRemovingSpaceListener(ELEMENT.INPUT.PRODUCT_NAME);
