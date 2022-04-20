import ProductManageView from './ProductManageView.js';
import { FORM } from '../constants/content-constant.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');

const MainView = (function () {
  function isProductManageContent(formId) {
    return formId === FORM.PRODUCT;
  }

  function initializeContent() {
    $app.innerHTML = '';
  }

  function changeAppContents(template) {
    $app.insertAdjacentHTML('afterbegin', template);
  }

  function handleProductManageMenu() {
    initializeContent();
    changeAppContents(ProductManageView.contents());
    ProductManageView.initialize();
  }

  function handleMenuContentSubmit(event) {
    const formId = event.target.id;
    if (isProductManageContent(formId)) {
      ProductManageView.handleProductAdd(event);
    }
  }

  function preventEmptyKeypress(event) {
    if (event.target.tagName !== 'INPUT') {
      return;
    }

    if (event.code === 'Space') {
      event.preventDefault();
    }
  }

  function eventBindings() {
    $productManageMenuSubmit.addEventListener('click', handleProductManageMenu);
    $app.addEventListener('submit', handleMenuContentSubmit);
    $app.addEventListener('keypress', preventEmptyKeypress);
  }

  function initialize() {
    handleProductManageMenu();
  }

  return { initialize, eventBindings };
})();
export default MainView;
