import View from "./view.js";
import { createProductInventoryItem } from "../utils/templates.js";
import { $ } from "../utils/selector.js";

class ProductManagerView extends View {
  constructor() {
    super("manager");
  }
  update(newState) {
    const productTable = $("#product-inventory-container");

    productTable.insertAdjacentHTML(
      "afterbegin",
      createProductInventoryItem(newState)
    );
  }
}

export default ProductManagerView;
