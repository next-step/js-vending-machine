import { getItem, setItem } from '../utils/storage';

export default {
  loadInitialData(state: State) {
    state.products = getItem('products') ?? [];
    state.coins = getItem('coins');
  },

  sortProduct(state: State) {
    state.products = Array.from(<Array<Product>>state.products).sort((a: Product, b: Product) => {
      return a.name.localeCompare(b.name) || a.price - b.price || b.quantity - a.quantity;
    });
  },

  addProduct(state: State, newProduct: Product) {
    const products = state.products.filter(product => product.name !== newProduct.name);
    state.products = [...products, newProduct];

    setItem('products', state.products);
  },
};
