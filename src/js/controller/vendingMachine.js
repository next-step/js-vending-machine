import ProductManagerModel from "../model/productManager.js";
import ProductPurchaseModel from "../model/productPurchase.js";
import ChangeChargerModel from "../model/changeCharger.js";
import { $, $$ } from "../utils/selector.js";
import { ValidationError } from "../utils/error.js";
import { ERROR_MESSAGE } from "../utils/constants.js";

class VendingMachineController {
  #models;

  constructor() {
    this.currentMenu = "manager";

    const managerModel = new ProductManagerModel();
    const chargerModel = new ChangeChargerModel();
    const purchaseModel = new ProductPurchaseModel();

    this.#models = {
      manager: managerModel,
      charger: chargerModel,
      purchase: purchaseModel,
    };

    this.#models[this.currentMenu].initialize();
    const $menu = $("#menu");

    $menu.addEventListener("click", ({ target }) => {
      const isMenuButton = target.classList.contains("button");

      if (isMenuButton === false) return;

      try {
        this.validateMenu(target);
        this.changeMenu(target);
        this.changeView(target);
      } catch (err) {
        console.error(err);
      }
    });
  }

  validateMenu($target) {
    const isMenu = Object.keys(this.#models).includes($target.name);

    if (isMenu === false) {
      alert(ERROR_MESSAGE.INVALID_MENU);
      throw new ValidationError(ERROR_MESSAGE.INVALID_MENU);
    }
  }

  changeMenu($target) {
    const buttons = $$("#menu button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    this.currentMenu = $target.name;
    $target.classList.add("active");
  }

  changeView($target) {
    this.#models[$target.name].initialize();
  }
}

export default VendingMachineController;
