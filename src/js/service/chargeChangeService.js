import { createRandomNumber } from '../utils/utils.js';
import { ERROR_MESSAGE } from '../constants/index.js';

export const validateTypedAmount = (amountString) => {
  if (amountString.length === 0) throw Error(ERROR_MESSAGE.NONE_AMOUNT);

  const amount = Number(amountString);

  if (amount < 100) throw Error(ERROR_MESSAGE.MIN_AMOUNT);
  if (amount > 100000000) throw Error(ERROR_MESSAGE.MAX_AMOUNT);
  if (amount % 10 !== 0) throw Error(ERROR_MESSAGE.AMOUNT_DIVISION_BY_TEN);
};

export const getAllChargedCoinsAmount = (coins) => {
  const reducer = (acc, [key, value]) => acc + Number(key) * value;
  return Object.entries(coins).reduce(reducer, 0);
};

export const createRandomCoin = () => [10, 50, 100, 500][createRandomNumber(0, 3)];

export const createRandomCoins = (chargedAmount) => {
  let remainedAmount = chargedAmount;
  const coins = {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  };

  while (true) {
    const createdCoin = createRandomCoin();
    if (remainedAmount - createdCoin === 0) {
      coins[createdCoin] += 1;
      return coins;
    }

    if (remainedAmount - createdCoin < 0) {
      continue;
    }

    remainedAmount -= createdCoin;
    coins[createdCoin] += 1;
  }
};
