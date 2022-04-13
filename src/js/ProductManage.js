import Product from './Product.js';

const LOCALSTORAGE_PRODUCT_MANAGE_KEY = 'circlegivenProductManage';

function getProductListFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_PRODUCT_MANAGE_KEY));
}

function updateProductListFromLocalStorage(productList) {
  localStorage.setItem(
    LOCALSTORAGE_PRODUCT_MANAGE_KEY,
    JSON.stringify(
      productList.map((product) => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      }))
    )
  );
}

export default class ProductManage {
  static #productList = getProductListFromLocalStorage() ?? [];

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
    updateProductListFromLocalStorage(ProductManage.list);
  }
}
