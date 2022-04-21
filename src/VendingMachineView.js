import {
  productManageTabTemplate,
  productTemplate,
  productPurchaseTabTemplate,
  vendingMachineManageTabTemplate,
} from './templates/index.js';

import { SELECTOR, TAB } from './constants.js';
import { $ } from './utils/dom.js';

const RenderTab = {
  [TAB.PRODUCT_MANAGE_TAB]: () => productManageTabTemplate(),
  [TAB.PRODUCT_PURCHASE_TAB]: () => productPurchaseTabTemplate(),
  [TAB.VENDING_MACHINE_MANAGE_TAB]: () => vendingMachineManageTabTemplate(),
};

class VendingMachineView {
  constructor(target) {
    this.target = target;
  }

  renderTab(changeTab) {
    this.target.innerHTML = RenderTab[changeTab]();
  }

  renderProductTableInProductManageTab(products) {
    $(`#${SELECTOR.PRODUCT_INVENTORY_CONTAINER_ID}`).innerHTML = products
      .map(({ name, price, quantity }) => productTemplate({ name, price, quantity }))
      .join('');
  }

  resetProductForm() {
    $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value = '';
    $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value = '';
    $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value = '';
  }
}

export default VendingMachineView;
