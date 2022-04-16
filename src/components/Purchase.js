import ComponentHandler from './abstract/index.js';

const template = /*html*/ `
<section class="purchase-container">
  <div>
    <h3>금액 투입</h3>
    <form autocomplete class="purchase-money-charge-form">
      <input type="number" required autofocus min="100" step="10" />
      <button type="submit" id="purchase-money-charge-button">투입하기</button>
    </form>
  </div>
  <p>투입한 금액 : <span>원</span></p>
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
        <tr>
          <td>콜라</td>
          <td>1000</td>
          <td>2</td>
          <td><button type="button">구매하기</button></td>
        </tr>
        <tr>
          <td>콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라콜라</td>
          <td>1000</td>
          <td>2</td>
          <td><button type="button">구매하기</button></td>
        </tr>
        <tr>
          <td>사이다</td>
          <td>2000</td>
          <td>4</td>
          <td><button type="button">구매하기</button></td>
        </tr>
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
          <td></td>
        </tr>
        <tr>
          <td>100원</td>
          <td></td>
        </tr>
        <tr>
          <td>50원</td>
          <td></td>
        </tr>
        <tr>
          <td>10원</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
`;

export default class Purchase extends ComponentHandler {
  static #template = template;

  render() {
    this.insertAdjacentHTML('afterbegin', Purchase.#template);
  }
}

customElements.define('machine-purchase', Purchase);
