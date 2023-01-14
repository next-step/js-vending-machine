export default class DataStorage {
  #key;

  /**
   *
   * @param {string} key
   */
  constructor(key) {
    this.#key = key;
  }

  /**
   *
   * @param {Object|Object[]} data
   */
  saveItem(data) {
    localStorage.setItem(this.#key, JSON.stringify(data));
  }

  loadItem() {
    const stringified = localStorage.getItem(this.#key);
    return stringified ? JSON.parse(stringified) : null;
  }
}
