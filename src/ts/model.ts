export interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface State {
  products: Array<Product>;
}

export const state: State = {
  products: []
};

export const addProduct = function (product: Product) {
  state.products.push(product);
};
