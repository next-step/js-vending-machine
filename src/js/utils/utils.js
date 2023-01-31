import {
  CHARGE_PRICE_UNIT,
  ERROR_MESSAGE,
  MINIMUM_CHARGE_PRICE,
  MINIMUM_PRODUCT_PRICE,
  PRODUCT_PRICE_UNIT,
} from "./constants.js";
import { ValidationError } from "./error.js";

export const isEmpty = (value, from) => {
  if (value.trim() === "") {
    throw new ValidationError(ERROR_MESSAGE.EMPTY_VALUE, from);
  }
};

export const isGreaterThanOrEqualToNumber = ({ value, number, from }) => {
  if (number > value) {
    throw new ValidationError(ERROR_MESSAGE.INVALID_AMOUNT, from);
  }
};

export const isValidUnit = ({ value, unit, from }) => {
  if (value % unit !== 0) {
    throw new ValidationError(ERROR_MESSAGE.INVALID_UNIT, from);
  }
};

export const validateUnit = ({ type, value, from }) => {
  const number =
    type === "price" ? MINIMUM_PRODUCT_PRICE : MINIMUM_CHARGE_PRICE;
  const unit = type === "price" ? PRODUCT_PRICE_UNIT : CHARGE_PRICE_UNIT;

  isGreaterThanOrEqualToNumber({
    value,
    number,
    from,
  });

  isValidUnit({ value, unit, from });
};

export const validateManagerInputs = {
  name: (value, from) => {
    isEmpty(value, from);
  },
  price: (value, from) => {
    validateUnit({ type: "price", value: Number(value), from });
  },
  quantity: () => {},
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

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
