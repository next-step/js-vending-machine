import { vendingMachineManageTabTemplate } from '../templates/index.js';

import { $ } from '../utils/dom.js';
import { SELECTOR, STANDARD } from '../constants.js';

const VendingMachineManageView = {
  render: () => {
    $('main').innerHTML = vendingMachineManageTabTemplate();
  },
  renderHoldingMoney: money => {
    $(`#${SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT_ID}`).textContent = money;
  },
  renderHoldingCoins: coins => {
    $(`#${SELECTOR.VENDING_MACHINE_COIN_500_QUANTITY_ID}`).textContent = `${coins[STANDARD.COIN_500]}개`;
    $(`#${SELECTOR.VENDING_MACHINE_COIN_100_QUANTITY_ID}`).textContent = `${coins[STANDARD.COIN_100]}개`;
    $(`#${SELECTOR.VENDING_MACHINE_COIN_50_QUANTITY_ID}`).textContent = `${coins[STANDARD.COIN_50]}개`;
    $(`#${SELECTOR.VENDING_MACHINE_COIN_10_QUANTITY_ID}`).textContent = `${coins[STANDARD.COIN_10]}개`;
  },
  focusChargeInput: () => $(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).focus(),
  resetChargeInput: () => {
    $(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).value = '';
  },
};

export default VendingMachineManageView;
