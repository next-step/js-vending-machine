import ChangeMangeView from '../views/ChangeMangeView.js';
import { $ } from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import ChangeMangeModel from '../models/ChangeManageModel.js';
import { getStorageCoins, setStorageCoins } from '../utils/storage.js';

class ChangeMangeController {
  #coins = {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  };
  #chargeInput;

  constructor() {
    this.changeMangeView = new ChangeMangeView();

    this.#renderVendingMachineCharge();
    this.initAddEventListener();
    this.#chargeInput = $(`#${SELECTOR.vendingMachineChargeInputId}`);
  }

  initAddEventListener() {
    $(`#${SELECTOR.tabContentContainerId}`).addEventListener('click', (e) =>
      this.#onClickTabContent(e)
    );
    $(`#${SELECTOR.vendingMachineChargeInputId}`).addEventListener('keyup', (e) => {
      if (e.key !== 'Enter') return;
      this.#handleVendingMachineCharge();
    });
  }

  #renderVendingMachineCharge() {
    this.changeMangeView.render();
    this.#renderVendingMachineChargeAmount();
    this.#renderTableWithCoins();
  }

  #renderVendingMachineChargeAmount() {
    const sumCoins = this.#sumCoins(getStorageCoins());
    this.changeMangeView.renderVendingMachineChargeAmount(sumCoins);
  }

  #renderTableWithCoins() {
    const storageCoins = getStorageCoins();
    Object.entries(storageCoins).forEach(([key, value]) => {
      $(`#vending-machine-coin-${key}-quantity`).innerText = `${value}개`;
    });
  }

  #onClickTabContent(e) {
    const { id } = e.target;
    if (id === SELECTOR.vendingMachineChargeButtonId)
      this.#handleVendingMachineCharge();
  }

  #handleVendingMachineCharge() {
    const vendingMachineChargeInputData = this.#getVendingMachineChargeInputData();
    this.#rechargeCoins(vendingMachineChargeInputData);
    const changeManageModel = new ChangeMangeModel(this.#coins);

    this.#setConins(changeManageModel.charge);
    this.#renderVendingMachineChargeAmount();
    this.#renderTableWithCoins();
    this.#vendingMachineChargeInput();
  }

  #getVendingMachineChargeInputData() {
    return Number(this.#chargeInput.value);
  }

  #setConins(charge) {
    setStorageCoins(charge);
  }

  #rechargeCoins(amount) {
    const coinValues = Object.keys(this.#coins).sort(function (a, b) {
      return b - a;
    });

    coinValues.forEach((coinValue) => {
      let count = Math.floor(amount / coinValue);

      if (count > 0) {
        this.#coins[coinValue] += count;
        amount -= coinValue * count;
      }
    });
  }

  #sumCoins(coins) {
    return Object.entries(coins).reduce((acc, cur, idx) => {
      acc += cur[0] * cur[1];
      return acc;
    }, 0);
  }

  #vendingMachineChargeInput() {
    this.#chargeInput.value = ``;
    this.#chargeInput.focus();
  }
}

export default ChangeMangeController;
