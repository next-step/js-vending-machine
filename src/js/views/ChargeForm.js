import { DOM } from '../constants/index.js';
import { $ } from '../utils/utils.js';
import { model } from '../index.js';
import { getAllChargedCoinsAmount } from '../service/chargeChangeService.js';

export class ChargeForm {
  constructor() {
    this.$container = $(DOM.CHARGE_FORM_CONTAINER);
    this.$chargeForm = $(DOM.CHARGE_FORM);
    this.$chargeAmountInput = $(DOM.CHARGE_MONEY_INPUT);
    this.$chargeButton = $(DOM.CHARGE_BUTTON);
    this.$chargedAmount = $(DOM.CHARGED_AMOUNT);
    this.$coinQuantity500 = $(DOM.COIN_QUANTITY_500);
    this.$coinQuantity100 = $(DOM.COIN_QUANTITY_100);
    this.$coinQuantity50 = $(DOM.COIN_QUANTITY_50);
    this.$coinQuantity10 = $(DOM.COIN_QUANTITY_10);
  }

  bindOnClickChargeButton(handler) {
    this.$chargeButton.addEventListener('click', (event) => {
      handler(event);
    });
  }

  renderChargedAmount() {
    this.$chargedAmount.innerText = getAllChargedCoinsAmount(model.chargedCoins);
  }

  renderChargedCoinTable() {
    this.$coinQuantity10.innerText = model.chargedCoins[10];
    this.$coinQuantity50.innerText = model.chargedCoins[50];
    this.$coinQuantity100.innerText = model.chargedCoins[100];
    this.$coinQuantity500.innerText = model.chargedCoins[500];
  }
}
