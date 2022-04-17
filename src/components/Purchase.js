import { $element } from '../helpers/index.js';
import ComponentHandler from './abstract/index.js';

// prettier-ignore
const template = productList => $element(/*html*/ `
<section class="purchase-container">
  <div>
    <h3>금액 투입</h3>
    <form autocomplete class="purchase-money-charge-form">
      <input type="number" placeholder="투입할 금액" required autofocus min="100" step="10" />
      <button type="submit" id="purchase-money-charge-button">투입하기</button>
    </form>
  </div>
  <p>투입한 금액 : <span id="purchase-charged-money">0</span>원</p>
  <div>
    <h3>구매할 수 있는 상품 현황</h3>
    <table class="purchase-available">
      <thead>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>구매</th>
      </thead>
      <tbody>
        ${productList.map(({name, price, quantity}) => /*html*/`
        <tr>
          <td data-product-name="${name}">${name}</td>
          <td data-product-price="${price}">${price}</td>
          <td data-product-quantity="${quantity}">${quantity}</td>
          <td><button type="button" data-delete="${name}">구매하기</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div>
    <h3>잔돈</h3>
    <button id="coin-return-button">반환하기</button>
    <table class="cashbox-remaining">
      <thead>
        <th>동전</th>
        <th>개수</th>
      </thead>
      <tbody>
        <tr>
          <td>500원</td>
          <td><span data-return-coin="500">0</span>개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td><span data-return-coin="100">0</span>개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td><span data-return-coin="50">0</span>개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td><span data-return-coin="10">0</span>개</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>`);

export default class Purchase extends ComponentHandler {
  static #template = template;

  render({ PRODUCT }) {
    this.replaceChildren(Purchase.#template(PRODUCT));
  }
}

customElements.define('machine-purchase', Purchase);
