import { getProductInventoryTemplateRow } from '../template/index.js';

class ProductManageMenuService {
  static getProductMenuTemplate(products) {
    return Object.keys(products)
      .map(tabId => getProductInventoryTemplateRow(tabId, products[tabId]))
      .join('');
  }
}
export default ProductManageMenuService;
