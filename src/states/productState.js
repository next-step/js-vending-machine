import { Product } from '../models/Product.js';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorageUtils.js';

export const PRODUCTS_STATE_KEY = 'products';

const productsInitState = {};

export const products = getLocalStorageItem(PRODUCTS_STATE_KEY, (item) => {
  if (!item) return;
  const parsedItem = JSON.parse(item);
  for (const key in parsedItem) {
    parsedItem[key] = new Product(parsedItem[key]);
  }
  return parsedItem;

}) || productsInitState;

export function setProductStateInLocalStorage(products) {
  setLocalStorageItem(PRODUCTS_STATE_KEY, JSON.stringify(products));
}
