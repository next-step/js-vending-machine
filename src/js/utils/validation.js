import { ERROR_MESSAGE } from '../constants/errorMessage.js';

const isEmpty = (input) => input === '';

const validate = (predicate, message) => {
  if (!predicate) {
    throw new Error(message);
  }
};

export const validateProductName = (productName) => {
  validate(!isEmpty(productName), ERROR_MESSAGE.EMPTY_INPUT);
};

export const validateProductPrice = (productPrice) => {
  validate(!isEmpty(productPrice), ERROR_MESSAGE.EMPTY_INPUT);
  validate(productPrice > 100, ERROR_MESSAGE.INVALID_PRODUCT_MIN_PRICE);
  validate(productPrice % 10 === 0, ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT);
};

export const validateProductQuantity = (productQuantity) => {
  validate(!isEmpty(productQuantity), ERROR_MESSAGE.EMPTY_INPUT);
  validate(productQuantity >= 1, ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY);
};

export const validateVendingMachineCharge = (charge) => {
  validate(charge >= 100, ERROR_MESSAGE.INVALID_VENDING_MACHINE_MIN_CHARGE);
  validate(charge % 10 === 0, ERROR_MESSAGE.INVALID_VENDING_MACHINE_CHARGE_UNIT);
};
