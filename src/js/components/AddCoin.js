import ERROR_MESSAGES from '../constants/errorMessages.js';
import { MINIMUM_CHARGING_MONEY } from '../constants/vendingMachine.js';
import { amountNotDividedZero } from '../validate.js';
import { getItem } from '../utils/Storage.js';
import { chargingMoney } from '../action.js';
import { subject } from '../../../index.js';

customElements.define(
  'add-coin',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
      subject.subscribe(this);
      this.state = getItem('state').totalMoney;
    }

    connectedCallback() {
      this.init();
      this.setEvent();
      this.render();
    }

    validate(amount) {
      if (amount < MINIMUM_CHARGING_MONEY) throw new Error(ERROR_MESSAGES.TOO_SMALL_CHARGING_MONEY);
      if (amountNotDividedZero(amount)) {
        throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_CHARGING_MONEY);
      }
    }

    setState() {
      this.state = getItem('state').totalMoney;
      this.render();
    }

    setEvent() {
      this.shadow.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const { value: inputAmount } = event.target.elements['amount'];
        try {
          this.validate(inputAmount);
        } catch (error) {
          alert(error.message);
        }
        chargingMoney(Number(inputAmount));
      });
    }

    render() {
      const $chargeInput = this.shadow.querySelector('#vending-machine-charge-amount');
      $chargeInput.innerHTML = this.state.toLocaleString('ko-KR');
    }

    init() {
      this.template.innerHTML = `
				<link rel="stylesheet" href="./src/css/index.css" />
        <h3>자판기 잔돈 충전하기</h3>
        <div class="vending-machine-wrapper">
          <form class="charging-money-form">
            <input
              type="number"
              name="amount"
              data-cy="charge-input"
              id="vending-machine-charge-input"
            />
            <input
              class="btn"
              type="submit"
              data-cy="charge-button"
              id="vending-machine-charge-button"
              value="충전하기"
            />
          </form>
        </div>
        <p>보유 금액: <span data-cy="charge-amount" id="vending-machine-charge-amount"></span>원</p>
        <hr />`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
