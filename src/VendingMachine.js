import { ProductManager, Router } from './domains/index.js';
import VendingMachineView from './VendingMachineView.js';

import { $ } from './utils/dom.js';
import { SELECTOR, TAB } from './constants.js';

class VendingMachine {
  constructor(target) {
    this.vendingMachineView = new VendingMachineView(target);
    this.productManager = new ProductManager();
    this.router = new Router();
    this.initRender();
    this.initEvents();
  }

  initRender() {
    this.vendingMachineView.renderTab(this.router.currentTab);
    if (this.router.currentTab === TAB.PRODUCT_MANAGE_TAB)
      this.vendingMachineView.renderProductTableInProductManageTab(this.productManager.products);
  }

  initEvents() {
    $('body').addEventListener('click', event => this.handleClickEvent(event));
  }

  handleClickEvent(event) {
    const targetId = event.target.id;

    if (
      targetId === SELECTOR.PRODUCT_MANAGE_MENU_ID ||
      targetId === SELECTOR.PRODUCT_PURCHASE_MENU_ID ||
      targetId === SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID
    ) {
      this.changeTab(event.target.textContent);
    }

    if (targetId === SELECTOR.PRODUCT_ADD_BUTTON_ID) this.addProduct();
  }

  changeTab(tab) {
    this.router.currentTab = tab;
    this.vendingMachineView.renderTab(this.router.currentTab);
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
