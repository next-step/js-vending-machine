import ChangeChargerView from "../view/changeCharger.js";

const CHANGE_CHARGER_INITIAL_STATE = {};
class ChangeChargerModel {
  #view;
  #state;

  constructor() {
    this.#state = CHANGE_CHARGER_INITIAL_STATE;
    this.#view = new ChangeChargerView();
  }

  get state() {
    return this.#state;
  }

  setState(newState) {
    this.#state = {
      ...this.#state,
      newState,
    };
  }

  initialize() {
    this.#view.render();
  }
}

export default ChangeChargerModel;
