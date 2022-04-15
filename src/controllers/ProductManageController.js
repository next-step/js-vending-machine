import { ProductManageView } from '../views/index.js';

class ProductManageController {
  constructor(target) {
    this.$productManageView = new ProductManageView(target);
  }
}

export default ProductManageController;
