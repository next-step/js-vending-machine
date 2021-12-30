import { $ } from '../utils/utils.js';
import { DOM } from '../constants/index.js';
import { model } from '../index.js';

export class ChargeMoneyForm {
  constructor() {
    this.$container = $(DOM.INSERT_MONEY_FORM_CONTAINER);
    this.$chargedMoneyInput = $(DOM.INSERT_MONEY_INPUT);
    this.$chargedMoneyButton = $(DOM.INSERT_MONEY_BUTTON);
    this.$chargedAmount = $(DOM.INSERTED_AMOUNT);
  }

  bindOnClickChargeButton(handler) {
    this.$chargedMoneyButton.addEventListener('click', (event) => {
      handler(event);
    });
  }

  renderChargedAmountByUser() {
    this.$chargedAmount.innerText = model.chargedAmountByUser;
  }
}
