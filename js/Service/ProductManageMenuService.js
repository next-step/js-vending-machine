import store from "../util/store/store.js";
import { ProductManageMenuRenderer } from "../View/ProductManageMenuRenderer.js";
import { PRODUCT_MANAGE_MENU } from "../util/constants.js";

export default class ProductManageMenuService {
  addProduct(name, price, quantity) {
    const state = store.getTabState();
    state[store.getCurrentTab()][name] = {
      price,
      quantity,
    };
    store.setTabState(state);
  }

  getProduct() {
    return store.getTabState()[store.getCurrentTab()];
  }
}
