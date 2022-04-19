class ProductHandlingBoard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('section');
    container.innerHTML = `
      <h3>상품 추가하기</h3>
      <div class="product-container">
        <input
          type="text"
          id="product-name-input"
          placeholder="상품명"
          data-product="name-input"
          required
        />
        <input
          type="number"
          id="product-price-input"
          placeholder="가격"
          data-product="price-input"
          min="10"
          max="100000"
          required
        />
        <input
          type="number"
          id="product-quantity-input"
          placeholder="수량"
          data-product="quantity-input"
          min="1"
          max="100"
          required
        />
        <button id="product-add-button" data-product="add-button">
          추가하기
        </button>

        <product-inventory></product-inventory>
      </div>`;
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');
    this.shadowRoot.append(link, container);
  }

  // MEMO lifeCycle
  attributeChangedCallback(name, oldValue, newValue) {}
}

export default ProductHandlingBoard;
