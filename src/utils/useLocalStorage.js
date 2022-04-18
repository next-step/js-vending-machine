const useLocalStorage = {
  getByJson(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setByJson(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  },
};

export default useLocalStorage;
