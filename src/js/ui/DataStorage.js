export default class DataStorage {
  key;

  /**
   *
   * @param {string} key
   */
  constructor(key) {
    this.key = key;
  }

  /**
   *
   * @param {string} key
   * @param {Object|Object[]} data
   */
  saveItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadItem(key) {
    const stringified = localStorage.getItem(key);
    return stringified ? JSON.parse(stringified) : null;
  }
}
