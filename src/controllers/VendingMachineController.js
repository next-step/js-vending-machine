import { Router } from '../models/index.js';
import { VendingMachineView } from '../views/index.js';
import { ProductManageController, VendingMachineManageController, ProductPurchaseController } from './index.js';

import { $ } from '../utils/dom.js';
import { SELECTOR, HASH } from '../constants.js';

class VendingMachineController {
  constructor() {
    VendingMachineView.render();

    this.router = new Router();

    this.productManageController = new ProductManageController();
    this.vendingMachineManageController = new VendingMachineManageController();
    this.productPurchaseController = new ProductPurchaseController();

    this.renderTab();
    this.initEvents();
  }

  renderTab() {
    const RenderTab = {
      [HASH.PRODUCT_MANAGE_TAB]: () => this.productManageController.render(),
      [HASH.VENDING_MACHINE_MANAGE_TAB]: () => this.vendingMachineManageController.render(),
      [HASH.PRODUCT_PURCHASE_TAB]: () => this.productPurchaseController.render(),
    };

    RenderTab[this.router.currentTab]();
  }

  initEvents() {
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    $(`#${SELECTOR.APP_ID}`).addEventListener('submit', event => this.handleSubmitEvent(event));
  }

  handleSubmitEvent(event) {
    event.preventDefault();
    const { id: submitterId } = event.submitter;

    if (submitterId === SELECTOR.PRODUCT_ADD_BUTTON_ID) this.productManageController.addProduct();
    if (submitterId === SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID) this.vendingMachineManageController.chargeMoney();
  }

  handleHashChange() {
    const { hash: currentTab } = window.location;
    this.router.currentTab = currentTab;
    this.renderTab();
  }
}

export default VendingMachineController;
