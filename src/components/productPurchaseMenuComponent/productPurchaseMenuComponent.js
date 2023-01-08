import { render, COIN_INPUT_DISPLAY_BINDER, REST_AMOUNT_FLUSH_DISPLAY_BINDER, PRODUCT_LIST_BINDER } from '../../binders.js';
import { setLocalStorageItem } from '../../utils/localStorageUtils.js';
import { products, PRODUCTS_STATE_KEY } from '../../states/productState.js';

import { ProductPurchaseMenuState } from './ProductPurchaseMenuState.js';
import { createProductRow } from './productPurchseMenuUtils.js';

import { Ref } from '../common/Ref.js';

// 사용자가 넣은 금액은 전역으로 알 필요가 없다.
const coinInputControllerInitialState = new ProductPurchaseMenuState({
  input: 0,
  totalAmount: 0,
});

// 반환하기버튼을 통해 잔돈을 반환받을 수 있다.

let coinInputControllerState = coinInputControllerInitialState;

const coinInputRef = new Ref();

export function coinInputControllerComponent() {
  return {
    coinInput: {
      ref: coinInputRef,
      events: {change: (e) => {
        const element = e.target;
        coinInputControllerState.syncInput(element.value);
      }},
    },
    coinSubmitButton: {
      events: {click: () => {
        if (!coinInputControllerState.validateAmountInput(coinInputRef.element)) return;

        coinInputRef.element.value = null;
        coinInputControllerState.accumulateInput();
        render(COIN_INPUT_DISPLAY_BINDER);
      }},
    },
  }
}

const insertAmountRef = new Ref();

export function coinInputDisplayComponent() {
  insertAmountRef.addOnRenderCallback((insertAmount) => insertAmount.textContent = `${coinInputControllerInitialState.totalAmount}원`);

  return {
    insertAmount: {
      ref: insertAmountRef,
    }
  }
}

const productListRef = new Ref();

export function productListComponent() {
  return {
    rootElement: {
      ref: productListRef,
      children: Object.values(products).map((product) => (
        createProductRow(product, () => {
          if (product.buyProduct(coinInputControllerState)) {
            productListRef.element.innerHTML = '';
            render(COIN_INPUT_DISPLAY_BINDER);
            render(PRODUCT_LIST_BINDER);
          }
        })
      )),
    }
  }
}

const restAmountState = {};

// 자판기가 보유한 동전에서 최소 갯수의 동전으로 잔돈을 돌려준다.
// 잔돈으로 반환할 수 있는 금액만 반환한다. (나머지는 무시한다.)
// 동전은 xx개로 표현한다.

// 반환한 금액만큼 사용자가 충전한 금액이 차감됨.
// 반환한 금액만큼 자판기의 동전도 차감됨.
// 반환된 동전의 결과는 누적되지 않는다. (항상 새롭게 받아 계산한다.)
export function restAmountFlushButtonComponent() {
  return {
    rootElement: {
      events: {click: () =>{
        // TODO: 가지고 있던 돈을 자판기 동전 method에 넣어서 반환식을 발동시킨다. 반환받은 동전 갯수들을 state에 적용한다.
        // TODO: 사용자가 넣은 금액들은 모두 초기화 시킨다.
        render(REST_AMOUNT_FLUSH_DISPLAY_BINDER);
      }},
    }
  }
}

export function restAmountFlushDisplayComponent() {
  // TODO: 남은 금액들을 받아서 동전별로 구분해서 보여준다.
  return {

  }
}
