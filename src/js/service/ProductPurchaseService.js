import Storage from '../storage/index.js';
import { ERROR_MESSAGE, MENU, STORAGE_KEY } from '../constants/index.js';
import { generateProductPurchaseTemplate } from '../template/index.js';

class ProductPurchaseService {
  constructor() {
    this.stateData = Storage.getStateData();
    this.getStateByCurrentTab = this.stateData[Storage.getCurrentTab()];
  }

  static getProductPurchaseTemplate(products) {
    return Object.keys(products)
      .map(tabId => generateProductPurchaseTemplate(tabId, products[tabId]))
      .join('');
  }

  setAddPurchasePrice(price) {
    this.getStateByCurrentTab[STORAGE_KEY.PURCHASE_PRICE] += price;
    Storage.setStateData(this.stateData);
  }

  setButProduct(product) {
    const count = parseInt(this.stateData[MENU.PRODUCT_MANAGE][product]['count'], 10);
    const price = parseInt(this.stateData[MENU.PRODUCT_MANAGE][product]['price'], 10);
    const { purchasePrice } = this.getStateByCurrentTab;

    if (count > 0 && purchasePrice >= price) {
      this.getStateByCurrentTab[STORAGE_KEY.PURCHASE_PRICE] -= price;
      this.stateData[MENU.PRODUCT_MANAGE][product]['count'] -= 1;
      Storage.setStateData(this.stateData);
    } else {
      alert(ERROR_MESSAGE.INVALID_INSERT_COIN);
    }
  }
}
export default ProductPurchaseService;
