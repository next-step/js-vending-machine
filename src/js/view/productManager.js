import View from "./view.js";
import {
  createProductInventoryItem,
  createTemplateElement,
} from "../utils/templates.js";
import { $, $$ } from "../utils/selector.js";

class ProductManagerView extends View {
  constructor() {
    super("manager");
  }

  clearForm() {
    const $inputs = $$(".product-input");
    $inputs.forEach((input) => {
      input.value = "";
    });
    $inputs[0].focus();
  }

  renderInventoryContainer(newState) {
    const productTable = $("#product-inventory-container");

    const createProductInventoryItems = newState.reduce((acc, pre) => {
      acc += createProductInventoryItem(pre);
      return acc;
    }, "");

    const { content } = createTemplateElement(createProductInventoryItems);

    productTable.replaceChildren(content);
  }

  update(newState) {
    this.renderInventoryContainer(newState);
    this.clearForm();
  }
}

export default ProductManagerView;
