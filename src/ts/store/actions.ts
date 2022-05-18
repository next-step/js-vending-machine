import { validateNewProduct } from '../state/validator';

export default {
  loadInitialData({ commit }) {
    commit('loadInitialData');
  },

  addProduct({ state, commit }, newProduct: Product) {
    validateNewProduct(newProduct);
    commit('addProduct', newProduct);
    commit('sortProduct');
    return state.products;
  },
};
