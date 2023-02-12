const PRODUCT_PURCHASE_INITIAL_STATE = {};
class ProductPurchaseModel {
  #view;
  #state;

  constructor(view) {
    this.#state = PRODUCT_PURCHASE_INITIAL_STATE;
    this.#view = view;
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

export default ProductPurchaseModel;
