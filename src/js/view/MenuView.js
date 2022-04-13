import AbstractView from './AbstractView.js';
import ProductManageView from './ProductManageView.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');

export default class MenuView extends AbstractView {
  static #handleProductManageMenu() {
    MenuView.#changeAppContents(ProductManageView.contents());
    ProductManageView.eventBindings();
  }

  static #changeAppContents(template) {
    $app.replaceChildren(template);
  }

  static eventBindings() {
    $productManageMenuSubmit.addEventListener(
      'click',
      MenuView.#handleProductManageMenu
    );
  }

  static initialize() {
    MenuView.#handleProductManageMenu();
  }
}
