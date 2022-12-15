import { SELECTOR } from '../constants/selector.js';
import { $ } from '../utils/dom.js';
import { EmptyInputError, InvalidValueError } from '../utils/error.js';
import { validateProductName, validateProductPrice, validateProductQuantity } from '../utils/validation.js';

/* eslint-disable class-methods-use-this */
export default class ProductManageMenu {
  #state = {
    products: new Map(),
  };

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;
  }

  init() {
    this.#state = this.#getInitialState();
    this.#render();
    this.#bindEvents();
  }

  #getInitialState() {
    return {
      products: new Map(JSON.parse(localStorage.getItem('products'))) ?? new Map(),
    };
  }

  #resetInput() {
    $(SELECTOR.PRODUCT_NAME_INPUT).value = '';
    $(SELECTOR.PRODUCT_PRICE_INPUT).value = '';
    $(SELECTOR.PRODUCT_QUANTITY_INPUT).value = '';
  }

  #handleProductAddButtonClick() {
    try {
      const name = $(SELECTOR.PRODUCT_NAME_INPUT).value;
      validateProductName(name);

      const price = $(SELECTOR.PRODUCT_PRICE_INPUT).valueAsNumber;
      validateProductPrice(price);

      const quantity = $(SELECTOR.PRODUCT_QUANTITY_INPUT).valueAsNumber;
      validateProductQuantity(quantity);

      const product = { name, price, quantity };

      this.#addProduct(product);
      this.#resetInput();
    } catch (error) {
      if (error instanceof EmptyInputError) {
        alert(error.message);
      }
      if (error instanceof InvalidValueError) {
        alert(error.message);
      }
    }
  }

  #addProduct(product) {
    this.#state.products.set(product.name, product);
    localStorage.setItem('products', JSON.stringify(Array.from(this.#state.products.entries())));
    this.#render();
    this.#bindEvents();
  }

  #bindEvents() {
    $(SELECTOR.PRODUCT_ADD_BUTTON).addEventListener('click', this.#handleProductAddButtonClick.bind(this));
  }

  #getTemplate() {
    let template = '';

    this.#state.products.forEach((product) => {
      template += `
          <tr>
            <th>${product.name}</th>
            <th>${product.price}</th>
            <th>${product.quantity}</th>
          </tr>   
        `;
    });

    return `<h3>상품 추가하기</h3>
    <div class="product-container">
      <input type="text" id="product-name-input" placeholder="상품명" />
      <input type="number" id="product-price-input" placeholder="가격" />
      <input type="number" id="product-quantity-input" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
    </div>
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
      ${template}
      </tbody>
    </table>`;
  }

  #render() {
    $(SELECTOR.APP).innerHTML = this.#getTemplate();
  }
}
