import { SELECTOR } from '../constants/constant.js';
import { $, $$ } from '../utils/selector.js';

export const renderProductManage = (productList) => {
  const template = `
    <h3>상품 추가하기</h3>
    <form class="product-container">
      <input type="text" id="product-name-input" name="product-name" placeholder="상품명" />
      <input type="number" id="product-price-input" name="product-price" placeholder="가격" />
      <input type="number" id="product-quantity-input" name="product-quantity" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
    </form>
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
  $(SELECTOR.APP).insertAdjacentHTML('afterbegin', template);
  if (productList.size > 0) {
    renderProductList(productList);
  }
};

export const renderProductList = (productListMap) => {
  $(SELECTOR.PRODUCT_INVENTORY_CONTAINER).replaceChildren();
  Array.from(productListMap.values()).map((product) => {
    const template = `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
        </tr>
      `;

    $(SELECTOR.PRODUCT_INVENTORY_CONTAINER).insertAdjacentHTML(
      'afterbegin',
      template
    );
  });
};

export const clearProductForm = () => {
  $$(SELECTOR.PRODUCT_FORM_INPUT).forEach((el) => (el.value = ''));
};
