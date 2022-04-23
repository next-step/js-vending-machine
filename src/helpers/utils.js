import { ERROR_MESSAGE } from '../constants.js';

// prettier-ignore
export const pipe = (...fns) => value => fns.reduce((_value, fn) => fn(_value), value);

export const pipeline = (execute, params) => {
  try {
    return execute(params);
  } catch (error) {
    alert(error.message);
    return null;
  }
};

export const unitGenerateNumber = numberValue => {
  if (typeof numberValue !== 'number') throw new TypeError(ERROR_MESSAGE.NOT_NUMBER_TYPE);
  return numberValue.toLocaleString('ko-KR');
};

export const totalCoinCalculator = (total, [coin, count]) => total + coin * count;

export const descSortFirstVariable = (current, next) => next[0] - current[0];
