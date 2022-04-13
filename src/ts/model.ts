import { PRODUCT_CONFIG } from './utils/config.js';
import { ERROR } from './utils/message.js';
import ValidationError from './utils/errorValidation.js';

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

export const addProduct = function (product: Product): Array<Product> {
  if (product.price < PRODUCT_CONFIG.MIN_PRICE)
    throw new ValidationError(ERROR.LESS_THAN_MIN_PRICE);
  if (product.quantity < PRODUCT_CONFIG.MIN_QUANTITY)
    throw new ValidationError(ERROR.LESS_THAN_MIN_QUANTITY);
  if (product.price % PRODUCT_CONFIG.SHOULD_BE_DIVIDED !== 0)
    throw new ValidationError(ERROR.NOT_DIVIDED_PRICE);

  state.products.push(product);
  localStorage.setItem('products', JSON.stringify(state.products));

  return state.products;
};

const init = function () {
  loadProduct();
};

init();
