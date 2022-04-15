import { ProductManageView } from './views/index.js';

class VendingMachine {
  constructor(target) {
    this.$target = target;
    this.$productManageView = new ProductManageView(target);
  }
}

export default VendingMachine;
