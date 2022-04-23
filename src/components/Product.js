import ComponentHandler from './abstract/index.js';
import { STATE_KEY, VENDING_MACHINE } from '../constants.js';
import { $element, $focus, unitGenerateNumber } from '../helpers/index.js';

// prettier-ignore
const template = productList => $element(/*html*/ `
<section class="product-container">
  <div>
    <h3>자판기 상품 추가하기</h3>
    <form autocomplete class="product-add-form">
      <input type="text" name="product-name" placeholder="추가할 상품명" required
              autofocus maxLength="${VENDING_MACHINE.MAX_PRODUCT_NAME_LENGTH}"/>
      <input type="number" name="product-price" placeholder="추가할 상품 금액" required
              min="${VENDING_MACHINE.MIN_PRICE}" step="${VENDING_MACHINE.PRICE_STEP}" />
      <input type="number" name="product-quantity" placeholder="추가할 상품 수량" required
              min="${VENDING_MACHINE.MIN_QUANTITY}" step="${VENDING_MACHINE.QUANTITY_STEP}" />
      <button type="submit" id="product-add-button">추가하기</button>
    </form>
  </div>
  <div>
    <h3>자판기 상품 현황</h3>
    <table class="product-inventory">
      <thead>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>관리</th>
      </thead>
      <tbody>
        ${productList.map(({ name, price, quantity }) => /*html*/ `
        <tr>
          <td data-product-name="${name}">${name}</td>
          <td data-product-price="${price}">${unitGenerateNumber(price)}원</td>
          <td data-product-quantity="${quantity}">${unitGenerateNumber(quantity)}개</td>
          <td><button type="button" data-delete="${name}">삭제하기</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</section>`);

export default class Product extends ComponentHandler {
  static #template = template;

  render({ product }) {
    this.replaceChildren(Product.#template(product));
    setTimeout(() => $focus('[name="product-name"]'), 10);
  }

  defineEvents() {
    return [
      { type: 'submit', callback: this.addProduct },
      { type: 'click', callback: this.deleteProduct },
    ];
  }

  #update(productList) {
    this.setState({ key: STATE_KEY.PRODUCT, value: productList });
  }

  addProduct = event => {
    event.preventDefault();

    const product = this.#generateFormValues(event.target.elements);
    const addedProductList = this.#parsedToProductName(product);
    this.#update(addedProductList);
  };

  #generateFormValues(formElements) {
    const [{ value: name }, { valueAsNumber: price }, { valueAsNumber: quantity }] = formElements;
    return {
      name: name.trim(),
      price,
      quantity,
    };
  }

  #parsedToProductName(inputProduct) {
    const productList = this.getState(STATE_KEY.PRODUCT);
    const isExists = productList.findIndex(product => product.name === inputProduct.name);
    if (isExists > -1) return productList.map(product => (product.name === inputProduct.name ? inputProduct : product));
    return [...productList, inputProduct];
  }

  deleteProduct = ({ target }) => {
    if (!target.matches('button[type="button"]')) return;

    const productName = target.getAttribute('data-delete');
    const deletedProductList = this.#removedToProductName(productName);
    this.#update(deletedProductList);
  };

  #removedToProductName(productName) {
    const productList = this.getState(STATE_KEY.PRODUCT);
    return productList.filter(product => product.name !== productName);
  }
}

customElements.define('machine-product', Product);
