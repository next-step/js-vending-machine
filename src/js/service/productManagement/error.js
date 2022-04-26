import { ERRORS } from '../../constants/index.js';

export const validateProduct = (product) => {
  let errorMessage = '';

  const priceLastNumber = Number(product.price.toString().charAt(product.price.toString().length - 1));

  if (priceLastNumber !== 0) {
    errorMessage = ERRORS.PRICE_UNIT;
    throw Error(errorMessage);
  }

  return { errorMessage };
};
