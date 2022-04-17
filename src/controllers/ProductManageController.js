import { ERROR_MESSAGE, SELECTOR } from '../constants.js';
import { $ } from '../utils/dom.js';
import { ProductManageView } from '../views/index.js';

class ProductManageController {
  constructor(target) {
    this.$productManageView = new ProductManageView(target);
  }

  addProduct() {
    const inputProductName = $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value;

    try {
      this.validateProductName(inputProductName);
    } catch (error) {
      alert(error.message);
    }
  }

  validateProductName(productName) {
    if (!productName) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_NAME);
  }
}

export default ProductManageController;
