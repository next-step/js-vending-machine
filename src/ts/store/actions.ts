import { validateNewProduct, validateCoin } from '../state/validator';
import { generateRandomNumber } from '../utils/randomGenerator';

export default {
  loadInitialData({ commit }) {
    commit('loadInitialData');
  },

  loadData({ state }, key: string) {
    return state[key];
  },

  addProduct({ state, commit }, newProduct: Product) {
    validateNewProduct(newProduct);
    commit('addProduct', newProduct);
    commit('sortProduct');
    return state.products;
  },

  chargeCoin({ state, commit }, inputPrice: number) {
    validateCoin(inputPrice);

    while (inputPrice > 0) {
      const coinKeyRange = Reflect.ownKeys(state.coins).length - 1;
      const randomKeyNumber = generateRandomNumber(0, coinKeyRange);
      const selectedCoinKey = <CoinKey>Object.keys(state.coins)[randomKeyNumber];
      const selectedCoin = <CoinObj>state.coins[selectedCoinKey];

      if (inputPrice >= selectedCoin.value) {
        inputPrice -= selectedCoin.value;
        commit('addCoin', selectedCoinKey);
      }
    }

    commit('saveCoins');

    return state.coins;
  },

  increaseInputPrice({ commit }, inputPrice: number) {
    commit('increaseInputPrice', inputPrice);
  },
};
