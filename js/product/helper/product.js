import { now } from '../../utils/date.js';
import { InputValidationError } from '../../utils/validation.js';
import { MESSAGE, RANGE } from '../const/index.js';

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
  validateProductInfo(newProduct);

  const filtered = prevProducts.filter(({ name }) => name !== newProduct.name);
  return filtered.concat(getProductWithRegisterTime(newProduct, prevProducts));
};

const sortByRegisterTime = (products) =>
  products.sort(({ registerTime: a }, { registerTime: b }) => b - a);

const validateProductInfo = ({ price }) => {
  if (price % RANGE.PRICE_UNIT)
    InputValidationError.of('price', MESSAGE.PLZ_CHECK_PRICE_UNIT);
};
