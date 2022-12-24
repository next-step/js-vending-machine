import { getLocalStorageItem } from '../utils/localStorageUtils.js';
import { toNumber } from '../utils/utils.js';

export const PRODUCTS_STATE_KEY = 'products';

const productsInitState = [];

export const products = getLocalStorageItem(PRODUCTS_STATE_KEY, (item) => {
  if (!item) return;
  const parsedItem = JSON.parse(item);
  parsedItem.price = toNumber(parsedItem.price);
  parsedItem.quantity = toNumber(parsedItem.quantity);
  return parsedItem;

}) || productsInitState;
