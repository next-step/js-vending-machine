import {
  ERROR_MESSAGE,
  MINIMUM_PRODUCT_PRICE,
  PRODUCT_PRICE_UNIT,
} from "./constants.js";
import { ValidationError } from "./error.js";

export const isEmpty = (value) => {
  if (value.trim() === "") {
    throw new ValidationError(ERROR_MESSAGE.EMPTY_VALUE);
  }
};

export const isGreaterThanOrEqualToNumber = (value, number) => {
  if (number > value) {
    throw new ValidationError(ERROR_MESSAGE.INVALID_PRODUCT_PRICE_AMOUNT);
  }
};

export const isValidPriceUnit = (value, unit) => {
  if (value % unit !== 0) {
    throw new ValidationError(ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT);
  }
};

export const validateManagerInputs = {
  name: (value) => {
    isEmpty(value);
  },
  price: (value) => {
    isGreaterThanOrEqualToNumber(value, MINIMUM_PRODUCT_PRICE);
    isValidPriceUnit(value, PRODUCT_PRICE_UNIT);
  },
  quantity: () => {},
};

export const isInitialState = (state, initialState) =>
  JSON.stringify(state) === JSON.stringify(initialState);
