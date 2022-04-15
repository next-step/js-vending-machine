import { TabModel } from '../models/index.js';
import {
  ProductManageView,
  ProductPurchaseView,
  VendingMachineManageView,
} from '../views/index.js';

import { SELECTOR, TAB } from '../constants.js';
import { $ } from '../utils/dom.js';

class TabController {
  constructor(target) {
    this.menuModel = new TabModel();
    this.productManageView = new ProductManageView(target);
    this.productPurchaseView = new ProductPurchaseView(target);
    this.vendingMachineManageView = new VendingMachineManageView(target);

    this.changeTab = {
      [TAB.PRODUCT_MANAGE_TAB]: () => this.productManageView.render(),
      [TAB.PRODUCT_PURCHASE_TAB]: () => this.productPurchaseView.render(),
      [TAB.VENDING_MACHINE_MANAGE_TAB]: () => this.vendingMachineManageView.render(),
    };
    this.addEvent();
    this.init();
  }

  addEvent() {
    $(`#${SELECTOR.PRODUCT_MANAGE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
    $(`#${SELECTOR.PRODUCT_PURCHASE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
    $(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
  }

  init() {
    this.changeTab[this.menuModel.currentTab]();
  }

  onClickMenu(event) {
    const clickedTab = event.target.textContent;
    this.menuModel.setCurrentTab(clickedTab);
    this.changeTab[clickedTab]();
  }
}

export default TabController;
