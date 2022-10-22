import Storage from '../storage/index.js';
import { productPurchaseMenuTemplate } from '../template/index.js';
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

    const $productInventoryContainer = document.querySelector('#product-inventory-container');
    const getProductManage = Storage.getStateData()[MENU.PRODUCT_MANAGE];

    $productInventoryContainer.innerHTML = ProductPurchaseService.getProductPurchaseTemplate(getProductManage);

    const $productPurchaseForm = document.querySelector('#product-purchase-form');
    $productPurchaseForm.reset();
  }

  initRenderer() {
    const products = Storage.getStateData()[MENU.PRODUCT_MANAGE];
    const productMenuTemplate = ProductPurchaseService.getProductPurchaseTemplate(products);
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

  buyProduct(e) {
    const { className, dataset } = e.target;
    if (className !== 'purchase-product-button') return;
    const { product } = dataset;
    this.productPurchaseService.setButProduct(product);
    ProductPurchaseMenu.changeRenderer();
  }

  initEventListener() {
    const $productPurchaseForm = document.querySelector('#product-purchase-form');
    $productPurchaseForm.addEventListener('submit', e => this.insertAmount.bind(this)(e));
    const $productInventoryContainer = document.querySelector('#product-inventory-container');
    $productInventoryContainer.addEventListener('click', e => this.buyProduct.bind(this)(e));
  }
}

export default ProductPurchaseMenu;
