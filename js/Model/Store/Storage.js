import Validator from '../Validator.js';

class Storage {
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
    return Validator.storage.isEmpty(this.getStorageProduct) ? false : true;
  }

  includeSameProductToStorage(storageProduct, newProduct) {
    return Validator.storage.isSameName(storageProduct, newProduct);
  }

  static of() {
    return new Storage();
  }
}

export default Storage;
