import Router from './Router.mjs';
import { ProductManager } from './domains/index.js';
import VendingMachineView from './VendingMachineView.js';

import { $ } from './utils/dom.js';
import { SELECTOR, HASH } from './constants.js';

class VendingMachine {
  constructor() {
    this.vendingMachineView = new VendingMachineView();
    this.productManager = new ProductManager();
    this.router = new Router();
    this.initRender();
    this.initEvents();
  }

  initRender() {
    this.vendingMachineView.renderTab(this.router.currentTab);
    this.dataBindingInTab();
  }

  dataBindingInTab() {
    if (this.router.currentTab === HASH.PRODUCT_MANAGE_TAB)
      this.vendingMachineView.renderTabWithData(
        this.router.currentTab,
        this.productManager.products,
      );
  }

  initEvents() {
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    $(`#${SELECTOR.APP_ID}`).addEventListener('click', event => this.handleClickEvent(event));
  }

  handleClickEvent(event) {
    const targetId = event.target.id;

    if (targetId === SELECTOR.PRODUCT_ADD_BUTTON_ID) this.addProduct();
  }

  handleHashChange() {
    const { hash: currentTab } = window.location;
    this.vendingMachineView.renderTab(currentTab);
    this.router.currentTab = currentTab;
    this.dataBindingInTab();
  }

  addProduct() {
    const product = {
      name: $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value,
      price: $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value,
      quantity: $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value,
    };

    try {
      this.productManager.addProduct(product);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.vendingMachineView.resetProductForm();
    this.vendingMachineView.renderProductTableInProductManageTab(this.productManager.products);
  }
}

export default VendingMachine;
