/* eslint-disable dot-notation */
import { MINIMUM_CHARGING_MONEY } from '../constants/vendingMachine.js';
import { amountNotDividedZero } from '../validate.js';
import ERROR_MESSAGES from '../constants/errorMessages.js';

export default function InputMoneyForm({ $target, onSubmit }) {
  const $div = document.createElement('div');
  this.onSubmit = onSubmit;
  this.$target = $target;
  this.$target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
			 <h3>금액 투입</h3>
          <form class="input-money-form">
            <input type="number" name="amount" data-cy="charge-input" />
            <input type="submit" data-cy="charge-button" class="btn" value="투입 하기"/>
					</form>
        </div>`;
  };

  this.render();

  this.validate = amount => {
    if (amount < MINIMUM_CHARGING_MONEY) throw new Error(ERROR_MESSAGES.TOO_SMALL_CHARGING_MONEY);
    if (amountNotDividedZero(amount)) {
      throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_CHARGING_MONEY);
    }
  };
  $div.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const { value: inputAmount } = event.target.elements['amount'];
    console.log(inputAmount);
    try {
      this.validate(inputAmount);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.onSubmit(Number(inputAmount));
  });
}
