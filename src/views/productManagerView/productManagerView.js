import { createProductManagerCustomContainer } from './ProductManagerCustomContainer.js';
import { createProductInventoryContainer } from './ProductInventoryContainer.js';

export function productManagerViewInitiator(rootElement) {
  const $productManagerCustomContainer = createProductManagerCustomContainer({
    children: getProductContainerElements(),
    dynamicElementSelectors: {
      productNameInput: '#product-name-input',
      productPriceInput: '#product-price-input',
      productQuantityInput: '#product-quantity-input',
      productAddButton: '#product-add-button',
    },
    attributes: {
      className: 'product-container',
      id: 'product-container',
    }
  });

  const $productInventoryCustomContainer = createProductInventoryContainer({
    attributes: {
      id: 'product-inventory-container',
    }
  });

  const $productManagerInventory = Array.from(getProductManagerInventory()).find((el) => el instanceof HTMLElement);
  $productManagerInventory.appendChild($productInventoryCustomContainer);

  const baseElements = [
    ...getProductManagerTitle(),
    $productManagerCustomContainer,
    $productManagerInventory,
  ];

  rootElement.append(...baseElements);

  return {
    productContainerView: $productManagerCustomContainer,
    productInventoryContainerView: $productInventoryCustomContainer,
  };
}

// 대신에 차례대로 넣어주는 건 어떨까 생각해봤다.
// array of element를 만들어주고, 주요 변화 component는 custom element로 만들어 넘겨주고
// 나머지는 string에서 element를 추출할 수 있는 함수로 가져다 넣기.
// 그러면 정확히 지금 로직을 그대로 사용할 수 있다.

function getHTMLElementFromHTMLString(HTMLString) {
  const dummyElement = document.createElement('div');
  dummyElement.innerHTML = HTMLString;
  return dummyElement.childNodes;
}

function getProductManagerTitle() {
  return getHTMLElementFromHTMLString('<h3>상품 추가하기</h3>')
}

function getProductManagerInventory() {
  return getHTMLElementFromHTMLString(`
    <table class="product-inventory" id="product-inventory">
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
    </table>
  `);
}

function getProductContainerElements() {
  return getHTMLElementFromHTMLString(`
    <input type="text" id="product-name-input" placeholder="상품명" />
    <input type="number" id="product-price-input" placeholder="가격" />
    <input type="number" id="product-quantity-input" placeholder="수량" />
    <button id="product-add-button">추가하기</button>
  `);
}

/*
function getProductManagerHTML() {
  return (`
    <h3>상품 추가하기</h3>
    <div class="product-container" id="product-container">
      <input type="text" id="product-name-input" placeholder="상품명" />
      <input type="number" id="product-price-input" placeholder="가격" />
      <input type="number" id="product-quantity-input" placeholder="수량" />
      <button id="product-add-button">추가하기</button>
    </div>
    <table class="product-inventory" id="product-inventory">
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
*/
