import { $$ } from "../util/index.js";
import getErrorMessage from "../common/getErrorMessage.js";
import findProductIndex from "../common/findProductIndex.js";
import store from '../store/index.js';
import { addProduct, updateProduct } from '../store/actions.js';
import View from "./View.js"
import "./ProductTable.js";

export default class ProductManage extends View {
  $inputs;
  productInfo = {};
  errorMessages = {};

  init() {
    this.$inputs = $$("#product-add-form input");
    this.bindEvent();
  }

  bindEvent() {
    this.on("submit", (e) => {
      e.preventDefault();
      this.setStates();
      
      if (!this.isValidInputsAll()) {
        this.showErrorMessage();
        return;
      }

      const itemIndex = findProductIndex(this.productInfo);
      if (itemIndex >= 0) {
        this.updateProduct(itemIndex);
      } else {
        this.addProduct();
      }

      this.removeErrorMessage();
      this.resetInputValue();
    });
  }

  setStates() {
    this.$inputs.forEach(({ dataset: { key }, value }) => {
      this.setProductInfo(key, value);
      this.setErrorMessages(key, getErrorMessage(key, value));
    });
  }

  setProductInfo(key, value) {
    if (this.productInfo[key] !== value) this.productInfo = { ...this.productInfo, [key]: value };
  }

  setErrorMessages(key, value) {
    if (this.errorMessages[key] !== value) this.errorMessages = { ...this.errorMessages, [key]: value };
  }

  addProduct() {
    store.dispatch(addProduct({
      product: this.productInfo
    }))
  }

  updateProduct(itemIndex) {
    store.dispatch(updateProduct({
      product: this.productInfo,
      itemIndex
    }))
  }

  isValidInputsAll() {
    const errorValues = Object.values(this.errorMessages);
    return errorValues.length > 0 && errorValues.filter((value) => value === "").length === errorValues.length;
  }

  showErrorMessage() {
    this.$inputs.forEach($input => {
      const { dataset: { key } } = $input;
      const $errorEl = $input.nextElementSibling;
      const errorMessage = this.errorMessages[key];

      if($errorEl.innerText !== errorMessage) $errorEl.innerText = errorMessage;
      $input.parentNode.classList.add('is-error');
    });
  }

  removeErrorMessage() {
    this.$inputs.forEach($input => {
      const $errorEl = $input.nextElementSibling;

      if($errorEl.innerText !== "") $errorEl.innerText = "";
      $input.parentNode.classList.remove('is-error');
    });
  }

  resetInputValue() {
    this.$inputs.forEach($input => {
      $input.value = "";
    });
  }

  render() {
    /* html */
    return `
    <h3>상품 추가하기</h3>
    <div class="product-container">
      <form id="product-add-form">
        <fieldset class="fieldset">
          <label for="product-name-input">
            <input type="text" id="product-name-input" data-key="name" placeholder="상품명" />
            <span class="error-message"></span>
          </label>
          <label for="product-price-input">
            <input type="number" id="product-price-input" data-key="price" placeholder="가격" />
            <span class="error-message"></span>
          </label>
          <label for="product-quantity-input">
            <input type="number" id="product-quantity-input" data-key="quantity" placeholder="수량" />
            <span class="error-message"></span>
          </label>
        </fieldset>
        <button id="product-add-button" type="submit">추가하기</button>
      </form>
    </div>
    <h3>상품 현황</h3>
    <product-table></product-table>
    `;
  }
}

customElements.define("product-manage", ProductManage);
