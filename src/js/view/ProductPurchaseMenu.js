import Storage from '../storage/index.js';
import { generateCashBoxChangeTemplate, productPurchaseMenuTemplate } from '../template/index.js';
import { ERROR_MESSAGE, MENU, NAME, STORAGE_KEY } from '../constants/index.js';
import { checkEmptyPrice, checkPriceUnit, checkValidation } from '../validate/index.js';
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
    const $productInventoryContainer = document.querySelector('#product-inventory-container');
    const $cashboxTable = document.querySelector('#cashbox-table');
    const $productPurchaseForm = document.querySelector('#product-purchase-form');

    const getProductManage = Storage.getStateData()[MENU.PRODUCT_MANAGE];

    $purchaseAmount.textContent = ProductManageMenuService.getCurrentTabState()[STORAGE_KEY.PURCHASE_PRICE];
    $productInventoryContainer.innerHTML = ProductPurchaseService.getProductPurchaseTemplate(getProductManage);
    $cashboxTable.innerHTML = generateCashBoxChangeTemplate(
      Storage.getStateData()[MENU.PRODUCT_PURCHASE][STORAGE_KEY.RETURN_REMAINS]
    );

    $productPurchaseForm.reset();
  }

  initRenderer() {
    const products = Storage.getStateData()[MENU.PRODUCT_MANAGE];
    const productMenuTemplate = ProductPurchaseService.getProductPurchaseTemplate(products);
    const cashBoxChangeTemplate = generateCashBoxChangeTemplate(
      Storage.getStateData()[MENU.PRODUCT_PURCHASE][STORAGE_KEY.RETURN_REMAINS]
    );

    this.app.innerHTML = productPurchaseMenuTemplate(productMenuTemplate, cashBoxChangeTemplate);

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
    this.productPurchaseService.setBuyProduct(product);
    ProductPurchaseMenu.changeRenderer();
  }

  returnRemain() {
    try {
      const { purchasePrice } = Storage.getStateData()[MENU.PRODUCT_PURCHASE];
      const { amount } = Storage.getStateData()[MENU.VENDING_MACHINE_MANAGE];
      const purchasePriceCondition = checkEmptyPrice(purchasePrice);
      const amountPriceCondition = checkEmptyPrice(amount);

      checkValidation(purchasePriceCondition, ERROR_MESSAGE.LACK_OF_INSERT);
      checkValidation(amountPriceCondition, ERROR_MESSAGE.LACK_OF_CHARGE);
      this.productPurchaseService.remainService();
      ProductPurchaseMenu.changeRenderer();
    } catch (error) {
      alert(error.message);
    }
  }

  initEventListener() {
    const $productPurchaseForm = document.querySelector('#product-purchase-form');
    $productPurchaseForm.addEventListener('submit', e => this.insertAmount.bind(this)(e));

    const $productInventoryContainer = document.querySelector('#product-inventory-container');
    $productInventoryContainer.addEventListener('click', e => this.buyProduct.bind(this)(e));

    const $coinReturnButton = document.querySelector('#coin-return-button');
    $coinReturnButton.addEventListener('click', () => this.returnRemain());
  }
}

export default ProductPurchaseMenu;
