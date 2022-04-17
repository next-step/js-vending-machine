import { $element } from '../helpers/index.js';
import ComponentHandler from './abstract/index.js';

// prettier-ignore
const template = coins => $element(/*html*/ `
<section class="changes-charge-container">
  <div>
    <h3>자판기 동전 충전하기</h3>
    <form autocomplete class="changes-charge-form">
      <input type="number" placeholder="충전할 금액" required autofocus min="100" step="10" />
      <button type="submit" id="changes-charge-button">추가하기</button>
    </form>
  </div>
  <p>보유 금액 : <span>원</span></p>
  <div>
    <h3>자판기 동전 현황</h3>
    <table class="changes-cashbox">
      <thead>
        <th>동전</th>
        <th>개수</th>
      </thead>
      <tbody>
        <tr>
          <td>500원</td>
          <td><span data-charge-coin="500">${coins['500']}</span>개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td><span data-charge-coin="100">${coins['100']}</span>개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td><span data-charge-coin="50">${coins['50']}</span>개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td><span data-charge-coin="10">${coins['10']}</span>개</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>`);

export default class Charge extends ComponentHandler {
  static #template = template;

  render({ CHARGE }) {
    this.replaceChildren(Charge.#template(CHARGE));
  }
}

customElements.define('machine-charge', Charge);
