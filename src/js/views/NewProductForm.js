import { DOM } from '../constants/index.js';
import { $ } from '../utils/utils.js';
import el from '../utils/dom.js';
import { model } from '../index.js';

export class NewProductForm {
  constructor() {
    this.$container = $(DOM.NEW_PRODUCT_FORM_CONTAINER);
    this.$nameInput = $(DOM.PRODUCT_NAME_INPUT);
    this.$priceInput = $(DOM.PRODUCT_PRICE_INPUT);
    this.$quantityInput = $(DOM.PRODUCT_QUANTITY_INPUT);
    this.$addProductButton = $(DOM.PRODUCT_ADD_BUTTON);
    this.$inventoryContainer = $(DOM.PRODUCT_INVENTORY_CONTAINER);
  }

  bindOnClickAddProductButton(handler) {
    this.$addProductButton.addEventListener('click', (event) => {
      handler(event);
    });
  }

  renderProducts() {
    const productElementsArray = model.products.map((product) => el(
      '<tr>',
      Object.values(product)
        .slice(1)
        .map((item) => `<th>${item}</th>`),
    ));
    this.$inventoryContainer.replaceChildren();
    productElementsArray.forEach((i) => this.$inventoryContainer.appendChild(i));
  }
}
