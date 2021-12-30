export const doesNotExistValue = (value) => {
  const isUndefined = value === undefined;
  const isNull = value === null;
  const isBlank = value === '';

  return isUndefined && isNull && isBlank;
};

export const getLocalStorageValueByKey = (key) => {
  const value = window.localStorage.getItem(key);

  if (doesNotExistValue(value)) return null;

  return JSON.parse(value);
};

export const setLocalStorageValue = (key, newValue) => {
  window.localStorage.setItem(key, JSON.stringify(newValue));
};
