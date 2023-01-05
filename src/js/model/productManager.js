import ProductManagerView from "../view/productManager.js";

const PRODUCT_MANAGER_INITIAL_STATE = {};
class ProductManagerModel {
  #state;
  #view;

  constructor() {
    this.#state = PRODUCT_MANAGER_INITIAL_STATE;
    this.#view = new ProductManagerView();
  }

  get state() {
    return this.#state;
  }

  setState(newState) {
    this.#state = {
      ...this.#state,
      newState,
    };
  }

  initialize() {
    this.#view.render();
  }
}

export default ProductManagerModel;
