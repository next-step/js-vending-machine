import Storage from '../storage/index.js';
import { getProductInventoryTemplateRow } from '../template/index.js';

class ProductManageMenuService {
  static setProductListState({ noBlankName, price, count }) {
    const state = Storage.getStateData();
    state[Storage.getCurrentTab()][noBlankName] = {
      price,
      count,
    };
    Storage.setStateData(state);
  }

  static getCurrentTabState() {
    return Storage.getStateData()[Storage.getCurrentTab()];
  }

  static getProductMenuTemplate(products) {
    return Object.keys(products)
      .map(tabId => getProductInventoryTemplateRow(tabId, products[tabId]))
      .join('');
  }
}
export default ProductManageMenuService;
