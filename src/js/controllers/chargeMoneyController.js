import { chargeMoneyFormView, model } from '../index.js';
import { validateInputAmount } from '../service/chargeMoneyService.js';

export class chargeMoneyController {
  constructor() {
    // chargeFormView.bindOnClickChargeButton(this.onClickChargeButton);
    chargeMoneyFormView.bindOnClickChargeButton(this.onClickChargeButton);
  }

  onClickChargeButton = (event) => {
    event.preventDefault();
    validateInputAmount(chargeMoneyFormView.$chargedMoneyInput.value);
    const validAmount = Number(chargeMoneyFormView.$chargedMoneyInput.value);
    model.setChargedAmountByUser(validAmount);
    chargeMoneyFormView.renderChargedAmountByUser();
  };
}
