const store = {
  setValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getValue(value) {
    return JSON.parse(localStorage.getItem(value));
  },
};

export default store;
