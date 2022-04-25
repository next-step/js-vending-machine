import Product from '../domains/products/management/models/Product';
import useLocalStorage from '../utils/useLocalStorage';

const getProductsByLocalStorage = () =>
  useLocalStorage.getByJson('products')
    ? new Map(Object.entries(useLocalStorage.getByJson('products')))
    : new Map();

const productStore = {
  GET_PRODUCTS() {
    const products = getProductsByLocalStorage();

    return [...products].map(
      (product) =>
        new Product({
          name: product[0],
          price: product[1].price,
          quantity: product[1].quantity,
        }),
    );
  },
  SET_PRODUCTS(product) {
    const products = getProductsByLocalStorage();

    products.set(product.name, {
      price: product.price,
      quantity: product.quantity,
    });

    useLocalStorage.setByJson('products', Object.fromEntries(products));
  },
};

export default productStore;
