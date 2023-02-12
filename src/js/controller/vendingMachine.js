import ProductManagerModel from "../model/productManager.js";
import ProductPurchaseModel from "../model/productPurchase.js";
import ChangeChargerModel from "../model/changeCharger.js";
import { $, $$ } from "../utils/selector.js";
import { ValidationError } from "../utils/error.js";
import { ERROR_MESSAGE } from "../utils/constants.js";
import {
  getLocalStorage,
  setLocalStorage,
  validateManagerInputs,
} from "../utils/utils.js";
import ChangeChargerView from "../view/changeCharger.js";
import ProductManagerView from "../view/productManager.js";
import ProductPurchaseView from "../view/productPurchase";

class VendingMachineController {
  #currentModel;
  #models;
  #submitFormHandlers;

  constructor() {
    this.currentMenu = getLocalStorage("menu") || "manager";

    const managerModel = new ProductManagerModel(new ProductManagerView());
    const chargerModel = new ChangeChargerModel(new ChangeChargerView());
    const purchaseModel = new ProductPurchaseModel(new ProductPurchaseView());

    this.#models = {
      manager: managerModel,
      charger: chargerModel,
      purchase: purchaseModel,
    };
    this.#currentModel = this.#models[this.currentMenu];

    this.#submitFormHandlers = {
      manager: () => {
        const $form = $("#product-manager-form");
        $form.addEventListener("submit", this.submitManagerForm.bind(this));
      },
      charger: () => {
        const $form = $("#coin-charging-form");
        $form.addEventListener("submit", this.submitChargerForm.bind(this));
      },
      purchase: () => {},
    };
  }

  submitChargerForm(e) {
    e.preventDefault();
    try {
      this.#currentModel.setState("totalAmount", e);
    } catch (err) {
      if (err.message === ERROR_MESSAGE.INVALID_STATE) return;

      alert(err.message);
      e.target[err.from].focus();
    }
  }

  submitManagerForm(e) {
    e.preventDefault();
    try {
      const $$inputs = $$(".product-input");
      const inputState = Array.from($$inputs).reduce((accState, input) => {
        const { name, value } = input;

        validateManagerInputs[name](value, name);

        return {
          ...accState,
          [name]: value,
        };
      }, {});

      this.#currentModel.setState("products", inputState);
    } catch (err) {
      alert(err.message);
      e.target[err.from].focus();
    }
  }

  menuHandler({ target }) {
    const isMenuButton = target.classList.contains("button");

    if (isMenuButton === false) return;

    try {
      this.validateMenu(target.name);
      this.changeMenu(target);
      this.initializeBasedOnChangedMenu(target.name);
    } catch (err) {
      console.error(err);
    }
  }

  validateMenu(menuName) {
    const hasMenu = Object.keys(this.#models).includes(menuName);

    if (hasMenu === false) {
      alert(ERROR_MESSAGE.INVALID_MENU);
      throw new ValidationError(ERROR_MESSAGE.INVALID_MENU);
    }
  }

  changeMenu($target) {
    const $$buttons = $$("#menu button");

    $$buttons.forEach((button) => {
      button.classList.remove("active");
    });

    this.currentMenu = $target.name;
    this.#currentModel = this.#models[$target.name];

    $target.classList.add("active");
    setLocalStorage("menu", this.currentMenu);
  }

  initializeBasedOnChangedMenu() {
    this.#currentModel.initialize();
    this.#submitFormHandlers[this.currentMenu]();
  }

  bindEventHandlers() {
    this.#submitFormHandlers[this.currentMenu]();
    $("#menu").addEventListener("click", this.menuHandler.bind(this));
  }

  initialize() {
    this.#currentModel.initialize();
    this.bindEventHandlers();
  }
}

export default VendingMachineController;
