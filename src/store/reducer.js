import { initState } from "./initState.js";
import {
  CHANGE_VIEW,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  ADD_MACHINE_CHARGE,
  SUBTRACT_MACHINE_CHARGE,
  ADD_PURCHASE_CHARGE,
  SUBTRACT_PURCHASE_CHARGE
} from "./actions.js"
import { sumValuesOfObjects, subtractValuesOfObjects } from "../util/index.js"

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
      return {
        ...state,
        machineCharge: {
          totalAmount: Number(state.machineCharge.totalAmount) + Number(payload.totalAmount),
          coins: sumValuesOfObjects(state.machineCharge.coins, payload.coins)
        }
      };
    
    case SUBTRACT_MACHINE_CHARGE:
      return {
        ...state,
        machineCharge: {
          totalAmount: Number(state.machineCharge.totalAmount) - Number(payload.totalAmount),
          coins: subtractValuesOfObjects(state.machineCharge.coins, payload.coins)
        }
      };
    
    case ADD_PURCHASE_CHARGE:
      return {
        ...state,
        purchaseCharge: {
          totalAmount: Number(state.purchaseCharge.totalAmount) + Number(payload.totalAmount)
        }
      };
    
    case SUBTRACT_PURCHASE_CHARGE:
      return {
        ...state,
        purchaseCharge: {
          totalAmount: Number(state.purchaseCharge.totalAmount) - Number(payload.amount)
        }
      };
    default:
      return state;
  }
}

export default reducer;
