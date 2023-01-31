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

class VendingMachineController {
  #currentModel;
  #models;
  #handlers;

  constructor() {
    this.currentMenu = getLocalStorage("menu") || "manager";

    const managerModel = new ProductManagerModel();
    const chargerModel = new ChangeChargerModel();
    const purchaseModel = new ProductPurchaseModel();

    this.#models = {
      manager: managerModel,
      charger: chargerModel,
      purchase: purchaseModel,
    };
    this.#currentModel = this.#models[this.currentMenu];
    this.#handlers = {
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
    this.#currentModel.setState("totalAmount", e);
  }

  submitManagerForm(e) {
    e.preventDefault();
    let currentInput;
    try {
      const $$inputs = $$(".product-input");
      const newState = {};
      $$inputs.forEach((input) => {
        currentInput = input;

        const { name, value } = currentInput;

        validateManagerInputs[name](value);

        newState[input.name] = input.value;
      });

      this.#currentModel.setState("products", newState);
    } catch (err) {
      alert(err.message);
      currentInput.focus();
    }
  }

  menuHandler({ target }) {
    const isMenuButton = target.classList.contains("button");

    if (isMenuButton === false) return;

    try {
      this.validateMenu(target);
      this.changeMenu(target);
      this.changeView(target);
    } catch (err) {
      console.error(err);
    }
  }

  validateMenu($target) {
    const isMenu = Object.keys(this.#models).includes($target.name);

    if (isMenu === false) {
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

  changeView($target) {
    this.#models[$target.name].initialize();
    this.#handlers[$target.name]();
  }

  bindEventHandlers() {
    this.#handlers[this.currentMenu]();
    $("#menu").addEventListener("click", this.menuHandler.bind(this));
  }

  initialize() {
    this.#currentModel.initialize();
    this.bindEventHandlers();
  }
}

export default VendingMachineController;
