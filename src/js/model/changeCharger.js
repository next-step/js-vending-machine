import {
  calculateCoinCount,
  getLocalStorage,
  setLocalStorage,
  validateUnit,
} from "../utils/utils.js";
import { ERROR_MESSAGE } from "../utils/constants.js";
import { ValidationError } from "../utils/error.js";

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

  constructor(view) {
    const initialState =
      getLocalStorage("charger") || CHANGE_CHARGER_INITIAL_STATE;
    this.#state = { ...initialState };
    this.#view = view;
  }

  get state() {
    return this.#state;
  }

  setCoinCounts(inputAmount) {
    const coinCounts = calculateCoinCount(inputAmount);

    Object.keys(this.#state.coinCounts).forEach((key) => {
      this.#state.coinCounts[key] += coinCounts[key];
    });
  }

  setTotalAmount(inputAmount) {
    this.#state.totalAmount += inputAmount;
  }

  updateTotalAmount(chargerInput) {
    const { name: from, value } = chargerInput;
    const inputAmount = Number(value);

    validateUnit({
      type: "charge",
      value: inputAmount,
      from,
    });

    this.setTotalAmount(inputAmount);
    this.setCoinCounts(inputAmount);
    this.#view.update(this.#state);

    setLocalStorage("charger", this.#state);
  }

  setState(state, e) {
    switch (state) {
      case "totalAmount":
        this.updateTotalAmount(e.target["charger-input"]);
        break;
      default:
        throw new ValidationError(ERROR_MESSAGE.INVALID_STATE);
    }
  }

  initialize() {
    this.#view.render(this.#state);
  }
}

export default ChangeChargerModel;
