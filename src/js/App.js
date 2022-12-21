/* eslint-disable class-methods-use-this */
import { COMPONENTS } from './constants/components.js';
import { SELECTOR } from './constants/selector.js';
import { $ } from './utils/dom.js';

import './components/ProductManageMenu/index.js';
import './components/VendingMachineManageMenu/index.js';
import './components/ProductPurchaseMenu/index.js';

const CATEGORY = {
  PRODUCT_MANAGE_MENU: 'product-manage-menu',
  VENDING_MACHINE_MANAGE_MENU: 'vending-machine-manage-menu',
  PRODUCT_PURCHASE_MENU: 'product-purchase-menu',
};

class App extends HTMLElement {
  #state = {
    category: CATEGORY.PRODUCT_MANAGE_MENU,
  };

  connectedCallback() {
    this.#render();
    this.#bindEvents();
  }

  #render() {
    if (this.#state.category === CATEGORY.PRODUCT_MANAGE_MENU) {
      this.innerHTML = COMPONENTS.PRODUCT_MANAGE_MENU;
    }
    if (this.#state.category === CATEGORY.VENDING_MACHINE_MANAGE_MENU) {
      this.innerHTML = COMPONENTS.VENDING_MACHINE_MANAGE_MENU;
    }
    if (this.#state.category === CATEGORY.PRODUCT_PURCHASE_MENU) {
      this.innerHTML = COMPONENTS.PRODUCT_PURCHASE_MENU;
    }
  }

  #handleCategoryClick(e) {
    const { category } = e.target.dataset;

    this.#state.category = category;
    this.#render();
  }

  #bindEvents() {
    $(SELECTOR.COMMON.VENDING_MACHINE_CATEGORIES).addEventListener('click', this.#handleCategoryClick.bind(this));
  }
}

window.customElements.define('my-app', App);
