import ValidationError from './service/ValidationError.js';
import { ELEMENT } from './ui/element.js';
import { addProduct, clearInputs, renderProduct } from './ui/function.js';
import { setChangeRemovingSpaceListener, setClickEventListener } from './util/setListener.js';

setClickEventListener(
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
