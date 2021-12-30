import store from '../store/index.js';
import { observe } from '../core/observer.js';
import { addPurchaseCharge, subtractPurchaseCharge, subtractMachineCharge } from '../store/actions.js';
import { ERROR_MESSAGES } from "../constants/index.js";
import { $, numberWithCommas } from "../util/index.js";
import getErrorMessage from "../common/getErrorMessage.js";
import { returnChargeAmountToRestCoin } from "../common/changeChargeToCoin.js";
import View from "./View.js"
import "./ProductPurchaseTable.js";

export default class ProductPurchase extends View {
  $input;
  $purchaseAmount;
  init() {
    this.$input = $("#charge-input");
    this.purchaseAmount = $("#charge-amount");
    this.bindEvent();

    observe(() => {
      this.renderCurrentPurchaseCharge();
    })
  }

  bindEvent() { 
    this.on("submit", (e) => {
      e.preventDefault();

      const { name: key, value } = this.$input;
      const errorMessage = getErrorMessage(key, value);
      
      if (errorMessage) { 
        this.showErrorMessage(errorMessage);
        return;
      }

      this.addPurchaseCharge(value);
      this.removeErrorMessage();
      this.resetInputValue();
    });

    $("#coin-return-button").addEventListener("click", (e) => {
      const {
        machineCharge: {coins},
        purchaseCharge: {totalAmount}
      } = store.getState();

      if (totalAmount === 0) {
        this.error(ERROR_MESSAGES.NO_RETURN_COIN);
        return;
      }
      
      const returnCoins = returnChargeAmountToRestCoin(totalAmount, Object.entries(coins));
      const returnAmount = Object.entries(returnCoins).reduce((prev, [coin, amount]) => (prev + coin * amount), 0);
      console.log(returnCoins);
      console.log(returnAmount);

      $("charge-table.coin-return-table").renderTableData(returnCoins);

      store.dispatch(subtractPurchaseCharge({
        amount: returnAmount
      }));

      store.dispatch(subtractMachineCharge({
        totalAmount: returnAmount,
        coins: returnCoins
      }));
    })
  }

  showErrorMessage(errorMessage) {
    const $errorEl = this.$input.nextElementSibling;

    if($errorEl.innerText !== errorMessage) $errorEl.innerText = errorMessage;
    this.$input.parentNode.classList.add('is-error');
  }

  removeErrorMessage() {
    const $errorEl = this.$input.nextElementSibling;

    if($errorEl.innerText !== "") $errorEl.innerText = "";
    this.$input.parentNode.classList.remove('is-error');
  }

  addPurchaseCharge(totalAmount) {
    store.dispatch(addPurchaseCharge({
      totalAmount
    }))
  }

  resetInputValue() {
    this.$input.value = "";
  }

  renderCurrentPurchaseCharge() {
    const { purchaseCharge: {totalAmount} } = store.getState();
    this.purchaseAmount.innerText = numberWithCommas(totalAmount);
  }

  render() {
    /* html */
    return `
    <section>
      <h3>금액 투입</h3>
      <form id="product-purchase-form" class="vending-machine-wrapper">
        <label for="charge-input">
          <input type="number" name="product-purchase-amount" id="charge-input" autofocus />
          <span class="error-message"></span>
        </label>
        <button id="charge-button" type="submit">투입하기</button>
      </form>
      <p>투입한 금액: <span id="charge-amount">0</span>원</p>
    </section>
    <section>
      <h3>구매할 수 있는 상품 현황</h3>
      <product-purchase-table></product-purchase-table>
    </section>
    <section>
      <h3>잔돈</h3>
      <button id="coin-return-button" type="button">반환하기</button>
      <charge-table class="coin-return-table"></charge-table>
    </section>
    `;
  }
}

customElements.define("product-purchase", ProductPurchase);
