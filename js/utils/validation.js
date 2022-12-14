import { MESSAGE, PRODUCT_MANAGE } from './constant.js';
import { isEmpty, isInvalidMin, isInvalidUnit, isMatch } from './util.js';

export const productNameValidations = [
  (value) => {
    if (isEmpty(value)) {
      throw new Error(MESSAGE.PRODUCT_NAME_EMPTY);
    }
  },
  (value) => {
    if (isMatch(value, /\s/g)) {
      throw new Error(MESSAGE.PRODUCT_NAME_SPACE);
    }
  },
];

export const productPriceValidations = [
  (value) => {
    if (isInvalidMin(value, PRODUCT_MANAGE.PRICE_MIN)) {
      throw new Error(MESSAGE.PRODUCT_MIN_PRICE);
    }
  },
  (value) => {
    if (isInvalidUnit(value, PRODUCT_MANAGE.PRICE_UNIT)) {
      throw new Error(MESSAGE.PRODUCT_UNIT);
    }
  },
];

export const productQuantityValidations = [
  (value) => {
    if (isInvalidMin(value, PRODUCT_MANAGE.QUANTITY_MIN)) {
      throw new Error(MESSAGE.PRODUCT_MIN_QUANTITY);
    }
  },
];
