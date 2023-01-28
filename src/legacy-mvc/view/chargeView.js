import { $ELEMENT } from '../../constants/element.js';

export default class ChargeView {
  $chargeContainer = document.querySelector($ELEMENT.CHARGE_CONTAINER);
  $chargeInput = document.querySelector($ELEMENT.CHARGE_INPUT);
  $chargeButton = document.querySelector($ELEMENT.CHARGE_BUTTON);
  $chargeAmount = document.querySelector($ELEMENT.CHARGE_AMOUNT);
  $coin500Count = document.querySelector($ELEMENT.COIN_500_COUNT);
  $coin100Count = document.querySelector($ELEMENT.COIN_100_COUNT);
  $coin50Count = document.querySelector($ELEMENT.COIN_50_COUNT);
  $coin10Count = document.querySelector($ELEMENT.COIN_10_COUNT);

  renderCoinsList = ({ coinMap }) => {
    const { $coin500Count, $coin100Count, $coin50Count, $coin10Count } = this;

    $coin500Count.innerText = coinMap[500];
    $coin100Count.innerText = coinMap[100];
    $coin50Count.innerText = coinMap[50];
    $coin10Count.innerText = coinMap[10];
  };

  renderTypedCoin = ({ coinValue }) => {
    this.$chargeInput.value = coinValue;
  };

  renderTotalCoin = ({ totalAmount }) => {
    this.$chargeAmount.innerText = totalAmount;
  };

  addChargeEvent = (addCharge) => {
    this.$chargeButton.addEventListener('click', (event) => {
      addCharge(event);
    });
  };

  addSubmitChargeEvent = (addCharge) => {
    this.$chargeContainer.addEventListener('submit', (event) => {
      addCharge(event);
    });
  };

  addTypeChargeEvent = (typeCoin) => {
    this.$chargeInput.addEventListener('keyup', (event) => {
      typeCoin(event.target.value);
    });
  };
}
