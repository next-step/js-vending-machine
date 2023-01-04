const PRODUCT_MANAGER_INITIAL_STATE = {};
class ProductManagerModel {
  #state;

  constructor() {
    this.#state = PRODUCT_MANAGER_INITIAL_STATE;
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
}

export default ProductManagerModel;
