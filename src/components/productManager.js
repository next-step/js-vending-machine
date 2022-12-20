import { entryObject } from "../utils/utils.js";

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

class View {
  rootElement = null;
  #dynamicElementSelectors = {};

  constructor(rootElement, dynamicElementSelectors = {}) {
    this.rootElement = rootElement;
    this.#dynamicElementSelectors = dynamicElementSelectors;
    this.#scanDynamicElement();
  }

  #scanDynamicElement() {
    entryObject(this.#dynamicElementSelectors).forEach(([name, selector]) => {
      const element = this.rootElement.querySelector(selector);
      if (!element) throw new Error(`selector "${selector}" does not exist`);
      this[name] = element;
    });
  }

  attachEvent(eventObject) {
    entryObject(eventObject).forEach(([name, [eventType, eventCallback]]) => {
      this[name].addEventListener(eventType, eventCallback);
    });
  }

  render(newElement) {
    this.rootElement.replaceWith(newElement);
    this.#scanDynamicElement();
  }
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
