/* eslint-disable class-methods-use-this */
import ProductManageMenu from './components/ProductManageMenu.js';
import VendingMachineManageMenu from './components/VendingMachineManageMenu.js';
import { SELECTOR } from './constants/selector.js';
import { $ } from './utils/dom.js';

class App {
  #state = {
    category: 'product-manage-menu',
  };

  #productManageMenu = new ProductManageMenu();

  #vendingMachineManageMenu = new VendingMachineManageMenu();

  init() {
    this.#render();
    this.#bindEvents();
  }

  #render() {
    if (this.#state.category === 'product-manage-menu') {
      this.#productManageMenu.init();
    }

    if (this.#state.category === 'vending-machine-manage-menu') {
      this.#vendingMachineManageMenu.init();
    }

    if (this.#state.category === 'product-purchase-menu') {
      $(SELECTOR.APP).innerHTML = '<div>product-purchase-menu</div>';
    }
  }

  #handleCategoryClick(e) {
    const { id } = e.target;

    this.#state.category = id;
    this.#render();
  }

  #bindEvents() {
    $(SELECTOR.VENDING_MACHINE_CATEGORIES).addEventListener('click', this.#handleCategoryClick.bind(this));
  }
}

const app = new App();

app.init();
