import { initState } from "./initState.js";
import {
  CHANGE_VIEW,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  ADD_MACHINE_CHARGE
} from "./actions.js"
import { sumValuesOfObjects } from "../util/index.js"

const reducer = (state = initState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_VIEW:
      const { currentMachineView } = payload;
      return { ...state, currentMachineView };
    
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, payload.product] };
    
    case UPDATE_PRODUCT:
      const newProducts = [...state.products];
      newProducts.splice(payload.itemIndex, 1, payload.product);

      return {
        ...state,
        products: newProducts
      };
    
    case ADD_MACHINE_CHARGE:
      const { totalAmount, coins } = state.machineCharge;

      return {
        ...state,
        machineCharge: {
          totalAmount: Number(totalAmount) + Number(payload.totalAmount),
          coins: sumValuesOfObjects(coins, payload.coins)
        }
      }
    default:
      return state;
  }
}

export default reducer;
