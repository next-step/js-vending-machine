import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { CHARGE, PRODUCT } from '../constants/vendingMachine.js';

const validator = {
  isEmpty: (value) => value === '',
  haveValue: (value) => value !== '',
  isDivisible: (baseValue, divisionValue) => baseValue % divisionValue === 0,
  lt: (baseValue, compareValue) => baseValue < compareValue,
  lte: (baseValue, compareValue) => baseValue <= compareValue,
  gt: (baseValue, compareValue) => baseValue > compareValue,
  gte: (baseValue, compareValue) => baseValue >= compareValue,
};

const validate = (predicate, message) => {
  if (!predicate) {
    throw new Error(message);
  }
};

export const validateProductName = (productName) => {
  validate(validator.haveValue(productName), ERROR_MESSAGE.EMPTY_INPUT);
};

export const validateProductPrice = (productPrice) => {
  validate(validator.haveValue(productPrice), ERROR_MESSAGE.EMPTY_INPUT);
  validate(validator.gt(productPrice, PRODUCT.MIN_PRICE), ERROR_MESSAGE.INVALID_PRODUCT_MIN_PRICE);
  validate(validator.isDivisible(productPrice, PRODUCT.DIVISIBLE_UNIT), ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT);
};

export const validateProductQuantity = (productQuantity) => {
  validate(validator.haveValue(productQuantity), ERROR_MESSAGE.EMPTY_INPUT);
  validate(validator.gte(productQuantity, PRODUCT.MIN_QUANTITY), ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY);
};

export const validateVendingMachineCharge = (charge) => {
  validate(validator.gte(charge, CHARGE.MIN_PRICE), ERROR_MESSAGE.INVALID_VENDING_MACHINE_MIN_CHARGE);
  validate(validator.isDivisible(charge, CHARGE.DIVISIBLE_UNIT), ERROR_MESSAGE.INVALID_VENDING_MACHINE_CHARGE_UNIT);
};
