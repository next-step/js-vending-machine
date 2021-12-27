import { chargeFormView, model } from '../index.js';
import { createRandomCoins, validateTypedAmount } from '../service/chargeChangeService.js';

export class chargeChangeController {
  constructor() {
    chargeFormView.bindOnClickChargeButton(this.onClickChargeButton);
  }

  onClickChargeButton = (event) => {
    event.preventDefault();
    const typedAmount = chargeFormView.$chargeAmountInput.value;
    validateTypedAmount(typedAmount);
    model.setChargedCoins(createRandomCoins(Number(typedAmount)));
    chargeFormView.renderChargedAmount();
    chargeFormView.renderChargedCoinTable();
    chargeFormView.$chargeForm.reset();
  };
}
