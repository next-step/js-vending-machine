import {
  EMPTY_PRODUCT_NAME,
  EMPTY_PRODUCT_NUMBER,
  EMPTY_PRODUCT_PRICE,
  INVALID_PRODUCT_NUMBER_MINIMUM,
  INVALID_PRODUCT_PRICE,
  INVALID_PRODUCT_PRICE_MINIMUM,
  PRODUCT_NUMBER_MINIMUM,
  PRODUCT_PRICE_MINIMUM,
} from './constants.js';

const validate = (hasErrorCondition, handleError) => {
  if (hasErrorCondition) {
    handleError();
    return true;
  }
  return false;
};

const hasErrorCondition = {
  isEmptyProductName: (name) => !name.length,
  isEmptyProductPrice: (price) => !price.length,
  isEmptyProductNumber: (number) => !number.length,
  isMinProductPrice: (price) => price < PRODUCT_PRICE_MINIMUM,
  isInvalidProductPrice: (price) => price % 10 !== 0,
  isMinProductNumber: (number) => number < PRODUCT_NUMBER_MINIMUM,
};

const handleError = {
  emptyProductName: () => alert(EMPTY_PRODUCT_NAME),
  emptyProductPrice: () => alert(EMPTY_PRODUCT_PRICE),
  emptyProductNumber: () => alert(EMPTY_PRODUCT_NUMBER),
  minProductPrice: () => alert(INVALID_PRODUCT_PRICE_MINIMUM),
  invalidProductPrice: () => alert(INVALID_PRODUCT_PRICE),
  minProductNumber: () => alert(INVALID_PRODUCT_NUMBER_MINIMUM),
};

export const productValidation = {
  emptyProductName: (name) =>
    validate(
      hasErrorCondition.isEmptyProductName(name),
      handleError.emptyProductName
    ),
  emptyProductPrice: (price) =>
    validate(
      hasErrorCondition.isEmptyProductPrice(price),
      handleError.emptyProductPrice
    ),
  emptyProductNumber: (number) =>
    validate(
      hasErrorCondition.isEmptyProductNumber(number),
      handleError.emptyProductNumber
    ),
  minProductPrice: (price) =>
    validate(
      hasErrorCondition.isMinProductPrice(price),
      handleError.minProductPrice
    ),
  invalidProductPrice: (price) =>
    validate(
      hasErrorCondition.isInvalidProductPrice(price),
      handleError.invalidProductPrice
    ),
  minProductNumber: (cars) =>
    validate(
      hasErrorCondition.isMinProductNumber(cars),
      handleError.minProductNumber
    ),
};
