import { SELECTOR } from '../../constants/selector.js';
import { PRODUCT_KEY } from '../../constants/storage.js';
import { $ } from '../../utils/dom.js';
import { CustomError } from '../../utils/error.js';
import { productStorage } from '../../utils/storage.js';
import { validateProductName, validateProductPrice, validateProductQuantity } from '../../utils/validation.js';

/* eslint-disable class-methods-use-this */
export default class ProductManageMenu extends HTMLElement {
  #state = {
    name: '',
    price: '',
    quantity: '',
    products: new Map(),
  };

  get state() {
    return { ...this.#state };
  }

  set state(state) {
    this.#state = state;
  }

  connectedCallback() {
    this.#state = this.#getInitialState();
    this.#render();
    this.#bindEvents();
  }

  #getInitialState() {
    return {
      products: productStorage.get(PRODUCT_KEY),
    };
  }

  #resetInput() {
    $(SELECTOR.PRODUCT_NAME_INPUT).value = '';
    $(SELECTOR.PRODUCT_PRICE_INPUT).value = '';
    $(SELECTOR.PRODUCT_QUANTITY_INPUT).value = '';
  }

  #addProduct(product) {
    this.#state.products.set(product.name, product);
    productStorage.set(this.#state.products);
    this.#render();
    this.#bindEvents();
  }

  #handleChangeName(e) {
    this.#state.name = e.target.value;
  }

  #handleChangePrice(e) {
    this.#state.price = e.target.valueAsNumber;
  }

  #handleChangeQuantity(e) {
    this.#state.quantity = e.target.valueAsNumber;
  }

  #handleProductAddButtonClick() {
    try {
      const { name, price, quantity } = this.#state;

      validateProductName(name);
      validateProductPrice(price);
      validateProductQuantity(quantity);

      const product = { name, price, quantity };

      this.#addProduct(product);
      this.#resetInput();
    } catch (error) {
      if (error instanceof CustomError) {
        alert(error.message);
      }
    }
  }

  #bindEvents() {
    $(SELECTOR.PRODUCT_NAME_INPUT).addEventListener('input', this.#handleChangeName.bind(this));
    $(SELECTOR.PRODUCT_PRICE_INPUT).addEventListener('input', this.#handleChangePrice.bind(this));
    $(SELECTOR.PRODUCT_QUANTITY_INPUT).addEventListener('input', this.#handleChangeQuantity.bind(this));
    $(SELECTOR.PRODUCT_ADD_BUTTON).addEventListener('click', this.#handleProductAddButtonClick.bind(this));
  }

  #getTemplate() {
    let template = '';

    this.#state.products.forEach((product) => {
      template += /* HTML */ `
        <tr>
          <th>${product.name}</th>
          <th>${product.price}</th>
          <th>${product.quantity}</th>
        </tr>
      `;
    });

    return /* HTML */ `<h3>상품 추가하기</h3>
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
    this.innerHTML = this.#getTemplate();
  }
}

window.customElements.define('product-manage-menu', ProductManageMenu);
