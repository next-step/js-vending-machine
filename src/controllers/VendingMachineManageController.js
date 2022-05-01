import { VendingMachineManageView } from '../views/index.js';
import { MoneyManager } from '../models/index.js';

import { $ } from '../utils/dom.js';
import { SELECTOR } from '../constants.js';

class VendingMachineManageController {
  constructor() {
    this.moneyManager = new MoneyManager();
  }

  render() {
    VendingMachineManageView.render();
    this.renderWithDatas();
  }

  chargeMoney() {
    const chargeMoney = $(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).value;

    try {
      this.moneyManager.holdingMoney = chargeMoney;
    } catch (error) {
      alert(error.message);
      return;
    }

    this.moneyManager.setCoinsAmount(this.moneyManager.pickRandomAmountOfCoins(chargeMoney));
    this.renderWithDatas();
  }

  renderWithDatas() {
    VendingMachineManageView.resetChargeInput();
    VendingMachineManageView.renderHoldingMoney(this.moneyManager.holdingMoney);
    VendingMachineManageView.renderHoldingCoins(this.moneyManager.getCoinsAmount());
    VendingMachineManageView.focusChargeInput();
  }
}

export default VendingMachineManageController;
