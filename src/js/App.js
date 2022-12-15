/* eslint-disable class-methods-use-this */
import ProductManageMenu from './components/ProductManageMenu/index.js';
import VendingMachineManageMenu from './components/VendingMachineManageMenu/index.js';
import { SELECTOR } from './constants/selector.js';
import { $ } from './utils/dom.js';

const CATEGORY = {
  PRODUCT_MANAGE_MENU: 'product-manage-menu',
  VENDING_MACHINE_MANAGE_MENU: 'vending-machine-manage-menu',
  PRODUCT_PURCHASE_MENU: 'product-purchase-menu',
};

class App {
  #state = {
    category: CATEGORY.PRODUCT_MANAGE_MENU,
  };

  #productManageMenu = new ProductManageMenu();

  #vendingMachineManageMenu = new VendingMachineManageMenu();

  init() {
    this.#render();
    this.#bindEvents();
  }

  #render() {
    if (this.#state.category === CATEGORY.PRODUCT_MANAGE_MENU) {
      this.#productManageMenu.init();
    }

    if (this.#state.category === CATEGORY.VENDING_MACHINE_MANAGE_MENU) {
      this.#vendingMachineManageMenu.init();
    }

    if (this.#state.category === CATEGORY.PRODUCT_PURCHASE_MENU) {
      $(SELECTOR.APP).innerHTML = '<div>product-purchase-menu</div>';
    }
  }

  #handleCategoryClick(e) {
    const { category } = e.target.dataset;

    this.#state.category = category;
    this.#render();
  }

  #bindEvents() {
    $(SELECTOR.VENDING_MACHINE_CATEGORIES).addEventListener('click', this.#handleCategoryClick.bind(this));
  }
}

const app = new App();

app.init();
