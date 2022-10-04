import Storage from '../storage/index.js';

class ProductManageMenuService {
  static setProductListState({ noBlankName, price, count }) {
    const state = Storage.getStateData();
    state[Storage.getCurrentTab()][noBlankName] = {
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
