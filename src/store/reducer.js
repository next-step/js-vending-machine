import { initState } from "./initState.js";

const reducer = (state = initState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, payload.product] }
    case "UPDATE_PRODUCT":
      const newProducts = [...state.products];
      newProducts.splice(payload.itemIndex, 1, payload.product);

      return {
        ...state,
        products: newProducts
      }
    default:
      return state;
  }
}

export default reducer;
