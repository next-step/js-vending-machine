/* eslint-disable class-methods-use-this */
import { SELECTOR } from './constants/selector.js';
import { $ } from './utils/dom.js';

import './components/ProductManageMenu/index.js';
import './components/VendingMachineManageMenu/index.js';
import './components/ProductPurchaseMenu/index.js';
import { routes } from './route/routes.js';
import { navigate } from './route/navigate.js';

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
    navigate('/js-vending-machine/product-manage-menu');
  }

  #route() {
    const pathnameArray = window.location.pathname.split('/');
    const pathname = pathnameArray.length <= 1 ? window.location.pathname : pathnameArray[pathnameArray.length - 1];

    const currentRoute = routes.find((route) => {
      return route.path === pathname;
    });

    this.innerHTML = currentRoute.element;
  }

  #render() {
    if (this.#state.category === CATEGORY.PRODUCT_MANAGE_MENU) {
      navigate('/js-vending-machine/product-manage-menu');
    }
    if (this.#state.category === CATEGORY.VENDING_MACHINE_MANAGE_MENU) {
      navigate('/js-vending-machine/vending-machine-manage-menu');
    }
    if (this.#state.category === CATEGORY.PRODUCT_PURCHASE_MENU) {
      navigate('/js-vending-machine/product-purchase-menu');
    }
  }

  #handleCategoryClick(e) {
    const { category } = e.target.dataset;

    this.#state.category = category;
    this.#render();
  }

  #handleHistoryChange({ detail }) {
    const { to, isReplace } = detail;

    if (isReplace || to === window.location.pathname) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }

    this.#route();
  }

  #handlePopState() {
    this.#route();
  }

  #bindEvents() {
    window.addEventListener('historychange', this.#handleHistoryChange.bind(this));
    window.addEventListener('popstate', this.#handlePopState.bind(this));
    $(SELECTOR.COMMON.VENDING_MACHINE_CATEGORIES).addEventListener('click', this.#handleCategoryClick.bind(this));
  }
}

window.customElements.define('my-app', App);
