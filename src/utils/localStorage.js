export const setLocalStorage = (key, values) => {
  return localStorage.setItem(key, JSON.stringify(values));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
