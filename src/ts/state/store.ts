import { validateNewProduct, validateCoin } from './validator';
import { getItem, setItem } from '../utils/storage';
import { ERROR } from '../utils/message';
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

export const loadData = (key: StateKeys): StateTypes => {
  try {
    state[key] = getItem(key);
    return getItem(key);
  } catch (err: Error | unknown) {
    throw err;
  }
};

const sortProduct = () => {
  state.products = Array.from(<Array<Product>>state.products).sort((a: Product, b: Product) => {
    return a.name.localeCompare(b.name) || a.price - b.price || b.quantity - a.quantity;
  });
};

export const addProduct = (newProduct: Product): Array<Product> => {
  try {
    validateNewProduct(newProduct);

    const products = state.products.filter(product => product.name !== newProduct.name);
    state.products = [...products, newProduct];

    if (!state.products) throw Error(ERROR.FAIL_ADD_PRODUCT);

    sortProduct();
    setItem('products', state.products);

    return state.products;
  } catch (err) {
    throw err;
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
