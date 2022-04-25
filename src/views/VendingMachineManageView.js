import { vendingMachineManageTabTemplate } from '../templates/index.js';

import { $ } from '../utils/dom.js';
import { SELECTOR } from '../constants.js';

const VendingMachineManageView = {
  render: () => {
    $('main').innerHTML = vendingMachineManageTabTemplate();
  },
  renderHoldingMoney: money => {
    $(`#${SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT_ID}`).textContent = money;
  },
  resetChargeInput: () => {
    $(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).value = '';
  },
};

export default VendingMachineManageView;
