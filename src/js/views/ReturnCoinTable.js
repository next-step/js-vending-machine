import { DOM } from '../constants/index.js';
import { $ } from '../utils/utils.js';

export class ReturnCoinTable {
  constructor() {
    this.$container = $(DOM.COIN_RETURN_CONTAINER);
    this.$returnButton = $(DOM.COIN_RETURN_BUTTON);
    this.$returnCoinQuantity10 = $(DOM.COIN_RETURN_QUANTITY_10);
    this.$returnCoinQuantity50 = $(DOM.COIN_RETURN_QUANTITY_50);
    this.$returnCoinQuantity100 = $(DOM.COIN_RETURN_QUANTITY_100);
    this.$returnCoinQuantity500 = $(DOM.COIN_RETURN_QUANTITY_500);
  }

  // bindOnClickChargeButton(handler) {
  //   this.$chargeButton.addEventListener('click', (event) => {
  //     handler(event);
  //   });
  // }
}
