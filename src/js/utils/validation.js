import { ERROR_MESSAGE } from '../constants/errorMessage.js';
import { PRODUCT } from '../constants/productManageMenu.js';
import { MONEY, PURCHASE_PRODUCT } from '../constants/productPurchaseMenu.js';
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
  ne: (baseValue, compareValue) => baseValue !== compareValue,
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
    validator.gte(productPrice, PRODUCT.MIN_PRICE),
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

export const validatePurchaseMoney = (money) => {
  validate(validator.gte(money, MONEY.MIN), new InvalidValueError(ERROR_MESSAGE.INVALID_PURCHASE_PRODUCT_MIN_MONEY));
  validate(
    validator.isDivisible(money, MONEY.UNIT),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PURCHASE_PRODUCT_MONEY_UNIT),
  );
};

export const validatePurchaseQuantity = (quantity) => {
  validate(
    validator.gt(quantity, PURCHASE_PRODUCT.MIN_QUANTITY),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PURCHASE_PRODUCT_MIN_QUANTITY),
  );
};

export const validatePurchasePrice = (chargeAmount, productPrice) => {
  validate(
    validator.gte(chargeAmount, productPrice),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PURCHASE_PRODUCT_CHARGE_AMOUNT),
  );
};

export const validateReturnChargeAmount = (chargeAmount) => {
  validate(validator.gt(chargeAmount, 0), new InvalidValueError(ERROR_MESSAGE.INVALID_PURCHASE_RETURN_CHARGE_AMOUNT));
};

export const validateReturnResult = (prevChargeAmount, nextChargeAmount) => {
  validate(
    validator.ne(prevChargeAmount, nextChargeAmount),
    new InvalidValueError(ERROR_MESSAGE.INVALID_PURCHASE_RETURN_RESULT),
  );
};
