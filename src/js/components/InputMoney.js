import ERROR_MESSAGES from '../constants/errorMessages.js';
import { MINIMUM_CHARGING_MONEY } from '../constants/vendingMachine.js';
import { amountNotDividedZero } from '../validate.js';
import { getItem } from '../utils/Storage.js';
import { setInputMoney } from '../action.js';
import subject from '../utils/subject.js';
import { CustomError } from '../utils/error.js';

customElements.define(
  'input-money',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
      this.state = getItem('state').inputMoney;
      subject.subscribe(this);
    }

    connectedCallback() {
      this.initHtml();
      this.setEvent();
      this.render();
    }

    setState() {
      this.state = getItem('state').inputMoney;
      this.render();
    }

    validate(amount) {
      if (amount < MINIMUM_CHARGING_MONEY) throw new Error(ERROR_MESSAGES.TOO_SMALL_CHARGING_MONEY);
      if (amountNotDividedZero(amount)) {
        throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_CHARGING_MONEY);
      }
    }

    setEvent() {
      this.shadow.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const { value: inputAmount } = event.target.elements['amount'];
        try {
          this.validate(inputAmount);
        } catch (error) {
          if (error instanceof CustomError) {
            alert(error.message);
            return;
          }
          console.error(error);
        }
        setInputMoney(Number(inputAmount));
      });
    }

    render() {
      const $inputMoney = this.shadow.querySelector('span[data-cy="input-money-value"]');
      $inputMoney.innerHTML = this.state.toLocaleString('ko-KR');
    }

    initHtml() {
      this.template.innerHTML = `
				<link rel="stylesheet" href="./src/css/index.css" />
				<h3>금액 투입</h3>
          <form class="input-money-form">
            <input type="number" name="amount" data-cy="input-money" />
            <input type="submit" data-cy="input-money-button" class="btn" value="투입 하기"/>
					</form>
        </div>
				<p>투입한 금액: <span data-cy="input-money-value"></span>원</p>
      	<hr />`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
