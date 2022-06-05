import { ADD_PRODUCT, SET_MENU } from './actions.js';

const initialState = {
  menu: 'productManage',
  products: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MENU:
      return {
        ...state,
        menu: payload.menu,
      };

    case ADD_PRODUCT:
      const products = state.products.filter(
        (product) => product.name !== payload.product.name
      );
      return {
        ...state,
        products: [...products, payload.product],
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
