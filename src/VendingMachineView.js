import {
  vendingMachineTemplate,
  productManageTabTemplate,
  productTemplate,
  productPurchaseTabTemplate,
  vendingMachineManageTabTemplate,
} from './templates/index.js';

import { SELECTOR, HASH } from './constants.js';
import { $ } from './utils/dom.js';

const RenderTab = {
  [HASH.PRODUCT_MANAGE_TAB]: () => productManageTabTemplate(),
  [HASH.PRODUCT_PURCHASE_TAB]: () => productPurchaseTabTemplate(),
  [HASH.VENDING_MACHINE_MANAGE_TAB]: () => vendingMachineManageTabTemplate(),
};

class VendingMachineView {
  constructor() {
    this.renderVendingMachine();
  }

  renderVendingMachine() {
    $('body').innerHTML = vendingMachineTemplate();
  }

  renderTab(currentTab) {
    $('main').innerHTML = RenderTab[currentTab]();
  }

  renderTabWithData(curretTab, data) {
    const view = {
      [HASH.PRODUCT_MANAGE_TAB]: () => {
        this.renderProductTableInProductManageTab(data);
      },
      [HASH.VENDING_MACHINE_MANAGE_TAB]: () => {},
      [HASH.PRODUCT_PURCHASE_TAB]: () => {},
    };

    view[curretTab](data);
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
