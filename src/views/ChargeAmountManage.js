import store from '../store/index.js';
import { observe } from '../core/observer.js';
import { addMachineCharge } from '../store/actions.js';
import { $, numberWithCommas } from "../util/index.js";
import { COINS } from '../constants/index.js';
import getErrorMessage from "../common/getErrorMessage.js";
import changeChargeToCoin from "../common/changeChargeToCoin.js";
import View from "./View.js"

export default class ChargeAmountManage extends View {
  $input;
  $chargeAmount;
  init() {
    this.$input = $("#vending-machine-charge-input");
    this.$chargeAmount = $("#vending-machine-charge-amount");
    this.bindEvent();

    observe(() => {
      this.renderCurrentMachineCharge();
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

      this.addCharge(value);
      this.removeErrorMessage();
      this.resetInputValue();
    });
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

  addCharge(totalAmount) {
    store.dispatch(addMachineCharge({
      totalAmount,
      coins: changeChargeToCoin(totalAmount)
    }))
  }

  resetInputValue() {
    this.$input.value = "";
  }

  renderCurrentMachineCharge() {
    const { machineCharge: {totalAmount, coins} } = store.getState();
    this.$chargeAmount.innerText = numberWithCommas(totalAmount);
    COINS.forEach(([coin]) => {
      $(`#vending-machine-coin-${coin}-quantity`).innerText = `${coins[coin]}개`;
    });
  }

  render() {
    /* html */
    return `
    <h3>자판기 동전 충전하기</h3>
    <form class="vending-machine-wrapper">
      <label for="vending-machine-charge-input">
        <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
        <span class="error-message"></span>
      </label>
      <button id="vending-machine-charge-button" type="submit">충전하기</button>
    </form>
    <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
    <h3>동전 보유 현황</h3>
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
      <tbody>
        <tr>
          <td>500원</td>
          <td id="vending-machine-coin-500-quantity"></td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity"></td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity"></td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity"></td>
        </tr>
      </tbody>
    </table>
    `;
  }
}

customElements.define("charge-amount-manage", ChargeAmountManage);
