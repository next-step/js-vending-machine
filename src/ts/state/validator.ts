import { UserInputValidationError, InvalidStatusValidationError } from '../utils/errorValidation';
import { ERROR } from '../utils/message';
import { PRODUCT_CONFIG, COIN_CONFIG, INPUT_PRICE_CONFIG } from '../utils/config';

export const isValidForAddProduct = (newProduct: Product) => {
  if (newProduct.price < PRODUCT_CONFIG.MIN_PRICE) {
    throw new UserInputValidationError(ERROR.PRODUCT_LESS_THAN_MIN_PRICE);
  }
  if (newProduct.quantity < PRODUCT_CONFIG.MIN_QUANTITY) {
    throw new UserInputValidationError(ERROR.PRODUCT_LESS_THAN_MIN_QUANTITY);
  }
  if (newProduct.price % PRODUCT_CONFIG.SHOULD_BE_DIVIDED !== 0) {
    throw new UserInputValidationError(ERROR.PRODUCT_NOT_DIVIDED_PRICE);
  }
};

export const isValidPriceForMakingCoin = (inputPrice: number) => {
  if (inputPrice < COIN_CONFIG.MIN_PRICE) {
    throw new UserInputValidationError(ERROR.COIN_LESS_THAN_MIN_PRICE);
  }
  if (inputPrice % COIN_CONFIG.SHOULD_BE_DIVIDED !== 0) {
    throw new UserInputValidationError(ERROR.COIN_NOT_DIVIDED_PRICE);
  }
};

export const isValidInputPrice = (inputPrice: number) => {
  if (inputPrice % INPUT_PRICE_CONFIG.SHOULD_BE_DIVIDED !== 0) {
    throw new UserInputValidationError(ERROR.INPUT_PRICE_NOT_DIVIDED_PRICE);
  }
};

export const isValidProductQuantity = (product: Product) => {
  if (product.quantity < 1) {
    throw new InvalidStatusValidationError(ERROR.PRODUCT_EMPTY);
  }
};

export const isValidPriceForBuyingProduct = (product: Product, inputPrice: InputPrice) => {
  if (product.price > inputPrice) {
    throw new InvalidStatusValidationError(ERROR.PRODUCT_PRICE_GREATER_THAN_OWN);
  }
};
