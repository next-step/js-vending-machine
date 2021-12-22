import { initState } from "./initState.js";
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  ADD_MACHINE_CHARGE
} from "./actions.js"

const reducer = (state = initState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
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
      // payload.machineCharge
      console.log("payload.charge", payload.charge);
      console.log("payload.coins", payload.coins);
      const { charge, coins } = state.machine;

      return {
        ...state,
        machine: {
          charge: Number(charge) + Number(payload.charge),
          coins: Object.entries(payload.coins).reduce((newObj, [key, value]) => {
            console.log(key, value);
            newObj[key] = Number(coins[key]) + Number(value);
            console.log(Number(coins[key]))
            return newObj;
          }, {})
        }
      }
    default:
      return state;
  }
}

export default reducer;
