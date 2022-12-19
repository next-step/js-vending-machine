import { $ELEMENT } from '../../constants/element.js';

export default class ChargeView {
  chargeInput = document.querySelector($ELEMENT.CHARGE_INPUT);
  chargeButton = document.querySelector($ELEMENT.CHARGE_BUTTON);
  chargeAmount = document.querySelector($ELEMENT.CHARGE_AMOUNT);
  coin500Count = document.querySelector($ELEMENT.COIN_500_COUNT);
  coin100Count = document.querySelector($ELEMENT.COIN_100_COUNT);
  coin50Count = document.querySelector($ELEMENT.COIN_50_COUNT);
  coin10Count = document.querySelector($ELEMENT.COIN_10_COUNT);

  renderCoinsList = ({ coinMap }) => {
    this.coin500Count.innerText = coinMap[500];
    this.coin100Count.innerText = coinMap[100];
    this.coin50Count.innerText = coinMap[50];
    this.coin10Count.innerText = coinMap[10];
  };

  renderTypedCoin = ({ coinValue }) => {
    this.chargeInput.value = coinValue;
  };

  renderTotalCoin = ({ totalAmount }) => {
    this.chargeAmount.innerText = totalAmount;
  };

  addChargeEvent = (addCharge) => {
    this.chargeButton.addEventListener('click', () => {
      addCharge();
    });
  };

  addTypeChargeEvent = ({ typeCoin, addCharge }) => {
    this.chargeInput.addEventListener('keyup', (event) => {
      typeCoin(event.target.value);

      if (event.key === 'Enter') {
        addCharge();
      }
    });
  };
}
