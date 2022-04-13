import AbstractView from './AbstractView.js';
import ProductManageView from './ProductManageView.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');

export default class MainView extends AbstractView {
  static #handleProductManageMenu() {
    MainView.#changeAppContents(ProductManageView.contents());
    ProductManageView.eventBindings();
    ProductManageView.initialize();
  }

  static #changeAppContents(template) {
    $app.replaceChildren(template);
  }

  static eventBindings() {
    $productManageMenuSubmit.addEventListener(
      'click',
      MainView.#handleProductManageMenu
    );
  }

  static initialize() {
    MainView.#handleProductManageMenu();
  }
}
