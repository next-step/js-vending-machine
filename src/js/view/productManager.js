import { PRODUCT_CONTAINER_TEMPLATE } from "../utils/templates.js";

class ProductManagerView {
  constructor() {
    this.$app = document.querySelector("#app");
  }

  render() {
    this.$app.insertAdjacentHTML("beforeend", PRODUCT_CONTAINER_TEMPLATE);
  }
}

export default ProductManagerView;
