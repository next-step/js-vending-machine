import {
  isValidForAddProduct,
  isValidPriceForMakingCoin,
  isValidInputPrice,
  isValidProductQuantity,
  isValidPriceForBuyingProduct,
} from './validator';
import { generateRandomNumber } from '../utils/randomGenerator';
import { isPredicatedError } from '../utils/predicator';

import type { StoreInterface } from './store';
import Store from './store';

export default {
  loadInitialState({ commit }: StoreInterface) {
    try {
      commit('loadProducts');
      commit('loadCoins');
      commit('loadInputPrice');
    } catch (err) {
      if (isPredicatedError(err)) {
        commit('setInitialData');
      }
    }
  },

  loadData({ state }: Pick<Store, 'state'>, key: keyof State) {
    return state[key];
  },

  addProduct({ state, commit }: Pick<Store, 'state' | 'commit' | 'dispatch'>, newProduct: Product) {
    try {
      isValidForAddProduct(newProduct);
      commit('addProduct', newProduct);
      commit('sortProduct');
      return state.products;
    } catch (err) {
      if (isPredicatedError(err)) {
        alert(err.message);
      }
    }
  },

  chargeCoin({ state, commit }: Pick<Store, 'state' | 'commit'>, inputPrice: number) {
    try {
      isValidPriceForMakingCoin(inputPrice);

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
    } catch (err) {
      if (isPredicatedError(err)) {
        alert(err.message);
      }
    }
  },

  increaseInputPrice({ commit }: Pick<Store, 'commit'>, inputPrice: number) {
    try {
      isValidInputPrice(inputPrice);

      commit('increaseInputPrice', inputPrice);
      commit('saveInputPrice');
    } catch (err) {
      if (isPredicatedError(err)) {
        alert(err.message);
      }
    }
  },

  buyProduct({ state, commit }: Pick<Store, 'state' | 'commit'>, productName: string) {
    try {
      const product = state.products.find((product: Product) => product.name === productName);
      const price = state.inputPrice;

      isValidProductQuantity(product);
      isValidPriceForBuyingProduct(product, price);

      commit('decreaseProductQuantity', product);
      commit('decreaseInputPrice', product.price);
      commit('saveInputPrice');
      commit('saveProducts');
    } catch (err) {
      if (isPredicatedError(err)) {
        alert(err.message);
      }
    }
  },
};
