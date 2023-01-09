import { render, COIN_INPUT_DISPLAY_BINDER, REST_AMOUNT_FLUSH_DISPLAY_BINDER, PRODUCT_LIST_BINDER, binders } from '../../binders.js';
import { products, setProductStateInLocalStorage } from '../../states/productState.js';
import { vendingMachineState } from '../../states/vendingMachineState.js';

import { ProductPurchaseMenuState } from './ProductPurchaseMenuState.js';
import { createProductRow } from './productPurchaseMenuUtils.js';

import { Ref } from '../common/Ref.js';

const coinInputControllerInitialState = new ProductPurchaseMenuState({
  input: 0,
  totalAmount: 0,
});

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
            setProductStateInLocalStorage(products);
            render(COIN_INPUT_DISPLAY_BINDER);
            render(PRODUCT_LIST_BINDER);
          }
        })
      )),
    }
  }
}

let restAmountState = [];

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
    coinRefList[i].addOnRenderCallback((element) => element.textContent = `${amount}개`);
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
