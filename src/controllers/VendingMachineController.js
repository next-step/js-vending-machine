import { Router } from '../models/index.js';
import { VendingMachineView, ProductPurchaseView, VendingMachineManageView } from '../views/index.js';
import ProductManageController from './ProductManageController.js';

import { $ } from '../utils/dom.js';
import { SELECTOR, HASH } from '../constants.js';

class VendingMachine {
  constructor() {
    VendingMachineView.render();

    this.router = new Router();

    this.productManageController = new ProductManageController();

    this.renderTab();
    this.initEvents();
  }

  renderTab() {
    const RenderTab = {
      [HASH.PRODUCT_MANAGE_TAB]: () => this.productManageController.render(),
      [HASH.PRODUCT_PURCHASE_TAB]: () => ProductPurchaseView.render(),
      [HASH.VENDING_MACHINE_MANAGE_TAB]: () => VendingMachineManageView.render(),
    };

    RenderTab[this.router.currentTab]();
  }

  initEvents() {
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    $(`#${SELECTOR.APP_ID}`).addEventListener('click', event => this.handleClickEvent(event));
  }

  handleClickEvent(event) {
    const targetId = event.target.id;

    if (targetId === SELECTOR.PRODUCT_ADD_BUTTON_ID) this.productManageController.addProduct();
  }

  handleHashChange() {
    const { hash: currentTab } = window.location;
    this.router.currentTab = currentTab;
    this.renderTab();
  }
}

export default VendingMachine;
