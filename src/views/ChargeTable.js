import { COINS } from '../constants/index.js';
import { $ } from "../util/index.js";
import View from "./View.js"

export default class ChargeTable extends View {
  prefix;
  constructor() {
    super();
    this.prefix = this.getAttribute("data-prefix");
  }
  renderTableData(coins) {
    COINS.forEach(([coin]) => {
      $(`#${this.prefix ? `${this.prefix}-` : ""}coin-${coin}-quantity`).innerText = `${coins[coin]}개`;
    });
  }
  render() {
    /* html */
    return `
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
      ${COINS.map(([coin]) =>
        `
        <tr>
          <td>${coin}원</td>
          <td id="${this.prefix ? `${this.prefix}-` : ""}coin-${coin}-quantity"></td>
        </tr>
        `
      ).join("")}
      </tbody>
    </table>
    `;
  }
}

customElements.define("charge-table", ChargeTable);
