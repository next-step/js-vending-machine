import { getItem, setItem } from './utils/storage';
import { PRODUCT_CONFIG } from './utils/config';
import { ERROR } from './utils/message';
import ValidationError from './utils/errorValidation';

export const state: State = {
  products: [],
};

export function loadData<T extends State>(path: string): T {
  try {
    const pageName = path.replace(/\//i, '');
    return getItem(pageName);
  } catch (err: unknown) {
    throw err;
  }
}

const sortProduct = function (): void {
  state.products = Array.from(<Array<Product>>state.products).sort((a: Product, b: Product) => {
    return a.name.localeCompare(b.name) || a.price - b.price || b.quantity - a.quantity;
  });
};

const validateNewProduct = function (newProduct: Product) {
  if (newProduct.price < PRODUCT_CONFIG.MIN_PRICE)
    throw new ValidationError(ERROR.LESS_THAN_MIN_PRICE);
  if (newProduct.quantity < PRODUCT_CONFIG.MIN_QUANTITY)
    throw new ValidationError(ERROR.LESS_THAN_MIN_QUANTITY);
  if (newProduct.price % PRODUCT_CONFIG.SHOULD_BE_DIVIDED !== 0)
    throw new ValidationError(ERROR.NOT_DIVIDED_PRICE);
};

export const addProduct = function (newProduct: Product): Array<Product> {
  try {
    validateNewProduct(newProduct);

    const products = state.products.filter(product => product.name !== newProduct.name);
    state.products = [...products, newProduct];

    if (!state.products) throw Error(ERROR.FAIL_ADD_PRODUCT);

    sortProduct();
    setItem('products', state.products);

    return state.products;
  } catch (err) {
    throw err;
  }
};
