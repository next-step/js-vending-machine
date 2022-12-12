import { SELECTOR } from '../constants/selector.js';
import { $ } from '../utils/dom.js';
import { validateVendingMachineCharge } from '../utils/validation.js';

const COIN_500 = '500';
const COIN_100 = '100';
const COIN_50 = '50';
const COIN_10 = '10';

const COIN_UNITS = [COIN_500, COIN_100, COIN_50, COIN_10];

const INIT_CHARGE = 0;

const INIT_COINS = {
  500: 0,
  100: 0,
  50: 0,
  10: 0,
};

/* eslint-disable class-methods-use-this */
export default class VendingMachineManageMenu {
  #state = {
    charge: 0,
    coins: {},
  };

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;
  }

  init() {
    this.#state = {
      charge: Number(localStorage.getItem('charge')) ?? INIT_CHARGE,
      coins: JSON.parse(localStorage.getItem('coins')) ?? INIT_COINS,
    };
    this.#render();
    this.#renderState();
    this.#focusInput();
    this.#bindEvents();
  }

  #focusInput() {
    $(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).focus();
  }

  #resetInput() {
    $(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).value = '';
  }

  #getCoins(charge, units) {
    let newCharge = charge;
    const coins = {};

    units.forEach((unit) => {
      coins[unit] = Math.floor(newCharge / unit);
      // eslint-disable-next-line no-bitwise
      newCharge %= unit;
    });

    return coins;
  }

  #addCharge(charge) {
    this.#state.charge += charge;
    this.#state.coins = this.#getCoins(this.#state.charge, COIN_UNITS);

    localStorage.setItem('charge', String(this.#state.charge));
    localStorage.setItem('coins', JSON.stringify(this.#state.coins));
    this.#renderState();
  }

  handleChargeButtonClick() {
    try {
      const charge = $(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).valueAsNumber;
      validateVendingMachineCharge(charge);

      this.#addCharge(charge);
      this.#resetInput();
    } catch (error) {
      alert(error.message);
    }
  }

  #bindEvents() {
    $(SELECTOR.VENDING_MACHINE_CHARGE_BUTTON).addEventListener('click', this.handleChargeButtonClick.bind(this));
  }

  #renderState() {
    const template = `
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
      <tbody>
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
    `;

    $(SELECTOR.VENDING_MACHINE_STATUS_WRAPPER).innerHTML = template;
  }

  #getTemplate() {
    return `<h3>자판기 돈통 충전하기</h3>
    <div class="vending-machine-wrapper">
      <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
      <button id="vending-machine-charge-button">충전하기</button>
    </div>
    <div id='vending-machine-status-wrapper'>
    </div>
   `;
  }

  #render() {
    $(SELECTOR.APP).innerHTML = this.#getTemplate(this.#state);
  }
}
