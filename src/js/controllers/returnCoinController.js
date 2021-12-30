import { chargeMoneyFormView, model, returnCoinTableView } from '../index.js';
import { createNewReturnCoinTable } from '../service/returnCoinService.js';
import { ERROR_MESSAGE } from '../constants/index.js';

export class returnCoinController {
  constructor() {
    returnCoinTableView.bindOnClickReturnCoinButton(this.onClickReturnCoinButton);
    returnCoinTableView.renderReturnCoinTable();
  }

  onClickReturnCoinButton = () => {
    if (model.chargedAmountByUser === 0) throw Error(ERROR_MESSAGE.NONE_CHARGED_AMOUNT);

    const { returnCoins, amount } = createNewReturnCoinTable(
      model.chargedAmountByUser,
      model.returnCoins,
    );

    model.setChargedAmountByUser(amount);
    model.setReturnCoins(returnCoins);

    returnCoinTableView.renderReturnCoinTable();
    chargeMoneyFormView.renderChargedAmountByUser();
  };
}
