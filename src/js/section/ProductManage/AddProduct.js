import { $, $getElement } from '../../dom.js';

import actionMap from '../../eventAction.js';
import { productValidation } from '../../validation.js';

export default function AddProduct(target) {
  render();
  const $productName = $('#product-name-input');
  const $productPrice = $('#product-price-input');
  const $productQuantity = $('#product-quantity-input');
  const $productAddButton = $('#product-add-button');
  setEvent();

  function setEvent() {
    $productAddButton.addEventListener('click', setAddProductHandler);
  }

  function setAddProductHandler(event) {
    event.preventDefault();
    const [name, price, quantity] = [
      $productName.value,
      $productPrice.value,
      $productQuantity.value,
    ];

    const product = {
      name: name,
      price: Number(price),
      quantity: Number(quantity),
    };
    if (
      productValidation.emptyProductName(name) ||
      productValidation.emptyProductPrice(price) ||
      productValidation.emptyProductNumber(quantity) ||
      productValidation.minProductPrice(price) ||
      productValidation.invalidProductPrice(price) ||
      productValidation.minProductNumber(name)
    )
      return;

    actionMap?.ADD_PRODUCT(product);
  }
  function render() {
    target.appendChild($getElement(template()));
  }

  function template() {
    return `
    <div>
      <h3>상품 추가하기</h3>
      <form class="product-container">
        <input type="text" id="product-name-input" placeholder="상품명" />
        <input type="number" id="product-price-input" placeholder="가격" />
        <input type="number" id="product-quantity-input" placeholder="수량" />
        <button id="product-add-button">추가하기</button>
      </form>
    </div>
  `;
  }
}
