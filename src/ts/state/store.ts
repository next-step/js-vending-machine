import { validateCoin } from './validator';
import { getItem, setItem } from '../utils/storage';
import { generateRandomNumber } from '../utils/randomGenerator';

export const state: State = {
  products: [],
  coins: {
    COIN_500: {
      value: 500,
      count: 0,
    },
    COIN_100: {
      value: 100,
      count: 0,
    },
    COIN_50: {
      value: 50,
      count: 0,
    },
    COIN_10: {
      value: 10,
      count: 0,
    },
  },
};

export const loadData = (key: StateKeys) => {
  try {
    state[key] = getItem(key);
    return getItem(key);
  } catch (err: Error | unknown) {
    console.error(err);
    return null;
  }
};

export const chargeCoin = (inputPrice: number) => {
  try {
    validateCoin(inputPrice);
    while (inputPrice > 0) {
      const coinKeyRange = Reflect.ownKeys(state.coins).length - 1;
      const randomKeyNumber = generateRandomNumber(0, coinKeyRange);
      const randomCoinKey = <CoinKey>Object.keys(state.coins)[randomKeyNumber];
      const selectedCoin = <CoinObj>state.coins[randomCoinKey];

      if (inputPrice >= selectedCoin.value) {
        inputPrice -= selectedCoin.value;
        selectedCoin.count += 1;
      }
    }

    setItem('coins', state.coins);
    return state.coins;
  } catch (err) {
    throw err;
  }
};
