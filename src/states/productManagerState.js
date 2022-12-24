import { getLocalStorageItem } from '../utils/localStorageUtils.js';

export const PRODUCTS_STATE_KEY = 'products';

const productsInitState = [];

export const products = getLocalStorageItem(PRODUCTS_STATE_KEY, (item) => {
  if (!item) return;
  return JSON.parse(item);
}) || productsInitState;
