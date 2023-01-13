import ChangeChargerView from "../view/changeCharger.js";
import {
  calculateCoinCount,
  getLocalStorage,
  isInitialState,
  setLocalStorage,
} from "../utils/utils.js";

const CHANGE_CHARGER_INITIAL_STATE = {
  totalAmount: 0,
  coinCounts: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
};
class ChangeChargerModel {
  #view;
  #state;

  constructor() {
    const initialState =
      getLocalStorage("charger") || CHANGE_CHARGER_INITIAL_STATE;
    this.#state = { ...initialState };
    this.#view = new ChangeChargerView();
  }

  get state() {
    return this.#state;
  }

  setState(state, newState) {
    this.#state[state] += newState;

    const coinCounts = calculateCoinCount(newState);

    Object.keys(this.#state.coinCounts).forEach((key) => {
      this.#state.coinCounts[key] += coinCounts[key];
    });

    setLocalStorage("charger", this.#state);

    this.#view.update(this.#state);
  }

  initialize() {
    this.#view.render();

    if (isInitialState(this.#state, CHANGE_CHARGER_INITIAL_STATE) === false) {
      this.#view.update(this.#state);
    }
  }
}

export default ChangeChargerModel;
