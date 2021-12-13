import View from '../../core/view.js';
export default class MachineCharge extends View {
    static #template = /* html */ `
    <fragment>
      <h3>자판기 동전 보충</h3>
      <div class="vending-machine-wrapper margin-auto">
        <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
        <button id="vending-machine-charge-button">보충하기</button>
      </div>
      <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
      <h3>동전 보유 현황</h3>
      <table class="cashbox-remaining margin-auto">
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
    </fragment>
  `;
    constructor() {
        super();
        this.render(MachineCharge.#template);
    }
}
customElements.define('machine-charge', MachineCharge);
//# sourceMappingURL=index.js.map