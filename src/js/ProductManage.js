import Product from './Product.js';

const LOCALSTORAGE_PRODUCT_MANAGE_KEY = 'circlegivenProductManage';

const getProductListFromLocalStorage = () =>
  (JSON.parse(localStorage.getItem(LOCALSTORAGE_PRODUCT_MANAGE_KEY)) ?? []).map(
    (data) => new Product({ ...data, enableEmptyQuantity: true })
  );

const updateProductListFromLocalStorage = (productList) => {
  localStorage.setItem(
    LOCALSTORAGE_PRODUCT_MANAGE_KEY,
    JSON.stringify(productList.map((product) => product.toJson()))
  );
};

const ProductManage = (() => {
  let productList = getProductListFromLocalStorage();

  const isExistProduct = (product) =>
    productList.some((addedProduct) => product.name === addedProduct.name);

  const isEmptyQuantityProduct = (product) => product.quantity <= 0;

  const findProduct = (productName) =>
    productList.find((product) => productName === product.name) ?? {};

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
    isExistProduct(product) ? updateProduct(product) : addProduct(product);
    updateProductListFromLocalStorage(productList);
  };

  const handlePurchaseProduct = (productName) => {
    if (isExistProduct(findProduct(productName)) === false) {
      throw new Error('상품이 존재하지 않습니다.');
    }

    if (isEmptyQuantityProduct(findProduct(productName))) {
      throw new Error('상품의 수량이 남아있지않습니다.');
    }

    const changedProduct = new Product({
      ...findProduct(productName).toJson(),
      quantity: findProduct(productName).quantity - 1,
      enableEmptyQuantity: true,
    });
    updateProduct(changedProduct);
    updateProductListFromLocalStorage(productList);
  };

  return {
    list: () => productList,
    addProduct: handleAddProduct,
    purchaseProduct: handlePurchaseProduct,
  };
})();
export default ProductManage;
