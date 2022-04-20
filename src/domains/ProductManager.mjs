import { STORE_KEY } from '../constants.js';
import Product from './Product.mjs';

import store from '../utils/store.js';

class ProductManager {
  #products;

  constructor() {
    this.#products = store
      .getValue(STORE_KEY.PRODUCTS, [])
      .map(({ name, price, quantity }) => new Product({ name, price, quantity }));
  }

  get products() {
    return this.#products.map(product => product.getProduct());
  }

  addProduct({ name, price, quantity }) {
    try {
      this.#products = [...this.#products, new Product({ name, price, quantity })];
    } catch (error) {
      alert(error.message);
      return;
    }

    store.setValue(STORE_KEY.PRODUCTS, this.products);
  }
}

export default ProductManager;
