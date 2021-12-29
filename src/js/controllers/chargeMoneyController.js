import { chargeMoneyFormView, model, returnCoinTableView } from '../index.js';
import { validateInputAmount } from '../service/chargeMoneyService.js';
import { INITIAL_STATE } from '../model/initialState.js';

export class chargeMoneyController {
  constructor() {
    chargeMoneyFormView.bindOnClickChargeButton(this.onClickChargeButton);
    chargeMoneyFormView.renderChargedAmountByUser();
  }

  onClickChargeButton = (event) => {
    event.preventDefault();

    model.setReturnCoins(INITIAL_STATE.RETURN_COINS);
    returnCoinTableView.renderReturnCoinTable();

    validateInputAmount(chargeMoneyFormView.$chargedMoneyInput.value);

    const validAmount = Number(chargeMoneyFormView.$chargedMoneyInput.value);

    model.setChargedAmountByUser(model.chargedAmountByUser + validAmount);
    chargeMoneyFormView.renderChargedAmountByUser();
  };
}
