import Product from './Product.js';

export default class ProductManage {
  static #productList = [];

  // TODO next step
  // static initialize() {
  //   ProductManage.#productList = [];
  // }

  static get list() {
    return ProductManage.#productList;
  }

  static #isDuplicateProduct(product) {
    return ProductManage.#productList.some(
      (addedProduct) => product.name === addedProduct.name
    );
  }

  static #updateProduct(product) {
    ProductManage.#productList = ProductManage.#productList.map(
      (addedProduct) =>
        product.name === addedProduct.name ? product : addedProduct
    );
  }

  static #addProduct(product) {
    ProductManage.#productList.push(product);
  }

  static addProduct(product) {
    if (product instanceof Product === false) {
      throw new Error('Product 형태가 아닙니다.');
    }

    // eslint-disable-next-line no-unused-expressions
    ProductManage.#isDuplicateProduct(product)
      ? ProductManage.#updateProduct(product)
      : ProductManage.#addProduct(product);
  }
}
