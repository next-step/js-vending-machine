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
    const managerModel = new ProductManagerModel();
    const chargerModel = new ChangeChargerModel();
    const purchaseModel = new ProductPurchaseModel();

    const models = {
      manager: managerModel,
      charger: chargerModel,
      purchase: purchaseModel,
    };

    this.#state = {
      ...this.#state,
      charger: chargerModel.state,
      manager: managerModel.state,
      purchase: purchaseModel.state,
    };

    models[this.#state.currentView].initialize();
  }
}

export default VendingMachineController;
