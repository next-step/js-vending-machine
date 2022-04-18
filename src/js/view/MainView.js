import AbstractView from './AbstractView.js';
import ProductManageView from './ProductManageView.js';
import { FORM } from '../constants/content-constant.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');

class IMainView extends AbstractView {
  #isProductManageContent(formId) {
    return formId === FORM.PRODUCT;
  }

  #changeAppContents(template) {
    $app.replaceChildren(template);
  }

  #handleProductManageMenu = () => {
    this.#changeAppContents(ProductManageView.contents());
    ProductManageView.initialize();
  };

  #handleMenuContentSubmit = (event) => {
    const formId = event.target.id;
    if (this.#isProductManageContent(formId)) {
      ProductManageView.handleProductAdd(event);
    }
  };

  eventBindings() {
    $productManageMenuSubmit.addEventListener(
      'click',
      this.#handleProductManageMenu
    );
    $app.addEventListener('submit', this.#handleMenuContentSubmit);
  }

  initialize() {
    this.#handleProductManageMenu();
  }
}
const MainView = new IMainView();
Object.freeze(MainView);
export default MainView;
