declare interface Product {
  name: string;
  price: number;
  quantity: number;
}

declare interface State {
  currentView: Page;
  products: Array<Product>;
}

