import Storage from '../storage/index.js';

class ProductManageMenuService {
  static setProductListState(name, price, count) {
    const state = Storage.getStateData();
    state[Storage.getCurrentTab()][name] = {
      price,
      count,
    };
    Storage.setStateData(state);
  }

  static getCurrentTabState() {
    return Storage.getStateData()[Storage.getCurrentTab()];
  }
}
export default ProductManageMenuService;
