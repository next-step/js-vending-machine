import { $, numberWithCommas } from "../util/index.js";
import findProductIndex from "../common/findProductIndex.js";
import store from '../store/index.js';
import { observe } from '../core/observer.js';
import { updateProduct, subtractPurchaseCharge } from '../store/actions.js';
import View from "./View.js"

export default class ProductPurchaseTable extends View {
  init() {
    this.bindEvent();
    
    observe(() => {
      this.renderProductItem()
    })
  }

  bindEvent() { 
    this.on("click", ({ target }) => {
      if (target.type === "button") {
        const {
          productName: name,
          productPrice: price,
          productQuantity: quantity,
        } = target.dataset;

        this.updateProduct({
          name,
          price,
          quantity: quantity - 1
        });

        this.subtractPurchaseCharge(price);
      }
    });
  }

  updateProduct(product) {
    store.dispatch(updateProduct({
      product,
      itemIndex: findProductIndex(product)
    }))
  }

  subtractPurchaseCharge(price) {
    store.dispatch(subtractPurchaseCharge({
      amount: price
    }))
  }

  renderProductItem() {
    const $productPurchaseContainer = $("#product-purchase-container");
    const { products, purchaseCharge: { totalAmount } } = store.getState();
    const isDisable = (totalAmount, price, quantity) => quantity === 0 || totalAmount < price;

    $productPurchaseContainer.replaceChildren();

    const html = `
    ${products.map(({ name, price, quantity }) => (`
      <tr data-key=${name}>
        <td class="product-purchase-name">${name}</td>
        <td class="product-purchase-price">${numberWithCommas(price)}</td>
        <td class="product-purchase-quantity">${quantity}</td>
        <td>
          <button
            type="button"
            class="purchase-button"
            data-product-name="${name}"
            data-product-price="${price}"
            data-product-quantity="${quantity}"
            ${isDisable(totalAmount, price, quantity) ? "disabled" : ""}>
          구매하기
          </button>
        </td>
      </tr> 
    `)).join("")}`;

    $productPurchaseContainer.insertAdjacentHTML("afterbegin", html);
  }

  render() {
    /* html */
    return `
    <table class="purchase-available">
      <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody id="product-purchase-container">
      </tbody>
    </table>
    `;
  }
}

customElements.define("product-purchase-table", ProductPurchaseTable);
