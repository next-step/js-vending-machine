import { $ELEMENT } from '../../constants/element.js';
import { VALIDATE } from '../../constants/validate.js';

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
    this.values = {
      name: '',
      price: null,
      quantity: null,
    };
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.$form = this.root.querySelector('form');
    this.$nameInput = this.root.querySelector($ELEMENT.NAME_INPUT);
    this.$priceInput = this.root.querySelector($ELEMENT.PRICE_INPUT);
    this.$quantityInput = this.root.querySelector($ELEMENT.QUANTITY_INPUT);
    this.$addButton = this.root.querySelector($ELEMENT.ADD_BUTTON);
    this.$inputs = this.root.querySelectorAll('input');

    this.$inputs.forEach((el) => {
      el.addEventListener('keyup', (event) => {
        if (`#${event.target.id}` === $ELEMENT.NAME_INPUT) {
          this.setName(event.target.value);
        }
        if (`#${event.target.id}` === $ELEMENT.PRICE_INPUT) {
          this.setPrice(event.target.value);
        }
        if (`#${event.target.id}` === $ELEMENT.QUANTITY_INPUT) {
          this.setQuantity(event.target.value);
        }
      });
    });

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

    this.validateButton();
  }

  setName(newName) {
    this.values.name = newName;
    this.renderNameInput();
  }
  setPrice(newPrice) {
    this.values.price = newPrice;
    this.renderPriceInput();
  }

  setQuantity(newQuantity) {
    this.values.quantity = newQuantity;
    this.renderQuantityInput();
  }

  validateButton = () => {
    const { name, quantity } = this.values;
    const isDisabled = name.length < VALIDATE.MIN_NAME_LENGTH || quantity <= VALIDATE.MIN_QUANTITY;

    this.renderAddButton({ isDisabled });
  };

  clearInput() {
    this.$nameInput.value = '';
    this.$priceInput.value = '';
    this.$quantityInput.value = '';
  }

  renderAddButton = ({ isDisabled }) => {
    isDisabled ? this.$addButton.setAttribute('disabled', '') : this.$addButton.removeAttribute('disabled');
  };

  renderNameInput() {
    this.$nameInput.value = this.values.name;
    this.validateButton();
  }
  renderPriceInput() {
    this.$priceInput.value = this.values.price;
    this.validateButton();
  }
  renderQuantityInput() {
    this.$quantityInput.value = this.values.quantity;
    this.validateButton();
  }
}

window.customElements.define('add-product-input', AddProductInputs);
