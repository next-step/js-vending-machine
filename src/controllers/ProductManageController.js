import { ProductManager } from '../models/index.js';
import { ProductManageView } from '../views/index.js';

import { SELECTOR } from '../constants.js';
import { $ } from '../utils/dom.js';

class ProductManageController {
  constructor() {
    this.productManager = new ProductManager();
  }

  render() {
    ProductManageView.render();
    ProductManageView.renderProductTable(this.productManager.products);
  }

  addProduct() {
    const product = {
      name: $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value,
      price: $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value,
      quantity: $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value,
    };

    try {
      this.productManager.addProduct(product);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.render();
  }
}

export default ProductManageController;
