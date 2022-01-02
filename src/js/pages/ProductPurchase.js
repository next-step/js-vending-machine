import Component from "../lib/Component.js";
import {getProducts} from "../components/storage.js";

export default class ProductPurchase extends Component {
  setup() {
    this.state = {
      products: getProducts()
    }
  }

  template() {
    const {products} = this.state;
    const {menu} = this.props;

    return `
      <article class="sub-menu ProductPurchase" style="display:${menu === 'ProductPurchase' ? 'block' : 'none'}">
        <div className="purchase-container">
          <h3>충전하기</h3>
          <div className="vending-machine-wrapper">
            <input type="number" name="charge-amount" id="charge-input"/>
            <button id="charge-button">충전하기</button>
          </div>
          <p>충전 금액: <span id="charge-amount">0</span>원</p>
        </div>
        <table className="product-inventory">
          <colgroup>
            <col style="width: 140px"/>
            <col style="width: 100px"/>
            <col style="width: 100px"/>
            <col style="width: 100px"/>
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
            ${
              products.length > 0 ? products.map(product => (
              `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.qty}</td>
                  <td><button class="product-purchase-button">상품 구매</button></td>
                </tr>
              `
              )).join('') : ''
            }
          </tbody>
        </table>
      </article>
    `;
  }

}