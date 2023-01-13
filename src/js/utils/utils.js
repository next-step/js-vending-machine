import {
  CHARGE_PRICE_UNIT,
  ERROR_MESSAGE,
  MINIMUM_CHARGE_PRICE,
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
    throw new ValidationError(ERROR_MESSAGE.INVALID_AMOUNT);
  }
};

export const isValidPriceUnit = (value, unit) => {
  if (value % unit !== 0) {
    throw new ValidationError(ERROR_MESSAGE.INVALID_UNIT);
  }
};

export const validateManagerInputs = {
  name: (value) => {
    isEmpty(value);
  },
  price: (value) => {
    isGreaterThanOrEqualToNumber(Number(value), MINIMUM_PRODUCT_PRICE);
    isValidPriceUnit(Number(value), PRODUCT_PRICE_UNIT);
  },
  quantity: () => {},
};

export const validateChargerInput = (value) => {
  isGreaterThanOrEqualToNumber(Number(value), MINIMUM_CHARGE_PRICE);
  isValidPriceUnit(Number(value), CHARGE_PRICE_UNIT);
};

export const isInitialState = (state, initialState) =>
  JSON.stringify(state) === JSON.stringify(initialState);

export const calculateCoinCount = (coin) => {
  const units = [500, 100, 50, 10];
  const result = {};

  units.forEach((unit) => {
    const count = (coin - (coin % unit)) / unit;
    coin -= unit * count;
    result[unit] = count;
  });

  return result;
};
