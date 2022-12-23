/* eslint-disable dot-notation */
import ERROR_MESSAGES from '../constants/errorMessages.js';
import { MINIMUM_QUANTITY, MINIMUM_PRICE, DIVISIBLE_PRICE } from '../constants/vendingMachine.js';

export default function AddProduct({ $target, onSubmit }) {
  const $div = document.createElement('div');
  this.onSubmit = onSubmit;
  this.$target = $target;
  this.$target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
			<h3>상품 추가하기</h3>
      <form class="add-product-form">
        <input type="text" name="name" data-cy="product-name-input" placeholder="상품명" />
        <input type="number" name="price" data-cy="product-price-input" placeholder="가격" />
        <input type="number" name="quantity" data-cy="product-quantity-input" placeholder="수량" />
        <input type="submit" class="btn" data-cy="product-add-button" value="추가하기" />
      </form>
      <hr />`;
  };

  this.render();

  // !: validation 정리하던지 하자 이따..
  const isEmpty = input => input.trim().length === 0;
  const isTooSmallQuantity = quantity => Number(quantity) < MINIMUM_QUANTITY;
  const isTooSmallPrice = price => Number(price) < MINIMUM_PRICE;
  const isNotDividedZero = price => Number(price) % DIVISIBLE_PRICE !== 0;

  this.validate = (name, price, quantity) => {
    if (isEmpty(name)) throw new Error(ERROR_MESSAGES.NAME_SHOULD_NOT_EMPTY);
    if (isEmpty(price)) throw new Error(ERROR_MESSAGES.PRICE_SHOULD_NOT_EMPTY);
    if (isEmpty(quantity)) throw new Error(ERROR_MESSAGES.QUANTITY_SHOULD_NOT_EMPTY);
    if (isTooSmallQuantity(quantity)) {
      throw new Error(ERROR_MESSAGES.TOO_SMALL_QUANTITY);
    }
    if (isTooSmallPrice(price)) throw new Error(ERROR_MESSAGES.TOO_SMALL_PRICE);
    if (isNotDividedZero(price)) throw new Error(ERROR_MESSAGES.NOT_DIVISIBLE_PRICE);
  };

  $div.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    const { value: inputName } = event.target.elements['name'];
    const { value: inputPrice } = event.target.elements['price'];
    const { value: inputQuantity } = event.target.elements['quantity'];

    try {
      this.validate(inputName, inputPrice, inputQuantity);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.onSubmit(inputName, Number(inputPrice), Number(inputQuantity));
  });
}
