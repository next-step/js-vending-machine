import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";

export default class ProductAppender extends Component {
  template() {
    return /*html*/ `
    <input type="text" id="product-name-input" placeholder="상품명" />
    <input type="number" id="product-price-input" placeholder="가격" />
    <input type="number" id="product-quantity-input" placeholder="수량" />
    <button id="product-add-button">추가하기</button>
    `;
  }

  setEvent() {
    this.addEvent("click", "#product-add-button", (e) => {
      const name = $("#product-name-input", this.$target).value;
      const price = $("#product-price-input", this.$target).value;
      const quantity = $("#product-quantity-input", this.$target).value;

      this.$props.addNewProduct({ name, price, quantity });
    });
  }
}
