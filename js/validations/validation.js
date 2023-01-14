import { CHARGE_MANAGE, PRODUCT_MANAGE } from '../constants/constant.js';
import { CHARGE, PRODUCT } from '../constants/message.js';
import {
  isEmpty,
  isInvalidMin,
  isInvalidUnit,
  isMatch,
} from '../utils/validator.js';

export const productNameValidations = [
  (value) => {
    if (isEmpty(value)) {
      throw new Error(PRODUCT.NAME_EMPTY);
    }
  },
  (value) => {
    if (isMatch(value, /\s/g)) {
      throw new Error(PRODUCT.NAME_SPACE);
    }
  },
];

export const productPriceValidations = [
  (value) => {
    if (isInvalidMin(value, PRODUCT_MANAGE.PRICE_MIN)) {
      throw new Error(PRODUCT.MIN_PRICE);
    }
  },
  (value) => {
    if (isInvalidUnit(value, PRODUCT_MANAGE.PRICE_UNIT)) {
      throw new Error(PRODUCT.PRICE_UNIT);
    }
  },
];

export const productQuantityValidations = [
  (value) => {
    if (isInvalidMin(value, PRODUCT_MANAGE.QUANTITY_MIN)) {
      throw new Error(PRODUCT.MIN_QUANTITY);
    }
  },
];

export const chargeAmountValidations = [
  (value) => {
    if (isInvalidMin(value, CHARGE_MANAGE.AMOUNT_MIN)) {
      throw new Error(CHARGE.MIN_AMOUNT);
    }
  },
  (value) => {
    if (isInvalidUnit(value, CHARGE_MANAGE.AMOUNT_UNIT)) {
      throw new Error(CHARGE.AMOUNT_UNIT);
    }
  },
];
