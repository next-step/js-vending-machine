import {
  isValidForAddProduct,
  isValidPriceForMakingCoin,
  isValidInputPrice,
  isValidProductQuantity,
  isValidPriceForBuyingProduct,
} from '../state/validator';
import { generateRandomNumber } from '../utils/randomGenerator';
import { UserInputValidationError, InvalidStatusValidationError } from '../utils/errorValidation';

export default {
  setInitialData({ commit }) {
    commit('setInitialData');
  },

  loadData({ state }, key: string) {
    return state[key];
  },

  addProduct({ state, commit }, newProduct: Product) {
    try {
      isValidForAddProduct(newProduct);
      commit('addProduct', newProduct);
      commit('sortProduct');
      return state.products;
    } catch (err) {
      if (err instanceof UserInputValidationError) {
        alert(err.message);
      }
    }
  },

  chargeCoin({ state, commit }, inputPrice: number) {
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
      if (err instanceof UserInputValidationError) {
        alert(err.message);
      }
    }
  },

  increaseInputPrice({ commit }, inputPrice: number) {
    try {
      isValidInputPrice(inputPrice);

      commit('increaseInputPrice', inputPrice);
      commit('saveInputPrice');
    } catch (err) {
      if (err instanceof UserInputValidationError) {
        alert(err.message);
      }
    }
  },

  buyProduct({ state, commit }, productName: string) {
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
      if (err instanceof InvalidStatusValidationError) {
        alert(err.message);
      }
    }
  },
};
