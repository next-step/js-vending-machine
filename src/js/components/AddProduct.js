import { isEmpty, isTooSmallQuantity, isTooSmallPrice, priceNotDividedZero } from '../validate.js';
import ERROR_MESSAGES from '../constants/errorMessages.js';
import { registerProduct } from '../action.js';
import { CustomError } from '../utils/error.js';

customElements.define(
  'add-product',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
    }

    connectedCallback() {
      this.initHtml();
      this.setEvent();
    }

    validate({ inputName: name, inputPrice: price, inputQuantity: quantity }) {
      if (isEmpty(name)) throw new Error(ERROR_MESSAGES.NAME_SHOULD_NOT_EMPTY);
      if (isEmpty(price)) throw new Error(ERROR_MESSAGES.PRICE_SHOULD_NOT_EMPTY);
      if (isEmpty(quantity)) throw new Error(ERROR_MESSAGES.QUANTITY_SHOULD_NOT_EMPTY);
      if (isTooSmallQuantity(quantity)) {
        throw new Error(ERROR_MESSAGES.TOO_SMALL_QUANTITY);
      }
      if (isTooSmallPrice(price)) throw new Error(ERROR_MESSAGES.TOO_SMALL_PRICE);
      if (priceNotDividedZero(price)) throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_PRICE);
    }

    setEvent() {
      this.shadow.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const { value: inputName } = event.target.elements['name'];
        const { value: inputPrice } = event.target.elements['price'];
        const { value: inputQuantity } = event.target.elements['quantity'];

        try {
          this.validate({ inputName, inputPrice, inputQuantity });
        } catch (error) {
          if (error instanceof CustomError) {
            alert(error.message);
            return;
          }
          console.error(error);
        }

        registerProduct({
          name: inputName,
          price: Number(inputPrice),
          quantity: Number(inputQuantity),
        });
      });
    }

    initHtml() {
      this.template.innerHTML = `
			<link rel="stylesheet" href="./src/css/index.css" />
			<h3>상품 추가하기</h3>
      <form class="add-product-form">
        <input type="text" name="name" data-cy="product-name-input" placeholder="상품명" />
        <input type="number" name="price" data-cy="product-price-input" placeholder="가격" />
        <input type="number" name="quantity" data-cy="product-quantity-input" placeholder="수량" />
        <input type="submit" class="btn" data-cy="product-add-button" value="추가하기" />
      </form>
      <hr />`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
