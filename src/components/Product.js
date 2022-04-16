import ComponentHandler from './abstract/index.js';
import { STORAGE_KEY, VENDING_MACHINE } from '../constants.js';
import { $element } from '../helpers/index.js';

// prettier-ignore
const template = products => $element(/*html*/ `
<section class="product-container">
  <div>
    <h3>자판기 상품 추가하기</h3>
    <form autocomplete class="product-add-form">
      <input type="text" name="product-name" required autofocus />
      <input type="number" name="product-price" required min="${VENDING_MACHINE.MIN_PRICE}" step="${VENDING_MACHINE.PRICE_STEP}" />
      <input type="number" name="product-quantity" required min="${VENDING_MACHINE.MIN_QUANTITY}" step="${VENDING_MACHINE.QUANTITY_STEP}" />
      <button type="submit" id="product-add-button">추가하기</button>
    </form>
  </div>
  <div>
    <h3>자판기 동전 현황</h3>
    <table class="product-inventory">
      <thead>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
      </thead>
      <tbody>
        ${products.map(({ name, price, quantity }) => /*html*/ `
        <tr>
          <td data-product-name="${name}">${name}</td>
          <td data-product-price="${price}">${price}</td>
          <td data-product-quantity="${quantity}">${quantity}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</section>`);

export default class Product extends ComponentHandler {
  static #template = template;

  render({ PRODUCT }) {
    this.replaceChildren(Product.#template(PRODUCT));
  }

  defineEvents() {
    return [
      {
        type: 'submit',
        callback: this.addProduct,
      },
    ];
  }

  addProduct = event => {
    event.preventDefault();
    const [{ value: name }, { valueAsNumber: price }, { valueAsNumber: quantity }] =
      event.target.elements;

    const product = {
      name: name.trim(),
      price,
      quantity,
    };

    this.setState(STORAGE_KEY.PRODUCT, product);
  };
}

customElements.define('machine-product', Product);
