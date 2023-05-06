import VendingMachineView from '../views/VendingMachineView.js';
import ProductManageController from './ProductManageController.js';

class VendingMachineController {
  constructor() {
    this.vendingMachineView = new VendingMachineView();
    this.productManageController = new ProductManageController();
  }
}

export default VendingMachineController;