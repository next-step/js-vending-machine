export const tab =
  (value) =>
  (...callbacks) => {
    callbacks.forEach((callback) => callback(value));
    return value;
  };

export const validate = (value, validations) => {
  tab(value)(...validations);
};

export const showErrorMessage = (error) => {
  alert(error.message);
};

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
