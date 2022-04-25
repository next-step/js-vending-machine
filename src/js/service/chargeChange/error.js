import { ERRORS } from '../../constants/index.js';

export const validateAmount = (amount) => {
  let errorMessage = '';

  const priceLastNumber = Number(amount.toString().charAt(amount.toString().length - 1));

  if (priceLastNumber !== 0) {
    errorMessage = ERRORS.AMOUNT_UNIT;
    return { errorMessage };
  }

  return { errorMessage };
};
