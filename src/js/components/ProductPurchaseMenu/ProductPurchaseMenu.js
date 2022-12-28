/* eslint-disable class-methods-use-this */
import { ERROR_MESSAGE } from '../../constants/errorMessage.js';
import { SELECTOR } from '../../constants/selector.js';
import { PRODUCT_KEY } from '../../constants/storage.js';
import { COIN_500, COIN_100, COIN_50, COIN_10, COINS } from '../../constants/vendingMachineManageMenu.js';
import { $, $all } from '../../utils/dom.js';
import { CustomError } from '../../utils/error.js';
import { chargeStorage, coinsStorage, productStorage, returnCoinsStorage } from '../../utils/storage.js';
import {
  validatePurchaseMoney,
  validatePurchasePrice,
  validatePurchaseQuantity,
  validateReturnChargeAmount,
  validateReturnResult,
} from '../../utils/validation.js';

export default class ProductPurchaseMenu extends HTMLElement {
  #state = {
    money: 0,
    chargeAmount: 0,
    products: new Map(),
    returnCoins: { 500: 0, 100: 0, 50: 0, 10: 0 },
  };

  connectedCallback() {
    this.#state = this.#getInitialState();
    this.#render();
    this.#bindEvents();
  }

  #getInitialState() {
    return {
      money: 0,
      chargeAmount: 0,
      products: productStorage.get(PRODUCT_KEY),
      returnCoins: returnCoinsStorage.get(),
    };
  }

  #handleMoneyChange(e) {
    this.#state.money = e.target.valueAsNumber;
  }

  #handleMoneyClick() {
    try {
      validatePurchaseMoney(this.#state.money);

      this.#state.chargeAmount += this.#state.money;

      this.#render();
      this.#bindEvents();
    } catch (error) {
      if (error instanceof CustomError) {
        return alert(error.message);
      }
      alert(ERROR_MESSAGE.COMMON.UNKNOWN);
    }
  }

  #handleBuyClick(name) {
    const product = this.#state.products.get(name);
    const { price, quantity } = product;

    try {
      validatePurchaseQuantity(quantity);
      validatePurchasePrice(this.#state.chargeAmount, price);

      this.#state.products.set(name, {
        ...product,
        quantity: quantity - 1,
      });
      this.#state.chargeAmount -= price;

      productStorage.set(this.#state.products);
      this.#render();
      this.#bindEvents();
    } catch (error) {
      if (error instanceof CustomError) {
        return alert(error.message);
      }
      alert(ERROR_MESSAGE.COMMON.UNKNOWN);
    }
  }

  #handleReturnClick() {
    try {
      validateReturnChargeAmount(this.#state.chargeAmount);

      const coins = coinsStorage.get();

      const { returnCoins, charge } = COINS.UNITS.reduce(
        (prev, acc) => {
          let currentCoin = prev.charge;
          let count = 0;

          while (coins[acc] > 0) {
            if (currentCoin < acc) break;

            currentCoin -= acc;
            count++;
            coins[acc]--;
          }

          const newCoins = { ...prev.returnCoins, [acc]: count };

          return { returnCoins: newCoins, charge: currentCoin };
        },

        { returnCoins: {}, charge: this.#state.chargeAmount },
      );

      validateReturnResult(this.#state.chargeAmount, charge);

      const returnMoney = this.#state.chargeAmount - charge;

      coinsStorage.set(coins);
      chargeStorage.set(chargeStorage.get() - returnMoney);
      this.#state.returnCoins = returnCoins;
      this.#state.chargeAmount = charge;
      this.#render();
      this.#bindEvents();
    } catch (error) {
      if (error instanceof CustomError) {
        return alert(error.message);
      }
      alert(ERROR_MESSAGE.COMMON.UNKNOWN);
    }
  }

  #bindEvents() {
    $(SELECTOR.PRODUCT_PURCHASE.MONEY_INPUT).addEventListener('input', this.#handleMoneyChange.bind(this));
    $(SELECTOR.PRODUCT_PURCHASE.MONEY_BUTTON).addEventListener('click', this.#handleMoneyClick.bind(this));
    $(SELECTOR.PRODUCT_PURCHASE.RETURN_BUTTON).addEventListener('click', this.#handleReturnClick.bind(this));

    $all(SELECTOR.PRODUCT_PURCHASE.BUY_BUTTON).forEach((elem) => {
      const { name } = elem.dataset;
      elem.addEventListener('click', this.#handleBuyClick.bind(this, name));
    });
  }

  #getTemplate() {
    let template = '';
    this.#state.products.forEach((product) => {
      template += /* HTML */ `
        <tr>
          <th>${product.name}</th>
          <th>${product.price}</th>
          <th>${product.quantity}</th>
          <th><button type="button" id="product-purchase-buy-button" data-name=${product.name}>구매하기</button></th>
        </tr>
      `;
    });

    return /* HTML */ `<div class="purchase-container">
        <h3>충전하기</h3>
        <div class="vending-machine-wrapper">
          <input type="number" name="charge-amount" id="product-purchase-money-input" />
          <button id="product-purchase-money-button">충전하기</button>
        </div>
        <p>충전 금액: <span id="product-purchase-charge-amount">${this.#state.chargeAmount}</span>원</p>
      </div>
      <table class="product-inventory">
        <colgroup>
          <col style="width: 140px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
        </colgroup>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody id="product-inventory-container">
          ${template}
        </tbody>
      </table>
      <h3>잔돈</h3>
      <button id="product-purchase-return-button">반환하기</button>
      <table class="cashbox-remaining">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody id="vending-machine-coins-container">
          <tr>
            <td>500원</td>
            <td id="vending-machine-coin-500-quantity">${this.#state.returnCoins[COIN_500]}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="vending-machine-coin-100-quantity">${this.#state.returnCoins[COIN_100]}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="vending-machine-coin-50-quantity">${this.#state.returnCoins[COIN_50]}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="vending-machine-coin-10-quantity">${this.#state.returnCoins[COIN_10]}개</td>
          </tr>
        </tbody>
      </table> `;
  }

  #render() {
    this.innerHTML = this.#getTemplate();
  }
}

window.customElements.define('product-purchase-menu', ProductPurchaseMenu);
