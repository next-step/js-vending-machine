import ProductManagerView from "../view/productManager.js";
import { getLocalStorage, setLocalStorage } from "../utils/utils.js";
import { ValidationError } from "../utils/error.js";
import { ERROR_MESSAGE } from "../utils/constants.js";

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

  setProducts(products) {
    this.#state.products = products;
  }

  updateProducts(currentProducts, inputState) {
    const newState = currentProducts
      .filter((item) => item.name !== inputState.name)
      .concat(inputState);

    this.setProducts(newState);
    this.#view.update(this.#state);

    setLocalStorage("manager", this.#state);
  }

  setState(state, inputState) {
    switch (state) {
      case "products":
        this.updateProducts(this.#state.products, inputState);
        break;
      default:
        throw new ValidationError(ERROR_MESSAGE.INVALID_STATE);
    }
  }

  initialize() {
    this.#view.render(this.#state);
  }
}

export default ProductManagerModel;
