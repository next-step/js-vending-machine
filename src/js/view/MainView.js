import ProductManageView from './ProductManageView.js';
import { FORM } from '../constants/content-constant.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');

const MainView = (function () {
  function isProductManageContent(formId) {
    return formId === FORM.PRODUCT;
  }

  function changeAppContents(template) {
    $app.replaceChildren(template);
  }

  function handleProductManageMenu() {
    changeAppContents(ProductManageView.contents());
    ProductManageView.initialize();
  }

  function handleMenuContentSubmit(event) {
    const formId = event.target.id;
    if (isProductManageContent(formId)) {
      ProductManageView.handleProductAdd(event);
    }
  }

  function eventBindings() {
    $productManageMenuSubmit.addEventListener('click', handleProductManageMenu);
    $app.addEventListener('submit', handleMenuContentSubmit);
  }

  function initialize() {
    handleProductManageMenu();
  }

  return { initialize, eventBindings };
})();
export default MainView;
