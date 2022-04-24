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
    const newProduct = new Product({ name, price, quantity });
    this.#fliterSameNameProduct(name);
    this.#products = [...this.#products, newProduct];
    store.setValue(STORE_KEY.PRODUCTS, this.products);
  }

  #fliterSameNameProduct(productName) {
    this.#products = this.#products.filter(product => product.name !== productName);
  }
}

export default ProductManager;
