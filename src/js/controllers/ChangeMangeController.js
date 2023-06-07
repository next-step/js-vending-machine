import ChangeMangeView from '../views/ChangeMangeView.js';
import { $ } from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import ChangeMangeModel from '../models/ChangeManageModel.js';
import { getStorageCoins, setStorageCoins } from '../utils/storage.js';

class ChangeMangeController {
  #chargeInput;

  constructor() {
    this.changeMangeView = new ChangeMangeView();
    this.#initAddEventListener();
  }

  renderVendingMachineCharge() {
    this.changeMangeView.render();
    this.#renderVendingMachineChargeAmount();
    this.#renderTableWithCoins();
    this.#chargeInput = $(`#${SELECTOR.vendingMachineChargeInputId}`);
  }

  #initAddEventListener() {
    $(`#${SELECTOR.tabContentContainerId}`).addEventListener('click', (e) =>
      this.#onClickTabContent(e)
    );
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
    const amount = this.#getVendingMachineChargeInputData();
    this.#validate(amount);

    const changeManageModel = new ChangeMangeModel(amount);
    changeManageModel.setConins();

    this.#renderVendingMachineChargeAmount();
    this.#renderTableWithCoins();
    this.#resetVendingMachineChargeInput();
  }

  #getVendingMachineChargeInputData() {
    return Number(this.#chargeInput.value);
  }

  #sumCoins(coins) {
    return Object.entries(coins).reduce((acc, cur, idx) => {
      acc += cur[0] * cur[1];
      return acc;
    }, 0);
  }

  #resetVendingMachineChargeInput() {
    this.#chargeInput.value = ``;
    this.#chargeInput.focus();
  }

  #validate(amount) {
    try {
      this.#validateEmpty(amount);
      this.#validateCoin(amount);
    } catch (error) {
      alert(error.message);
      throw Error(error.message);
    }
  }

  #validateEmpty(amount) {
    const isEmpty = !amount;
    if (isEmpty) {
      this.#resetVendingMachineChargeInput();
      throw Error('충전 금액을 입력해주세요');
    }
  }

  #validateCoin(amount) {
    if (amount < 100) {
      this.#resetVendingMachineChargeInput();
      throw Error('충전금액은 최소 100원부터 가능합니다');
    }

    if (amount % 10 !== 0) {
      this.#resetVendingMachineChargeInput();
      throw Error('10원으로 나누어 떨어지는 금액만 충전이 가능합니다');
    }
  }
}

export default ChangeMangeController;
