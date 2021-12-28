import { changeMachineModeController } from './changeMachineModeController.js';
import { chargeChangeController } from './chargeChangeController.js';
import { manageProductController } from './manageProductController.js';
import { purchaseProductController } from './purchaseProductController.js';
import { returnCoinController } from './returnCoinController.js';
import { chargeMoneyController } from './chargeMoneyController.js';

export class Controller {
  constructor() {
    new changeMachineModeController();
    new chargeChangeController();
    new manageProductController();
    new purchaseProductController();
    new returnCoinController();
    new chargeMoneyController();
  }
}
