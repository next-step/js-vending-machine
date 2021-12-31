import { $, numberWithCommas } from "../util/index.js";
import store from '../store/index.js';
import { observe } from '../core/observer.js';
import View from "./View.js"

export default class ProductTable extends View {
  init() {
    observe(() => {
      this.renderProductItem()
    })
  }

  renderProductItem() {
    const $productInventoryContainer = $("#product-inventory-container");
    const { products } = store.getState();

    $productInventoryContainer.replaceChildren();

    const html = `
    ${products.map(({ name, price, quantity }) => (`
      <tr>
        <td>${name}</td>
        <td>${numberWithCommas(price)}</td>
        <td>${quantity}</td>
      </tr> 
    `)).join("")}`;

    $productInventoryContainer.insertAdjacentHTML("afterbegin", html);
  }

  render() {
    /* html */
    return `
    <table class="product-inventory">
      <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody id="product-inventory-container">
      </tbody>
    </table>
    `;
  }
}

customElements.define("product-table", ProductTable);
