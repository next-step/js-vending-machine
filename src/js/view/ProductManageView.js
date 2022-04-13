import AbstractView from './AbstractView.js';

function productManageTemplate() {
  const $template = document.createElement('template');
  $template.innerHTML = `
    <h3>상품 추가하기</h3>
    <div class="product-container">
      <form>
        <input required type="text" id="product-name-input" placeholder="상품명" />
        <input required type="number" id="product-price-input" placeholder="가격" />
        <input required type="number" id="product-quantity-input" placeholder="수량" />
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

function $productAddSubmit() {
  return document.querySelector('#product-add-button');
}

export default class ProductManageView extends AbstractView {
  static #handleProductAdd(event) {
    event.preventDefault();
  }

  static contents() {
    return productManageTemplate();
  }

  static eventBindings() {
    $productAddSubmit().addEventListener(
      'click',
      ProductManageView.#handleProductAdd
    );
  }

  static initialize() {}
}
