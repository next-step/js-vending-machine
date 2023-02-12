import View from "./view.js";
import {
  createProductInventoryItem,
  createTemplateElement,
} from "../utils/templates.js";
import { $ } from "../utils/selector.js";
import { clearForm } from "../utils/utils.js";

class ProductManagerView extends View {
  constructor() {
    super("manager");
  }

  renderInventoryContainer(state) {
    const $productTable = $("#product-inventory-container");

    const createProductInventoryItems = state.products.reduce((acc, pre) => {
      acc += createProductInventoryItem(pre);
      return acc;
    }, "");

    const { content } = createTemplateElement(createProductInventoryItems);

    $productTable.replaceChildren(content);
  }

  update(newState) {
    this.renderInventoryContainer(newState);
    clearForm("#product-manager-form");
  }

  render(currentState) {
    super.render();
    this.renderInventoryContainer(currentState);
  }
}

export default ProductManagerView;
