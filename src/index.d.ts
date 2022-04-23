declare interface Product {
  name: string;
  price: number;
  quantity: number;
}

declare interface State {
  products: Array<Product>;
}
