import { render, COIN_INPUT_DISPLAY_BINDER, REST_AMOUNT_FLUSH_DISPLAY_BINDER, PRODUCT_LIST_BINDER } from '../../binders.js';
import { products } from '../../states/productState.js';
import { vendingMachineState } from '../../states/vendingMachineState.js';

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
            // TODO: products를 localStorage 동기화하기 (메소드로 제공)
            render(COIN_INPUT_DISPLAY_BINDER);
            render(PRODUCT_LIST_BINDER);
          }
        })
      )),
    }
  }
}

let restAmountState = [];

// 자판기가 보유한 동전에서 최소 갯수의 동전으로 잔돈을 돌려준다.
// 잔돈으로 반환할 수 있는 금액만 반환한다. (나머지는 무시한다.)
// 동전은 xx개로 표현한다.

// 반환한 금액만큼 사용자가 충전한 금액이 차감됨.
// 반환한 금액만큼 자판기의 동전도 차감됨.
// 반환된 동전의 결과는 누적되지 않는다. (항상 새롭게 받아 계산한다.)
export function restAmountFlushButtonComponent() {
  return {
    rootElement: {
      events: {click: () => {
        restAmountState = vendingMachineState.returnTheRestAmountsByCoins(coinInputControllerState);
        render(COIN_INPUT_DISPLAY_BINDER);
        render(REST_AMOUNT_FLUSH_DISPLAY_BINDER);
      }},
    }
  }
}

const coin500Ref = new Ref();
const coin100Ref = new Ref();
const coin50Ref = new Ref();
const coin10Ref = new Ref();

export function restAmountFlushDisplayComponent() {
  const coinRefList = [coin500Ref, coin100Ref, coin50Ref, coin10Ref];
  restAmountState.forEach((amount, i) => {
    coinRefList[i].element.textContent = `${amount}개`;
  });

  return {
    coin500: {
      ref: coin500Ref,
    },
    coin100: {
      ref: coin100Ref,
    },
    coin50: {
      ref: coin50Ref,
    },
    coin10: {
      ref: coin10Ref,
    },
  }
}
