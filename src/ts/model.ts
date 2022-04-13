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
  state.products.push(product);
  localStorage.setItem('products', JSON.stringify(state.products));
  return state.products;
};

const init = function () {
  loadProduct();
};

init();
