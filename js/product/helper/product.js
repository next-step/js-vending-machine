import { now } from '../../utils/date.js';

export const RANGE = {
  MAX_PRICE: 500_000,
  MIN_PRICE: 10,
  MAX_COUNT: 5_000,
  MIN_COUNT: 1,
};

export const addProduct = (newProduct, prevProducts) =>
  sortByRegisterTime(mergeProducts(newProduct, prevProducts));

const getProductWithRegisterTime = (newProduct, prevProducts) => {
  const found = prevProducts.find(({ name }) => name === newProduct.name);
  const registerTime = found?.registerTime ?? now();

  return {
    ...newProduct,
    registerTime,
  };
};

const mergeProducts = (newProduct, prevProducts) => {
  const filtered = prevProducts.filter(({ name }) => name !== newProduct.name);
  return filtered.concat(getProductWithRegisterTime(newProduct, prevProducts));
};

const sortByRegisterTime = (products) =>
  products.sort(({ registerTime: a }, { registerTime: b }) => b - a);
