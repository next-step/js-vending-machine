import { DOM } from '../constants/constants.js';
import { $ } from '../utils/utils.js';
import el from '../utils/dom.js';

export class NewProductForm {
  constructor() {
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

  updateNewProduct(newProduct, productId) {
    this.$inventoryContainer.appendChild(
      el(
        `<tr id='product-${productId}'>`,
        Object.values(newProduct).map((item) => `<th>${item}</th>`),
      ),
    );
    this.updateInventoryContainer();
  }

  replaceExistProduct(newProduct, productId) {
    this.$inventoryContainer.querySelector(`#product-${productId}`).replaceWith(
      el(
        `<tr id='product-${productId}'>`,
        Object.values(newProduct).map((item) => `<th>${item}</th>`),
      ),
    );

    this.updateInventoryContainer();
  }

  updateInventoryContainer() {
    this.$inventoryContainer = $(DOM.PRODUCT_INVENTORY_CONTAINER);
  }
}
