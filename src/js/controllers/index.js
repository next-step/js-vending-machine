import { changeMachineModeController } from './changeMachineModeController.js';
import { chargeChangeController } from './chargeChangeController.js';
import { manageProductController } from './manageProductController.js';
import { purchaseProductController } from './purchaseProductController.js';

export class Controller {
  constructor() {
    new changeMachineModeController();
    new chargeChangeController();
    new manageProductController();
    new purchaseProductController();
  }
}
