import ProductManagerView from "../view/productManager.js";
import {
  getLocalStorage,
  isInitialState,
  setLocalStorage,
} from "../utils/utils.js";

const PRODUCT_MANAGER_INITIAL_STATE = {
  products: [],
};
class ProductManagerModel {
  #state;
  #view;

  constructor() {
    const initialState =
      getLocalStorage("manager") || PRODUCT_MANAGER_INITIAL_STATE;
    this.#state = { ...initialState };
    this.#view = new ProductManagerView();
  }

  get state() {
    return this.#state;
  }

  setState(state, newState) {
    const removedState = this.#state[state].filter(
      (item) => item.name !== newState.name
    );

    this.#state[state] = [...removedState, newState];
    setLocalStorage("manager", this.#state);

    this.#view.update(this.#state[state]);
  }

  initialize() {
    this.#view.render();

    if (isInitialState(this.#state, PRODUCT_MANAGER_INITIAL_STATE) === false) {
      this.#view.update(this.#state.products);
    }
  }
}

export default ProductManagerModel;
