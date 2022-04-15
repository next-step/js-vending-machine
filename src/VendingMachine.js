import { ProductManagerView } from './views/index.js';

class VendingMachine {
  constructor(target) {
    this.$target = target;
    this.$productManagerView = new ProductManagerView(target);
  }
}

export default VendingMachine;
