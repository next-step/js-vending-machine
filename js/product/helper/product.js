import { now } from '../../utils/date.js';
import { InputValidationError } from '../../utils/validation.js';

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
  validateProductInfo(newProduct);

  const filtered = prevProducts.filter(({ name }) => name !== newProduct.name);
  return filtered.concat(getProductWithRegisterTime(newProduct, prevProducts));
};

const sortByRegisterTime = (products) =>
  products.sort(({ registerTime: a }, { registerTime: b }) => b - a);

const validateProductInfo = ({ name, count, price }) => {
  if (!name) InputValidationError.of('name', '상품명을 입력하세요.');

  if (!count) InputValidationError.of('count', '수량을 입력하세요.');

  if (!price) InputValidationError.of('price', '금액을 입력하세요.');

  if (price % 10)
    InputValidationError.of('price', '금액은 10원 단위로 입력하세요.');
};
