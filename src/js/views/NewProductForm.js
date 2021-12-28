import { DOM } from '../constants/index.js';
import { $ } from '../utils/utils.js';
import el from '../utils/dom.js';
import { getLocalStorageValueByKey } from '../service/localStorageService.js';

export class NewProductForm {
  constructor() {
    this.$container = $(DOM.NEW_PRODUCT_FORM_CONTAINER);
    this.$nameInput = $(DOM.PRODUCT_NAME_INPUT);
    this.$priceInput = $(DOM.PRODUCT_PRICE_INPUT);
    this.$quantityInput = $(DOM.PRODUCT_QUANTITY_INPUT);
    this.$addProductButton = $(DOM.PRODUCT_ADD_BUTTON);
    this.$inventoryContainer = $(DOM.PRODUCT_INVENTORY_CONTAINER);

    this.renderNewProductForm();
  }

  bindOnClickAddProductButton(handler) {
    this.$addProductButton.addEventListener('click', (event) => {
      handler(event);
    });
  }

  addNewProduct(newProduct, productId) {
    this.$inventoryContainer.appendChild(
      el(
        `<tr id='product-${productId}'>`,
        Object.values(newProduct)
          .slice(1)
          .map((item) => `<th>${item}</th>`)
      )
    );
    this.updateInventoryContainer();
  }

  replaceExistProduct(newProduct, productId) {
    this.$inventoryContainer.querySelector(`#product-${productId}`).replaceWith(
      el(
        `<tr id='product-${productId}' data-testid="product">`,
        Object.values(newProduct)
          .slice(1)
          .map((item) => `<th>${item}</th>`)
      )
    );
    this.updateInventoryContainer();
  }

  updateInventoryContainer() {
    this.$inventoryContainer = $(DOM.PRODUCT_INVENTORY_CONTAINER);
  }

  renderNewProductForm() {
    const products = getLocalStorageValueByKey('products');
    if (!products) return;
    products.map((product, idx) => this.addNewProduct(product, idx));
  }
}
