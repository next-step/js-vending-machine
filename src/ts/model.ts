import { PRODUCT_CONFIG } from './utils/config';
import { ERROR } from './utils/message';
import ValidationError from './utils/errorValidation';

export enum Page {
  ProductManagement = 'productContainerView'
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface State {
  currentView: Page;
  products: Array<Product>;
}

export const state: State = {
  currentView: Page.ProductManagement,
  products: []
};

export const loadProduct = function (): Array<Product> {
  const storage = localStorage.getItem('products');
  if (storage) state.products = JSON.parse(storage);

  return state.products;
};

const sortProduct = function () {
  state.products.sort(function (a: Product, b: Product): 1 | -1 | 0 {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;

    if (a.name === b.name) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;

      if (a.price === b.price) {
        if (a.quantity < b.quantity) return -1;
        if (a.quantity > b.quantity) return 1;
        return 0;
      }
    }
    throw new Error('정렬 할 수 없습니다.');
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
  validateNewProduct(newProduct);

  const products = state.products.filter(product => product.name !== newProduct.name);
  state.products = [...products, newProduct];

  sortProduct();

  localStorage.setItem('products', JSON.stringify(state.products));

  return state.products;
};

const init = function () {
  loadProduct();
};

init();
