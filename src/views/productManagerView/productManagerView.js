import { createProductManagerCustomContainer } from './ProductManagerCustomContainer.js';
import { createProductInventoryContainer } from './ProductInventoryContainer.js';
import { getHTMLElementFromHTMLString } from '../../utils/elementUtils.js';

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
