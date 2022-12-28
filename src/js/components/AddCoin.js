/* eslint-disable dot-notation */
import ERROR_MESSAGES from '../constants/errorMessages.js';
import { MINIMUM_CHARGING_MONEY } from '../constants/vendingMachine.js';
import { amountNotDividedZero } from '../validate.js';

export default function AddCoin({ $target, onSubmit }) {
  const $div = document.createElement('div');
  this.onSubmit = onSubmit;
  this.$target = $target;
  this.$target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
			<h3>자판기 잔돈 충전하기</h3>
      <div class="vending-machine-wrapper">
        <form class="charging-money-form">
          <input
            type="number"
            name="amount"
            id="vending-machine-charge-input"
          />
          <input class="btn" type="submit" id="vending-machine-charge-button" value="충전하기" />
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

    try {
      this.validate(inputAmount);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.onSubmit(Number(inputAmount));
  });
}
