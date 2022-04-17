import { $, $$ } from './dom.js';

import ProductMange from './section/ProductManage/index.js';
import ProductPurchaseeManage from './section/ProductPurchaseManage/index.js';
import VendingMachineManage from './section/VendingMachineManage/index.js';
import actionMap from './eventAction.js';
import store from './store/store.js';

class VendingMachine {
  constructor() {
    this.$productManage = $('.product-manage');
    this.$vendingMachineManage = $('.vending-machine-manage');
    this.$productPurchaseManage = $('.product-purchase-manage');
    this.$menuButtons = $$('.menu-button');

    this.init();
    this.setEvent();
    this.render();
  }

  init() {
    this.$productManage.innerHTML = '';
    this.$vendingMachineManage.innerHTML = '';
  }

  setEvent() {
    for (const menuButton of this.$menuButtons) {
      menuButton.addEventListener('click', this.setMenu);
    }
  }

  setMenu(event) {
    const menu = event.target.dataset.menu;
    actionMap?.SET_MENU(menu);
  }

  render() {
    const { menu } = store.getState();
    if (menu === 'productManage') {
      ProductMange(this.$productManage);
      return;
    }
    if (menu === 'vendingMachineManage') {
      VendingMachineManage(this.$vendingMachineManage);
      return;
    }
    if (menu === 'productPurchaseManage') {
      ProductPurchaseeManage(this.$productPurchaseManage);
      return;
    }
  }
}

export default VendingMachine;
