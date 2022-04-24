import { VendingMachineManageView } from '../views/index.js';

import { $ } from '../utils/dom.js';
import { ERROR_MESSAGE, SELECTOR, STANDARD } from '../constants.js';

class VendingMachineManageController {
  render() {
    VendingMachineManageView.render();
  }

  chargeCoin() {
    const chargeMoney = $(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).value;

    try {
      this.validateChargeMoney(chargeMoney);
    } catch (error) {
      alert(error.message);
    }
  }

  validateChargeMoney(money) {
    if (money < STANDARD.CHARGE_INPUT_MINIMUM) throw new Error(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_OVER_100);
    if (money % STANDARD.CHARGE_INPUT_DIVIDE_BY) throw new Error(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_DIVIDED_BY_10);
  }
}

export default VendingMachineManageController;
