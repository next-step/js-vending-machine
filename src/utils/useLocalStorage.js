const useLocalStorage = {
  getByJson(key) {
    if (key === undefined || key === null) {
      throw new TypeError('key is null or undefined');
    }

    const localStorageItem = localStorage.getItem(key);

    if (localStorageItem === null || localStorageItem === undefined) return {};

    return JSON.parse(localStorageItem);
  },
  setByJson(key, items) {
    if (key === undefined || key === null) {
      throw new TypeError('key is null or undefined');
    }

    if (items === undefined || items === null) {
      throw new TypeError('items is null or undefined');
    }

    localStorage.setItem(key, JSON.stringify(items));
  },
};

export default useLocalStorage;
