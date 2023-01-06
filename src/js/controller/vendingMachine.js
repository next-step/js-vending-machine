import ProductManagerModel from "../model/productManager.js";
import ProductPurchaseModel from "../model/productPurchase.js";
import ChangeChargerModel from "../model/changeCharger.js";
import MenuModel from "../model/menu.js";
import { $, $$ } from "../utils/selector.js";

class VendingMachineController {
  #models;
  #state;

  constructor() {
    const menuModel = new MenuModel();
    const managerModel = new ProductManagerModel();
    const chargerModel = new ChangeChargerModel();
    const purchaseModel = new ProductPurchaseModel();

    this.#models = {
      menu: menuModel,
      manager: managerModel,
      charger: chargerModel,
      purchase: purchaseModel,
    };

    this.#state = {
      currentView: menuModel.currentView,
      charger: chargerModel.state,
      manager: managerModel.state,
      purchase: purchaseModel.state,
    };

    this.#models[this.#state.currentView].initialize();

    const $menu = $("#menu");

    $menu.addEventListener("click", ({ target }) => {
      try {
        this.validateMenu(target);

        this.changeMenu(target);
        this.changeView.call(this, target);
      } catch (err) {
        console.error(err);
      }
    });
  }

  validateMenu($target) {
    const isMenu = Object.keys(this.#models).includes($target.name);
    const isMenuButton = $target.classList.contains("button");

    if (!(isMenu && isMenuButton)) {
      throw new Error("잘못된 메뉴를 클릭했습니다.");
    }
  }

  changeMenu($target) {
    const buttons = $$("#menu button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    $target.classList.add("active");
  }

  changeView($target) {
    this.#models.menu.changeView($target.name);
    this.#models[this.#models.menu.currentView].initialize();
  }
}

export default VendingMachineController;
