import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { PRODUCT } from '../constants/productManageMenu.js';
import { CHARGE } from '../constants/vendingMachineManageMenu.js';
import { EmptyInputError, InvalidValueError } from './error.js';

const validator = {
  isEmpty: (value) => value === '',
  haveValue: (value) => value !== '',
  isNumber: (value) => !Number.isNaN(value),
  isDivisible: (baseValue, divisionValue) => baseValue % divisionValue === 0,
  lt: (baseValue, compareValue) => baseValue < compareValue,
  lte: (baseValue, compareValue) => baseValue <= compareValue,
  gt: (baseValue, compareValue) => baseValue > compareValue,
  gte: (baseValue, compareValue) => baseValue >= compareValue,
  eq: (baseValue, compareValue) => baseValue === compareValue,
};

const validate = (predicate, error) => {
  if (!predicate) {
    throw error;
  }
};

export const validateProductName = (productName) => {
  validate(validator.haveValue(productName), new EmptyInputError(ERROR_MESSAGE.EMPTY_INPUT));
};

export const validateProductPrice = (productPrice) => {
  validate(validator.isNumber(productPrice), new EmptyInputError(ERROR_MESSAGE.EMPTY_INPUT));
  validate(
    validator.gt(productPrice, PRODUCT.MIN_PRICE),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PRODUCT_MIN_PRICE),
  );
  validate(
    validator.isDivisible(productPrice, PRODUCT.DIVISIBLE_UNIT),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT),
  );
};

export const validateProductQuantity = (productQuantity) => {
  validate(validator.isNumber(productQuantity), new EmptyInputError(ERROR_MESSAGE.EMPTY_INPUT));
  validate(
    validator.gte(productQuantity, PRODUCT.MIN_QUANTITY),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY),
  );
};

export const validateVendingMachineCharge = (charge) => {
  validate(
    validator.gte(charge, CHARGE.MIN_PRICE),
    new InvalidValueError(ERROR_MESSAGE.INVALID_VENDING_MACHINE_MIN_CHARGE),
  );
  validate(
    validator.isDivisible(charge, CHARGE.DIVISIBLE_UNIT),
    new InvalidValueError(ERROR_MESSAGE.INVALID_VENDING_MACHINE_CHARGE_UNIT),
  );
};
