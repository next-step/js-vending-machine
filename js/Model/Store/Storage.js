import Validator from '../Validator.js';

class Storage {
  #item;

  /**
   * @param {string} product
   */
  set setStorageProduct(product) {
    localStorage.setItem('product', JSON.stringify(product));
  }

  get getStorageProduct() {
    return JSON.parse(localStorage.getItem('product'));
  }

  isPassStorageValidation() {
    if (Validator.storage.isEmpty(this.getStorageProduct)) {
      return false;
    }

    return true;
  }

  static of() {
    return new Storage();
  }
}

export default Storage;
