import { tab } from './fp.js';

export const isEmpty = (value) => {
  return value === '';
};

export const isMatch = (value, pattern) => {
  return value.toString().match(pattern);
};

export const isInvalidMin = (value, min, max) => {
  return min > value;
};

export const isInvalidUnit = (value, unit) => {
  return value % unit !== 0;
};

export const validate = (value, validations) => {
  tab(value)(...validations);
};
