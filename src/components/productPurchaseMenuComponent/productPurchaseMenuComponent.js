import { render, COIN_INPUT_DISPLAY_BINDER } from '../../binders.js';
import { setLocalStorageItem } from '../../utils/localStorageUtils.js';
import { products, PRODUCTS_STATE_KEY } from '../../states/productState.js';

import { Ref } from '../common/Ref.js';

const coinInputControllerInitialState = {
  amount: 0,
};

export function coinInputControllerComponent() {
  let coinInputControllerState = coinInputControllerInitialState;

  return {
    coinInput: {
      events: {change: (e) => {
        coinInputControllerState.amount = e.target.value
      }},
    },
    coinSubmitButton: {
      events: {click: (e) => {
        // TODO: 전역 상태로 올리기
        render(COIN_INPUT_DISPLAY_BINDER);
      }},
    },
  }
}

const insertAmountRef = new Ref();

export function coinInputDisplayComponent() {
  insertAmountRef.addOnRenderCallback((insertAmount) => insertAmount.textContent = coinInputControllerInitialState.amount);

  return {
    insertAmount: {
      ref: insertAmountRef,
    }
  }
}

export function productListComponent() {
  return {}
}

export function restAmountFlushButtonComponent() {
  return {

  }
}

export function restAmountFlushDisplayComponent() {
  return {

  }
}
