import AbstractView from './AbstractView.js';
import Product, { STEP_PRICE, MIN_PRICE, MIN_QUANTITY } from '../Product.js';
import ProductManage from '../ProductManage.js';

function productManageTemplate() {
  const $template = document.createElement('template');
  $template.innerHTML = `
    <h3>상품 추가하기</h3>
    <div class="product-container">
      <form id="product-form">
        <input required type="text" name="name" id="product-name-input" placeholder="상품명" />
        <input required type="number" name="price" min="${MIN_PRICE}" step="${STEP_PRICE}" id="product-price-input" placeholder="가격" />
        <input required type="number" name="quantity" min="${MIN_QUANTITY}" id="product-quantity-input" placeholder="수량" />
        <button type="submit" id="product-add-button">추가하기</button>
      </form>
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
      <tbody id="product-inventory-container"></tbody>
    </table>
  `;
  return $template.content;
}

function productTemplate({ name, price, quantity }) {
  const $template = document.createElement('template');
  $template.innerHTML = `
    <tr data-name="${name}" data-price="${price}" data-quantity="${quantity}">
      <td>${name}</td>
      <td>${price}</td>
      <td>${quantity}</td>
    </tr>
  `;
  return $template.content;
}

function $productForm() {
  return document.querySelector('#product-form');
}

function $productInventory() {
  return document.querySelector('#product-inventory-container');
}

function convertFormDataToObject(formData) {
  return Object.fromEntries(formData);
}

export default class ProductManageView extends AbstractView {
  static #updateProductList() {
    $productInventory().replaceChildren(
      ...ProductManage.list.map((product) => productTemplate(product))
    );
  }

  static #handleProductAdd(event) {
    event.preventDefault();
    try {
      const product = new Product(
        convertFormDataToObject(new FormData(event.target))
      );
      ProductManage.addProduct(product);
      ProductManageView.#updateProductList();
    } catch (e) {
      alert(e.message);
    }
  }

  static contents() {
    return productManageTemplate();
  }

  static eventBindings() {
    $productForm().addEventListener(
      'submit',
      ProductManageView.#handleProductAdd
    );
  }
}
