const store = {
  setValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getValue(value, defaultValue) {
    const localStorageValue = localStorage.getItem(value);
    return JSON.parse(localStorageValue) || defaultValue;
  },
};

export default store;
