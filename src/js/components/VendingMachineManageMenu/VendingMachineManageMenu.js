/* eslint-disable no-restricted-syntax */
import { ERROR_MESSAGE } from '../../constants/errorMessage.js';
import { SELECTOR } from '../../constants/selector.js';
import { COINS, COIN_10, COIN_100, COIN_50, COIN_500 } from '../../constants/vendingMachineManageMenu.js';
import { $ } from '../../utils/dom.js';
import { InvalidValueError } from '../../utils/error.js';
import { chargeStorage, coinsStorage } from '../../utils/storage.js';
import { validateVendingMachineCharge } from '../../utils/validation.js';

/* eslint-disable class-methods-use-this */
export default class VendingMachineManageMenu extends HTMLElement {
  #state = {
    charge: 0,
    coins: {},
  };

  get state() {
    return { ...this.#state };
  }

  set state(state) {
    this.#state = state;
  }

  connectedCallback() {
    this.#state = this.#getInitialState();
    this.#render();
    this.#focusInput();
    this.#bindEvents();
  }

  #getInitialState() {
    return {
      charge: chargeStorage.get(),
      coins: coinsStorage.get(),
    };
  }

  #focusInput() {
    $(SELECTOR.VENDING_MACHINE.CHARGE_INPUT).focus();
  }

  #resetInput() {
    $(SELECTOR.VENDING_MACHINE.CHARGE_INPUT).value = '';
  }

  #shuffleArray(array) {
    const tempArray = [...array];

    for (let i = tempArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);

      [tempArray[i], tempArray[randomIndex]] = [tempArray[randomIndex], tempArray[i]];
    }

    return tempArray;
  }

  #mergeCoins(coin1, coin2) {
    const tempCoin = { ...coin1 };

    for (const [key, value] of Object.entries(coin2)) {
      tempCoin[key] += value;
    }

    return tempCoin;
  }

  #getCoins(charge, units) {
    const { coins } = this.#shuffleArray(units).reduce(
      (prev, acc) => {
        const currentCoin = Math.floor(prev.charge / acc);
        const newCoins = { ...prev.coins, [acc]: currentCoin };
        const remainCharge = prev.charge - currentCoin * acc;

        return { coins: newCoins, charge: remainCharge };
      },
      { coins: {}, charge },
    );

    return coins;
  }

  #addCharge(charge) {
    this.#state.coins = this.#mergeCoins(this.#state.coins, this.#getCoins(charge, COINS.UNITS));
    this.#state.charge += charge;

    chargeStorage.set(this.#state.charge);
    coinsStorage.set(this.#state.coins);
    this.#render();
    this.#bindEvents();
  }

  #handleChargeButtonClick() {
    try {
      const charge = $(SELECTOR.VENDING_MACHINE.CHARGE_INPUT).valueAsNumber;
      validateVendingMachineCharge(charge);

      this.#addCharge(charge);
      this.#resetInput();
    } catch (error) {
      if (error instanceof InvalidValueError) {
        return alert(error.message);
      }
      alert(ERROR_MESSAGE.COMMON.UNKNOWN);
    }
  }

  #bindEvents() {
    $(SELECTOR.VENDING_MACHINE.CHARGE_BUTTON).addEventListener('click', this.#handleChargeButtonClick.bind(this));
  }

  #getTemplate() {
    return /* HTML */ `<h3>자판기 돈통 충전하기</h3>
      <div class="vending-machine-wrapper">
        <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
        <button id="vending-machine-charge-button">충전하기</button>
      </div>
      <div id="vending-machine-status-wrapper">
        <p>보유 금액: <span id="vending-machine-charge-amount">${this.#state.charge}</span>원</p>
        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>동전</th>
              <th>개수</th>
            </tr>
          </thead>
          <tbody id="vending-machine-coins-container">
            <tr>
              <td>500원</td>
              <td id="vending-machine-coin-500-quantity">${this.#state.coins[COIN_500]}개</td>
            </tr>
            <tr>
              <td>100원</td>
              <td id="vending-machine-coin-100-quantity">${this.#state.coins[COIN_100]}개</td>
            </tr>
            <tr>
              <td>50원</td>
              <td id="vending-machine-coin-50-quantity">${this.#state.coins[COIN_50]}개</td>
            </tr>
            <tr>
              <td>10원</td>
              <td id="vending-machine-coin-10-quantity">${this.#state.coins[COIN_10]}개</td>
            </tr>
          </tbody>
        </table>
      </div> `;
  }

  #render() {
    this.innerHTML = this.#getTemplate();
  }
}

window.customElements.define('vending-machine-manage-menu', VendingMachineManageMenu);
