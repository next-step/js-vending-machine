import ProductManagerView from "../view/productManager.js";

const PRODUCT_MANAGER_INITIAL_STATE = {
  products: [],
};
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

  setState(state, newState) {
    this.#state[state] = [...this.#state[state], newState];
    this.#view.update(newState);
  }

  initialize() {
    this.#view.render();
  }
}

export default ProductManagerModel;
