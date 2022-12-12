/* eslint-disable class-methods-use-this */
import ProductManagement from './components/ProductManagement.js';
import { SELECTOR } from './constants/selector.js';
import { $ } from './utils/dom.js';

class App {
  #state = {
    category: 'product-manage-menu',
  };

  #productManagement = new ProductManagement();

  init() {
    this.#render();
    this.bindEvents();
  }

  #render() {
    if (this.#state.category === 'product-manage-menu') {
      this.#productManagement.init();
    }

    if (this.#state.category === 'vending-machine-manage-menu') {
      $(SELECTOR.APP).innerHTML = '<div>hi</div>';
    }

    if (this.#state.category === 'product-purchase-menu') {
      $(SELECTOR.APP).innerHTML = '<div>hi</div>';
    }
  }

  handleCategoryClick(e) {
    const { id } = e.target;

    this.#state.category = id;
    this.#render();
  }

  bindEvents() {
    $(SELECTOR.VENDING_MACHINE_CATEGORIES).addEventListener('click', this.handleCategoryClick.bind(this));
  }
}

const app = new App();

app.init();
