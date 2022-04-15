import { ProductManageController, TabController } from './controllers/index.js';

class VendingMachine {
  constructor(target) {
    this.$productManageController = new ProductManageController(target);
    this.$tabController = new TabController(target);
  }
}

export default VendingMachine;
