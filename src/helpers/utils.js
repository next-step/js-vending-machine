import { ERROR_MESSAGE } from '../constants.js';

// prettier-ignore
export const pipe = (...fns) => value => fns.reduce((_value, fn) => fn(_value), value);

// TODO: 전역 에러 핸들러와 결합하여 후속처리를 어떻게 진행할 건지 생각하기
export const pipeline = (execute, params) => execute(params);

export const unitGenerateNumber = numberValue => {
  if (typeof numberValue !== 'number') throw new TypeError(ERROR_MESSAGE.NOT_NUMBER_TYPE);
  return numberValue.toLocaleString('ko-KR');
};

export const totalCoinCalculator = (total, [coin, count]) => total + coin * count;

export const descSortFirstVariable = (current, next) => next[0] - current[0];
