import Event from '../../../Controller/Event/Event.js';

class ProductDashboard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('form');
    container.setAttribute('id', 'product-dashboard');
    container.innerHTML = String.raw`
        <style>
          form {
            display: flex;
            flex-direction: column;
            width: 25rem;
            height: 10rem;
            align-items: center;
            justify-content: space-between;
          }
        </style>
        <label for="product-name-input"></label>
        <input
          type="text"
          id="product-name-input"
          placeholder="상품명"
          data-product="name-input"
          required
        />
        <label for="product-price-input"></label>
        <input
          type="number"
          id="product-price-input"
          placeholder="가격"
          data-product="price-input"
          min="10"
          max="100000"
          required
        />
        <label for="product-quantity-input"></label>
        <input
          type="number"
          id="product-quantity-input"
          placeholder="수량"
          data-product="quantity-input"
          min="1"
          max="100"
          required
        />
        <button type="submit" id="product-add-button" data-product="add-button">
          추가하기
        </button>`;

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');

    this.shadowRoot.addEventListener('submit', Event.product.submit);

    this.shadowRoot.append(link, container);
  }
}

export default ProductDashboard;
