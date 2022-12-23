import { View } from "../core/View";

export function viewInitiator(rootElement, HTML) {
  rootElement.innerHTML = HTML;
  const $productContainer = document.getElementById('product-container');
  const $productInventoryContainer = document.getElementById('product-inventory-container');

  return {
    productContainerView: new View($productContainer, {
      productNameInput: '#product-name-input',
      productPriceInput: '#product-price-input',
      productQuantityInput: '#product-quantity-input',
      productAddButton: '#product-add-button',
    }),
    productInventoryContainerView: new View($productInventoryContainer),
  };
}

export function getProductManagerHTML() {
  return (`
    <h3>상품 추가하기</h3>
    <div class="product-container" id="product-container">
      <input type="text" id="product-name-input" placeholder="상품명" />
      <input type="number" id="product-price-input" placeholder="가격" />
      <input type="number" id="product-quantity-input" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
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
  `);
}