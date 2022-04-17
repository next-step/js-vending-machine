import { ERROR_MESSAGE, SELECTOR } from '../constants.js';
import { $ } from '../utils/dom.js';
import { ProductManageView } from '../views/index.js';

class ProductManageController {
  constructor(target) {
    this.$productManageView = new ProductManageView(target);
  }

  addProduct() {
    const inputProductName = $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value;
    const inputProductPrice = $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value;
    const inputProductQuantity = $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value;

    try {
      this.validateProductName(inputProductName);
      this.validateProductPrice(inputProductPrice);
      this.validateProductQuantity(inputProductQuantity);
    } catch (error) {
      alert(error.message);
    }
  }

  validateProductName(productName) {
    if (!productName) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_NAME);
  }

  validateProductPrice(productPrice) {
    if (!productPrice) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_PRICE);
    else if (productPrice < 100) throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_OVER_100);
    else if (productPrice % 10 !== 0)
      throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10);
  }

  validateProductQuantity(productQuantity) {
    if (!productQuantity) throw new Error(ERROR_MESSAGE.REQUIRED_PRODUCT_QUANTITY);
    else if (productQuantity < 1) throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_HAVE_TO_OVER_1);
  }
}

export default ProductManageController;
