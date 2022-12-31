const template = document.createElement('template');
template.innerHTML = /* html */ `
  <link rel="stylesheet" href="/src/css/index.css">
  <form class="product-container">
			<input type="text" id="product-name-input" placeholder="상품명" />
			<input type="number" id="product-price-input" placeholder="가격" step="10" />
			<input type="number" id="product-quantity-input" placeholder="수량" />
			<button id="product-add-button">추가하기</button>
  </form>
`;

class AddProductInputs extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.$form = this.root.querySelector('form');
    this.$nameInput = this.root.querySelector('#product-name-input');
    this.$priceInput = this.root.querySelector('#product-price-input');
    this.$quantityInput = this.root.querySelector('#product-quantity-input');

    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();

      this.dispatchEvent(
        new CustomEvent('onSubmit', {
          detail: {
            name: this.$nameInput.value,
            price: this.$priceInput.value,
            quantity: this.$quantityInput.value,
            clearInput: this.clearInput.bind(this),
          },
        })
      );
    });
  }

  clearInput() {
    this.$nameInput.value = '';
    this.$priceInput.value = '';
    this.$quantityInput.value = '';
  }
}

window.customElements.define('add-product-input', AddProductInputs);
