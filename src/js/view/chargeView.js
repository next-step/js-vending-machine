import { $ELEMENT } from '../../constants/element.js';

export default class ChargeView {
  chargeInput = document.querySelector($ELEMENT.CHARGE_INPUT);
  chargeButton = document.querySelector($ELEMENT.CHARGE_BUTTON);
  coin500Count = document.querySelector($ELEMENT.COIN_500_COUNT);
  coin100Count = document.querySelector($ELEMENT.COIN_100_COUNT);
  coin50Count = document.querySelector($ELEMENT.COIN_50_COUNT);
  coin10Count = document.querySelector($ELEMENT.COIN_10_COUNT);

  renderCoinsList = (coinMap) => {
    this.coin500Count.innerText = coinMap.get(500);
    this.coin100Count.innerText = coinMap.get(100);
    this.coin50Count.innerText = coinMap.get(50);
    this.coin10Count.innerText = coinMap.get(10);
  };

  addChargeEvent = (addCharge) => {
    this.chargeButton.addEventListener('click', () => {
      addCharge();
    });
  };

  addTypeChargeEvent = (typeCoin) => {
    this.chargeInput.addEventListener('keyup', (event) => {
      typeCoin(event.target.value);
    });
  };
}
