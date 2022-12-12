import store from "../util/store/store.js";
import { VM_MANAGE_MENU } from "../util/constants.js";
import VendingMachineMenuService from "../Controller/VendingMachineMenuService.js";
import { removeAllChild } from "../util/utils.js";

export class VendingMachineMenuRenderer {
  constructor($app) {
    this.app = $app;
    this.vendingMachineMenuService = new VendingMachineMenuService();
    this.state = store.getCurrentTabState();

    this.initRenderer("", {});
    this.initEventListener();
  }

  static template = (value, result) => {
    const {
      오백원갯수 = "",
      백원갯수 = "",
      오십원갯수 = "",
      십원갯수 = "",
    } = result;
    return `
    <div class="purchase-container">
        <h3>자판기 동전 충전하기</h3>
        <div class="vending-machine-wrapper">
            <form id="vending-machine-form">
                <input type="number" name="charge-amount" id="charge-input" />
                <button id="charge-button">충전하기</button>
            </form>
        </div>
        <p>보유 금액: <span id="charge-amount">${value}</span>원</p>
    </div>
    <h3>잔돈</h3>
    <button id="coin-return-button">반환하기</button>
    <table class="cashbox-change">
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
                <td id="coin-500-quantity">${오백원갯수}</td>
            </tr>
            <tr>
                <td>100원</td>
                <td id="coin-100-quantity">${백원갯수}</td>
            </tr>
            <tr>
                <td>50원</td>
                <td id="coin-50-quantity">${오십원갯수}</td>
            </tr>
            <tr>
                <td>10원</td>
                <td id="coin-10-quantity">${십원갯수}</td>
            </tr>
        </tbody>
    </table>
  `;
  };

  initRenderer() {
    removeAllChild(this.app);

    this.app.insertAdjacentHTML(
      "afterbegin",
      VendingMachineMenuRenderer.template(
        this.state["amount"] || "",
        this.state["result"] || ""
      )
    );
  }

  chargeCoins(e) {
    e.preventDefault();

    const $price = e.target[0].value;
    this.vendingMachineMenuService.addPrice($price);
  }

  returnCoins() {
    const price = this.state["amount"];
    const result = this.vendingMachineMenuService.calculateInput(price);
    this.vendingMachineMenuService.addResult(result);
    this.initRenderer();
  }

  initEventListener() {
    document
      .getElementById(VM_MANAGE_MENU.CHARGE_FORM)
      .addEventListener("submit", this.chargeCoins.bind(this));
    document
      .getElementById(VM_MANAGE_MENU.RETURN_BTN)
      .addEventListener("click", this.returnCoins.bind(this));
  }
}
