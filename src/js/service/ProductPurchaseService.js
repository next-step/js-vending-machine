import Storage from '../storage/index.js';
import { STORAGE_KEY } from '../constants/index.js';

class ProductPurchaseService {
  constructor() {
    this.stateData = Storage.getStateData();
    this.getStateByCurrentTab = this.stateData[Storage.getCurrentTab()];
  }

  setAddPurchasePrice(price) {
    this.getStateByCurrentTab[STORAGE_KEY.PURCHASE_PRICE] += price;
    Storage.setStateData(this.stateData);
  }
}
export default ProductPurchaseService;
