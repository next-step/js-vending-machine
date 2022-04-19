import Product from './Product.js';

const LOCALSTORAGE_PRODUCT_MANAGE_KEY = 'circlegivenProductManage';

function getProductListFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_PRODUCT_MANAGE_KEY));
}

function updateProductListFromLocalStorage(productList) {
  localStorage.setItem(
    LOCALSTORAGE_PRODUCT_MANAGE_KEY,
    JSON.stringify(productList.map((product) => product instanceof Product ? product.toJson() : product))
  );
}

const ProductManage = (function () {
  let productList = getProductListFromLocalStorage() ?? [];

  function isDuplicateProduct(product) {
    return productList.some(
      (addedProduct) => product.name === addedProduct.name
    );
  }

  function updateProduct(product) {
    productList = productList.map((addedProduct) =>
      product.name === addedProduct.name ? product : addedProduct
    );
  }

  function addProduct(product) {
    productList.push(product);
  }

  function handleAddProduct(product) {
    if (product instanceof Product === false) {
      throw new Error('Product 형태가 아닙니다.');
    }

    // eslint-disable-next-line no-unused-expressions
    isDuplicateProduct(product) ? updateProduct(product) : addProduct(product);
    updateProductListFromLocalStorage(productList);
  }

  return {
    list: () => productList,
    addProduct: handleAddProduct,
  };
})();
export default ProductManage;
