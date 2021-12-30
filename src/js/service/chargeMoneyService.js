import { ERROR_MESSAGE } from '../constants/index.js';

export const validateInputAmount = (amountString) => {
  if (amountString.length === 0) throw Error(ERROR_MESSAGE.NONE_CHARGE_AMOUNT);

  const amount = Number(amountString);

  if (amount < 100) throw Error(ERROR_MESSAGE.MIN_CHARGE_AMOUNT);
  if (amount > 100000000) throw Error(ERROR_MESSAGE.MAX_CHARGE_AMOUNT);
  if (amount % 10 !== 0) throw Error(ERROR_MESSAGE.DIVISION_BY_TEN_CHARGE_AMOUNT);
};
