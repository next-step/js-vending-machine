import { SELECTOR } from '../constants.js';

class ProductManagerView {
  constructor(target) {
    this.$target = target;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  template() {
    return String.raw`
      <h3>상품 추가하기</h3>
      <div class="product-container">
        <input type="text" id="${SELECTOR.PRODUCT_NAME_INPUT_ID}" placeholder="상품명" />
        <input type="number" id="${SELECTOR.PRODUCT_PRICE_INPUT_ID}" placeholder="가격" />
        <input type="number" id="${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}" placeholder="수량" />
        <button id="${SELECTOR.PRODUCT_ADD_BUTTON_ID}">추가하기</button>
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
        <tbody id="${SELECTOR.PRODUCT_INVENTORY_CONTAINER_ID}"></tbody>
      </table>
    `;
  }
}

export default ProductManagerView;
