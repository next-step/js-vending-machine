import { SELECTOR } from '../constants/selector.js';
import { $ } from '../utils/dom.js';
import { validateProductName, validateProductPrice, validateProductQuantity } from '../utils/validation.js';

/* eslint-disable class-methods-use-this */
export default class ProductManagement {
  #state = {
    products: [],
  };

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;
  }

  init() {
    this.#state = {
      products: JSON.parse(localStorage.getItem('products')) ?? [],
    };
    this.render();
    this.renderProductList();
    this.bindEvents();
  }

  resetInput() {
    $(SELECTOR.PRODUCT_NAME_INPUT).value = '';
    $(SELECTOR.PRODUCT_PRICE_INPUT).value = '';
    $(SELECTOR.PRODUCT_QUANTITY_INPUT).value = '';
  }

  handleProductAddButtonClick() {
    try {
      const name = $(SELECTOR.PRODUCT_NAME_INPUT).value;
      validateProductName(name);

      const price = $(SELECTOR.PRODUCT_PRICE_INPUT).value;
      validateProductPrice(price);

      const quantity = $(SELECTOR.PRODUCT_QUANTITY_INPUT).value;
      validateProductQuantity(quantity);

      const product = { name, price, quantity };

      this.addProduct(product);
      this.resetInput();
    } catch (error) {
      alert(error.message);
    }
  }

  addProduct(product) {
    const targetIndex = this.#state.products.findIndex((stateProduct) => stateProduct.name === product.name);

    if (targetIndex === -1) {
      this.#state.products.push(product);
      this.renderProductList();
      localStorage.setItem('products', JSON.stringify(this.#state.products));
      return;
    }

    this.#state.products.splice(targetIndex, 1, product);

    localStorage.setItem('products', JSON.stringify(this.#state.products));
    this.renderProductList();
  }

  bindEvents() {
    $(SELECTOR.PRODUCT_ADD_BUTTON).addEventListener('click', this.handleProductAddButtonClick.bind(this));
  }

  renderProductList() {
    const template = this.#state.products
      .map((product) => {
        return `
        <tr>
          <th>${product.name}</th>
          <th>${product.price}</th>
          <th>${product.quantity}</th>
        </tr>
      
      `;
      })
      .join('');

    $('#product-inventory-container').innerHTML = template;
  }

  getTemplate() {
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
      </tbody>
    </table>`;
  }

  render() {
    $(SELECTOR.APP).innerHTML = this.getTemplate();
  }
}
