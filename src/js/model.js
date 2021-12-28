import { getLocalStorageValueByKey, setLocalStorageValue } from './service/localStorageService.js';

export default class Model {
  constructor() {
    this.products = getLocalStorageValueByKey('products') || [];
  }

  addNewProduct(newProduct) {
    this.products = [...this.products, newProduct];
    setLocalStorageValue('products', this.products);
  }

  updateSameProduct(newProduct) {
    this.products = [...this.products].map((product) => {
      if (product.name === newProduct.name) return newProduct;
      return product;
    });
  }
}
