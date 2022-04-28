import { getItem, setItem } from './utils/storage';
import { PRODUCT_CONFIG } from './utils/config';
import { ERROR } from './utils/message';
import { ValidationError } from './utils/errorValidation';
import { generateRandomNumber } from './utils/randomGenerator';
import { PathType } from '../ts/router/pages';

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

export const loadData = <Obj extends StateTypes>(path: PathType): Obj => {
  try {
    const pageName = path.replace(/\//i, '');
    state[pageName] = getItem(pageName);
    return state[pageName];
  } catch (err: unknown) {
    throw err;
  }
};

const sortProduct = (): void => {
  state.products = Array.from(<Array<Product>>state.products).sort((a: Product, b: Product) => {
    return a.name.localeCompare(b.name) || a.price - b.price || b.quantity - a.quantity;
  });
};

const validateNewProduct = (newProduct: Product) => {
  if (newProduct.price < PRODUCT_CONFIG.MIN_PRICE) {
    throw new ValidationError(ERROR.LESS_THAN_MIN_PRICE);
  }
  if (newProduct.quantity < PRODUCT_CONFIG.MIN_QUANTITY) {
    throw new ValidationError(ERROR.LESS_THAN_MIN_QUANTITY);
  }
  if (newProduct.price % PRODUCT_CONFIG.SHOULD_BE_DIVIDED !== 0) {
    throw new ValidationError(ERROR.NOT_DIVIDED_PRICE);
  }
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
    while (inputPrice > 0) {
      const randomCoinKey = <CoinKey>(
        Object.keys(state.coins)[generateRandomNumber(0, Object.keys(state.coins).length - 1)]
      );
      const randomCoinObj = <CoinObj>state.coins[randomCoinKey];

      if (inputPrice >= randomCoinObj.value) {
        inputPrice -= randomCoinObj.value;
        randomCoinObj.count += 1;
      }
    }

    setItem('charge', state.coins);
    return state.coins;
  } catch (err) {
    throw err;
  }
};
