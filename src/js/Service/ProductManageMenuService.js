import store from "../store/index.js";
class RroductManageMenuService {
  testProductPrice(value) {
    return value % 10 == 0;
  }

  addProduct(name, price, count) {
    const state = store.getTabState();
    state[store.getCurrentTab()][name] = {
      price,
      count,
    };
    store.setTabState(state);
  }
}
export default RroductManageMenuService;
