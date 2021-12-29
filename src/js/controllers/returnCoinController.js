import { chargeMoneyFormView, model, returnCoinTableView } from '../index.js';
import { createNewReturnCoinTable } from '../service/returnCoinService.js';

export class returnCoinController {
  constructor() {
    returnCoinTableView.bindOnClickReturnCoinButton(this.onClickReturnCoinButton);
    returnCoinTableView.renderReturnCoinTable();
  }

  onClickReturnCoinButton = () => {
    const { returnCoins, amount } = createNewReturnCoinTable(
      model.chargedAmountByUser,
      model.returnCoins
    );

    console.log(';', model.chargedAmountByUser);
    console.log(';', model.returnCoins);

    model.setChargedAmountByUser(amount);
    model.setReturnCoins(returnCoins);

    returnCoinTableView.renderReturnCoinTable();
    chargeMoneyFormView.renderChargedAmountByUser();
  };
}
