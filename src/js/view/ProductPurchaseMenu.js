import Storage from '../storage/index.js';
import { generateProductPurchaseTemplate, productPurchaseMenuTemplate } from '../template/index.js';
import { ERROR_MESSAGE, MENU, NAME, STORAGE_KEY } from '../constants/index.js';
import { checkPriceUnit, checkValidation } from '../validate/index.js';
import ProductPurchaseService from '../service/ProductPurchaseService.js';
import ProductManageMenuService from '../service/ProductManageMenuService.js';

class ProductPurchaseMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
    this.initEventListener();
    this.productPurchaseService = new ProductPurchaseService();
  }

  static changeRenderer() {
    const $purchaseAmount = document.querySelector('#purchase-amount');
    $purchaseAmount.textContent = ProductManageMenuService.getCurrentTabState()[STORAGE_KEY.PURCHASE_PRICE];

    const $productPurchaseForm = document.querySelector('#product-purchase-form');
    $productPurchaseForm.reset();
  }

  initRenderer() {
    const products = Storage.getStateData()[MENU.PRODUCT_MANAGE];
    const productMenuTemplate = Object.keys(products)
      .map(tabId => generateProductPurchaseTemplate(tabId, products[tabId]))
      .join('');
    this.app.innerHTML = productPurchaseMenuTemplate(productMenuTemplate);

    ProductPurchaseMenu.changeRenderer();
  }

  insertAmount(e) {
    e.preventDefault();

    const insertPrice = new FormData(e.target).get(NAME.PURCHASE_AMOUNT);
    const formattingPrice = parseInt(insertPrice, 10);

    try {
      const inputCondition = checkPriceUnit(formattingPrice);
      checkValidation(inputCondition, ERROR_MESSAGE.INVALID_CHARGE_INSERT_UNIT);

      this.productPurchaseService.setAddPurchasePrice(formattingPrice);
      ProductPurchaseMenu.changeRenderer();
    } catch (error) {
      alert(error.message);
      const purchaseInput = document.querySelector('#purchase-input');
      purchaseInput.focus();
    }
  }

  initEventListener() {
    const $productPurchaseForm = document.querySelector('#product-purchase-form');
    $productPurchaseForm.addEventListener('submit', e => this.insertAmount.bind(this)(e));
  }
}

export default ProductPurchaseMenu;
