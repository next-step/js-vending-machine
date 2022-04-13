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

export const addProduct = function (product: Product) {
  state.products.push(product);
};
