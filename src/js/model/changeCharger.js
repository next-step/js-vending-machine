const CHANGE_CHARGER_INITIAL_STATE = {};
class ChangeChargerModel {
  #state;

  constructor() {
    this.#state = CHANGE_CHARGER_INITIAL_STATE;
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
    console.log("hello change charger view");
  }
}

export default ChangeChargerModel;
