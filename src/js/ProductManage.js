import Product from './Product.js';

const LOCALSTORAGE_PRODUCT_MANAGE_KEY = 'circlegivenProductManage';

const getProductListFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(LOCALSTORAGE_PRODUCT_MANAGE_KEY));

const updateProductListFromLocalStorage = (productList) => {
  localStorage.setItem(
    LOCALSTORAGE_PRODUCT_MANAGE_KEY,
    JSON.stringify(
      productList.map((product) =>
        product instanceof Product ? product.toJson() : product
      )
    )
  );
};

const ProductManage = (() => {
  let productList = getProductListFromLocalStorage() ?? [];

  const isDuplicateProduct = (product) =>
    productList.some((addedProduct) => product.name === addedProduct.name);

  const updateProduct = (product) => {
    productList = productList.map((addedProduct) =>
      product.name === addedProduct.name ? product : addedProduct
    );
  };

  const addProduct = (product) => {
    productList.push(product);
  };

  const handleAddProduct = (product) => {
    if (product instanceof Product === false) {
      throw new Error('Product 형태가 아닙니다.');
    }

    // eslint-disable-next-line no-unused-expressions
    isDuplicateProduct(product) ? updateProduct(product) : addProduct(product);
    updateProductListFromLocalStorage(productList);
  };

  return {
    list: () => productList,
    addProduct: handleAddProduct,
  };
})();
export default ProductManage;
