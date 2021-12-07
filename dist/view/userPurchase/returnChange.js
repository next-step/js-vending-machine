import View from '../../core/view.js';
export default class ReturnChanges extends View {
    static #template = /* html */ `
    <fragment>
      <h3>잔돈</h3>
      <button id="coin-return-button">반환하기</button>
      <table class="cashbox-change margin-auto">
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
            <td id="coin-500-quantity"></td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="coin-100-quantity"></td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="coin-50-quantity"></td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="coin-10-quantity"></td>
          </tr>
        </tbody>
      </table>
    </fragment>
  `;
    constructor() {
        super();
        this.render(ReturnChanges.#template);
    }
}
customElements.define('return-changes', ReturnChanges);
//# sourceMappingURL=returnChange.js.map