import ProductManagerModel from "../model/productManager.js";
import ProductPurchaseModel from "../model/productPurchase.js";
import ChangeChargerModel from "../model/changeCharger.js";

class VendingMachineController {
  #state;

  constructor(state) {
    this.#state = state;
    this.initialize();
  }
  initialize() {
    const { state: charger } = new ChangeChargerModel();
    const { state: manager } = new ProductManagerModel();
    const { state: purchase } = new ProductPurchaseModel();

    this.#state = {
      ...this.#state,
      charger,
      manager,
      purchase,
    };
  }
}

export default VendingMachineController;
