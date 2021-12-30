import { DOM } from '../constants/index.js';
import { $ } from '../utils/utils.js';
import { model } from '../index.js';

export class ReturnCoinTable {
  constructor() {
    this.$container = $(DOM.COIN_RETURN_CONTAINER);
    this.$returnButton = $(DOM.COIN_RETURN_BUTTON);
    this.$returnCoinQuantity10 = $(DOM.COIN_RETURN_QUANTITY_10);
    this.$returnCoinQuantity50 = $(DOM.COIN_RETURN_QUANTITY_50);
    this.$returnCoinQuantity100 = $(DOM.COIN_RETURN_QUANTITY_100);
    this.$returnCoinQuantity500 = $(DOM.COIN_RETURN_QUANTITY_500);
  }

  bindOnClickReturnCoinButton(handler) {
    this.$returnButton.addEventListener('click', () => {
      handler();
    });
  }

  renderReturnCoinTable() {
    this.$returnCoinQuantity10.innerText = model.returnCoins[10];
    this.$returnCoinQuantity50.innerText = model.returnCoins[50];
    this.$returnCoinQuantity100.innerText = model.returnCoins[100];
    this.$returnCoinQuantity500.innerText = model.returnCoins[500];
  }
}
