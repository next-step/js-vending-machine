import { checkPriceUnit, checkValidation } from '../validate/index.js';
import ProductManageMenuService from '../service/ProductManageMenuService.js';
import { ERROR_MESSAGE, NAME } from '../constants/index.js';
import { removeSpaces } from '../utils/index.js';
import { generateProductInventoryTemplate, productManagerMenuTemplate } from '../template/index.js';

class ProductManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
    this.initEventListener();
  }

  initRenderer() {
    this.app.innerHTML = productManagerMenuTemplate;
    const $productInventoryContainer = document.querySelector('#product-inventory-container');

    const getState = ProductManageMenuService.getCurrentTabState();
    if (!getState) return;

    const productMenuTemplate = Object.keys(getState)
      .map(tabId => generateProductInventoryTemplate(tabId, ProductManageMenuService.getCurrentTabState()[tabId]))
      .join('');

    $productInventoryContainer.insertAdjacentHTML('beforeend', productMenuTemplate);
  }

  addProductList(e) {
    e.preventDefault();

    const productInputValue = new FormData(e.target).getAll(NAME.PRODUCT_INPUT);

    const [name, price, count] = productInputValue;

    try {
      const inputCondition = checkPriceUnit(parseInt(price, 10));
      checkValidation(inputCondition, ERROR_MESSAGE.INVALID_PRODUCT_UNIT);

      const noBlankName = removeSpaces(name);

      ProductManageMenuService.setProductListState({ noBlankName, price, count });
      window.location.reload();
      this.initRenderer();
    } catch (error) {
      alert(error.message);
      const priceInput = document.querySelector('#product-price-input');
      priceInput.focus();
    }
  }

  initEventListener() {
    const $productForm = document.querySelector('#product-container-form');
    $productForm.addEventListener('submit', e => this.addProductList.bind(this)(e));
  }
}
export default ProductManageMenu;
