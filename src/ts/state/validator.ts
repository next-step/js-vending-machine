import { UserInputValidationError } from '../utils/errorValidation';
import { ERROR } from '../utils/message';
import { PRODUCT_CONFIG, COIN_CONFIG } from '../utils/config';

export const validateNewProduct = (newProduct: Product) => {
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

export const validateCoin = (inputPrice: number) => {
  if (inputPrice < COIN_CONFIG.MIN_PRICE) {
    throw new UserInputValidationError(ERROR.COIN_LESS_THAN_MIN_PRICE);
  }
  if (inputPrice % COIN_CONFIG.SHOULD_BE_DIVIDED !== 0) {
    throw new UserInputValidationError(ERROR.COIN_NOT_DIVIDED_PRICE);
  }
};
